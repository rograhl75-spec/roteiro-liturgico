const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = __dirname;
const leiturasPath = path.join(root, 'leituras.js');
const programacaoPath = path.join(root, 'programacao.js');
const indexPath = path.join(root, 'index.html');
const antifonasPath = path.join(root, 'antifonas.js');
const appPath = path.join(root, 'app.js');

const leiturasSource = fs.readFileSync(leiturasPath, 'utf8');
const programacaoSource = fs.readFileSync(programacaoPath, 'utf8');
const antifonasSource = fs.readFileSync(antifonasPath, 'utf8');
const indexContent = fs.readFileSync(indexPath, 'utf8');
const appSource = fs.readFileSync(appPath, 'utf8');

function runInSandbox(source, fileName) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox, { filename: fileName });
  return sandbox.window;
}

function extractTopLevelKeysFromReadingsSource(source) {
  const startToken = 'const readingsData = {';
  const start = source.indexOf(startToken);
  if (start < 0) return [];

  const keys = [];
  let i = source.indexOf('{', start);
  let depth = 0;

  while (i < source.length) {
    const char = source[i];

    if (char === '{') {
      depth += 1;
      i += 1;
      continue;
    }

    if (char === '}') {
      depth -= 1;
      if (depth === 0) break;
      i += 1;
      continue;
    }

    if (depth === 1) {
      if (char === '"' || char === "'") {
        const quote = char;
        let j = i + 1;
        let key = '';
        while (j < source.length) {
          const ch = source[j];
          if (ch === '\\') {
            key += source[j + 1] || '';
            j += 2;
            continue;
          }
          if (ch === quote) break;
          key += ch;
          j += 1;
        }

        let k = j + 1;
        while (k < source.length && /\s/.test(source[k])) k += 1;
        if (source[k] === ':') {
          keys.push(key);
          i = k + 1;
          continue;
        }
      }

      if (/[A-Za-z_$]/.test(char)) {
        let j = i + 1;
        while (j < source.length && /[A-Za-z0-9_$]/.test(source[j])) j += 1;
        const key = source.slice(i, j);
        let k = j;
        while (k < source.length && /\s/.test(source[k])) k += 1;
        if (source[k] === ':') {
          keys.push(key);
          i = k + 1;
          continue;
        }
      }
    }

    i += 1;
  }

  return keys;
}

const readingsWindow = runInSandbox(leiturasSource, 'leituras.js');
const readingsData = readingsWindow.readingsData;
if (!readingsData || typeof readingsData !== 'object') {
  console.error('Validação falhou:\n- Não foi possível carregar window.readingsData de leituras.js');
  process.exit(1);
}

const programacaoWindow = runInSandbox(programacaoSource, 'programacao.js');
const weeks = programacaoWindow.programacaoData?.weeks;
if (!Array.isArray(weeks)) {
  console.error('Validação falhou:\n- Não foi possível carregar programacaoData.weeks de programacao.js');
  process.exit(1);
}

const keysFromSource = extractTopLevelKeysFromReadingsSource(leiturasSource);
const counts = new Map();
keysFromSource.forEach((key) => counts.set(key, (counts.get(key) || 0) + 1));
const duplicates = Array.from(counts.entries()).filter(([, count]) => count > 1);

const readingKeys = new Set(Object.keys(readingsData));
const references = [];
weeks.forEach((week) => {
  const readingRefRegex = /data-reading-key\s*=\s*["']([^"']+)["']/g;
  let refMatch;
  while ((refMatch = readingRefRegex.exec(week.programacaoHtml || '')) !== null) {
    references.push(refMatch[1]);
  }
});

const missingReferences = references.filter((key) => !readingKeys.has(key));

const missingTabs = weeks
  .map((week) => `btn-tab-${week.id}`)
  .filter((tabId) => !indexContent.includes(`id="${tabId}"`));

const issues = [];
if (duplicates.length) {
  issues.push(`Chaves de leitura duplicadas: ${duplicates.map(([key]) => key).join(', ')}`);
}
if (missingReferences.length) {
  issues.push(`Referências de leituras ausentes em leituras.js: ${Array.from(new Set(missingReferences)).join(', ')}`);
}
if (missingTabs.length) {
  issues.push(`Abas de semana ausentes no index.html: ${missingTabs.join(', ')}`);
}

