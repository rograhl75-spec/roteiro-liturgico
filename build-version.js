'use strict';

const { createHash } = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const assets = [
    "index.html",
    "styles.css",
    "app.js",
    "programacao.js",
    "semanas.js",
    "leituras.js",
    "antifonas.js",
    "roteiros.js",
    "lecionario.js",
    "compartilhar.js",
    "vendor/pdf-lib.min.js",
    "manifest.json",
    "sw.js",
    "icone.png",
    "icone.svg",
    "Selo Auxiliadora 60 anos_Ano 3.png",
    "semanas/2026-11-09/Escala Padres 9 a 15 novembro 2026.docx",
    "semanas/2026-11-09/Leituras 9 a 15 novembro 2026.docx",
    "semanas/2026-11-09/Leituras e Lecionarios - 2 a 15 novembro 2026.xlsx",
    "semanas/2026-11-09/Missal - 9 a 15 novembro_2026.xlsx",
    "semanas/2026-11-09/33º DOMINGO TEMPO COMUM - 14 E 15 NOVEMBRO 2026 - ANO A.docx",
    "semanas/2026-11-09/PRECES - 33º DOMINGO TEMPO COMUM.docx",
    "semanas/2026-11-09/Antífona da entrada e comunhão - 33º Domingo do Tempo Comum 15-11-2026.docx",
    "semanas/2026-11-16/Leituras 16 a 22 novembro 2026.docx",
    "semanas/2026-11-16/CRISTO REI - 34º DOMINGO TEMPO COMUM - 21 E 22 NOVEMBRO 2026 - ANO A.docx",
    "semanas/2026-11-16/PRECES - CRISTO REI - 21 E 22 NOVEMBRO 2026.docx",
    "semanas/2026-11-23/Leituras 23 a 29 novembro 2026.docx",
    "semanas/2026-11-23/1º DOMINGO DO ADVENTO - 28 E 29 NOVEMBRO 2026 - ANO B.docx",
    "semanas/2026-11-23/PRECES - 1º DOMINGO DO ADVENTO - 28 E 29 NOVEMBRO 2026.docx",
    "semanas/2026-11-23/RITO - BÊNÇÃO DA COROA DO ADVENTO E 1ª VELA - 28 E 29 NOVEMBRO 2026.docx",
    "semanas/2026-11-30/Leituras 30 novembro a 6 dezembro 2026.docx",
    "semanas/2026-11-30/2º DOMINGO DO ADVENTO - 5 E 6 DEZEMBRO 2026 - ANO B.docx",
    "semanas/2026-11-30/PRECES - 2º DOMINGO DO ADVENTO - 5 E 6 DEZEMBRO 2026.docx",
    "semanas/2026-11-30/RITO - 2ª VELA DO ADVENTO - 5 E 6 DEZEMBRO 2026.docx",
    "semanas/2026-12-07/Leituras 7 a 13 dezembro 2026.docx",
    "semanas/2026-12-07/3º DOMINGO DO ADVENTO - 12 E 13 DEZEMBRO 2026 - ANO B.docx",
    "semanas/2026-12-07/PRECES - 3º DOMINGO DO ADVENTO - 12 E 13 DEZEMBRO 2026.docx",
    "semanas/2026-12-07/IMACULADA CONCEIÇÃO - SOLENIDADE - 8 DEZEMBRO 2026.docx",
    "semanas/2026-12-07/PRECES - IMACULADA CONCEIÇÃO - 8 DEZEMBRO 2026.docx",
    "semanas/2026-12-07/RITO - 3ª VELA DO ADVENTO - 12 E 13 DEZEMBRO 2026.docx",
    "semanas/2026-12-14/Leituras 14 a 20 dezembro 2026.docx",
    "semanas/2026-12-14/4º DOMINGO DO ADVENTO - 19 E 20 DEZEMBRO 2026 - ANO B.docx",
    "semanas/2026-12-14/PRECES - 4º DOMINGO DO ADVENTO - 19 E 20 DEZEMBRO 2026.docx",
    "semanas/2026-12-14/RITO - 4ª VELA DO ADVENTO - 19 E 20 DEZEMBRO 2026.docx"
];

function sha256(content) {
    return createHash('sha256').update(content).digest('hex');
}

function buildVersion(root = __dirname) {
    const contents = new Map(assets.map(file => [file, fs.readFileSync(path.join(root, file))]));
    const html = contents.get('index.html').toString('utf8').replace(
        /<meta\b[^>]*\bname\s*=\s*(?:"app-version"|'app-version'|app-version(?=\s|\/?>))[^>]*>/gi,
        ''
    );
    if (!/<head\b[^>]*>/i.test(html)) {
        throw new Error('index.html precisa conter uma tag <head>.');
    }

    // The version hashes the HTML without its version tag, avoiding a circular hash.
    contents.set('index.html', Buffer.from(html));
    const files = Object.fromEntries(assets.map(file => [`./${file}`, sha256(contents.get(file))]));
    const version = sha256(JSON.stringify(files));
    const publishedHtml = html.replace(
        /<head\b[^>]*>/i,
        head => `${head}<meta name="app-version" content="${version}">`
    );
    files['./index.html'] = sha256(publishedHtml);
    const metadata = { version, files };

    fs.writeFileSync(path.join(root, 'index.html'), publishedHtml);
    fs.writeFileSync(path.join(root, 'version.json'), `${JSON.stringify(metadata, null, 2)}\n`);
    return metadata;
}

if (require.main === module) {
    try {
        const { version } = buildVersion();
        console.log(`Metadados de publicação gerados: ${version}`);
    } catch (error) {
        console.error(`Falha ao gerar metadados: ${error.message}`);
        process.exitCode = 1;
    }
}

module.exports = { assets, buildVersion };
