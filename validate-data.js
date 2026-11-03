'use strict';
/* Validação genérica dos dados publicados. Não depende de semanas específicas:
   ao trocar as semanas, basta manter os dados consistentes entre si. */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = __dirname;
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

function runInSandbox(source, fileName) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox, { filename: fileName });
  return sandbox.window;
}

const issues = [];
const fail = (message) => issues.push(message);

const leiturasSource = read('leituras.js');
const indexContent = read('index.html');
const swSource = read('sw.js');

let readingsData;
let antifonasData;
let roteirosData;
let weeks;
try {
  readingsData = runInSandbox(leiturasSource, 'leituras.js').readingsData;
  const dataWindow = runInSandbox(
    [read('antifonas.js'), read('roteiros.js'), read('programacao.js')].join('\n'), 'dados.js');
  antifonasData = dataWindow.antifonasData;
  roteirosData = dataWindow.roteirosData;
  weeks = dataWindow.programacaoData && dataWindow.programacaoData.weeks;
} catch (error) {
  console.error(`Validação falhou:\n- Erro ao carregar os dados: ${error.message}`);
  process.exit(1);
}
if (!readingsData || !antifonasData || !roteirosData || !Array.isArray(weeks) || !weeks.length) {
  console.error('Validação falhou:\n- readingsData, antifonasData, roteirosData ou programacaoData.weeks ausentes');
  process.exit(1);
}

/* ---- Leituras: chaves únicas e textos preenchidos ---- */
const keyCounts = new Map();
for (const [, key] of leiturasSource.matchAll(/^\s{4}'([^']+)':\s*\{/gm)) {
  keyCounts.set(key, (keyCounts.get(key) || 0) + 1);
}
const duplicateKeys = [...keyCounts].filter(([, count]) => count > 1).map(([key]) => key);
if (duplicateKeys.length) fail(`Chaves de leitura duplicadas: ${duplicateKeys.join(', ')}`);
for (const [key, reading] of Object.entries(readingsData)) {
  if (!reading.title || !reading.day || !reading.text || reading.text.trim().length < 40) {
    fail(`Leitura incompleta (title/day/text): ${key}`);
  }
}

/* ---- Semanas ---- */
const weekIds = weeks.map((week) => week.id);
if (new Set(weekIds).size !== weekIds.length) fail('IDs de semana duplicados');
const legacyIds = weeks.map((week) => week.legacyWeek);
if (new Set(legacyIds).size !== legacyIds.length) fail('legacyWeek duplicado entre semanas');

const usedReadings = new Set();
const usedAntifonas = new Set();
const referencedFiles = new Set();

for (const week of weeks) {
  const label = `Semana ${week.id}`;
  const html = week.programacaoHtml || '';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(week.id)) fail(`${label}: id deve seguir YYYY-MM-DD`);
  if (!week.shortTitle || !week.fullTitle) fail(`${label}: shortTitle/fullTitle ausentes`);
  if (!(week.inicio <= week.fim)) fail(`${label}: início/fim inválidos`);

  const dates = [...html.matchAll(/data-date="([^"]+)"/g)].map(([, date]) => date);
  if (new Set(dates).size !== dates.length) fail(`${label}: data-date repetido`);
  for (const date of dates) {
    if (date < week.inicio || date > week.fim) fail(`${label}: data ${date} fora do período`);
    if (!html.includes(`href="#dia-${date}"`)) fail(`${label}: navegação ausente para ${date}`);
  }

  for (const [, key] of html.matchAll(/data-reading-key="([^"]+)"/g)) {
    usedReadings.add(key);
    if (!readingsData[key]) fail(`${label}: leitura referenciada inexistente: ${key}`);
  }

  for (const group of week.selecaoLeituras || []) {
    for (const [, value] of group.itens) {
      if (value.startsWith('antifonas_')) {
        usedAntifonas.add(value);
        if (!antifonasData[value]) fail(`${label}: antífonas inexistentes: ${value}`);
      } else if (!readingsData[value]) {
        fail(`${label}: seleção de leitura inexistente: ${value}`);
      }
    }
  }
  if (!(week.selecaoLeituras || []).length) fail(`${label}: sem seleção de leituras`);

  for (const type of ['roteiro', 'preces']) {
    if (!roteirosData[`${type}_${week.legacyWeek}`]) fail(`${label}: ${type} principal ausente (${type}_${week.legacyWeek})`);
    for (const extra of week[`${type}Extras`] || []) {
      const doc = roteirosData[`${type}_${week.legacyWeek}_${extra}`];
      if (!doc) fail(`${label}: ${type} adicional ausente (${type}_${week.legacyWeek}_${extra})`);
      else if (!doc.botao) fail(`${label}: ${type}_${week.legacyWeek}_${extra} precisa do rótulo "botao"`);
    }
  }
  for (const [, type, key] of html.matchAll(/data-(roteiro|preces)-key="([^"]+)"/g)) {
    if (!(week[`${type}Extras`] || []).includes(key)) fail(`${label}: botão de ${type} sem extra declarado: ${key}`);
  }

  for (const [, encoded] of html.matchAll(/href="\.\/([^"]+)"/g)) {
    referencedFiles.add(decodeURIComponent(encoded));
  }
}

