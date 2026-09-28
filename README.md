# Roteiro Litúrgico

Aplicação web da Paróquia Nossa Senhora Auxiliadora para consultar a programação litúrgica semanal, roteiros, preces, leituras, antífonas e reflexões.

## Documentação

- [Manual do Usuário](MANUAL_USUARIO.md): instruções simples para acessar pelo computador, Android e iPhone, consultar conteúdos, imprimir e atualizar o aplicativo.
- [Manual Técnico](MANUAL_TECNICO.md): estrutura do projeto, edição dos dados, validação, impressão, Service Worker e publicação.

## Recursos principais

- programação organizada por semanas;
- roteiros e preces;
- leituras, antífonas e reflexões;
- ajuste do tamanho do texto;
- impressão em formato A4;
- fonte mínima de 12pt nos documentos impressos;
- instalação na tela inicial do celular;
- funcionamento básico offline;
- aviso de nova versão e atualização orientada ao usuário.

## Estrutura resumida

- `index.html`: estrutura da página e janelas de conteúdo;
- `styles.css`: aparência, responsividade, acessibilidade e impressão;
- `app.js`: funcionamento da aplicação e atualização do PWA;
- `programacao.js`: programação semanal;
- `leituras.js`: leituras bíblicas;
- `antifonas.js`: antífonas e citações;
- `sw.js`: cache e atualização do aplicativo;
- `validate-data.js`: validação dos dados.

## Repositório

- **Repositório:** `rograhl75-spec/roteiro-liturgico`
- **Branch principal:** `main`
- **Tipo:** site estático/PWA
- **Publicação:** GitHub Pages

Para instruções detalhadas, consulte os dois manuais vinculados acima.