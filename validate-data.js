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

const programacaoWindow = runInSandbox(`${antifonasSource}\n${programacaoSource}`, 'programacao.js');
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

const allSaintsWeek = weeks.find((week) => week.id === '2026-10-26');
if (!allSaintsWeek) issues.push('Semana 26/10–01/11/2026: programação ausente');
if (allSaintsWeek) {
  const html = allSaintsWeek.programacaoHtml;
  const expect = (condition, message) => {
    if (!condition) issues.push(`Semana 26/10–01/11/2026: ${message}`);
  };
  const dates = ['2026-10-26', '2026-10-27', '2026-10-28', '2026-10-29',
    '2026-10-30', '2026-10-31', '2026-11-01'];
  const keys = ['seg', 'ter', 'qua', 'qui', 'sex'].flatMap(day =>
    ['l1', 'sal', 'acl', 'ev'].map(part => `s8_${day}_${part}`))
    .concat(['s8_dom_l1', 's8_dom_sal', 's8_dom_l2', 's8_dom_ev']);
  expect(allSaintsWeek.legacyWeek === 7 && dates.every(date =>
    html.includes(`data-date="${date}"`) && html.includes(`href="#dia-${date}"`)),
  'os sete dias devem estar integrados à navegação');
  expect((html.match(/class="p-hora"/g) || []).length === 10
    && html.includes('Pe. Rafael') && html.includes('Pe. Laurindo')
    && html.includes('Capela São Domingos Sávio'),
  'a escala deve conter as dez missas e os celebrantes atualizados');
  expect(keys.every(key => readingsData[key]?.text.length > 50
    && html.includes(`data-reading-key="${key}"`)
    && indexContent.includes(`value="${key}"`)),
  'todas as leituras e aclamações devem ter texto, referência clicável e seleção');
  expect(['leituras_semana_7', 'modal_roteiro_7', 'content_roteiro_7',
    'modal_preces_7', 'content_preces_7', 'modal_reflexoes_7']
    .every(id => indexContent.includes(`id="${id}"`))
    && indexContent.includes('value="antifonas_8"')
    && runInSandbox(antifonasSource, 'antifonas.js').antifonasData?.antifonas_8,
  'roteiro, preces, antífonas e indicação sobre reflexões devem estar disponíveis');
  expect(['31º Domingo do Tempo Comum', '843 (tabela); 844 (roteiro)',
    '19h00', 'não contém linha para 31/10'].every(text => html.includes(text)),
  'as divergências e lacunas das fontes devem permanecer explícitas');
  expect(html.includes('Fim de semana: 31 de Outubro e 1 de Novembro de 2026')
    && html.includes('Alegremo-nos todos no Senhor')
    && html.includes('Citações Telão (PASCOM)')
    && indexContent.includes('TODOS OS SANTOS, SOLENIDADE – 31 10 A 01 11 2026')
    && !/30 10 A 01 11/.test(html + indexContent),
  'o fim de semana deve reunir as datas corrigidas, antífonas e citações');
  const pdfs = Array.from(html.matchAll(/href="\.\/([^"]+\.pdf)"/g),
    ([, file]) => decodeURIComponent(file));
  expect(pdfs.length === 7 && pdfs.every(file => fs.existsSync(path.join(root, file))),
    'os sete PDFs-fonte devem manter seus nomes originais e links válidos');
}

if (issues.length) {
  console.error('Validação falhou:\n- ' + issues.join('\n- '));
  process.exit(1);
}

console.log(`Validação OK: ${readingKeys.size} chaves de leituras, ${references.length} referências de leitura verificadas em ${weeks.length} semanas.`);
