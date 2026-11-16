'use strict';
/* ==========================================================================
   APLICA O PAINEL DE APROVAÇÃO (planilha do Drive) ÀS SEMANAS EM RASCUNHO
     node ferramentas/aplicar-aprovacoes.js <painel.xlsx> [pasta-com-revisados]

   Aba "Documentos": Código | Semana | Data | Documento | Arquivo no repositório |
                     Link no Drive | Situação (Pendente / OK / Revisado) | Observações
   Aba "Lecionário": Código | Semana | Data | Leitura | Referência | Página | Situação

   • Revisado: o arquivo corrigido no Drive (baixado para a pasta-com-revisados,
     com o mesmo nome do arquivo no repositório) substitui o do repositório e é
     relido (roteiro, preces ou leituras).
   • Uma semana passa a "aprovado: true" quando TODOS os seus documentos estão
     OK ou Revisado.
   • Página do lecionário preenchida → entra na leitura e no cadastro
     dados/lecionario.json.
   Nada da planilha de escala/espórtulas é lido aqui.
   ========================================================================== */
const fs = require('node:fs');
const path = require('node:path');
const O = require('./office.js');
const L = require('./semana-lib.js');

const raiz = path.join(__dirname, '..');
const norm = (s) => String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').trim().toLowerCase();
const CODIGOS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];

function valor(c) {
  if (typeof c === 'number' && c > 40000 && c < 60000) return O.excelDate(c);
  const t = String(c ?? '').trim();
  const m = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  return m ? `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}` : t;
}
function tabela(planilha, nome) {
  const chave = Object.keys(planilha).find((n) => norm(n).startsWith(norm(nome)));
  if (!chave) return [];
  const linhas = Array.from(planilha[chave], (r) => Array.from(r || [], valor));
  const cab = (linhas[0] || []).map(norm);
  return linhas.slice(1).filter((r) => r.some((c) => c))
    .map((r) => Object.fromEntries(cab.map((c, i) => [c, r[i] ?? ''])));
}

