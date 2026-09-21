const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = __dirname;
const leiturasPath = path.join(root, 'leituras.js');
const programacaoPath = path.join(root, 'programacao.js');
const indexPath = path.join(root, 'index.html');

const leiturasContent = fs.readFileSync(leiturasPath, 'utf8');
const programacaoSource = fs.readFileSync(programacaoPath, 'utf8');
const indexContent = fs.readFileSync(indexPath, 'utf8');

const keyRegex = /'([^']+)'\s*:\s*\{/g;
const keys = [];
let match;
while ((match = keyRegex.exec(leiturasContent)) !== null) {
  keys.push(match[1]);
}

const counts = new Map();
keys.forEach((key) => counts.set(key, (counts.get(key) || 0) + 1));
const duplicates = Array.from(counts.entries()).filter(([, count]) => count > 1);

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(programacaoSource, sandbox, { filename: 'programacao.js' });

const weeks = sandbox.window.programacaoData?.weeks;
if (!Array.isArray(weeks)) {
  console.error('Validação falhou:\n- Não foi possível carregar programacaoData.weeks de programacao.js');
  process.exit(1);
}

const references = [];
weeks.forEach((week) => {
  const readingRefRegex = /data-reading-key="([^"]+)"/g;
  let refMatch;
  while ((refMatch = readingRefRegex.exec(week.programacaoHtml || '')) !== null) {
    references.push(refMatch[1]);
  }
});

const missingReferences = references.filter((key) => !counts.has(key));

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

console.log(`Validação OK: ${keys.length} chaves de leituras, ${references.length} referências de leitura verificadas em ${weeks.length} semanas.`);