const correctedWeek = weeks.find((week) => week.id === '2026-10-12');
if (correctedWeek) {
  const html = correctedWeek.programacaoHtml;
  const expect = (condition, message) => {
    if (!condition) issues.push(`Semana 12–18/10/2026: ${message}`);
  };
  expect(!/não informado|não informada|a confirmar|Observação das fontes/.test(html),
    'a programação ainda contém informações pendentes ou divergências antigas');
  expect((html.match(/class="p-loc">Paróquia Nossa Senhora Auxiliadora/g) || []).length === 9
    && html.includes('class="p-loc">Capela São Domingos Sávio'),
    'os dez locais devem corresponder à escala corrigida');
  const colors = Array.from(html.matchAll(/class="color-badge badge-(\w+)"/g), (match) => match[1]);
  expect(colors.join(',') === 'branco,verde,verde,branco,verde,verde',
    'as cores devem ser branco em 12 e 15/10 e verde nos demais dias');
  expect((html.match(/Oração Eucarística II<\/td><td[^>]*>537<\/td>/g) || []).length === 3
    && !html.includes('>536<'),
    'a Oração Eucarística II deve indicar a página 537');
  expect(html.includes('sl_ter_w6">Sl 118(119),41.43.44.45.47.48 (R. 41a)')
    && html.includes('sl_qua_w6">Sl 1,1-2.3.4 e 6 (R. cf. Jo 8,12)'),
    'os salmos devem usar as referências do Lecionário corrigido');
  expect(correctedWeek.roteiroExtras?.includes('aparecida')
    && correctedWeek.roteiroLabel === '📖 Roteiro 29º Domingo',
    'os roteiros de Aparecida e do 29º Domingo devem permanecer separados');

  const aparecidaContent = indexContent.split('id="content_roteiro_5_aparecida"')[1]?.split('id="modal_roteiro_5"')[0] || '';
  expect(!aparecidaContent.includes('<iframe')
    && ['1. RITOS INICIAIS', '2. LITURGIA DA PALAVRA', '3. LITURGIA EUCARÍSTICA',
      '4. RITO DA COMUNHÃO', '5. RITOS DE ENCERRAMENTO', 'RITUAL DE COROAÇÃO',
      'ORAÇÃO DO ANGELUS', 'ORAÇÃO DE CONSAGRAÇÃO'].every((text) => aparecidaContent.includes(text)),
    'o roteiro de Aparecida e seus anexos devem estar disponíveis como texto imprimível');
  const domingoContent = indexContent.split('id="content_roteiro_5"')[1]?.split('id="modal_preces_5"')[0] || '';
  expect(domingoContent.includes('29º Domingo do Tempo Comum — 17 e 18 de outubro de 2026 — Cor verde')
    && !domingoContent.includes('cabeçalho divergente'),
    'o roteiro dominical deve refletir o cabeçalho corrigido');
  const precesModal = indexContent.split('<div id="modal_preces_5"')[1]?.split('<div id="modal_reflexoes_5"')[0] || '';
  const assembleiaPrayer = 'Deus, Pai de misericórdia, que em seu Filho Nosso Senhor Jesus Cristo nos deixastes a Igreja como caminho de salvação. Concedei-nos as luzes do Espírito Santo para a realização da Assembleia Paroquial! Que saibamos, como batizados, definir nosso ser e agir evangelizador, criando em nós, seus filhos amados, um sentimento de engajamento e pertença! Colocando os dons e carismas de cada movimento, serviço e pastoral, caminhemos na evangelização que nos leva ao encontro de Ti, Senhor! Fazei, ó Deus, que esta assembleia seja fecunda em graças, sob a ação do Espírito Santo e a poderosa intercessão de Nossa Senhora Auxiliadora.';
  const prayerSections = [
    ['preces_sabado_5', 'preces_domingo_manha_5', [
      'SÁBADO — 17/10 — 18h30', 'Ao Deus único, Pai e Filho e Espírito Santo, demos glória; e peçamos humildemente:',
      'R. Ouvi, Senhor, a oração de vosso povo!', 'Pai santo, Senhor todo-poderoso, fazei brotar a justiça na terra, para que o vosso povo se alegre na prosperidade e na paz, nós vos pedimos.',
      'Daí a todos os povos fazerem parte do vosso Reino, para que sejam salvos, nós vos pedimos.'
    ]],
    ['preces_domingo_manha_5', 'preces_domingo_noite_5', [
      'DOMINGO — 18/10 — 09h00 e 11h00', 'Louvemos a Cristo Senhor, luz que ilumina todo homem e sol que não tem ocaso; e aclamemos com alegria:',
      'R. Senhor, vós sois nossa vida e salvação!', 'Criador do universo, nós vos agradecemos este dia que recebemos de vossa bondade, e em que celebramos a vossa ressurreição, nós vos pedimos.',
      'Que o vosso Espírito nos ensine hoje a cumprir vossa vontade, e vossa Sabedoria sempre nos conduza, nós vos pedimos.'
    ]],
    ['preces_domingo_noite_5', null, [
      'DOMINGO — 18/10 — 18h30', 'Como membros de Cristo que é nossa cabeça, adoremos o Senhor; e aclamemos com alegria:',
      'R. Senhor, venha a nós o vosso Reino!', 'Cristo, nosso Salvador, fazei de vossa Igreja instrumento de concórdia e unidade para o gênero humano, e sinal de salvação para todos os povos, nós vos pedimos.',
      'Assisti com vossa contínua presença o Santo Padre e o Colégio universal dos Bispos, e concedei-lhes o dom da unidade, da caridade e da paz, nós vos pedimos.'
    ]]
  ].map(([start, end, requiredTexts]) => {
    const startIndex = precesModal.indexOf(`<div id="${start}"`);
    const endIndex = end ? precesModal.indexOf(`<div id="${end}"`, startIndex + 1) : precesModal.length;
    return { content: startIndex < 0 || endIndex < 0 ? '' : precesModal.slice(startIndex, endIndex), requiredTexts };
  });
  expect(prayerSections.every(({ content, requiredTexts }) =>
    requiredTexts.every((text) => content.includes(text))
      && content.includes(assembleiaPrayer)
      && content.includes('Amém!')
      && content.includes('São João Bosco, rogai por nós!')
      && content.includes('São Domingos Sávio, rogai por nós!')
      && content.includes('Finaliza as preces.')
      && content.includes('Oração da Assembleia Paroquial 2026')
      && content.includes('>Telão</span>')),
  'as três celebrações devem conter as preces da fonte atual, oração paroquial e conclusão');
  expect((precesModal.split(assembleiaPrayer).length - 1) === 3
    && !precesModal.includes('Jubileu de Diamante'),
  'a oração da Assembleia Paroquial deve substituir a versão antiga nas três celebrações');
  [html, aparecidaContent, domingoContent].forEach((content) => {
    for (const match of content.matchAll(/href="\.\/([^"]+\.pdf)"/g)) {
      const file = decodeURIComponent(match[1]);
      expect(fs.existsSync(path.join(root, file)), `PDF vinculado ausente: ${file}`);
    }
  });
}

