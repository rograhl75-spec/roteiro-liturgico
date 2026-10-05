const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = __dirname;
const leiturasPath = path.join(root, 'leituras.js');
const programacaoPath = path.join(root, 'programacao.js');
const indexPath = path.join(root, 'index.html');

const leiturasSource = fs.readFileSync(leiturasPath, 'utf8');
const programacaoSource = fs.readFileSync(programacaoPath, 'utf8');
const indexContent = fs.readFileSync(indexPath, 'utf8');

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
  [html, aparecidaContent, domingoContent].forEach((content) => {
    for (const match of content.matchAll(/href="\.\/([^"]+\.pdf)"/g)) {
      const file = decodeURIComponent(match[1]);
      expect(fs.existsSync(path.join(root, file)), `PDF vinculado ausente: ${file}`);
    }
  });
}

if (issues.length) {
  console.error('Validação falhou:\n- ' + issues.join('\n- '));
  process.exit(1);
}

console.log(`Validação OK: ${readingKeys.size} chaves de leituras, ${references.length} referências de leitura verificadas em ${weeks.length} semanas.`);
