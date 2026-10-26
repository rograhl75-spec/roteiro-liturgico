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

const removedWeekId = '2026-10-19';
const novemberWeek = weeks.find((week) => week.id === '2026-11-02');
const allSaintsWeek = weeks.find((week) => week.id === '2026-10-26');
const placeholderText = 'As informações desta semana serão adicionadas quando forem fornecidas.';
if (weeks.some((week) => week.id === removedWeekId)
  || indexContent.includes('btn-tab-2026-10-19')
  || indexContent.includes('leituras_semana_6')
  || indexContent.includes('modal_roteiro_6')
  || indexContent.includes('modal_preces_6')
  || indexContent.includes('modal_reflexoes_6')
  || Object.keys(readingsData).some((key) => key.includes('_w7'))
  || programacaoWindow.antifonasData?.antifonas_7) {
  issues.push('Semana 19–25/10/2026: ainda há referências de interface ou dados associados');
}
if (!appSource.includes("const WEEK_ID_FALLBACK = '2026-10-26';")) {
  issues.push('A seleção padrão deve iniciar na semana 26/10–01/11/2026');
}
if (!allSaintsWeek?.programacaoHtml.includes('2026-10-28')
  || !allSaintsWeek.programacaoHtml.includes('Pe. Romão')) {
  issues.push('Semana 26/10–01/11/2026: o celebrante de 28/10 deve ser Pe. Romão');
}
if (!novemberWeek
  || novemberWeek.legacyWeek !== 8
  || !novemberWeek.programacaoHtml.includes(placeholderText)
  || /data-reading-key/.test(novemberWeek.programacaoHtml)
  || !indexContent.includes('id="leituras_semana_8"')
  || !indexContent.includes(placeholderText)
  || /<div id="leituras_semana_8"[^>]*>[\s\S]*?class="reading-checkbox"/.test(indexContent)) {
  issues.push('Semana 02–08/11/2026: a estrutura deve existir como placeholder sem leituras inventadas');
}
if (!allSaintsWeek) issues.push('Semana 26/10–01/11/2026: programação ausente');
if (allSaintsWeek) {
  const html = allSaintsWeek.programacaoHtml;
  const precesModal = indexContent.split('<div id="modal_preces_7"')[1]
    ?.split('<div id="modal_reflexoes_7"')[0] || '';
  const reflexoesModal = indexContent.split('<div id="modal_reflexoes_7"')[1]
    ?.split('</div>')[0] || '';
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
  expect(html.includes('missa noturna de 31/10 em 1ª Véspera')
    && html.includes('Ap 7,2-4.9-14')
    && html.includes('843 (tabela); 844 (roteiro)'),
  '31/10 deve celebrar a Solenidade em 1ª Véspera com as leituras e páginas do fim de semana');
  expect(!html.includes('Fontes e observações')
    && !html.includes('Nota das fontes')
    && html.includes('Documentos originais')
    && !indexContent.includes('Conferência</span>')
    && !indexContent.includes('Há conflito entre as fontes'),
  'as observações da semana devem ser removidas sem eliminar os links dos documentos');
  expect(['preces_sabado_7', 'preces_domingo_manha_7', 'preces_domingo_noite_7']
    .every(id => precesModal.includes(`id="${id}"`))
    && !/(Segunda|Terça|Quarta|Quinta|Sexta)-feira/.test(precesModal)
    && !/(Lacuna da fonte|Não há formulário|não foram fornecidos)/i.test(precesModal)
    && !reflexoesModal.includes('Lacuna das fontes'),
  'preces devem conter apenas os formulários de fim de semana e não exibir avisos de lacunas');
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
