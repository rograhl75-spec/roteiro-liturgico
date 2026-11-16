/* ==========================================================================
   LEITURAS NO FORMATO DO LECIONÁRIO
   Converte o texto de uma leitura (Liturgia Diária – CNBB) em uma estrutura
   igual à dos livros litúrgicos: rubrica e referência em vermelho (sem a frase-título, que não se lê),
   abertura («Leitura do…» / ✠ «Proclamação do Evangelho…»), linhas de sentido
   com o número do versículo em vermelho, refrão do salmo (℟) e conclusão.
   Usado pela tela/impressão (app.js) e pelo PDF (compartilhar.js).
   ========================================================================== */
(function (root) {
  'use strict';

  const RX_ABERTURA = /^(Leitura|Proclama[çc][ãa]o|In[íi]cio|Princ[íi]pio)\b/;
  const RX_FECHO = /^Palavra d[ao] (Senhor|Salva[çc][ãa]o)\.?$/i;
  const RX_VERSO = /^\d{1,3}[a-z]?$/;
  const RX_REF = /^(cf\.\s*)?(\d\s?)?[A-ZÁÉÍÓÚ][a-zà-ú]{0,3}\s?\d+[,.]/i;

  function rubricaDe(primeira, momento) {
    const x = String(primeira || momento || '').trim();
    const breve = /mais breve/i.test(x) ? ' (mais breve)' : /mais longa/i.test(x) ? ' (mais longa)' : '';
    if (/^PRIMEIRA LEITURA/i.test(x) || /^1/.test(momento || '')) return 'PRIMEIRA LEITURA' + breve;
    if (/^SEGUNDA LEITURA/i.test(x) || /^2/.test(momento || '')) return 'SEGUNDA LEITURA' + breve;
    if (/^Salmo/i.test(x)) return 'SALMO RESPONSORIAL';
    if (/^Aclama/i.test(x)) return 'ACLAMAÇÃO AO EVANGELHO';
    if (/^EVANGELHO/i.test(x)) return 'EVANGELHO' + breve;
    return x.toUpperCase();
  }

  /* Devolve { rubrica, referencia, frase, abertura, evangelho, blocos:[{tipo, ...}], fecho } */
  function analisar(leitura) {
    const linhas = String(leitura.text || '').split('\n').map((l) => l.replace(/\s+$/, ''));
    const rubrica = rubricaDe(linhas[0], leitura.momento);
    const tipo = /SALMO/.test(rubrica) ? 'salmo' : /ACLAMA/.test(rubrica) ? 'aclamacao' : /EVANGELHO/.test(rubrica) ? 'evangelho' : 'leitura';
    let i = 1;
    let abertura = '';
    if (tipo === 'leitura' || tipo === 'evangelho') {
      while (i < linhas.length && i < 6 && !RX_ABERTURA.test(linhas[i])) i++;
      if (i < linhas.length && RX_ABERTURA.test(linhas[i])) {
        abertura = linhas[i].replace(/\s+\d+,[\d.,;\-–a-z\s]+$/i, '').trim();
        i++;
      } else i = 1;
    } else if (linhas[i] && RX_REF.test(linhas[i].trim()) && !/^R\./.test(linhas[i])) {
      i++; // referência repetida na 2ª linha do salmo/aclamação
    }
    const blocos = [];
    let verso = '';
    let recuar = false;
    let fecho = '';
    for (; i < linhas.length; i++) {
      let l = linhas[i].trim();
      if (!l) continue;
      if (RX_VERSO.test(l)) { verso = l; const u = blocos[blocos.length - 1]; if (u && u.tipo === 'refrao') u.fechado = true; continue; }
      if (/^[a-z]$/.test(l)) continue; // parte de versículo (ex.: 9b)
      if (RX_FECHO.test(l)) { fecho = l.endsWith('.') ? l : `${l}.`; continue; }
      if (/^R\.\s*/.test(l)) {
        const t = l.replace(/^R\.\s*/, '');
        blocos.push({ tipo: 'refrao', texto: t });
        recuar = false;
        continue;
      }
      if (/^V\.\s*/.test(l)) {
        blocos.push({ tipo: 'versiculo', texto: l.replace(/^V\.\s*/, '') });
        continue;
      }
      if (/^Ou:?\s/i.test(l) && tipo === 'salmo') { blocos.push({ tipo: 'ou', texto: l }); continue; }
      let refraoNoFim = false;
      if (tipo === 'salmo' && /\sR\.$/.test(l)) { l = l.replace(/\s*R\.$/, ''); refraoNoFim = true; }
      const ultimo = blocos[blocos.length - 1];
      const continua = ultimo && (ultimo.tipo === 'versiculo' || (ultimo.tipo === 'refrao' && ultimo.texto && !ultimo.fechado)) && !verso;
      if (continua) ultimo.texto += `\n${l}`;
      else blocos.push({ tipo: 'linha', texto: l, verso, recuo: tipo === 'salmo' && recuar });
      if (tipo === 'salmo') recuar = /\*$/.test(l);
      verso = '';
      if (refraoNoFim) { blocos.push({ tipo: 'refrao', texto: '' }); recuar = false; }
    }
    return { rubrica, referencia: leitura.referencia || '', frase: leitura.frase || '', abertura, evangelho: tipo === 'evangelho', tipo, blocos, fecho };
  }

  /* ------------------------------ HTML (tela) ------------------------------ */
  function el(tag, classe, texto) {
    const e = document.createElement(tag);
    if (classe) e.className = classe;
    if (texto !== undefined) e.textContent = texto;
    return e;
  }

  function html(leitura) {
    const a = analisar(leitura);
    const box = el('div', `lec lec-${a.tipo}`);
    const cab = el('div', 'lec-cab');
    cab.appendChild(el('span', 'lec-rub', a.rubrica));
    if (a.referencia) cab.appendChild(el('span', 'lec-ref', a.referencia));
    box.appendChild(cab);
    // A frase-título do Lecionário não é mostrada: os leitores a liam junto com a leitura (decisão da paróquia).
    if (a.abertura) {
      const p = el('p', 'lec-abertura');
      if (a.evangelho) p.appendChild(el('span', 'lec-cruz', '✠ '));
      p.appendChild(document.createTextNode(a.abertura));
      box.appendChild(p);
    }
    let corpo = el('p', 'lec-corpo');
    const fechar = () => { if (corpo.childNodes.length) box.appendChild(corpo); corpo = el('p', 'lec-corpo'); };
    for (const b of a.blocos) {
      if (b.tipo === 'refrao') {
        fechar();
        const p = el('p', 'lec-refrao');
        p.appendChild(el('span', 'lec-r', '℟. '));
        if (b.texto) {
          const bb = el('b', '');
          b.texto.split('\n').forEach((t, k) => { if (k) bb.appendChild(document.createElement('br')); bb.appendChild(document.createTextNode(t)); });
          p.appendChild(bb);
        }
        box.appendChild(p);
      } else if (b.tipo === 'versiculo') {
        fechar();
        const p = el('p', 'lec-v');
        p.appendChild(el('span', 'lec-r', '℣. '));
        b.texto.split('\n').forEach((t, k) => { if (k) p.appendChild(document.createElement('br')); p.appendChild(document.createTextNode(t)); });
        box.appendChild(p);
      } else if (b.tipo === 'ou') {
        fechar();
        box.appendChild(el('p', 'lec-ou', b.texto));
      } else {
        const linha = el('span', `lec-linha${b.recuo ? ' lec-recuo' : ''}`);
        if (b.verso) linha.appendChild(el('sup', 'lec-verso', b.verso));
        linha.appendChild(document.createTextNode(b.texto));
        corpo.appendChild(linha);
      }
    }
    fechar();
    if (a.fecho) box.appendChild(el('p', 'lec-fecho', a.fecho));
    return box;
  }

  root.Lecionario = { analisar, html };

  /* Momento cantado → símbolo de música (♫), mesma regra dos roteiros .docx
     (ferramentas/docx/musica.py). */
  const RX_CANTO = /^\s*[«“"]?(canto\b|canta-se|ato penitencial|gl[óo]ria a deus nas alturas|salmo responsorial|aclama[çc][ãa]o ao evangelho|sequ[êe]ncia|santo, santo|am[ée]m\.? \(cantado\)|te deum|hino\b|noite feliz|fundo musical|m[úu]sica de|tantum ergo|t[ãa]o sublime|pater noster|anima christi|verbum panis|vinde,? crist[ãa]os)/i;
  const RX_CANTO_RUBRICA = /(canta-se(?! ou diz)|fundo musical|durante (o|um breve) canto|canto durante)/i;
  function cantado(papel, texto) {
    const t = String(texto || '').trim();
    if (/^gl[óo]ria a v[óo]s/i.test(t)) return false;
    if (/^(orienta|rubrica|nota)/i.test(String(papel || ''))) return RX_CANTO.test(t) && !/^canto\b.*\b(dever|ser[áa])/i.test(t) || RX_CANTO_RUBRICA.test(t);
    return RX_CANTO.test(t);
  }
  root.Musica = { cantado };
}(typeof self !== 'undefined' ? self : this));
