const fs = require('fs');
const path = require('path');

const root = __dirname;
const leiturasPath = path.join(root, 'leituras.js');
const programacaoPath = path.join(root, 'programacao.js');
const indexPath = path.join(root, 'index.html');

const leiturasContent = fs.readFileSync(leiturasPath, 'utf8');
const programacaoContent = fs.readFileSync(programacaoPath, 'utf8');
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

const readingRefRegex = /data-reading-key="([^"]+)"/g;
const references = [];
while ((match = readingRefRegex.exec(programacaoContent)) !== null) {
  references.push(match[1]);
}

const missingReferences = references.filter((key) => !counts.has(key));

const weekPanelRefs = ['week-panel-2026-09-14', 'week-panel-2026-09-21', 'week-panel-2026-09-28'];
const missingWeekPanels = weekPanelRefs.filter((ref) => !indexContent.includes(ref));

const issues = [];
if (duplicates.length) {
  issues.push(`Chaves de leitura duplicadas: ${duplicates.map(([key]) => key).join(', ')}`);
}
if (missingReferences.length) {
  issues.push(`Referências de leituras ausentes em leituras.js: ${Array.from(new Set(missingReferences)).join(', ')}`);
}
if (missingWeekPanels.length) {
  issues.push(`Painéis de semana ausentes no index.html: ${missingWeekPanels.join(', ')}`);
}

if (issues.length) {
  console.error('Validação falhou:\n- ' + issues.join('\n- '));
  process.exit(1);
}

console.log(`Validação OK: ${keys.length} chaves de leituras, ${references.length} referências de leitura verificadas.`);