async function principal() {
  const [arqPainel, pastaRev] = process.argv.slice(2);
  if (!arqPainel) throw new Error('Informe o painel (.xlsx).');
  const planilha = await O.readXlsx(fs.readFileSync(arqPainel));
  const docs = tabela(planilha, 'Documentos');
  const lec = tabela(planilha, 'Lecion');
  const relatorio = [];
  const semanas = {};
  const abrir = (id) => {
    if (!semanas[id]) {
      const arq = path.join(raiz, 'semanas', id, 'semana.json');
      if (!fs.existsSync(arq)) return null;
      semanas[id] = { arq, s: JSON.parse(fs.readFileSync(arq, 'utf8')), mudou: false };
    }
    return semanas[id];
  };

  /* ---- Documentos ---- */
  const porSemana = {};
  for (const d of docs) {
    const id = d['semana'];
    const situacao = norm(d['situacao']);
    const S0 = abrir(id);
    const fonteDoc = `semanas/${id}/${d['arquivo no repositorio']}`;
    if (S0 && (S0.s.retidos || []).includes(fonteDoc)) {
      // documento retido (entra mais tarde): não impede a publicação da semana
      if (situacao === 'ok' || situacao === 'revisado') {
        S0.s.retidos = S0.s.retidos.filter((x) => x !== fonteDoc);
        if (!S0.s.retidos.length) delete S0.s.retidos;
        S0.mudou = true; relatorio.push(`Liberado: ${fonteDoc}`);
      } else continue;
    }
    (porSemana[id] = porSemana[id] || []).push(situacao);
    if (situacao !== 'revisado' || !pastaRev) continue;
    const nome = d['arquivo no repositorio'];
    const novo = path.join(pastaRev, nome);
    if (!fs.existsSync(novo)) continue; // sem nova versão baixada nesta rodada
    const S = abrir(id); if (!S) continue;
    const destino = path.join(raiz, 'semanas', id, nome);
    fs.copyFileSync(novo, destino);
    const doc = await O.readDocx(fs.readFileSync(destino));
    const fonte = `semanas/${id}/${nome}`;
    let lidos = 0;
    for (const [chave, r] of Object.entries(S.s.roteiros || {})) {
      if (r.fonte !== fonte) continue;
      if (r.cartao) { // cartão de rito: lido pelo leitor próprio (ferramentas/docx/cartao_json.py)
        const out = require('node:child_process').execFileSync('python3', [path.join(__dirname, 'docx/cartao_json.py'), destino]);
        const novo = JSON.parse(out.toString());
        S.s.roteiros[chave] = { ...novo, titulo: r.titulo, fonte: r.fonte, cartao: true };
        novo.secoes[0].titulo = r.titulo.toUpperCase();
        S.s.roteiros[chave].secoes = novo.secoes;
        lidos++;
        continue;
      }
      const dados = r.tipo === 'preces' ? L.lerPreces(doc) : L.lerRoteiro(doc);
      S.s.roteiros[chave] = { tipo: r.tipo, titulo: r.titulo, ...(r.botao ? { botao: r.botao } : {}), fonte: r.fonte, ...dados };
      lidos++;
    }
    if (/^leituras/i.test(nome)) {
      const prefixo = `s${S.s.legacyWeek + 1}`;
      const paginas = JSON.parse(fs.readFileSync(path.join(raiz, 'dados/lecionario.json'), 'utf8'));
      for (const dia of L.lerLeituras(doc)) {
        const codigo = CODIGOS[L.diaDaSemana(dia.data)];
        for (const l of dia.leituras) {
          const chave = `${prefixo}_${codigo === 'sab' ? 'dom' : codigo}_${l.parte}`;
          const alvo = S.s.leituras[chave];
          if (!alvo) continue;
          alvo.text = l.texto; if (l.referencia) alvo.referencia = l.referencia;
          for (const cartao of S.s.dias.concat(S.s.fimDeSemana ? [S.s.fimDeSemana] : [])) {
            for (const linha of cartao.leituras) {
              if (linha[2] === chave && l.referencia && linha[1] !== l.referencia) {
                linha[1] = l.referencia;
                if (!linha[0].startsWith('Aclama')) linha[3] = L.paginaLecionario(paginas, l.referencia) || linha[3];
              }
            }
          }
          lidos++;
        }
      }
    }
    S.mudou = true;
    relatorio.push(`Revisado: ${fonte} (${lidos} parte(s) relida(s))`);
  }
  for (const [id, lista] of Object.entries(porSemana)) {
    const S = abrir(id); if (!S) { relatorio.push(`Semana ${id} não existe no repositório.`); continue; }
    const pronta = lista.length && lista.every((x) => x === 'ok' || x === 'revisado');
    if (pronta && S.s.aprovado === false) {
      delete S.s.aprovado;
      if (/^RASCUNHO/i.test(S.s.nota || '')) S.s.nota = S.s.nota.replace(/^RASCUNHO[^.]*\.\s*/i, '');
      S.mudou = true; relatorio.push(`Semana ${id} APROVADA – publicada no site.`);
    } else if (!pronta) relatorio.push(`Semana ${id}: ${lista.filter((x) => x === 'ok' || x === 'revisado').length}/${lista.length} documentos aprovados.`);
  }

  /* ---- Páginas do lecionário ---- */
  const arqLec = path.join(raiz, 'dados/lecionario.json');
  let cadastro = JSON.parse(fs.readFileSync(arqLec, 'utf8'));
  let novasPaginas = 0;
  for (const r of lec) {
    const pagina = r['pagina'].replace(/\s*\/\s*/, ' / ');
    if (norm(r['situacao']) !== 'ok' || !/^(I|II|III) \/ \d+/.test(pagina)) continue;
    const S = abrir(r['semana']); if (!S) continue;
    for (const cartao of S.s.dias.concat(S.s.fimDeSemana ? [S.s.fimDeSemana] : [])) {
      const data = cartao.data || 'fim de semana';
      if (r['data'] && r['data'] !== data && !(r['data'] === 'fim de semana' && !cartao.data)) continue;
      for (const linha of cartao.leituras) {
        if (linha[1] === r['referencia'] && linha[3] !== pagina) { linha[3] = pagina; S.mudou = true; novasPaginas++; }
      }
    }
    const dataRef = /^\d{4}-/.test(r['data']) ? r['data'] : (S.s.fimDeSemana ? S.s.fimDeSemana.dias.slice(-1)[0].data : S.s.id);
    const bucket = L.bucketDaPagina(pagina, dataRef);
    cadastro._ciclos = cadastro._ciclos || {};
    for (const chave of [L.chaveLecionario(r['referencia']), '~' + L.chaveBase(r['referencia'])]) {
      if (!/^I \//.test(pagina)) cadastro[chave] = pagina;
      if (bucket) {
        const t = (cadastro._ciclos[bucket] = cadastro._ciclos[bucket] || {});
        t[chave] = (t[chave] || []).filter(([p]) => p !== pagina).concat([[pagina, dataRef.slice(5)]]);
      }
    }
  }
  const ciclos = cadastro._ciclos; delete cadastro._ciclos;
  cadastro = Object.fromEntries(Object.entries(cadastro).sort(([a], [b]) => a.localeCompare(b, 'pt-BR')));
  if (ciclos) cadastro._ciclos = ciclos;
  fs.writeFileSync(arqLec, JSON.stringify(cadastro, null, 1) + '\n');
  if (novasPaginas) relatorio.push(`${novasPaginas} página(s) do lecionário preenchida(s).`);

  for (const S of Object.values(semanas)) {
    if (!S.mudou) continue;
    L.finalizarSemana(S.s);
    fs.writeFileSync(S.arq, JSON.stringify(S.s, null, 1) + '\n');
  }
  console.log(relatorio.join('\n') || 'Nada a aplicar.');
}

principal().catch((e) => { console.error(e); process.exit(1); });