/* ---- Roteiros e preces ---- */
for (const [key, doc] of Object.entries(roteirosData)) {
  const [, type, legacy] = key.match(/^(roteiro|preces|reflexoes)_(\d+)(?:_[a-z0-9_]+)?$/) || [];
  if (!type) { fail(`Chave inválida em roteiros.js: ${key}`); continue; }
  if (!legacyIds.includes(Number(legacy))) fail(`${key}: não pertence a nenhuma semana publicada`);
  if (!doc.titulo) fail(`${key}: título ausente`);
  if (doc.fonte) referencedFiles.add(doc.fonte);
  const rows = (doc.secoes || []).flatMap((secao) => secao.linhas)
    .concat((doc.formularios || []).flatMap((form) => form.linhas));
  if (type !== 'reflexoes' && !rows.length) fail(`${key}: sem conteúdo`);
  rows.forEach((row, index) => {
    if (!Array.isArray(row) || row.length !== 2 || !row[0] || !row[1]) fail(`${key}: linha ${index + 1} inválida`);
  });
}

/* ---- Itens órfãos (de semanas removidas) ---- */
const orphanReadings = Object.keys(readingsData).filter((key) => !usedReadings.has(key));
if (orphanReadings.length) fail(`Leituras sem uso em nenhuma semana: ${orphanReadings.join(', ')}`);
const orphanAntifonas = Object.keys(antifonasData).filter((key) => !usedAntifonas.has(key));
if (orphanAntifonas.length) fail(`Antífonas sem uso em nenhuma semana: ${orphanAntifonas.join(', ')}`);

/* ---- index.html ---- */
const ids = [...indexContent.matchAll(/\sid="([^"]+)"/g)].map(([, id]) => id);
const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
if (duplicateIds.length) fail(`IDs duplicados no index.html: ${[...new Set(duplicateIds)].join(', ')}`);
for (const id of ['week-tabs', 'weeks-root', 'document-modals', 'leituras-blocos', 'print-mount',
  'modal_programacao', 'modal_seletor_leituras', 'modal_leituras_view', 'generalModal',
  'btn-roteiro-principal', 'btn-preces-principal', 'toolbar-roteiro-extras', 'toolbar-preces-extras']) {
  if (!ids.includes(id)) fail(`Elemento obrigatório ausente no index.html: #${id}`);
}
for (const script of ['leituras.js', 'antifonas.js', 'roteiros.js', 'programacao.js', 'app.js']) {
  if (!indexContent.includes(`<script src="${script}" defer></script>`)) fail(`Script ausente no index.html: ${script}`);
}

/* ---- Snapshot offline e documentos ---- */
const { assets } = require('./build-version.js');
const swAssets = vm.runInNewContext(`${swSource.match(/const ASSETS = \[[\s\S]*?\];/)[0]}\nASSETS`);
if (JSON.stringify(assets.map((file) => `./${file}`)) !== JSON.stringify(swAssets)) {
  fail('As listas de assets de build-version.js e sw.js devem ser idênticas');
}
for (const file of assets) {
  if (!fs.existsSync(path.join(root, file))) fail(`Asset ausente: ${file}`);
}
for (const file of referencedFiles) {
  if (!assets.includes(file)) fail(`Documento referenciado fora do snapshot offline: ${file}`);
  if (!fs.existsSync(path.join(root, file))) fail(`Documento referenciado inexistente: ${file}`);
}
const sourceFiles = fs.readdirSync(root).filter((file) => /\.(pdf|docx|xlsx)$/i.test(file));
for (const file of sourceFiles) {
  if (!assets.includes(file)) fail(`Documento-fonte fora da lista de publicação: ${file}`);
  if (!referencedFiles.has(file)) fail(`Documento-fonte não vinculado em nenhuma semana: ${file}`);
}

if (issues.length) {
  console.error(`Validação falhou:\n- ${issues.join('\n- ')}`);
  process.exit(1);
}

console.log(`Validação OK: ${weeks.length} semanas, ${Object.keys(readingsData).length} leituras, ` +
  `${Object.keys(roteirosData).length} roteiros/preces, ${assets.length} arquivos publicados.`);
