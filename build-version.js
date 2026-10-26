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
    'manifest.json',
    'sw.js',
    'icone.png',
    'icone.svg',
    'Selo Auxiliadora 60 anos_Ano 3.png',
    'Escala Padres 26 outubro a 01 novembro 2026.pdf',
    'Leituras de 26 de outubro a 1 de novembro 2026.pdf',
    'Leituras e Lecionarios - 26 Outubro a 1 Novembro 2026.pdf',
    'Missal - 25 outubro a 1 novembro 2026.pdf',
    'Todos os Santos, Solenidade - 31 10 E 01 11 2026 - ANO A.pdf',
    'Antífona da entrada e comunhão - Todos os Santos, Solenidade.pdf',
    'PRECES - SOLENIDADE DE TODOS OS SANTOS.pdf',
    'Santos Simão e Judas - Missões - 28_10_2026 19h00.docx',
    'Escala Padres 2 a 8 novembro 2026.docx',
    'Leituras de 2 a 8 de novembro de 2026.docx',
    'Missal - 2 a 8 novembro_2026.xlsx',
    '32º DOMINGO TEMPO COMUM -   7 E 8 NOVEMBRO 2026 - ANO A.docx',
    'Comemoração de Todos os Fiéis Defuntos - 02_11_2026 revisado.docx',
    'Antífona da entrada e comunhão - 32º Domingo do Tempo Comum 08-11-2026.docx',
    'Antífona da entrada e comunhão - Fiéis Defuntos 02-11-2026.docx',
    'PRECES - 32º DOMINGO TEMPO COMUM.docx',
    'PRECES - COMEMORAÇÃO DE TODOS OS FIÉIS DEFUNTOS.docx'
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