const thirtiethSundayWeek = weeks.find((week) => week.id === '2026-10-19');
if (thirtiethSundayWeek) {
  const html = thirtiethSundayWeek.programacaoHtml;
  const expect = (condition, message) => {
    if (!condition) issues.push(`Semana 19–25/10/2026: ${message}`);
  };
  const requiredReadingKeys = ['1l_dom_w7', 'sl_dom_w7', '2l_dom_w7', 'ev_dom_w7'];
  const weekdayReadingKeys = [
    '1l_seg_w7', 'sl_seg_w7', 'ev_seg_w7',
    '1l_ter_w7', 'sl_ter_w7', 'ev_ter_w7',
    '1l_qua_w7', 'sl_qua_w7', 'ev_qua_w7',
    '1l_qui_w7', 'sl_qui_w7', 'ev_qui_w7',
    '1l_sex_w7', 'sl_sex_w7', 'ev_sex_w7'
  ];
  const precesModal = indexContent.split('<div id="modal_preces_6"')[1]
    ?.split('<div id="modal_reflexoes_6"')[0] || '';
  const roteiroModal = indexContent.split('<div id="modal_roteiro_6"')[1]
    ?.split('<div id="modal_preces_6"')[0] || '';
  const roteiroPdfs = Array.from(roteiroModal.matchAll(/href="\.\/([^"]+\.pdf)"/g),
    ([, file]) => decodeURIComponent(file));

  expect(thirtiethSundayWeek.legacyWeek === 6
    && thirtiethSundayWeek.shortTitle === '19 a 25 de outubro — 30ª semana (30º Domingo)'
    && thirtiethSundayWeek.fullTitle === '30º Domingo do Tempo Comum — 19 a 25 de outubro',
  'a semana deve usar o título e os identificadores legados da nova aba');
  expect((html.match(/class="p-hora"/g) || []).length === 10
    && html.includes('Capela São Domingos Sávio')
    && html.includes('Pe. Djhon')
    && html.includes('09h00')
    && html.includes('11h00'),
  'a escala deve listar as dez celebrações, locais e celebrantes');
  expect(html.includes('<span class="p-dia">Segunda</span> <span class="p-hora">19h00</span></td><td class="p-loc">Paróquia Nossa Senhora Auxiliadora</td><td class="p-cel">Pe. Laurindo</td>'),
  'a missa de segunda-feira às 19h deve ser celebrada por Pe. Laurindo conforme o PDF atualizado');
  expect(requiredReadingKeys.every((key) =>
    readingKeys.has(key) && html.includes(`data-reading-key="${key}"`))
    && html.includes('Lecionário I')
    && html.includes('345')
    && html.includes('346')
    && html.includes('347'),
  'as quatro leituras dominicais e as páginas do Lecionário devem estar integradas');
  expect(weekdayReadingKeys.every((key) => {
    const reading = readingsData[key];
    return reading && reading.text.length > 100
      && html.includes(`data-reading-key="${key}"`)
      && indexContent.includes(`value="${key}"`);
  }),
  'as quinze leituras dos dias úteis devem ter texto completo, link e opção de seleção');
  expect(['Segunda-feira (19/10)', 'Terça-feira (20/10)', 'Quarta-feira (21/10)',
    'Quinta-feira (22/10)', 'Sexta-feira (23/10)', 'Fim de Semana (24 e 25/10)']
    .every((day) => indexContent.includes(day))
    && ['1l_dom_w7', 'sl_dom_w7', '2l_dom_w7', 'ev_dom_w7']
      .every((key) => indexContent.includes(`value="${key}"`)),
  'o seletor deve agrupar cada dia útil e as leituras do fim de semana');
  expect(antifonasSource.includes('antifonas_7')
    && ['Cf. Sl 104,3-4', 'Cf. Jo 14,23', 'Cf. Sl 19,6', 'Ef 5,2',
      'Se fizerdes algum mal à viúva e ao órfão',
      'Amarás o Senhor teu Deus, e ao teu próximo como a ti mesmo.']
      .every((text) => antifonasSource.includes(text)),
  'as antífonas, opções de comunhão, aclamação e citações PASCOM devem constar');
  expect(['preces_sabado_6', 'preces_domingo_manha_6', 'preces_domingo_noite_6',
    '18h30 e 19h00', '09h00 e 11h00', 'Finaliza as preces.', 'Amém.']
    .every((text) => precesModal.includes(text)),
  'as preces devem cobrir os horários da fonte e explicar o formulário usado no sábado às 19h');
  expect(roteiroModal.includes('content_roteiro_6')
    && ['1. RITOS INICIAIS', '2. LITURGIA DA PALAVRA', '3. LITURGIA EUCARÍSTICA',
      '4. RITO DA COMUNHÃO', '5. RITOS DE ENCERRAMENTO']
      .every((text) => roteiroModal.includes(text))
    && roteiroModal.includes('print-active-roteiro')
    && roteiroModal.includes('roteiro-section-title')
    && !roteiroModal.includes('<pre class="script-text"')
    && roteiroPdfs.some((file) => fs.existsSync(path.join(root, file))),
  'o roteiro integral e seu PDF-fonte devem estar disponíveis em modal imprimível');
  expect(indexContent.includes('id="leituras_semana_6"')
    && indexContent.includes('value="antifonas_7"')
    && indexContent.includes('print-active-preces')
    && indexContent.includes('data-action="preview-selected-readings"')
    && indexContent.includes('data-action="print-leituras-view"')
    && indexContent.includes('id="btn-tab-2026-10-19"')
    && ['openActiveLeiturasModal', 'previewSelectedReadings', 'printLeiturasFromView',
      'createAntifonaBlock', 'openReading'].every((name) => appSource.includes(`function ${name}(`)),
  'a semana deve estar acessível na aba e nos seletores imprimíveis');
}

if (issues.length) {
  console.error('Validação falhou:\n- ' + issues.join('\n- '));
  process.exit(1);
}

console.log(`Validação OK: ${readingKeys.size} chaves de leituras, ${references.length} referências de leitura verificadas em ${weeks.length} semanas.`);
