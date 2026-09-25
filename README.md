# Roteiro Litúrgico — Paróquia Nossa Senhora Auxiliadora

Site estático para programação litúrgica semanal, roteiro, preces, reflexões e leituras.

## Estrutura atual

- `index.html`: estrutura semântica da página (header/nav/main/modais) e carregamento dos scripts com `defer`.
- `styles.css`: estilos da aplicação (inclusive foco visível, tablist e ajustes mobile/print).
- `programacao.js`: dados estruturados por semana (`id` por data ISO) e conteúdo renderizado no painel semanal.
- `leituras.js`: base de leituras (`readingsData`) sem chaves duplicadas.
- `app.js`: renderização dinâmica, eventos, modais, impressão, acessibilidade e registro do service worker.
- `manifest.json`: metadados PWA.
- `sw.js`: cache offline de assets locais.
- `validate-data.js`: valida consistência de leituras e referências.

## Como editar os dados litúrgicos

1. Atualize as semanas em `programacao.js` no array `programacaoData.weeks`:
   - `id`: use data estável (`YYYY-MM-DD`), ex.: `2026-09-21`.
   - `shortTitle` e `fullTitle`: textos da aba e do banner.
   - `programacaoHtml`: conteúdo completo da semana (programação, celebrações, tabelas, antífonas e referências).
2. Atualize/adicione leituras em `leituras.js` mantendo chaves únicas.
3. Garanta que cada `data-reading-key="..."` usado em `programacaoHtml` exista em `readingsData`.

## Validação

Requisitos: Node.js 18+

```bash
npm run validate:data
```

A validação verifica:
- duplicidade de chaves em `leituras.js`;
- referências de leituras usadas em `programacao.js` mas ausentes em `leituras.js`;
- presença das abas esperadas de semana no `index.html` (os painéis são renderizados dinamicamente pelo `app.js`).

## Deploy no GitHub Pages

Como é um site estático, publique a branch no GitHub Pages (root do repositório). Arquivos necessários:

- `index.html`
- `styles.css`
- `app.js`
- `programacao.js`
- `leituras.js`
- `manifest.json`
- `sw.js`
- imagens (`icone.png`, `icone.svg`, `Selo Auxiliadora 60 anos_Ano 3.png`)

Após deploy, faça um hard refresh uma vez para atualização do service worker/cache.
