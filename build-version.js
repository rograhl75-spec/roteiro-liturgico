'use strict';

const { createHash } = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const assets = [
    'index.html',
    'styles.css',
    'app.js',
    'programacao.js',
    'leituras.js',
    'antifonas.js',
    'roteiros.js',
    'manifest.json',
    'sw.js',
    'icone.png',
    'icone.svg',
    'Selo Auxiliadora 60 anos_Ano 3.png',
    'Escala Padres 2 a 8 novembro 2026.docx',
    'Leituras de 2 a 8 de novembro de 2026.docx',
    'Leituras e Lecionarios - 2 a 15 novembro 2026.xlsx',
    'Missal - 2 a 8 novembro_2026.xlsx',
    'Comemoração de Todos os Fiéis Defuntos - 02_11_2026 revisado.docx',
    'PRECES - COMEMORAÇÃO DE TODOS OS FIÉIS DEFUNTOS.docx',
    'Antífona da entrada e comunhão - Fiéis Defuntos 02-11-2026.docx',
    'ADORAÇÃO EUCARÍSTICA SOLENE - NOV 2026.pdf',
    '32º DOMINGO TEMPO COMUM -   7 E 8 NOVEMBRO 2026 - ANO A.docx',
    'PRECES - 32º DOMINGO TEMPO COMUM.docx',
    'Antífona da entrada e comunhão - 32º Domingo do Tempo Comum 08-11-2026.docx',
    'Escala Padres 9 a 15 novembro 2026.docx',
    'Leituras 9 a 15 novembro 2026.docx',
    'Missal - 9 a 15 novembro_2026.xlsx',
    '33º DOMINGO TEMPO COMUM - 14 E 15 NOVEMBRO 2026 - ANO A.docx',
    'PRECES - 33º DOMINGO TEMPO COMUM.docx',
    'Antífona da entrada e comunhão - 33º Domingo do Tempo Comum 15-11-2026.docx'
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
