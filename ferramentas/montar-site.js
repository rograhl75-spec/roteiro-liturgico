'use strict';
/* ==========================================================================
   MONTA O SITE A PARTIR DAS PASTAS semanas/<segunda-feira>/semana.json
   Executado automaticamente pelo GitHub (todo envio e todos os dias de manhã):
     node ferramentas/montar-site.js            → gera semanas.js, leituras.js,
                                                   antifonas.js, roteiros.js e as
                                                   listas de arquivos do modo offline
     node ferramentas/montar-site.js --copiar _site  → copia os arquivos públicos
   Publica as semanas que ainda não terminaram (até 3). Semanas antigas saem
   sozinhas do site, sem precisar apagar nada.
   ========================================================================== */
const fs = require('node:fs');
const path = require('node:path');

const raiz = path.join(__dirname, '..');
const MAX_SEMANAS = 3;
const ARQUIVOS_FIXOS = [
  'index.html', 'styles.css', 'app.js', 'programacao.js', 'semanas.js', 'leituras.js', 'antifonas.js',
  'roteiros.js', 'manifest.json', 'sw.js', 'icone.png', 'icone.svg', 'Selo Auxiliadora 60 anos_Ano 3.png'
];

function hojeEmLondrina() {
  if (process.env.HOJE) return process.env.HOJE;
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date());
}

function lerSemanas() {
  const pasta = path.join(raiz, 'semanas');
  if (!fs.existsSync(pasta)) return [];
  return fs.readdirSync(pasta)
    .filter((nome) => /^\d{4}-\d{2}-\d{2}$/.test(nome) && fs.existsSync(path.join(pasta, nome, 'semana.json')))
    .sort()
    .map((nome) => {
      const semana = JSON.parse(fs.readFileSync(path.join(pasta, nome, 'semana.json'), 'utf8'));
      if (semana.id !== nome) throw new Error(`semanas/${nome}/semana.json tem id “${semana.id}”.`);
      const fimDeSemana = semana.fimDeSemana;
      semana.fim = fimDeSemana ? fimDeSemana.dias[fimDeSemana.dias.length - 1].data : semana.dias[semana.dias.length - 1].data;
      return semana;
    });
}

function semanasPublicadas() {
  const todas = lerSemanas();
  const hoje = hojeEmLondrina();
  const atuais = todas.filter((semana) => semana.fim >= hoje).slice(0, MAX_SEMANAS);
  return atuais.length ? atuais : todas.slice(-1);
}

const literal = (texto) => `\`${texto.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')}\``;

