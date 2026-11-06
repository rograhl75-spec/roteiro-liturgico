/* ==========================================================================
   MONTAGEM AUTOMÁTICA DE UMA SEMANA
   Lê os arquivos que o diácono já produz (Leituras, Roteiro, Preces, extras e a
   planilha de escala) e devolve o conteúdo de semanas/<segunda>/semana.json.
   Funciona no navegador (ferramentas/montar-semana.html) e no Node.js.
   PRIVACIDADE: da planilha de escala só são lidas as colunas públicas
   (data, horário, local, celebração, responsável e nomes dos noivos).
   Telefones, vínculos e valores de espórtulas nunca são lidos.
   ========================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.SemanaLib = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const BASE_LEGADO = Date.UTC(2026, 8, 7); // segunda-feira, 7/9/2026 = semana 0
  const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto',
    'setembro', 'outubro', 'novembro', 'dezembro'];
  const DIAS_LONGOS = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  const DIAS_CURTOS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const CODIGOS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
  const MOMENTOS = {
    l1: '1ª Leitura', sal: 'Salmo', l2: '2ª Leitura', acl: 'Aclamação ao Evangelho', ev: 'Evangelho'
  };
  const MOMENTOS_LONGOS = { ...MOMENTOS, sal: 'Salmo Responsorial' };
  // Citações para a transmissão (frases-título e refrão do salmo).
  const ROTULOS_CITACAO = { l1: 'Primeira Leitura', sal: 'Salmo Responsorial', l2: 'Segunda Leitura', ev: 'Evangelho' };

  /* ------------------------------ utilidades ------------------------------ */
  const limpar = (texto) => String(texto ?? '').replace(/[ \t  ]/g, ' ').replace(/ {2,}/g, ' ').trim();
  const semAcento = (texto) => String(texto).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const doisDigitos = (n) => String(n).padStart(2, '0');
  const isoDe = (ms) => new Date(ms).toISOString().slice(0, 10);
  const msDe = (iso) => Date.UTC(Number(iso.slice(0, 4)), Number(iso.slice(5, 7)) - 1, Number(iso.slice(8, 10)));
  const somarDias = (iso, dias) => isoDe(msDe(iso) + dias * 86400000);
  const diaDaSemana = (iso) => new Date(msDe(iso)).getUTCDay();
  const dataCurta = (iso) => `${iso.slice(8)}/${iso.slice(5, 7)}`;
  const slug = (texto, max = 24) => semAcento(texto).replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '')
    .split('_').filter((p) => p.length > 2 && !['das', 'dos', 'del', 'missa', 'roteiro', 'preces', 'com', 'para'].includes(p))
    .join('_').slice(0, max).replace(/_+$/, '') || 'extra';
  const semanaLegada = (segunda) => Math.round((msDe(segunda) - BASE_LEGADO) / (7 * 86400000));
  const chaveLecionario = (ref) => limpar(ref).replace(/\s+/g, '').replace(/[–—]/g, '-').toLowerCase();

  function periodoTexto(inicio, fim) {
    const [di, mi] = [Number(inicio.slice(8)), Number(inicio.slice(5, 7)) - 1];
    const [df, mf] = [Number(fim.slice(8)), Number(fim.slice(5, 7)) - 1];
    return mi === mf ? `${di} a ${df} de ${MESES[mf]}` : `${di} de ${MESES[mi]} a ${df} de ${MESES[mf]}`;
  }
  const tituloData = (iso) => `${DIAS_LONGOS[diaDaSemana(iso)]}, ${Number(iso.slice(8))} de ` +
    `${MESES[Number(iso.slice(5, 7)) - 1].replace(/^./, (c) => c.toUpperCase())} de ${iso.slice(0, 4)}`;

  function linhasDoDocumento(doc) {
    const linhas = [];
    for (const bloco of doc.blocos) {
      if (bloco.tipo === 'p') linhas.push(...bloco.texto.split('\n').map(limpar));
      else for (const linha of bloco.linhas) linhas.push(limpar(linha.filter(Boolean).join(' — ')));
    }
    return linhas.filter(Boolean);
  }

  /* -------------------------------- LEITURAS ------------------------------ */
  const RX_DIA = /^(Segunda-feira|Terça-feira|Quarta-feira|Quinta-feira|Sexta-feira|Sábado|Domingo),?\s+(\d{1,2})\s+de\s+([A-Za-zçÇ]+)\s+de\s+(\d{4})$/i;
  const MARCADORES = [
    [/^PRIMEIRA LEITURA\b/, 'l1'],
    [/^SEGUNDA LEITURA\b/, 'l2'],
    [/^Salmo responsorial\b/i, 'sal'],
    [/^Aclama[çc][ãa]o ao Evangelho\b/i, 'acl'],
    [/^EVANGELHO\b/, 'ev']
  ];
  const RX_REF = /^(?:[1-3]\s?)?[A-ZÁÉÍÓÚ][a-zà-ú]{0,3}\s?\d{1,3}\s?[,(]/;
  const ehReferencia = (linha) => RX_REF.test(linha);
  const RX_ABERTURA = /^(Leitura|Proclama[çc][ãa]o|In[íi]cio|Princ[íi]pio)\b/;
  const RX_FECHO = /^Palavra d[ao] (Senhor|Salva[çc][ãa]o)\.?$/i;

  function lerLeituras(doc) {
    const dias = [];
    let atual = null;
    for (const linha of linhasDoDocumento(doc)) {
      const m = linha.match(RX_DIA);
      if (m) {
        const mes = MESES.indexOf(m[3].toLowerCase());
        if (mes < 0) continue;
        atual = { data: `${m[4]}-${doisDigitos(mes + 1)}-${doisDigitos(m[2])}`, titulo: linha, cabecalho: [], secoes: [] };
        dias.push(atual);
        continue;
      }
      if (!atual) continue;
      const marcador = MARCADORES.find(([rx]) => rx.test(linha));
      if (marcador) {
        let chave = marcador[1];
        if (/mais breve/i.test(linha)) chave += '_breve';
        while (atual.secoes.some((s) => s.chave === chave)) chave += '_2';
        atual.secoes.push({ chave, linhas: [linha] });
      } else if (atual.secoes.length) {
        atual.secoes[atual.secoes.length - 1].linhas.push(linha);
      } else {
        atual.cabecalho.push(linha);
      }
    }
    return dias.map(analisarDia);
  }

  function analisarDia(dia) {
    const iLeituras = dia.cabecalho.findIndex((l) => /^Leituras:?$/i.test(l));
    const antes = iLeituras >= 0 ? dia.cabecalho.slice(0, iLeituras) : dia.cabecalho;
    const depois = iLeituras >= 0 ? dia.cabecalho.slice(iLeituras + 1) : [];
    const refs = depois.filter(ehReferencia);
    const notas = depois.filter((l) => !ehReferencia(l));
    const linhaCelebracao = antes[0] || '';
    const linhaSemana = antes.slice(1).find((l) => /Semana d/i.test(l)) || '';
    const avisos = [];

    // Referências do cabeçalho, na ordem das partes (sem a aclamação).
    const partes = dia.secoes.filter((s) => !s.chave.startsWith('acl') && !s.chave.endsWith('_breve'));
    const leituras = [];
    partes.forEach((secao, i) => {
      const bruta = refs[i] || '';
      const [principal, resto] = bruta.split(/\s+ou\s+(?![^()]*\))/i);
      secao.referencia = limpar(principal || '');
      if (!secao.referencia) avisos.push(`${dataCurta(dia.data)}: referência de “${secao.linhas[0]}” não encontrada no cabeçalho “Leituras:”.`);
      if (resto && /mais breve/i.test(resto)) {
        const livro = (secao.referencia.match(/^(?:[1-3]\s?)?[A-ZÁÉÍÓÚ][a-zà-ú]{0,3}\s?/) || [''])[0];
        secao.breve = livro + limpar(resto.replace(/mais breve/i, ''));
      } else if (resto) {
        secao.alternativa = limpar(resto);
      }
    });
    for (const secao of dia.secoes) {
      if (secao.chave.startsWith('acl')) {
        const resto = limpar(secao.linhas[0].replace(MARCADORES[3][0], ''));
        secao.referencia = resto || (ehReferencia(secao.linhas[1] || '') ? secao.linhas[1] : '');
      }
      if (secao.chave.endsWith('_breve') && !secao.referencia) {
        const abertura = secao.linhas.find((l) => RX_ABERTURA.test(l)) || '';
        const original = partes.find((p) => secao.chave.startsWith(p.chave.split('_')[0]));
        const cap = (abertura.match(/(\d+,[\d.\-–a-z]+)$/) || [])[1];
        if (original && cap) secao.referencia = original.referencia.replace(/\d+,.*$/, cap);
      }
    }

    for (const secao of dia.secoes) {
      leituras.push({ parte: secao.chave, referencia: secao.referencia || '', texto: semFraseTitulo(secao.linhas).join('\n'), secao });
      if (secao.breve && !dia.secoes.some((s) => s.chave === `${secao.chave}_breve`)) {
        const texto = textoMaisBreve(secao.linhas, secao.breve);
        if (texto) leituras.push({ parte: `${secao.chave}_breve`, referencia: secao.breve, texto, secao });
        else avisos.push(`${dataCurta(dia.data)}: não consegui separar a forma mais breve (${secao.breve}).`);
      }
    }
    return {
      data: dia.data, titulo: dia.titulo, linhaCelebracao, linhaSemana, notas, leituras,
      citacoes: citacoes(dia.secoes), aclamacao: textoAclamacao(dia.secoes), avisos
    };
  }

  /* A frase-título (entre “PRIMEIRA LEITURA” e “Leitura do…”) só vai para as
     citações da transmissão; não aparece no texto da leitura. */
  function semFraseTitulo(linhas) {
    const iAbertura = linhas.findIndex((l) => RX_ABERTURA.test(l));
    return iAbertura > 1 && iAbertura <= 5 ? [linhas[0], ...linhas.slice(iAbertura)] : linhas;
  }

  function versiculos(espec) {
    const m = espec.match(/(\d+),(.+)$/);
    if (!m || /\d+,\d+.*\d+,/.test(espec)) return null;
    const lista = new Set();
    for (const trecho of m[2].split('.')) {
      const [a, b] = trecho.split(/[-–]/).map((v) => parseInt(v, 10));
      if (Number.isNaN(a)) return null;
      for (let v = a; v <= (Number.isNaN(b) || b === undefined ? a : b); v++) lista.add(v);
    }
    return { capitulo: m[1], lista };
  }

  function textoMaisBreve(linhas, referencia) {
    const alvo = versiculos(referencia);
    const iAbertura = linhas.findIndex((l) => RX_ABERTURA.test(l));
    if (!alvo || iAbertura < 0) return '';
    const saida = [
      /\(mais long[oa]\)/i.test(linhas[0]) ? linhas[0].replace(/\(mais long([oa])\)/i, '(mais breve)') : `${linhas[0]} (mais breve)`,
      linhas[iAbertura].replace(/\d+,[\d.\-–a-z]+$/, referencia.replace(/^.*?(\d+,)/, '$1'))
    ];
    let incluir = true;
    let fecho = '';
    for (const linha of linhas.slice(iAbertura + 1)) {
      if (RX_FECHO.test(linha)) { fecho = linha; continue; }
      if (/^\d{1,3}$/.test(linha)) incluir = alvo.lista.has(Number(linha));
      if (incluir) saida.push(linha);
    }
    if (fecho) saida.push(fecho);
    return saida.join('\n');
  }

  function citacoes(secoes) {
    const lista = [];
    for (const secao of secoes) {
      const base = secao.chave.split('_')[0];
      if (!ROTULOS_CITACAO[base] || secao.chave !== base) continue;
      let texto = '';
      if (base === 'sal') {
        const partes = [];
        for (const linha of secao.linhas.slice(1)) {
          if (/^\d{1,3}$/.test(linha)) break;
          if (ehReferencia(linha) && !partes.length) continue;
          if (/^Ou\b/i.test(linha) || /^R\./.test(linha) || !partes.length) partes.push(linha.replace(/^R\.\s*/, ''));
          else partes[partes.length - 1] += ` ${linha}`;
        }
        texto = partes.join('\n');
      } else {
        const iAbertura = secao.linhas.findIndex((l) => RX_ABERTURA.test(l));
        if (iAbertura > 1 && iAbertura <= 5) texto = secao.linhas.slice(1, iAbertura).join(' ');
      }
      if (texto) lista.push({ label: ROTULOS_CITACAO[base], text: limpar(texto.replace(/\n\s*/g, '\n')).replace(/ \n/g, '\n') });
    }
    return lista;
  }

  function textoAclamacao(secoes) {
    const secao = secoes.find((s) => s.chave === 'acl');
    if (!secao) return null;
    const linhas = secao.linhas.slice(1).filter((l) => l !== secao.referencia);
    return {
      referencia: secao.referencia,
      texto: linhas.map((l) => (/^(R|V)\./.test(l) || /^Ou\b/i.test(l) ? l : `    ${l}`)).join('\n')
    };
  }

  /* -------------------------------- ROTEIROS ------------------------------ */
  const normalizarPapel = (papel) => limpar(papel)
    .replace(/\s*\n\s*/g, ' / ')
    .replace(/^1a\b/, '1ª')
    .replace(/^2ª leitura$/i, '2ª Leitura')
    .replace(/^1ª leitura$/i, '1ª Leitura')
    .replace(/\s*\/\s*/g, ' / ')
    .replace(/^Animador \/ TELÃO$/i, 'Animador / Telão');

  const textoCelula = (texto) => {
    const linhas = String(texto ?? '').split('\n').map(limpar);
    const saida = [];
    for (const linha of linhas) if (linha || (saida.length && saida[saida.length - 1])) saida.push(linha);
    return saida.join('\n').trim();
  };

  function lerRoteiro(doc) {
    const secoes = [{ titulo: '', linhas: [] }];
    for (const bloco of doc.blocos) {
      if (bloco.tipo === 'p') {
        const texto = limpar(bloco.texto.replace(/\n/g, ''));
        if (texto) secoes.push({ titulo: texto.replace(/^\d+\.\s*/, '').replace(/:$/, '').trim(), linhas: [] });
        continue;
      }
      for (const linha of bloco.linhas) {
        const celulas = linha.filter((c) => c !== null).map(textoCelula);
        if (!celulas.some(Boolean)) continue;
        if (celulas.length === 1) {
          for (const nota of celulas[0].split('\n')) if (nota) secoes[secoes.length - 1].linhas.push(['Orientação', nota]);
          continue;
        }
        const papel = normalizarPapel(celulas[0].replace(/\s*\n\s*/g, ' / '));
        const texto = celulas.slice(1).filter(Boolean).join('\n');
        if (papel.toUpperCase() === 'LEITURAS' && texto.toUpperCase() === 'LIVRO') continue;
        if (!papel || !texto) continue;
        secoes[secoes.length - 1].linhas.push([papel, texto]);
      }
    }
    return {
      cabecalho: doc.cabecalho,
      secoes: secoes.filter((s) => s.linhas.length).map((s) => ({ titulo: s.titulo || 'Orientações', linhas: s.linhas }))
    };
  }

  function lerPreces(doc) {
    const formularios = [];
    for (const bloco of doc.blocos.filter((b) => b.tipo === 'tabela')) {
      const form = { data: '', horario: '', linhas: [] };
      for (const linha of bloco.linhas) {
        const celulas = linha.filter((c) => c !== null).map(textoCelula);
        const papel = normalizarPapel((celulas[0] || '').replace(/\s*\n\s*/g, ' / '));
        const texto = celulas.slice(1).filter(Boolean).join('\n');
        if (papel === 'Data') form.data = texto;
        else if (papel === 'Horário') form.horario = texto;
        else if (papel && texto) form.linhas.push([papel, texto]);
      }
      if (form.linhas.length) formularios.push(form);
    }
    return {
      cabecalho: doc.cabecalho,
      formularios: formularios.map((f) => ({
        titulo: [f.data && `Data: ${f.data}`, f.horario && `Horário: ${f.horario}`].filter(Boolean).join(' — ') || 'Preces',
        linhas: f.linhas
      }))
    };
  }

  /* Páginas do Missal escritas no próprio roteiro: “Oração da Coleta (pág. 415)” etc. */
  function missalDoRoteiro(roteiro) {
    const linhas = roteiro.secoes.flatMap((s) => s.linhas);
    const tudo = linhas.map(([papel, texto]) => `${papel}\t${texto}`);
    const achar = (rx) => { for (const t of tudo) { const m = t.match(rx); if (m) return m; } return null; };
    const pag = String.raw`\(?\s*p[áa]g(?:ina)?\.?\s*(\d{2,4})`;
    const missal = {};
    let m;
    if ((m = achar(new RegExp(String.raw`Ora[çc][ãa]o da Coleta[^\n]*?${pag}`, 'i')))) missal.coleta = m[1];
    if ((m = achar(new RegExp(String.raw`sobre as Oferendas[^\n]*?${pag}`, 'i')))) missal.oferendas = m[1];
    if ((m = achar(new RegExp(String.raw`depois da Comunh[ãa]o[^\n]*?${pag}`, 'i')))) missal.comunhao = m[1];
    if ((m = achar(new RegExp(String.raw`Pref[áa]cio\s+(?:d[oa]s?\s+)?([^\n(]*?)\s*${pag}`, 'i')))) {
      missal.prefacio = `${m[2]}${m[1] ? ` (${limpar(m[1]).replace(/[–—-]\s*$/, '').trim()})` : ''}`;
    }
    if ((m = achar(new RegExp(String.raw`ORA[ÇC][ÃA]O EUCAR[ÍI]STICA\s+([IVX]+)\s*[–—-]?\s*${pag}`, 'i')))) missal.eucaristica = `${m[2]} (OE ${m[1].toUpperCase()})`;
    if ((m = achar(new RegExp(String.raw`B[êe]n[çc][ãa]o Solene\s*[–—-]?\s*([^\n(]*?)\s*${pag}`, 'i')))) {
      missal.bencao = `${m[2]}${m[1] ? ` (${limpar(m[1])})` : ''}`;
    }
    if ((m = achar(new RegExp(String.raw`Missal\s*[–—-]\s*p[áa]g\.?\s*(\d+)\)\s*Obedientes`, 'i')))) missal.rito_comunhao = m[1];
    const gloria = linhas.find(([, texto]) => /Gl[óo]ria a Deus nas alturas/i.test(texto));
    if (gloria) missal.gloria = /m[úu]sica|canto/i.test(gloria[0]) ? 'Cantado (pág. 442)' : '442';
    const creio = linhas.find(([, texto]) => /Creio em (um só )?Deus/i.test(texto));
    if (creio) missal.creio = /m[úu]sica|canto/i.test(creio[0]) ? 'Cantado (página omitida)' : 'Rezado (página omitida)';
    const cor = (roteiro.cabecalho || '').match(/COR\s+(VERDE|ROXA?O?|BRANCA?O?|VERMELHA?O?|R[ÓO]SEA?|ROSA)/i);
    return { missal, cor: cor ? corPorNome(cor[1]) : null };
  }

  function corPorNome(nome) {
    const n = semAcento(nome);
    if (n.startsWith('verd')) return 'verde';
    if (n.startsWith('rox')) return 'roxo';
    if (n.startsWith('branc')) return 'branco';
    if (n.startsWith('vermelh')) return 'vermelho';
    if (n.startsWith('ros')) return 'rosa';
    return null;
  }

  /* --------------------------------- ESCALA ------------------------------- */
  function horaTexto(valor) {
    if (typeof valor === 'number') {
      const minutos = Math.round((valor % 1) * 1440);
      return `${doisDigitos(Math.floor(minutos / 60))}h${doisDigitos(minutos % 60)}`;
    }
    return limpar(valor)
      .replace(/(\d{1,2})\s*[:hH]\s*(\d{2})/g, (_, h, mm) => `${doisDigitos(h)}h${mm}`)
      .replace(/\b(\d{1,2})\s*[hH]\b(?!\d)/g, (_, h) => `${doisDigitos(h)}h00`)
      .replace(/\s*(?:às|as|a|-|–)\s*(?=\d{2}h)/g, '–');
  }

  function dataIso(valor) {
    if (typeof valor === 'number') return isoDe(Math.round((valor - 25569) * 86400000));
    const m = String(valor || '').match(/(\d{1,2})\/(\d{1,2})\/(\d{2,4})/);
    if (m) return `${m[3].length === 2 ? `20${m[3]}` : m[3]}-${doisDigitos(m[2])}-${doisDigitos(m[1])}`;
    const iso = String(valor || '').match(/^(\d{4}-\d{2}-\d{2})/);
    return iso ? iso[1] : null;
  }

  const RX_TELEFONE = /\(?\d{2}\)?[\s.-]?9?\d{4}[\s.-]?\d{4}/g;
  const semTelefone = (texto) => limpar(String(texto ?? '').replace(RX_TELEFONE, '').replace(/R\$\s*[\d.,]+/g, ''));

  function tabelaDaPlanilha(planilhas, nome) {
    const aba = Object.keys(planilhas).find((k) => semAcento(k).startsWith(nome));
    if (!aba) return null;
    const linhas = planilhas[aba];
    const iCab = linhas.findIndex((l) => l && l.some((c) => typeof c === 'string' && semAcento(limpar(c)) === 'data'));
    if (iCab < 0) return null;
    const cab = linhas[iCab].map((c) => semAcento(limpar(c || '')));
    const coluna = (...inicios) => cab.findIndex((c) => inicios.some((i) => c.startsWith(i)));
    return { linhas: linhas.slice(iCab + 1).filter(Boolean), coluna };
  }

  /* Devolve { 'YYYY-MM-DD': [linhas da escala] } para o período. */
  function lerEscala(planilhas, inicio, fim) {
    const porDia = {};
    const celebracoes = {};
    const avisos = [];
    const add = (data, linha) => { (porDia[data] = porDia[data] || []).push(linha); };
    const dentro = (data) => data && data >= inicio && data <= fim;

    const missas = tabelaDaPlanilha(planilhas, 'missas');
    if (!missas) avisos.push('Planilha de escala sem a aba “Missas”.');
    else {
      const c = { data: missas.coluna('data'), hora: missas.coluna('horario', 'hora'), local: missas.coluna('local'),
        cel: missas.coluna('celebracao', 'liturgia'), resp: missas.coluna('sacerdote', 'celebrante', 'presidente') };
      for (const l of missas.linhas) {
        const data = dataIso(l[c.data]);
        if (!dentro(data) || !l[c.hora]) continue;
        const linha = [horaTexto(l[c.hora]), limpar(l[c.local]), semTelefone(l[c.resp]) || 'A definir'];
        (celebracoes[data] = celebracoes[data] || []).push([linha, limpar(l[c.cel] || '')]);
        add(data, linha);
      }
      // Quando o dia tem celebrações diferentes (ex.: Missa votiva e Adoração), indica qual é cada uma.
      for (const lista of Object.values(celebracoes)) {
        if (new Set(lista.map(([, cel]) => cel)).size > 1) {
          for (const [linha, cel] of lista) if (cel) linha[2] = `${linha[2]} — ${cel.replace(/\s*\((Memória|Festa|Solenidade)[^)]*\)\s*$/i, '')}`;
        }
      }
    }
    const confissoes = tabelaDaPlanilha(planilhas, 'confiss');
    if (confissoes) {
      const c = { data: confissoes.coluna('data'), hora: confissoes.coluna('horario', 'hora'), local: confissoes.coluna('local'),
        obs: confissoes.coluna('observacao', 'tipo', 'atendimento'), resp: confissoes.coluna('sacerdote', 'padre', 'responsavel') };
      for (const l of confissoes.linhas) {
        const data = dataIso(l[c.data]);
        if (!dentro(data) || !l[c.hora]) continue;
        add(data, [horaTexto(l[c.hora]), limpar(l[c.local]) || 'Paróquia Nossa Senhora Auxiliadora',
          semTelefone(l[c.resp]) || 'A definir', 'confissao', semTelefone(l[c.obs]) || 'Confissões']);
      }
    }
    const casamentos = tabelaDaPlanilha(planilhas, 'casamento');
    if (casamentos) {
      const c = { data: casamentos.coluna('data'), hora: casamentos.coluna('horario', 'hora'), local: casamentos.coluna('local'),
        noivos: casamentos.coluna('noivos'), resp: casamentos.coluna('celebrante', 'sacerdote', 'assistente') };
      for (const l of casamentos.linhas) {
        const data = dataIso(l[c.data]);
        if (!dentro(data) || !l[c.hora]) continue;
        add(data, [horaTexto(l[c.hora]), limpar(l[c.local]), semTelefone(l[c.resp]) || 'A definir', 'casamento',
          `Matrimônio — ${semTelefone(l[c.noivos]) || 'noivos'}`]);
      }
    }
    const ordem = { undefined: 0, confissao: 1, casamento: 2 };
    for (const lista of Object.values(porDia)) lista.sort((a, b) => ordem[a[3]] - ordem[b[3]] || a[0].localeCompare(b[0]));
    return { porDia, celebracoes, avisos };
  }

  /* --------------------------------- MISSAL ------------------------------- */
  const PALAVRAS_SOLENIDADES = [
    [/rei do universo/, 'CRISTO-REI'], [/santissima trindade/, 'TRINDADE'], [/corpo e sangue/, 'CORPUS-CHRISTI'],
    [/sagrado coracao de jesus/, 'SAGRADO-CORACAO'], [/pentecostes/, 'PENTECOSTES'], [/ascensao do senhor/, 'ASCENSAO'],
    [/batismo do senhor/, 'BATISMO'], [/epifania/, 'EPIFANIA'], [/sagrada familia/, 'SAGRADA-FAMILIA'],
    [/mae de deus/, 'MAE-DE-DEUS'], [/natal do senhor/, 'NATAL-DIA'], [/cinzas/, 'CINZAS'], [/ceia do senhor/, 'CEIA'],
    [/(domingo de pascoa|ressurreicao do senhor)/, 'PASCOA']
  ];

  function chaveTemporal(info) {
    const texto = semAcento(`${info.linhaCelebracao} ${info.linhaSemana}`);
    const dow = diaDaSemana(info.data);
    for (const [rx, chave] of PALAVRAS_SOLENIDADES) if (rx.test(texto)) return chave;
    let m;
    if ((m = texto.match(/(\d+)º? domingo do tempo comum/))) return `TC-${m[1]}`;
    if ((m = texto.match(/(\d+)º? domingo do advento/))) return `ADV-${m[1]}-0`;
    if ((m = texto.match(/(\d+)º? domingo da quaresma/))) return `QUA-${m[1]}-0`;
    if ((m = texto.match(/(\d+)º? domingo da pascoa/))) return `PAS-${m[1]}-0`;
    if ((m = texto.match(/(\d+)ª? semana do tempo comum/))) return `TC-${m[1]}`;
    const mmdd = info.data.slice(5);
    if (/advento/.test(texto) && mmdd >= '12-17' && mmdd <= '12-24') return `DEZ-${mmdd.slice(3)}`;
    if ((m = texto.match(/(\d+)ª? semana do advento/))) return `ADV-${m[1]}-${dow}`;
    if (/depois das cinzas/.test(texto)) return `QUA-0-${dow}`;
    if ((m = texto.match(/(\d+)ª? semana da quaresma/))) return `QUA-${m[1]}-${dow}`;
    if (/oitava da pascoa/.test(texto)) return `PAS-1-${dow}`;
    if ((m = texto.match(/(\d+)ª? semana da pascoa/))) return `PAS-${m[1]}-${dow}`;
    return null;
  }

  function tempoLiturgico(texto) {
    const t = semAcento(texto);
    if (/tempo comum/.test(t)) return 'Tempo Comum';
    if (/advento/.test(t)) return 'Advento';
    if (/quaresma|cinzas|semana santa|paixao/.test(t)) return 'Quaresma';
    if (/pascoa|pascal|pentecostes|ascensao/.test(t)) return 'Tempo Pascal';
    if (/natal|epifania|batismo do senhor|sagrada familia|mae de deus/.test(t)) return 'Tempo do Natal';
    return '';
  }

  const PREFACIOS_DO_COMUM = [
    [/virgem maria|nossa senhora/, 'Da Bem-Aventurada Virgem Maria I'],
    [/apostolo/, 'Dos Apóstolos I'],
    [/martir/, 'Dos Santos Mártires I'],
    [/pastor|papa|bispo|presbitero/, 'Dos Santos Pastores I'],
    [/doutor/, 'Dos Santos Doutores da Igreja I'],
    [/virgens?\b/, 'Das Santas Virgens'],
    [/./, 'Dos Santos I']
  ];

  function prefacioPorNome(indice, nome) {
    const alvo = semAcento(nome);
    return indice.prefacios.find((p) => semAcento(p.nome) === alvo) || null;
  }
  const formatarPrefacio = (p) => p ? `${p.pagina} (${p.nome.replace(/^(Do|Da|Dos|Das)\s+/, '')})` : '';

  function corDoSanto(titulo) {
    const t = semAcento(titulo);
    if (/defuntos/.test(t)) return 'roxo';
    if (/conversao|catedra|joao, apostolo e evangelista|assuncao|imaculada/.test(t)) return 'branco';
    if (/martir|apostolo|evangelista|santa cruz|paixao/.test(t)) return 'vermelho';
    return 'branco';
  }

  function grauDaLinha(linha) {
    const m = linha.match(/,\s*(Solenidade|Festa|Memória(?: facultativa)?|Comemoração)\b/i);
    if (m) return m[1].replace(/^./, (c) => c.toUpperCase());
    if (/^Comemoração/i.test(linha)) return 'Comemoração';
    return '';
  }

  /* Missal de um dia a partir do índice (sem roteiro). */
  function missalDoIndice(info, indice) {
    const dow = diaDaSemana(info.data);
    const grauLinha = grauDaLinha(info.linhaCelebracao);
    const temporalNaLinha = /semana d|domingo d/i.test(info.linhaCelebracao) && !grauLinha;
    const chave = chaveTemporal(info);
    const solenidadeTemporal = chave && !/^(TC|ADV|QUA|PAS|DEZ)-/.test(chave);
    const santo = !temporalNaLinha && !solenidadeTemporal ? indice.santos.find((s) => s.data === info.data.slice(5)) : null;
    const tempo = tempoLiturgico(`${info.linhaCelebracao} ${info.linhaSemana}`);
    const avisos = [];
    const missal = {};
    let cor = null;
    let grau = grauLinha;
    let formulario = null;

    if (santo) {
      const comum = santo.comum || {};
      missal.coleta = santo.coleta || comum.pagina;
      missal.oferendas = santo.oferendas || comum.oferendas;
      missal.comunhao = santo.depois || comum.depois;
      const prefacio = santo.prefacio ||
        prefacioPorNome(indice, PREFACIOS_DO_COMUM.find(([rx]) => rx.test(semAcento(`${comum.nome || ''} ${santo.titulo}`)))[1]);
      missal.prefacio = santo.prefacio && /pr[óo]prio/i.test(santo.prefacio.nome)
        ? `${santo.prefacio.pagina} (próprio${/festa|solenidade/i.test(grau || santo.grau || '') ? ` da ${semAcento(grau || santo.grau)}` : ''})`
        : formatarPrefacio(prefacio);
      missal.eucaristica = '537 (OE II)';
      if (santo.gloria || /festa|solenidade/i.test(grau)) missal.gloria = '442';
      if (santo.bencao) missal.bencao = String(santo.bencao);
      cor = corDoSanto(santo.titulo);
      grau = grau || santo.grau || '';
      formulario = (santo.formularios || []).map((id) => indice.formularios.find((f) => f.id === id)).find(Boolean) || null;
    } else if (chave) {
      formulario = indice.formularios.find((f) => f.chave === chave) ||
        (dow !== 0 && /^(TC)-/.test(chave) ? indice.formularios.find((f) => f.chave === chave) : null);
      if (!formulario) avisos.push(`${dataCurta(info.data)}: formulário “${chave}” não encontrado no índice do Missal.`);
      else {
        missal.coleta = formulario.coleta;
        missal.oferendas = formulario.oferendas;
        missal.comunhao = formulario.depois;
        if (formulario.bencao) missal.bencao = String(formulario.bencao);
      }
      const feriaComum = dow !== 0 && /^TC-/.test(chave);
      if (feriaComum) {
        missal.prefacio = '564 (próprio da OE V)';
        missal.eucaristica = '565 (OE V)';
        grau = 'Féria';
      } else {
        missal.eucaristica = '537 (OE II)';
        if (formulario && formulario.prefacio) missal.prefacio = formatarPrefacio(formulario.prefacio);
        if (dow === 0 || solenidadeTemporal) {
          if (!/Advento|Quaresma/.test(tempo) || solenidadeTemporal) missal.gloria = '442';
          missal.creio = 'Rezado (página omitida)';
        }
        grau = grau || (dow === 0 ? 'Domingo' : solenidadeTemporal ? 'Solenidade' : 'Féria');
      }
    } else {
      avisos.push(`${dataCurta(info.data)}: não identifiquei a celebração “${info.linhaCelebracao}” no Missal; preencha as páginas.`);
    }
    if (!cor) cor = { 'Tempo Comum': 'verde', Advento: 'roxo', Quaresma: 'roxo', 'Tempo Pascal': 'branco', 'Tempo do Natal': 'branco' }[tempo] || 'branco';
    if (/pentecostes|paixao|ramos/i.test(semAcento(info.linhaCelebracao))) cor = 'vermelho';
    if (/^(ADV-3-0|QUA-4-0)$/.test(chave || '')) cor = 'rosa';
    for (const k of Object.keys(missal)) if (missal[k] === undefined || missal[k] === null || missal[k] === '') delete missal[k];
    for (const k of ['coleta', 'oferendas', 'comunhao']) if (missal[k] !== undefined) missal[k] = String(missal[k]);
    return { missal, cor, grau, formulario, santo, chave, tempo, avisos };
  }

  /* ------------------------------ MONTAGEM -------------------------------- */
  function nomeCelebracao(linha) {
    return limpar(linha.replace(/,\s*Ano [ABC]\b.*$/, '')
      .replace(/,\s*(Solenidade|Festa|Memória(?: facultativa)?|Comemoração)\b\s*$/i, ''));
  }
  const nomeCurto = (nome) => limpar(nome.replace(/\s*\([^)]*\)/g, '').split(',')[0]);

  function antifonasDoDia(titulo, info, formulario) {
    if (!formulario || !formulario.entrada) return null;
    const items = [{ label: 'Antífona de Entrada', reference: `Missal Romano — ${formulario.entrada.ref}`, text: formulario.entrada.texto }];
    if (info.aclamacao) items.push({ label: 'Aclamação ao Evangelho', reference: info.aclamacao.referencia, text: info.aclamacao.texto });
    if ((formulario.comunhao || []).length) {
      items.push({ label: 'Antífona de Comunhão',
        options: formulario.comunhao.map((a, i) => ({ reference: `${i ? '' : 'Missal Romano — '}${a.ref}`, text: a.texto })) });
    }
    return { title: `Antífonas, Aclamação e Citações para a transmissão — ${titulo}`, items, citations: info.citacoes };
  }

  /**
   * entrada = {
   *   segunda: 'YYYY-MM-DD',
   *   leituras: { nome, doc },                // DOCX de leituras (obrigatório)
   *   roteiro: { nome, doc }, preces: { nome, doc },   // do domingo
   *   extras: [{ nome, doc?, tipo: 'roteiro'|'preces'|'documento', data, rotulo }],
   *   outros: [nomes de documentos apenas publicados],
   *   escala: planilhas (Office.readXlsx) | null,
   *   lecionario: { 'referência normalizada': 'II / 1149' },
   *   missal: índice dados/missal.json
   * }
   */
  function montarSemana(entrada) {
    const avisos = [];
    const segunda = entrada.segunda;
    if (diaDaSemana(segunda) !== 1) throw new Error('A data inicial precisa ser uma segunda-feira.');
    const domingo = somarDias(segunda, 6);
    const sabado = somarDias(segunda, 5);
    const legado = semanaLegada(segunda);
    const prefixo = `s${legado + 1}`;
    const pasta = `semanas/${segunda}`;
    const caminho = (nome) => `${pasta}/${nome}`;

    const dias = lerLeituras(entrada.leituras.doc).filter((d) => d.data >= segunda && d.data <= domingo);
    if (!dias.length) throw new Error(`O arquivo de leituras não tem dias entre ${dataCurta(segunda)} e ${dataCurta(domingo)}.`);
    dias.forEach((d) => avisos.push(...d.avisos));
    const infoDomingo = dias.find((d) => d.data === domingo);
    if (!infoDomingo) avisos.push('O arquivo de leituras não tem o domingo desta semana.');

    const escala = entrada.escala ? lerEscala(entrada.escala, segunda, domingo) : { porDia: {}, avisos: ['Planilha de escala não enviada: a escala ficará vazia.'] };
    avisos.push(...escala.avisos);

    const roteiros = {};
    const extras = { roteiro: [], preces: [] };
    const botoesPorDia = {};
    const missalRoteiroPorDia = {};
    let roteiroPrincipal = null;

    if (entrada.roteiro) {
      roteiroPrincipal = lerRoteiro(entrada.roteiro.doc);
      missalRoteiroPorDia[domingo] = missalDoRoteiro(roteiroPrincipal);
    } else avisos.push('Roteiro do domingo não enviado.');
    if (!entrada.preces) avisos.push('Preces do domingo não enviadas.');

    for (const extra of entrada.extras || []) {
      const chave = slug(extra.chave || extra.rotulo || extra.nome);
      const data = extra.data || segunda;
      const alvo = data >= sabado ? sabado : data;
      if (extra.tipo === 'documento') {
        (botoesPorDia[alvo] = botoesPorDia[alvo] || []).push({ tipo: 'link', arquivo: caminho(extra.nome), rotulo: `📄 ${extra.rotulo}` });
        continue;
      }
      let unico = chave;
      while (extras[extra.tipo].includes(unico)) unico += '2';
      extras[extra.tipo].push(unico);
      const icone = extra.tipo === 'preces' ? '🙏' : '📖';
      const nomeTipo = extra.tipo === 'preces' ? 'Preces' : 'Roteiro';
      const dados = extra.tipo === 'preces' ? lerPreces(extra.doc) : lerRoteiro(extra.doc);
      roteiros[`${extra.tipo}_${legado}_${unico}`] = {
        tipo: extra.tipo, titulo: `${nomeTipo} — ${extra.rotulo} — ${dataCurta(data)}/${data.slice(0, 4)}`,
        botao: `${icone} ${nomeTipo} — ${extra.rotulo}`, fonte: caminho(extra.nome), ...dados
      };
      (botoesPorDia[alvo] = botoesPorDia[alvo] || []).push({ tipo: extra.tipo, chave: unico, rotulo: `${nomeTipo} — ${extra.rotulo}` });
      if (extra.tipo === 'roteiro') {
        const doRoteiro = missalDoRoteiro(dados);
        const atual = missalRoteiroPorDia[data] || { missal: {}, cor: null };
        missalRoteiroPorDia[data] = { missal: { ...atual.missal, ...doRoteiro.missal }, cor: atual.cor || doRoteiro.cor };
      }
    }

    const leiturasJs = {};
    const antifonasJs = {};
    const paginas = entrada.lecionario || {};
    const linhasLeituras = (info, codigo, rotuloDia) => info.leituras.map((l) => {
      const base = l.parte.split('_')[0];
      let momento = MOMENTOS[base] || l.parte;
      if (l.parte.endsWith('_breve')) momento += ' (mais breve)';
      else if (/_2$/.test(l.parte)) momento += ' (outra opção)';
      const chave = `${prefixo}_${codigo}_${l.parte}`;
      const pagina = base === 'acl' ? '' : (paginas[chaveLecionario(l.referencia)] || '');
      leiturasJs[chave] = { momento: MOMENTOS_LONGOS[base] ? momento.replace(MOMENTOS[base], MOMENTOS_LONGOS[base]) : momento,
        referencia: l.referencia, day: rotuloDia, text: l.texto };
      return [momento, l.referencia, chave, pagina];
    });

    const cartoes = [];
    for (const info of dias) {
      const dow = diaDaSemana(info.data);
      if (dow === 0 || dow === 6) continue;
      const doIndice = missalDoIndice(info, entrada.missal);
      avisos.push(...doIndice.avisos);
      const doRoteiro = missalRoteiroPorDia[info.data] || { missal: {}, cor: null };
      const nome = nomeCelebracao(info.linhaCelebracao);
      const feria = doIndice.grau === 'Féria';
      const celebracao = feria
        ? `${info.linhaCelebracao} — Féria${doIndice.tempo ? ` do ${doIndice.tempo}` : ''}`
        : `${nome}${doIndice.grau && doIndice.grau !== 'Comemoração' ? ` — ${doIndice.grau}` : ''}${info.linhaSemana ? `; ${info.linhaSemana}` : ''}`;
      const curto = feria ? '' : nomeCurto(nome);
      const codigo = CODIGOS[dow];
      const rotuloDia = `${DIAS_LONGOS[dow]} (${dataCurta(info.data)})${curto ? ` — ${curto}` : ''}`;
      // Missa votiva indicada na planilha de escala (ex.: primeira sexta-feira).
      const votiva = ((escala.celebracoes || {})[info.data] || []).map(([, cel]) => cel).find((cel) => /missa votiva/i.test(cel));
      const cartao = {
        data: info.data, titulo: info.titulo, dia: DIAS_CURTOS[dow],
        cor: doRoteiro.cor || (votiva ? 'branco' : doIndice.cor), grau: votiva ? 'Missa Votiva' : doIndice.grau,
        celebracao: votiva ? `${votiva}; ${info.linhaCelebracao}` : celebracao,
        selecaoTitulo: `${DIAS_LONGOS[dow]} — ${dataCurta(info.data)}${curto ? ` — ${curto}` : ''}`,
        escala: escala.porDia[info.data] || [],
        leituras: linhasLeituras(info, codigo, rotuloDia),
        missal: { ...doIndice.missal, ...doRoteiro.missal }
      };
      if (info.notas.length) cartao.nota = info.notas.join(' ');
      if (/festa|solenidade|comemora/i.test(doIndice.grau)) {
        const ant = antifonasDoDia(`${nome} (${dataCurta(info.data)}/${info.data.slice(0, 4)})`, info, doIndice.formulario);
        if (ant) { antifonasJs[`antifonas_${legado + 1}_${codigo}`] = ant; cartao.antifonas = `antifonas_${legado + 1}_${codigo}`; }
      }
      if (botoesPorDia[info.data]) cartao.botoes = botoesPorDia[info.data];
      if (!cartao.escala.length) avisos.push(`${dataCurta(info.data)}: nenhuma missa encontrada na planilha de escala.`);
      cartoes.push(cartao);
    }

    // Dias sem leituras no DOCX mas com escala (ex.: missa extra) também aparecem nos avisos.
    for (const data of Object.keys(escala.porDia)) {
      if (data < sabado && !cartoes.some((c) => c.data === data)) avisos.push(`${dataCurta(data)}: há escala, mas o arquivo de leituras não tem este dia.`);
    }

    let fimDeSemana = null;
    let nomeDomingo = '';
    if (infoDomingo) {
      const doIndice = missalDoIndice(infoDomingo, entrada.missal);
      avisos.push(...doIndice.avisos);
      const doRoteiro = missalRoteiroPorDia[domingo] || { missal: {}, cor: null };
      const missalSabado = missalRoteiroPorDia[sabado];
      nomeDomingo = nomeCelebracao(infoDomingo.linhaCelebracao);
      const datas = `${Number(sabado.slice(8))} e ${Number(domingo.slice(8))}`;
      const rotuloDia = `Fim de Semana (${sabado.slice(8)} e ${dataCurta(domingo)}) — ${nomeDomingo}`;
      const missal = { ...doIndice.missal, ...doRoteiro.missal };
      if (missal.creio && !doRoteiro.missal.creio && entrada.roteiro) delete missal.creio;
      if (doRoteiro.missal.gloria === undefined && entrada.roteiro && doIndice.missal.gloria) delete missal.gloria;
      fimDeSemana = {
        titulo: `Fim de semana: ${datas} de ${MESES[Number(domingo.slice(5, 7)) - 1].replace(/^./, (c) => c.toUpperCase())} de ${domingo.slice(0, 4)}`,
        dia: 'Sábado', cor: doRoteiro.cor || doIndice.cor,
        grau: /solenidade/i.test(infoDomingo.linhaCelebracao) ? 'Solenidade' : (doIndice.grau === 'Festa' ? 'Festa' : 'Domingo'),
        celebracao: `${infoDomingo.linhaCelebracao} — sábado vespertino e domingo`,
        selecaoTitulo: `Fim de semana — ${sabado.slice(8)} e ${dataCurta(domingo)} — ${nomeDomingo}`,
        dias: [sabado, domingo].map((data) => ({ data, dia: DIAS_CURTOS[diaDaSemana(data)], escala: escala.porDia[data] || [] })),
        leituras: linhasLeituras(infoDomingo, 'dom', rotuloDia),
        missal
      };
      if (missalSabado) avisos.push('Há roteiro extra no sábado: as páginas do Missal do fim de semana seguem o roteiro do domingo.');
      if (infoDomingo.notas.length) fimDeSemana.nota = infoDomingo.notas.join(' ');
      const ant = antifonasDoDia(`${nomeDomingo} (${sabado.slice(8)} e ${dataCurta(domingo)}/${domingo.slice(0, 4)})`, infoDomingo, doIndice.formulario);
      if (ant) { antifonasJs[`antifonas_${legado + 1}`] = ant; fimDeSemana.antifonas = `antifonas_${legado + 1}`; }
      else avisos.push('Antífonas do domingo não encontradas no índice do Missal.');
      if (botoesPorDia[sabado]) fimDeSemana.botoes = botoesPorDia[sabado];
    }

    if (roteiroPrincipal) {
      roteiros[`roteiro_${legado}`] = { tipo: 'roteiro', titulo: `Roteiro — ${nomeDomingo} — ${Number(sabado.slice(8))} e ${dataCurta(domingo)}/${domingo.slice(0, 4)}`,
        fonte: caminho(entrada.roteiro.nome), ...roteiroPrincipal };
    }
    if (entrada.preces) {
      roteiros[`preces_${legado}`] = { tipo: 'preces', titulo: `Preces — ${nomeDomingo}`, fonte: caminho(entrada.preces.nome),
        ...lerPreces(entrada.preces.doc) };
    }

    const destaques = cartoes.filter((c) => /festa|solenidade|comemora/i.test(c.grau)).map((c) => nomeCurto(nomeCelebracao(c.celebracao.split(' — ')[0])));
    const periodo = periodoTexto(segunda, domingo);
    const documentos = [entrada.leituras.nome, entrada.roteiro && entrada.roteiro.nome, entrada.preces && entrada.preces.nome,
      ...(entrada.extras || []).map((e) => e.nome), ...(entrada.outros || [])].filter(Boolean);

    const semana = {
      formato: 1,
      legacyWeek: legado,
      id: segunda,
      periodo,
      shortTitle: `${periodo} — ${nomeDomingo || 'Programação'}`,
      fullTitle: `Semana de ${periodo} de ${domingo.slice(0, 4)} — ${[...destaques, nomeDomingo].filter(Boolean).join(' e ')}`,
      roteiroLabel: `📖 Roteiro — ${nomeDomingo || 'Domingo'}`,
      roteiroExtras: extras.roteiro,
      precesExtras: extras.preces,
      nota: `Leituras conforme “${entrada.leituras.nome}”; escala conforme a planilha de escala da paróquia; páginas do Missal conforme os roteiros e o índice do Missal Romano.`,
      dias: cartoes,
      fimDeSemana,
      documentos: documentos.map(caminho),
      leituras: leiturasJs,
      antifonas: antifonasJs,
      roteiros
    };
    finalizarSemana(semana);
    return { semana, avisos: [...new Set(avisos)] };
  }

  /* Recalcula os títulos das leituras a partir das páginas (depois de editar). */
  function finalizarSemana(semana) {
    const todos = semana.dias.concat(semana.fimDeSemana ? [semana.fimDeSemana] : []);
    for (const dia of todos) {
      for (const [, referencia, chave, pagina] of dia.leituras) {
        const leitura = semana.leituras[chave];
        if (!leitura) continue;
        const [vol, pag] = String(pagina || '').split('/').map((p) => p.trim());
        leitura.referencia = referencia;
        leitura.title = `${leitura.momento} — ${referencia}${pag ? ` (Lecionário ${vol}, pág. ${pag})` : ''}`;
      }
    }
    return semana;
  }

  /* Páginas do lecionário informadas na semana → cadastro atualizado. */
  function atualizarLecionario(lecionario, semana) {
    const novo = { ...lecionario };
    const todos = semana.dias.concat(semana.fimDeSemana ? [semana.fimDeSemana] : []);
    for (const dia of todos) {
      for (const [, referencia, , pagina] of dia.leituras) if (referencia && pagina) novo[chaveLecionario(referencia)] = pagina;
    }
    return Object.fromEntries(Object.entries(novo).sort(([a], [b]) => a.localeCompare(b, 'pt-BR')));
  }

  return {
    lerLeituras, lerRoteiro, lerPreces, lerEscala, missalDoRoteiro, missalDoIndice, montarSemana, finalizarSemana,
    atualizarLecionario, chaveLecionario, semanaLegada, slug, somarDias, diaDaSemana, dataCurta, tituloData
  };
}));
