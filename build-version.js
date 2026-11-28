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
    "vendor/pdf.min.js",
    "vendor/pdf.worker.min.js",
    "manifest.json",
    "sw.js",
    "icone.png",
    "icone.svg",
    "Selo Auxiliadora 60 anos_Ano 3.png",
    "semanas/2026-11-23/Leituras 23 a 29 novembro 2026.docx",
    "semanas/2026-11-23/1º DOMINGO DO ADVENTO - 28 E 29 NOVEMBRO 2026 - ANO B.docx",
    "semanas/2026-11-23/PRECES - 1º DOMINGO DO ADVENTO - 28 E 29 NOVEMBRO 2026.docx",
    "semanas/2026-11-23/RITO - BÊNÇÃO DA COROA DO ADVENTO E 1ª VELA - 28 E 29 NOVEMBRO 2026.docx",
    "semanas/2026-11-23/pdf/1º DOMINGO DO ADVENTO - 28 E 29 NOVEMBRO 2026 - ANO B.pdf",
    "semanas/2026-11-23/pdf/PRECES - 1º DOMINGO DO ADVENTO - 28 E 29 NOVEMBRO 2026.pdf",
    "semanas/2026-11-23/pdf/RITO - BÊNÇÃO DA COROA DO ADVENTO E 1ª VELA - 28 E 29 NOVEMBRO 2026.pdf",
    "semanas/2026-11-30/Leituras 30 novembro a 6 dezembro 2026.docx",
    "semanas/2026-11-30/2º DOMINGO DO ADVENTO - 5 E 6 DEZEMBRO 2026 - ANO B.docx",
    "semanas/2026-11-30/2º DOMINGO DO ADVENTO - SÁBADO 18H30 - 5 DEZEMBRO 2026.docx",
    "semanas/2026-11-30/PRECES - 2º DOMINGO DO ADVENTO - 5 E 6 DEZEMBRO 2026.docx",
    "semanas/2026-11-30/ADORAÇÃO EUCARÍSTICA SOLENE - 4 DEZEMBRO 2026.docx",
    "semanas/2026-11-30/RITO - 2ª VELA DO ADVENTO - 5 E 6 DEZEMBRO 2026.docx",
    "semanas/2026-11-30/pdf/2º DOMINGO DO ADVENTO - 5 E 6 DEZEMBRO 2026 - ANO B.pdf",
    "semanas/2026-11-30/pdf/PRECES - 2º DOMINGO DO ADVENTO - 5 E 6 DEZEMBRO 2026.pdf",
    "semanas/2026-11-30/pdf/RITO - 2ª VELA DO ADVENTO - 5 E 6 DEZEMBRO 2026.pdf",
    "semanas/2026-11-30/pdf/2º DOMINGO DO ADVENTO - SÁBADO 18H30 - 5 DEZEMBRO 2026.pdf",
    "semanas/2026-12-07/Leituras 7 a 13 dezembro 2026.docx",
    "semanas/2026-12-07/3º DOMINGO DO ADVENTO - 12 E 13 DEZEMBRO 2026 - ANO B.docx",
    "semanas/2026-12-07/PRECES - 3º DOMINGO DO ADVENTO - 12 E 13 DEZEMBRO 2026.docx",
    "semanas/2026-12-07/IMACULADA CONCEIÇÃO - SOLENIDADE - 8 DEZEMBRO 2026.docx",
    "semanas/2026-12-07/PRECES - IMACULADA CONCEIÇÃO - 8 DEZEMBRO 2026.docx",
    "semanas/2026-12-07/RITO - 3ª VELA DO ADVENTO - 12 E 13 DEZEMBRO 2026.docx",
    "semanas/2026-12-07/pdf/IMACULADA CONCEIÇÃO - SOLENIDADE - 8 DEZEMBRO 2026.pdf",
    "semanas/2026-12-07/pdf/PRECES - IMACULADA CONCEIÇÃO - 8 DEZEMBRO 2026.pdf",
    "semanas/2026-12-07/pdf/3º DOMINGO DO ADVENTO - 12 E 13 DEZEMBRO 2026 - ANO B.pdf",
    "semanas/2026-12-07/pdf/PRECES - 3º DOMINGO DO ADVENTO - 12 E 13 DEZEMBRO 2026.pdf",
    "semanas/2026-12-07/pdf/RITO - 3ª VELA DO ADVENTO - 12 E 13 DEZEMBRO 2026.pdf",
    "semanas/2026-12-14/Leituras 14 a 20 dezembro 2026.docx",
    "semanas/2026-12-14/4º DOMINGO DO ADVENTO - 19 E 20 DEZEMBRO 2026 - ANO B.docx",
    "semanas/2026-12-14/PRECES - 4º DOMINGO DO ADVENTO - 19 E 20 DEZEMBRO 2026.docx",
    "semanas/2026-12-14/RITO - 4ª VELA DO ADVENTO - 19 E 20 DEZEMBRO 2026.docx",
    "semanas/2026-12-14/pdf/4º DOMINGO DO ADVENTO - 19 E 20 DEZEMBRO 2026 - ANO B.pdf",
    "semanas/2026-12-14/pdf/PRECES - 4º DOMINGO DO ADVENTO - 19 E 20 DEZEMBRO 2026.pdf",
    "semanas/2026-12-14/pdf/RITO - 4ª VELA DO ADVENTO - 19 E 20 DEZEMBRO 2026.pdf",
    "semanas/2026-12-21/Leituras 21 a 27 dezembro 2026.docx",
    "semanas/2026-12-21/SAGRADA FAMÍLIA - 26 E 27 DEZEMBRO 2026 - ANO B.docx",
    "semanas/2026-12-21/PRECES - SAGRADA FAMÍLIA - 26 E 27 DEZEMBRO 2026.docx",
    "semanas/2026-12-21/NATAL DO SENHOR - MISSA DA NOITE - 24 DEZEMBRO 2026.docx",
    "semanas/2026-12-21/NATAL DO SENHOR - MISSA DO DIA - 25 DEZEMBRO 2026.docx",
    "semanas/2026-12-21/PRECES - NATAL DO SENHOR MISSA DA NOITE - 24 DEZEMBRO 2026.docx",
    "semanas/2026-12-21/PRECES - NATAL DO SENHOR MISSA DO DIA - 25 DEZEMBRO 2026.docx",
    "semanas/2026-12-21/RITO - BÊNÇÃO DO PRESÉPIO E RITOS DA NOITE DE NATAL - 24 DEZEMBRO 2026.docx",
    "semanas/2026-12-21/pdf/NATAL DO SENHOR - MISSA DA NOITE - 24 DEZEMBRO 2026.pdf",
    "semanas/2026-12-21/pdf/NATAL DO SENHOR - MISSA DO DIA - 25 DEZEMBRO 2026.pdf",
    "semanas/2026-12-21/pdf/PRECES - NATAL DO SENHOR MISSA DA NOITE - 24 DEZEMBRO 2026.pdf",
    "semanas/2026-12-21/pdf/PRECES - NATAL DO SENHOR MISSA DO DIA - 25 DEZEMBRO 2026.pdf",
    "semanas/2026-12-21/pdf/SAGRADA FAMÍLIA - 26 E 27 DEZEMBRO 2026 - ANO B.pdf",
    "semanas/2026-12-21/pdf/PRECES - SAGRADA FAMÍLIA - 26 E 27 DEZEMBRO 2026.pdf",
    "semanas/2026-12-21/pdf/RITO - BÊNÇÃO DO PRESÉPIO E RITOS DA NOITE DE NATAL - 24 DEZEMBRO 2026.pdf",
    "semanas/2026-12-28/Leituras 28 dezembro 2026 a 3 janeiro 2027.docx",
    "semanas/2026-12-28/EPIFANIA DO SENHOR - 2 E 3 JANEIRO 2027.docx",
    "semanas/2026-12-28/EPIFANIA DO SENHOR - DOMINGO 18H30 - 3 JANEIRO 2027.docx",
    "semanas/2026-12-28/PRECES - EPIFANIA DO SENHOR - 2 E 3 JANEIRO 2027.docx",
    "semanas/2026-12-28/7º DIA NA OITAVA DO NATAL - TE DEUM - 31 DEZEMBRO 2026.docx",
    "semanas/2026-12-28/SANTA MARIA MÃE DE DEUS - SOLENIDADE - 1 JANEIRO 2027.docx",
    "semanas/2026-12-28/PRECES - 7º DIA NA OITAVA DO NATAL - 31 DEZEMBRO 2026.docx",
    "semanas/2026-12-28/PRECES - SANTA MARIA MÃE DE DEUS - 1 JANEIRO 2027.docx",
    "semanas/2026-12-28/RITO - TE DEUM - 31 DEZEMBRO 2026.docx",
    "semanas/2026-12-28/pdf/7º DIA NA OITAVA DO NATAL - TE DEUM - 31 DEZEMBRO 2026.pdf",
    "semanas/2026-12-28/pdf/SANTA MARIA MÃE DE DEUS - SOLENIDADE - 1 JANEIRO 2027.pdf",
    "semanas/2026-12-28/pdf/PRECES - 7º DIA NA OITAVA DO NATAL - 31 DEZEMBRO 2026.pdf",
    "semanas/2026-12-28/pdf/PRECES - SANTA MARIA MÃE DE DEUS - 1 JANEIRO 2027.pdf",
    "semanas/2026-12-28/pdf/EPIFANIA DO SENHOR - 2 E 3 JANEIRO 2027.pdf",
    "semanas/2026-12-28/pdf/PRECES - EPIFANIA DO SENHOR - 2 E 3 JANEIRO 2027.pdf",
    "semanas/2026-12-28/pdf/RITO - TE DEUM - 31 DEZEMBRO 2026.pdf",
    "semanas/2026-12-28/pdf/EPIFANIA DO SENHOR - DOMINGO 18H30 - 3 JANEIRO 2027.pdf"
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