function gerar() {
  const semanas = semanasPublicadas();
  if (!semanas.length) throw new Error('Nenhuma semana encontrada na pasta semanas/.');
  const leituras = [];
  const antifonas = {};
  const roteiros = {};
  const documentos = [];
  for (const semana of semanas) {
    leituras.push([semana, Object.entries(semana.leituras || {})]);
    Object.assign(antifonas, semana.antifonas || {});
    for (const [chave, doc] of Object.entries(semana.roteiros || {})) {
      roteiros[chave] = Object.fromEntries(Object.entries(doc).filter(([, valor]) => valor !== undefined));
    }
    for (const doc of semana.documentos || []) if (!documentos.includes(doc)) documentos.push(doc);
    for (const dia of semana.dias.concat(semana.fimDeSemana ? [semana.fimDeSemana] : [])) {
      for (const botao of dia.botoes || []) if (botao.arquivo && !documentos.includes(botao.arquivo)) documentos.push(botao.arquivo);
    }
  }
  for (const doc of documentos) {
    if (!fs.existsSync(path.join(raiz, doc))) throw new Error(`Documento listado mas não enviado: ${doc}`);
  }

  const dadosSemanas = semanas.map(({ leituras: _l, antifonas: _a, roteiros: _r, fim: _f, formato: _v, ...resto }) => resto);
  fs.writeFileSync(path.join(raiz, 'semanas.js'), `/* GERADO AUTOMATICAMENTE por ferramentas/montar-site.js — não edite.
   Para publicar uma semana, envie a pasta semanas/<segunda-feira>/ montada pela ferramenta. */
window.semanasData = ${JSON.stringify(dadosSemanas, null, 1)};
`);

  const blocos = leituras.map(([semana, itens]) => `    /* SEMANA DE ${semana.periodo.toUpperCase()} */\n` + itens.map(([chave, leitura]) =>
    `    '${chave}': {\n        title: ${JSON.stringify(leitura.title)},\n        day: ${JSON.stringify(leitura.day)},\n` +
    `        text: ${literal(leitura.text)}\n    }`).join(',\n'));
  fs.writeFileSync(path.join(raiz, 'leituras.js'), `/* GERADO AUTOMATICAMENTE por ferramentas/montar-site.js — não edite.
   Leituras integrais. Chave: s<legacyWeek + 1>_<dia>_<parte> (ex.: s10_dom_ev). */

const readingsData = {
${blocos.join(',\n')}
};

window.readingsData = readingsData;
`);

  fs.writeFileSync(path.join(raiz, 'antifonas.js'), `/* GERADO AUTOMATICAMENTE por ferramentas/montar-site.js — não edite.
   Antífonas, aclamações e citações para a transmissão. Chave: antifonas_<legacyWeek + 1>[_<extra>]. */
window.antifonasData = ${JSON.stringify(antifonas, null, 2)};
`);

  fs.writeFileSync(path.join(raiz, 'roteiros.js'), `/* GERADO AUTOMATICAMENTE por ferramentas/montar-site.js — não edite.
   Roteiros e preces. Chave: <tipo>_<legacyWeek>[_<extra>]; cada linha é [papel, texto]. */
window.roteirosData = ${JSON.stringify(roteiros, null, 2)
    .replace(/\[\n\s+("(?:[^"\\]|\\.)*"),\n\s+("(?:[^"\\]|\\.)*")\n\s+\]/g, '[$1, $2]')};
`);

  const assets = ARQUIVOS_FIXOS.concat(documentos);
  const sw = fs.readFileSync(path.join(raiz, 'sw.js'), 'utf8');
  fs.writeFileSync(path.join(raiz, 'sw.js'), sw.replace(/const ASSETS = \[[\s\S]*?\];/,
    `const ASSETS = [\n${assets.map((a) => `  ${JSON.stringify(`./${a}`)}`).join(',\n')}\n];`));
  const build = fs.readFileSync(path.join(raiz, 'build-version.js'), 'utf8');
  fs.writeFileSync(path.join(raiz, 'build-version.js'), build.replace(/const assets = \[[\s\S]*?\];/,
    `const assets = [\n${assets.map((a) => `    ${JSON.stringify(a)}`).join(',\n')}\n];`));

  console.log(`Semanas publicadas: ${semanas.map((s) => s.id).join(', ')} (${documentos.length} documentos).`);
  return assets;
}

function copiar(destino) {
  const { assets } = require('../build-version.js');
  const extras = ['version.json'];
  for (const pasta of ['ferramentas', 'dados']) {
    for (const nome of fs.readdirSync(path.join(raiz, pasta))) {
      if (/\.(js|html|css|json)$/.test(nome)) extras.push(`${pasta}/${nome}`);
    }
  }
  for (const arquivo of assets.concat(extras)) {
    const alvo = path.join(destino, arquivo);
    fs.mkdirSync(path.dirname(alvo), { recursive: true });
    fs.copyFileSync(path.join(raiz, arquivo), alvo);
  }
  console.log(`${assets.length + extras.length} arquivos copiados para ${destino}.`);
}

if (require.main === module) {
  try {
    const i = process.argv.indexOf('--copiar');
    if (i >= 0) copiar(process.argv[i + 1] || '_site');
    else gerar();
  } catch (erro) {
    console.error(`Falha ao montar o site: ${erro.message}`);
    process.exitCode = 1;
  }
}

module.exports = { gerar, lerSemanas, semanasPublicadas };
