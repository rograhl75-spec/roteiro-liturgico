/* ==========================================================================
   ENVIAR COMO PDF (WhatsApp, e-mail…)
   Gera o PDF no próprio aparelho e abre a janela de compartilhamento do
   celular/computador. Onde o navegador não permite enviar arquivos, o PDF é
   baixado. Usa vendor/pdf-lib.min.js (MIT), carregado só quando necessário.
   ========================================================================== */
(() => {
  'use strict';

  const A4 = [595.28, 841.89];
  const MARGEM = 48;
  const RODAPE = 30;
  const AZUL = [0.102, 0.212, 0.365];
  const DOURADO = [0.549, 0.392, 0.078];
  const CINZA = [0.39, 0.45, 0.55];
  const PRETO = [0.1, 0.1, 0.12];
  const CORES = { verde: 'Verde', branco: 'Branca', vermelho: 'Vermelha', roxo: 'Roxa', rosa: 'Rósea' };
  const ROTULOS_MISSAL = [
    ['ritos', 'Ritos Iniciais'], ['gloria', 'Glória'], ['coleta', 'Coleta'], ['creio', 'Creio'],
    ['oferendas', 'Sobre as Oferendas'], ['prefacio', 'Prefácio'], ['eucaristica', 'Oração Eucarística'],
    ['rito_comunhao', 'Rito da Comunhão'], ['comunhao', 'Depois da Comunhão'], ['bencao', 'Bênção Solene']
  ];

  /* ------------------------------ biblioteca ------------------------------ */
  let carregando = null;
  function carregarPdfLib() {
    if (window.PDFLib) return Promise.resolve();
    if (!carregando) {
      carregando = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'vendor/pdf-lib.min.js';
        script.onload = resolve;
        script.onerror = () => { carregando = null; reject(new Error('Não foi possível carregar o gerador de PDF. Verifique a conexão.')); };
        document.head.appendChild(script);
      });
    }
    return carregando;
  }

  /* ------------------------------ montagem -------------------------------- */
  async function gerarPdf({ titulo, subtitulo, blocos, tamanho }) {
    const PAG = tamanho === 'A5' ? [419.53, 595.28] : A4;
    const { PDFDocument, StandardFonts, rgb } = window.PDFLib;
    const pdf = await PDFDocument.create();
    pdf.setTitle(titulo);
    pdf.setAuthor('Paróquia Nossa Senhora Auxiliadora');
    const fontes = {
      normal: await pdf.embedFont(StandardFonts.Helvetica),
      negrito: await pdf.embedFont(StandardFonts.HelveticaBold),
      italico: await pdf.embedFont(StandardFonts.HelveticaOblique),
      serif: await pdf.embedFont(StandardFonts.TimesRoman),
      serifNegrito: await pdf.embedFont(StandardFonts.TimesRomanBold),
      serifItalico: await pdf.embedFont(StandardFonts.TimesRomanItalic)
    };
    const VERMELHO = [0.72, 0.1, 0.1];
    const suportado = new Map();
    // Remove caracteres que a fonte padrão do PDF não tem (ex.: emojis).
    const limpar = (texto) => [...String(texto ?? '').replace(/\t/g, ' ').replace(/[   ]/g, ' ')]
      .filter((c) => {
        if (c === '\n') return true;
        if (!suportado.has(c)) {
          try { fontes.normal.widthOfTextAtSize(c, 10); suportado.set(c, true); } catch { suportado.set(c, false); }
        }
        return suportado.get(c);
      }).join('').replace(/ {2,}/g, ' ');

    const largura = PAG[0] - 2 * MARGEM;
    let pagina;
    let y;
    const novaPagina = () => { pagina = pdf.addPage(PAG); y = PAG[1] - MARGEM; };
    const garantir = (altura) => { if (y - altura < MARGEM + RODAPE) novaPagina(); };

    function quebrar(texto, fonte, tam, max) {
      const linhas = [];
      for (const paragrafo of limpar(texto).split('\n')) {
        const palavras = paragrafo.split(' ');
        let atual = '';
        for (const palavra of palavras) {
          const teste = atual ? `${atual} ${palavra}` : palavra;
          if (fonte.widthOfTextAtSize(teste, tam) <= max || !atual) atual = teste;
          else { linhas.push(atual); atual = palavra; }
        }
        linhas.push(atual);
      }
      return linhas;
    }

    function escrever(texto, { fonte = 'normal', tam = 11, cor = PRETO, recuo = 0, entrelinha = 1.35, antes = 0, depois = 0 } = {}) {
      if (!String(texto ?? '').trim()) return;
      y -= antes;
      for (const linha of quebrar(texto, fontes[fonte], tam, largura - recuo)) {
        garantir(tam * entrelinha);
        y -= tam;
        pagina.drawText(linha, { x: MARGEM + recuo, y, size: tam, font: fontes[fonte], color: rgb(...cor) });
        y -= tam * (entrelinha - 1);
      }
      y -= depois;
    }

    /* Símbolo de música (♫) desenhado: as fontes padrão do PDF não têm o caractere. */
    function notaMusical(x, base, tam) {
      const cor = rgb(0.09, 0.4, 0.2);
      const k = tam / 10.5;
      pagina.drawRectangle({ x: x - 1.5 * k, y: base - 2.5 * k, width: 12.5 * k, height: 12.5 * k, borderColor: cor, borderWidth: 0.7, opacity: 0 });
      pagina.drawEllipse({ x: x + 2 * k, y: base + 0.8 * k, xScale: 1.9 * k, yScale: 1.4 * k, color: cor });
      pagina.drawEllipse({ x: x + 7.6 * k, y: base + 1.8 * k, xScale: 1.9 * k, yScale: 1.4 * k, color: cor });
      pagina.drawLine({ start: { x: x + 3.8 * k, y: base + 0.8 * k }, end: { x: x + 3.8 * k, y: base + 8 * k }, thickness: 0.8 * k, color: cor });
      pagina.drawLine({ start: { x: x + 9.4 * k, y: base + 1.8 * k }, end: { x: x + 9.4 * k, y: base + 9 * k }, thickness: 0.8 * k, color: cor });
      pagina.drawLine({ start: { x: x + 3.8 * k, y: base + 7.6 * k }, end: { x: x + 9.4 * k, y: base + 8.6 * k }, thickness: 1.6 * k, color: cor });
    }

    function linhaDupla(papel, texto, { colunaPapel = 120, tam = 10.5, musica = false } = {}) {
      const esquerda = quebrar(papel, fontes.negrito, tam - 0.5, colunaPapel - 8);
      const direita = quebrar(texto, fontes.normal, tam, largura - colunaPapel - (musica ? 18 : 0));
      const total = Math.max(esquerda.length, direita.length);
      const passo = tam * 1.35;
      garantir(Math.min(total, 3) * passo);
      for (let i = 0; i < total; i++) {
        garantir(passo);
        const base = y - tam;
        if (esquerda[i]) pagina.drawText(esquerda[i], { x: MARGEM, y: base, size: tam - 0.5, font: fontes.negrito, color: rgb(...AZUL) });
        if (direita[i]) pagina.drawText(direita[i], { x: MARGEM + colunaPapel, y: base, size: tam, font: fontes.normal, color: rgb(...PRETO) });
        if (musica && i === direita.length - 1) notaMusical(MARGEM + colunaPapel + fontes.normal.widthOfTextAtSize(direita[i], tam) + 6, base, tam);
        y -= passo;
      }
      y -= 4;
    }

    /* Linha com trechos de fontes/cores diferentes, quebrada por palavras (recuo pendente). */
    function escreverRico(trechos, { tam = 12.5, entrelinha = 1.32, recuo = 0, pendente = 0, antes = 0, depois = 0 } = {}) {
      const palavras = [];
      for (const tr of trechos) {
        const txt = limpar(tr.texto);
        if (!txt) continue;
        txt.split(/(\s+)/).forEach((p) => { if (p) palavras.push({ ...tr, texto: p }); });
      }
      if (!palavras.length) return;
      y -= antes;
      const linhas = [[]];
      let larg = 0;
      const max = (n) => largura - recuo - (n ? pendente : 0);
      for (const p of palavras) {
        const t = p.tam || tam;
        const w = fontes[p.fonte || 'serif'].widthOfTextAtSize(p.texto, t);
        if (/^\s+$/.test(p.texto) && !linhas[linhas.length - 1].length) continue;
        if (larg + w > max(linhas.length - 1) && linhas[linhas.length - 1].length && !/^\s+$/.test(p.texto)) { linhas.push([]); larg = 0; }
        if (/^\s+$/.test(p.texto) && !linhas[linhas.length - 1].length) continue;
        linhas[linhas.length - 1].push({ ...p, w }); larg += w;
      }
      linhas.forEach((ln, n) => {
        garantir(tam * entrelinha);
        y -= tam;
        let x = MARGEM + recuo + (n ? pendente : 0);
        for (const p of ln) {
          const t = p.tam || tam;
          pagina.drawText(p.texto, { x, y: y + (p.sobe || 0), size: t, font: fontes[p.fonte || 'serif'], color: rgb(...(p.cor || PRETO)) });
          x += p.w;
        }
        y -= tam * (entrelinha - 1);
      });
      y -= depois;
    }

    function leituraLecionario(leitura) {
      const a = window.Lecionario.analisar(leitura);
      const tam = 12.5;
      garantir(70);
      y -= 6;
      y -= tam;
      pagina.drawText(limpar(a.rubrica), { x: MARGEM, y, size: 11, font: fontes.serifNegrito, color: rgb(...VERMELHO) });
      if (a.referencia) {
        const ref = limpar(a.referencia);
        const w = fontes.serif.widthOfTextAtSize(ref, 11);
        pagina.drawText(ref, { x: PAG[0] - MARGEM - w, y, size: 11, font: fontes.serif, color: rgb(...VERMELHO) });
      }
      y -= 3;
      pagina.drawLine({ start: { x: MARGEM, y }, end: { x: PAG[0] - MARGEM, y }, thickness: 0.6, color: rgb(...VERMELHO) });
      y -= 6;
      // frase-título do Lecionário omitida (os leitores a liam junto com a leitura)
      if (a.abertura) escreverRico([...(a.evangelho ? [{ texto: '† ', fonte: 'serifNegrito', cor: VERMELHO }] : []), { texto: a.abertura, fonte: 'serifNegrito' }], { tam, depois: 4 });
      for (const b of a.blocos) {
        if (b.tipo === 'refrao') String(b.texto).split('\n').forEach((t, k, arr) => escreverRico([...(k ? [] : [{ texto: 'R. ', fonte: 'serifNegrito', cor: VERMELHO }]), { texto: t, fonte: 'serifNegrito' }], { tam, recuo: k ? 16 : 0, antes: k ? 0 : 2, depois: k === arr.length - 1 ? 6 : 1 }));
        else if (b.tipo === 'versiculo') b.texto.split('\n').forEach((t, k) => escreverRico([...(k ? [] : [{ texto: 'V. ', fonte: 'serifNegrito', cor: VERMELHO }]), { texto: t }], { tam, recuo: k ? 16 : 0, depois: 1 }));
        else if (b.tipo === 'ou') escreverRico([{ texto: b.texto, fonte: 'serifItalico', cor: VERMELHO }], { tam, depois: 2 });
        else escreverRico([...(b.verso ? [{ texto: `${b.verso} `, fonte: 'serifNegrito', cor: VERMELHO, tam: 8, sobe: 4 }] : []), { texto: b.texto }],
          { tam, recuo: b.recuo ? 18 : 0, pendente: 16, depois: 1 });
      }
      if (a.fecho) escreverRico([{ texto: a.fecho, fonte: 'serifNegrito' }], { tam, antes: 6, depois: 4 });
    }

    /* Cartão de rito: rubrica vermelha em itálico; S./R. em vermelho; corpo 15 (papel duro A5). */
    function itemCartao(it) {
      const tam = 14.5;
      const comCruz = (texto, base) => String(texto).split('✠').flatMap((p, j) => (j ? [{ texto: '† ', fonte: 'serifNegrito', cor: VERMELHO }] : []).concat(p ? [{ ...base, texto: p }] : []));
      const linhas = String(it.texto).split('\n');
      // estimativa da altura para não separar o bloco entre páginas
      const est = linhas.reduce((n, l) => n + Math.max(1, Math.ceil(fontes.serif.widthOfTextAtSize(limpar(l), tam) / largura)), 0) * tam * 1.3 + 8;
      garantir(Math.min(est + (it.tipo === 'rubrica' || it.oremos ? 60 : 0), PAG[1] - 2 * MARGEM - RODAPE - 10));
      if (it.tipo === 'rubrica') {
        linhas.forEach((l, k) => escreverRico([{ texto: l, fonte: 'serifItalico', cor: VERMELHO }], { tam: 12.5, depois: k === linhas.length - 1 ? 7 : 1 }));
        if (it.musica) notaMusical(PAG[0] - MARGEM - 10, y + 7 + 12.5 * 0.32, 10);
        return;
      }
      const base = { fonte: it.resposta || it.oremos ? 'serifNegrito' : 'serif' };
      const pref = it.prefixo ? [{ texto: (it.prefixo === '℟.' ? 'R.' : it.prefixo) + ' ', fonte: 'serifNegrito', cor: VERMELHO }] : [];
      linhas.forEach((l, k) => escreverRico((k ? [] : pref).concat(comCruz(l, base)), { tam, entrelinha: 1.3, depois: k === linhas.length - 1 ? (it.oremos ? 2 : 8) : 1 }));
    }

    function separador() {
      garantir(12);
      y -= 6;
      pagina.drawLine({ start: { x: MARGEM, y }, end: { x: PAG[0] - MARGEM, y }, thickness: 0.5, color: rgb(0.8, 0.83, 0.88) });
      y -= 8;
    }

    novaPagina();
    escrever('Paróquia Nossa Senhora Auxiliadora — Londrina-PR', { tam: 9, cor: CINZA });
    if (tamanho === 'A5') escrever(titulo.toUpperCase(), { fonte: 'serifNegrito', tam: 15, cor: VERMELHO, antes: 4, depois: 2 });
    else escrever(titulo, { fonte: 'negrito', tam: 15, cor: AZUL, antes: 4, depois: 2 });
    if (subtitulo) escrever(subtitulo, { fonte: 'italico', tam: 10, cor: CINZA });
    separador();

    for (const bloco of blocos) {
      switch (bloco.t) {
        case 'quebra': novaPagina(); break;
        case 'separador': separador(); break;
        case 'secao':
          garantir(60);
          escrever(bloco.texto, { fonte: 'negrito', tam: 12.5, cor: bloco.cor || AZUL, antes: 8, depois: 4 });
          break;
        case 'linha': linhaDupla(bloco.papel, bloco.texto, bloco); break;
        case 'lecionario': leituraLecionario(bloco.leitura); break;
        case 'cartao': itemCartao(bloco.item); break;
        case 'leitura': {
          // Números de versículo (linhas só com o número) entram no começo da linha seguinte.
          const linhas = [];
          let numero = '';
          for (const linha of String(bloco.texto || '').split('\n')) {
            if (/^\d{1,3}[a-z]?$/.test(linha.trim())) { numero = linha.trim(); continue; }
            linhas.push(numero ? `${numero} ${linha}` : linha);
            numero = '';
          }
          escrever(linhas.join('\n'), { tam: 12, entrelinha: 1.45, depois: 6 });
          break;
        }
        default:
          escrever(bloco.texto, {
            fonte: bloco.negrito ? 'negrito' : bloco.italico ? 'italico' : 'normal',
            tam: bloco.tam || 11, cor: bloco.cor || PRETO, recuo: bloco.recuo || 0,
            antes: bloco.antes || 0, depois: bloco.depois ?? 4
          });
      }
    }

    const paginas = pdf.getPages();
    paginas.forEach((p, i) => {
      const texto = limpar(`${titulo} — página ${i + 1} de ${paginas.length}`);
      const tam = 8;
      const w = fontes.normal.widthOfTextAtSize(texto, tam);
      p.drawText(texto.length > 110 ? `Página ${i + 1} de ${paginas.length}` : texto,
        { x: texto.length > 110 ? PAG[0] / 2 - 25 : (PAG[0] - w) / 2, y: MARGEM / 2, size: tam, font: fontes.normal, color: rgb(...CINZA) });
    });
    return pdf.save();
  }

  /* --------------------------- envio do arquivo --------------------------- */
  const nomeSeguro = (titulo) => `${titulo.replace(/[\\/:*?"<>|]+/g, '-').replace(/\s+/g, ' ').trim().slice(0, 120)}.pdf`;

  function baixar(arquivo) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(arquivo);
    link.download = arquivo.name;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => { URL.revokeObjectURL(link.href); link.remove(); }, 2000);
  }

  function aviso(mensagem, acao) {
    document.getElementById('aviso-envio')?.remove();
    const caixa = document.createElement('div');
    caixa.id = 'aviso-envio';
    caixa.className = 'aviso-envio';
    caixa.setAttribute('role', 'status');
    const texto = document.createElement('p');
    texto.textContent = mensagem;
    caixa.appendChild(texto);
    const botoes = document.createElement('div');
    if (acao) {
      const botao = document.createElement('button');
      botao.type = 'button';
      botao.className = 'action-btn';
      botao.textContent = acao.rotulo;
      botao.addEventListener('click', () => { caixa.remove(); acao.executar(); });
      botoes.appendChild(botao);
    }
    const fechar = document.createElement('button');
    fechar.type = 'button';
    fechar.className = 'action-btn secondary';
    fechar.textContent = acao ? 'Cancelar' : 'OK';
    fechar.addEventListener('click', () => caixa.remove());
    botoes.appendChild(fechar);
    caixa.appendChild(botoes);
    document.body.appendChild(caixa);
    if (!acao) setTimeout(() => caixa.remove(), 8000);
  }

  async function compartilhar(arquivo, titulo) {
    try {
      await navigator.share({ files: [arquivo], title: titulo });
    } catch (erro) {
      if (erro.name === 'AbortError') return;
      if (erro.name === 'NotAllowedError') {
        // Alguns celulares exigem um novo toque depois de gerar o arquivo.
        aviso('PDF pronto.', { rotulo: '📤 Enviar agora', executar: () => compartilhar(arquivo, titulo) });
        return;
      }
      baixar(arquivo);
      aviso('Não foi possível abrir o envio; o PDF foi baixado. Anexe-o no WhatsApp ou no e-mail.');
    }
  }

  async function enviar(montar, botao) {
    const rotulo = botao ? botao.textContent : '';
    try {
      if (botao) { botao.disabled = true; botao.textContent = '⏳ Gerando…'; }
      const documento = montar();
      if (!documento) return;
      let bytes;
      if (documento.arquivoPdf) {
        // O próprio documento (PDF gerado do .docx): envia exatamente o arquivo.
        const resposta = await fetch(`./${documento.arquivoPdf.split('/').map(encodeURIComponent).join('/')}`);
        if (!resposta.ok) throw new Error('arquivo indisponível');
        bytes = new Uint8Array(await resposta.arrayBuffer());
      } else {
        await carregarPdfLib();
        bytes = await gerarPdf(documento);
      }
      const arquivo = new File([bytes], nomeSeguro(documento.titulo), { type: 'application/pdf' });
      if (botao && botao.dataset.modo === 'baixar') {
        baixar(arquivo);
        aviso('PDF salvo na pasta Downloads. Arraste-o para a conversa do WhatsApp ou anexe-o no e-mail.');
      } else if (navigator.canShare && navigator.canShare({ files: [arquivo] })) await compartilhar(arquivo, documento.titulo);
      else {
        baixar(arquivo);
        aviso('Este navegador não envia arquivos direto: o PDF foi baixado. Anexe-o no WhatsApp ou no e-mail.');
      }
    } catch (erro) {
      console.error(erro);
      aviso(`Não foi possível gerar o PDF: ${erro.message}`);
    } finally {
      if (botao) { botao.disabled = false; botao.textContent = rotulo; }
    }
  }

  /* ------------------------------ conteúdos ------------------------------- */
  function documentoRoteiro(doc) {
    if (doc.pdf) return { titulo: doc.titulo, arquivoPdf: doc.pdf };
    if (doc.cartao && window.Cartao) {
      return { titulo: doc.titulo, tamanho: 'A5', blocos: window.Cartao.itens(doc).map((item) => ({ t: 'cartao', item })) };
    }
    const blocos = [];
    (doc.secoes || []).forEach((secao) => {
      blocos.push({ t: 'secao', texto: secao.titulo });
      secao.linhas.forEach(([papel, texto]) => blocos.push({ t: 'linha', papel, texto, musica: !!(window.Musica && window.Musica.cantado(papel, texto)) }));
    });
    (doc.formularios || []).forEach((form, i) => {
      if (i) blocos.push({ t: 'quebra' });
      blocos.push({ t: 'secao', texto: form.titulo });
      form.linhas.forEach(([papel, texto]) => blocos.push({ t: 'linha', papel, texto, musica: !!(window.Musica && window.Musica.cantado(papel, texto)) }));
    });
    return { titulo: doc.titulo, blocos };
  }

  function documentoLeituras(chaves, titulo) {
    const leituras = window.readingsData || {};
    const antifonas = window.antifonasData || {};
    const blocos = [];
    chaves.forEach((chave, i) => {
      if (i) blocos.push({ t: 'separador' });
      if (chave.startsWith('antifonas_')) {
        const ant = antifonas[chave];
        if (!ant) return;
        blocos.push({ t: 'secao', texto: ant.title });
        for (const item of ant.items || []) {
          blocos.push({ t: 'p', texto: item.label, negrito: true, cor: AZUL, depois: 1, antes: 4 });
          (item.options || [item]).forEach((opcao, j) => {
            blocos.push({ t: 'p', texto: `${j ? 'Ou: ' : ''}${opcao.reference || ''}`, italico: true, tam: 9.5, cor: CINZA, depois: 1 });
            blocos.push({ t: 'p', texto: opcao.text, depois: 4 });
          });
        }
        if ((ant.citations || []).length) {
          blocos.push({ t: 'secao', texto: 'Citações para a transmissão' });
          for (const c of ant.citations) {
            blocos.push({ t: 'p', texto: c.label.toUpperCase(), negrito: true, tam: 9.5, cor: AZUL, depois: 1 });
            blocos.push({ t: 'p', texto: c.text, depois: 5 });
          }
        }
        return;
      }
      const leitura = leituras[chave];
      if (!leitura) return;
      blocos.push({ t: 'p', texto: leitura.day.toUpperCase(), negrito: true, tam: 9, cor: AZUL, depois: 2 });
      if (window.Lecionario) blocos.push({ t: 'lecionario', leitura });
      else { blocos.push({ t: 'secao', texto: leitura.title, cor: DOURADO }); blocos.push({ t: 'leitura', texto: leitura.text }); }
    });
    return { titulo, blocos };
  }

  function documentoProgramacao(semana) {
    const blocos = [];
    if (semana.nota) blocos.push({ t: 'p', texto: semana.nota, italico: true, tam: 9, cor: CINZA, depois: 6 });
    const dias = semana.dias.concat(semana.fimDeSemana ? [semana.fimDeSemana] : []);
    dias.forEach((dia, i) => {
      if (i) blocos.push({ t: 'separador' });
      blocos.push({ t: 'secao', texto: dia.titulo });
      blocos.push({ t: 'p', texto: dia.celebracao, italico: true, depois: 2 });
      blocos.push({ t: 'p', texto: `Cor litúrgica: ${CORES[dia.cor] || dia.cor || '—'}${dia.grau ? ` — ${dia.grau}` : ''}`, tam: 9.5, cor: CINZA, depois: 4 });
      const escala = (dia.dias || [dia]).flatMap((d) => d.escala.map((l) => [d, l]));
      if (escala.length) {
        blocos.push({ t: 'p', texto: 'Escala', negrito: true, cor: AZUL, depois: 2 });
        escala.forEach(([d, [hora, local, resp, , desc]]) => blocos.push({
          t: 'linha', papel: `${dia.dias ? `${d.dia} ` : ''}${hora}`, texto: `${local} — ${resp}${desc ? ` — ${desc}` : ''}`, colunaPapel: 90
        }));
      }
      if (dia.leituras.length) {
        blocos.push({ t: 'p', texto: 'Liturgia da Palavra', negrito: true, cor: AZUL, antes: 2, depois: 2 });
        dia.leituras.forEach(([momento, ref, , pagina]) => blocos.push({
          t: 'linha', papel: momento, texto: `${ref}${pagina ? `  (Lecionário ${pagina})` : ''}`
        }));
      }
      const missal = { ritos: '430', rito_comunhao: '569', ...dia.missal };
      const partes = ROTULOS_MISSAL.filter(([k]) => missal[k]).map(([k, rotulo]) => `${rotulo}: ${missal[k]}`);
      blocos.push({ t: 'p', texto: 'Missal Romano (páginas)', negrito: true, cor: AZUL, antes: 2, depois: 2 });
      blocos.push({ t: 'p', texto: partes.join(' · '), tam: 10, depois: 4 });
      if (dia.nota) blocos.push({ t: 'p', texto: dia.nota, italico: true, tam: 9.5, cor: CINZA });
    });
    return { titulo: `Programação Litúrgica — ${semana.shortTitle}`, subtitulo: semana.fullTitle, blocos };
  }

  window.Compartilhar = {
    enviar,
    roteiro: (chave, botao) => enviar(() => {
      const doc = (window.roteirosData || {})[chave];
      return doc && documentoRoteiro(doc);
    }, botao),
    leituras: (chaves, titulo, botao) => enviar(() => documentoLeituras(chaves, titulo), botao),
    programacao: (semanaId, botao) => enviar(() => {
      const semana = (window.semanasData || []).find((s) => s.id === semanaId);
      return semana && documentoProgramacao(semana);
    }, botao),
    _documentoLeituras: documentoLeituras,
    _gerarPdf: gerarPdf
  };

  // Deixa o gerador pronto (e guardado para uso sem internet) logo após abrir o site.
  window.addEventListener('load', () => setTimeout(() => carregarPdfLib().catch(() => {}), 2500));
})();
