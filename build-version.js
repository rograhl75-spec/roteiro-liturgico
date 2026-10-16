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
    'RITO DE ENTREGA DO CREIO.pdf'
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
