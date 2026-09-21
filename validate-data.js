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

if (issues.length) {
  console.error('Validação falhou:\n- ' + issues.join('\n- '));
  process.exit(1);
}

console.log(`Validação OK: ${readingKeys.size} chaves de leituras, ${references.length} referências de leitura verificadas em ${weeks.length} semanas.`);
