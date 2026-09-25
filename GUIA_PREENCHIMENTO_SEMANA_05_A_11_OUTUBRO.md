# Guia de preenchimento — semana de 05 a 11 de outubro de 2026

Este aplicativo é **estático**. Ele **não deve** acessar, raspar, reproduzir nem inferir automaticamente páginas do Missal, páginas do Lecionário, antífonas, aclamações ou textos litúrgicos completos. Esses dados precisam ser **fornecidos e revisados pelo usuário** a partir de fontes e documentos autorizados.

## 1. Onde preencher a escala e a programação em `programacao.js`

Arquivo: `/home/runner/work/roteiro-liturgico/roteiro-liturgico/programacao.js`

Procure o bloco da semana com:
- `legacyWeek: 4`
- `id: '2026-10-05'`

Dentro dele, atualize cada cartão de:
- Segunda-feira, 05/10/2026
- Terça-feira, 06/10/2026
- Quarta-feira, 07/10/2026
- Quinta-feira, 08/10/2026
- Sexta-feira, 09/10/2026
- Fim de semana: 10 e 11/10/2026

Substitua os marcadores `A DEFINIR` e `PREENCHER PELO DOCX` por:
- celebração e cor litúrgica;
- horários;
- locais;
- celebrantes;
- referências das leituras;
- páginas do Lecionário e do Missal;
- antífonas e citações do telão no cartão do fim de semana.

## 2. Onde colar o roteiro no `modal_roteiro_4` em `index.html`

Arquivo: `/home/runner/work/roteiro-liturgico/roteiro-liturgico/index.html`

Procure por:
- `id="modal_roteiro_4"`
- `id="content_roteiro_4"`

Cole o conteúdo do roteiro DOCX dentro desse bloco, mantendo a estrutura em `.script-block` e `.script-row`.

Se quiser seguir o modelo existente, preencha as seções já abertas:
- Preparação
- Ritos Iniciais
- Liturgia da Palavra
- Liturgia Eucarística
- Rito da Comunhão e Encerramento

## 3. Onde colar as preces nos blocos `preces_*_4`

Ainda em `/home/runner/work/roteiro-liturgico/roteiro-liturgico/index.html`, procure por:
- `id="preces_sabado_4"`
- `id="preces_domingo_manha_4"`
- `id="preces_domingo_noite_4"`

Preencha cada bloco com o conteúdo do DOCX correspondente às faixas:
- sábado 18h30;
- domingo 09h00 e 11h00;
- domingo 18h30.

Substitua os placeholders de:
- introdução;
- resposta da assembleia;
- intenções;
- conclusão.

## 4. Onde substituir títulos/dias/textos em `leituras.js`

Arquivo: `/home/runner/work/roteiro-liturgico/roteiro-liturgico/leituras.js`

As chaves novas da semana são:
- `1l_seg_w5`, `sl_seg_w5`, `ev_seg_w5`
- `1l_ter_w5`, `sl_ter_w5`, `ev_ter_w5`
- `1l_qua_w5`, `sl_qua_w5`, `ev_qua_w5`
- `1l_qui_w5`, `sl_qui_w5`, `ev_qui_w5`
- `1l_sex_w5`, `sl_sex_w5`, `ev_sex_w5`
- `1l_dom_w5`, `sl_dom_w5`, `2l_dom_w5`, `ev_dom_w5`

Em cada entrada, revise:
- `title`;
- `day`;
- `text`.

Cole o texto integral correto do DOCX em `text`, sem inventar conteúdo.

## 5. Onde preencher antífonas e aclamação em `app.js` e no cartão do fim de semana em `programacao.js`

Arquivos:
- `/home/runner/work/roteiro-liturgico/roteiro-liturgico/app.js`
- `/home/runner/work/roteiro-liturgico/roteiro-liturgico/programacao.js`

No `app.js`, procure a chave:
- `antifonas_4`

Preencha os itens:
- Antífona de Entrada;
- Aclamação ao Evangelho;
- Antífona de Comunhão.

Depois, no cartão de fim de semana da nova semana em `programacao.js`, replique ou ajuste esses mesmos textos no quadro “Antífonas e Canto Interlecionais” e também preencha as citações do telão.

## 6. Como preencher páginas do Lecionário e Missal na tabela da programação

No bloco da nova semana em `programacao.js`, cada tabela tem colunas para:
- referência bíblica;
- Lecionário / página;
- partes do Missal / página.

Substitua cada `A DEFINIR` pelas páginas conferidas manualmente nas suas fontes autorizadas. O app estático **não consulta o Missal** e **não identifica páginas sozinho**.

## 7. Como testar localmente

Na pasta do repositório, execute um servidor simples. Exemplo com Python:

```bash
cd /home/runner/work/roteiro-liturgico/roteiro-liturgico
python3 -m http.server 8000
```

Depois:
1. abra `http://localhost:8000` no navegador;
2. selecione a aba da semana **05 a 11 Out. (28º Dom)**;
3. abra **Programação**, **Roteiro**, **Preces** e **Reflexões**;
4. abra **Leituras e Antífonas**;
5. marque algumas leituras e antífonas;
6. use **Visualizar Selecionadas**;
7. teste a impressão da programação, roteiro, preces e leituras.

## 8. Como pedir a próxima atualização ao Copilot

Na próxima solicitação, envie os arquivos DOCX ou cole, para cada dia:
- escala dos padres;
- programação completa;
- roteiro;
- preces;
- referências bíblicas;
- páginas do Lecionário;
- páginas do Missal;
- antífonas e aclamação;
- textos completos das leituras.

Um pedido ideal ao Copilot pode dizer algo como:

> Atualize a semana `2026-10-05` com os dados abaixo. Substitua todos os placeholders da programação, roteiro, preces, leituras, páginas do Lecionário/Missal e antífonas apenas nesta semana.

Assim a atualização seguinte pode ser feita de forma direta, sem alterar semanas anteriores.
