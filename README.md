# Roteiro Litúrgico — Paróquia Nossa Senhora Auxiliadora

Aplicação web estática e instalável como PWA para consulta da programação litúrgica semanal, roteiros, preces, leituras, antífonas, reflexões e referências da liturgia.

O projeto foi desenvolvido para funcionar em computadores, tablets e celulares, inclusive com suporte básico a acesso offline por meio de um Service Worker.

---

## Sumário

- [1. Visão geral](#1-visão-geral)
- [2. Recursos para usuários](#2-recursos-para-usuários)
- [3. Como acessar pelo celular](#3-como-acessar-pelo-celular)
- [4. Como imprimir](#4-como-imprimir)
- [5. Atualizações para usuários](#5-atualizações-para-usuários)
- [6. Estrutura do projeto](#6-estrutura-do-projeto)
- [7. Requisitos de desenvolvimento](#7-requisitos-de-desenvolvimento)
- [8. Como executar localmente](#8-como-executar-localmente)
- [9. Como atualizar os dados litúrgicos](#9-como-atualizar-os-dados-litúrgicos)
- [10. Regras importantes para edição](#10-regras-importantes-para-edição)
- [11. Validação dos dados](#11-validação-dos-dados)
- [12. Service Worker e cache](#12-service-worker-e-cache)
- [13. Publicação no GitHub Pages](#13-publicação-no-github-pages)
- [14. Checklist de publicação](#14-checklist-de-publicação)
- [15. Solução de problemas](#15-solução-de-problemas)
- [16. Convenções de manutenção](#16-convenções-de-manutenção)

---

## 1. Visão geral

O site apresenta uma semana litúrgica por vez. O usuário pode alternar entre as semanas disponíveis e abrir os conteúdos em janelas próprias para leitura e impressão.

Os conteúdos principais são:

- programação litúrgica;
- escalas de horários, locais e celebrantes;
- roteiros de celebrações;
- preces dos fiéis;
- leituras bíblicas;
- antífonas e aclamações;
- citações da PASCOM;
- reflexões litúrgicas;
- referências da Liturgia CNBB;
- impressão dos documentos em formato adequado para papel.

A aplicação não possui servidor ou banco de dados. Os dados ficam em arquivos JavaScript versionados no próprio repositório.

---

## 2. Recursos para usuários

### 2.1 Seleção de semanas

Na parte superior da página existem abas para alternar entre as semanas cadastradas. A semana selecionada é exibida no conteúdo principal.

### 2.2 Janelas de conteúdo

Os botões principais permitem abrir:

- **Programação**;
- **Roteiro**;
- **Preces**;
- **Leituras e Antífonas**;
- **Reflexões**;
- **Liturgia CNBB**.

### 2.3 Ajuste do tamanho da fonte

As janelas de leitura possuem botões **A+** e **A-** para aumentar ou diminuir o texto durante a leitura na tela.

A impressão possui regras próprias de acessibilidade: os textos principais impressos devem permanecer com tamanho mínimo de **12pt**, incluindo roteiros, preces, leituras, antífonas e tabelas.

### 2.4 Impressão

Cada conteúdo possui um botão de impressão. O sistema monta uma versão específica para impressão, ocultando os elementos de navegação e mantendo apenas o documento selecionado.

### 2.5 Funcionamento pelo ícone do celular

O site pode ser instalado na tela inicial do celular por meio da opção do navegador:

- Android/Chrome: **Adicionar à tela inicial** ou **Instalar aplicativo**;
- iPhone/Safari: **Compartilhar → Adicionar à Tela de Início**.

Depois de instalado, o usuário pode abrir o roteiro pelo ícone como se fosse um aplicativo.

---

## 3. Como acessar pelo celular

1. Abra o endereço do site no navegador.
2. Aguarde o carregamento completo.
3. Use o menu do navegador para adicionar o site à tela inicial.
4. Abra o conteúdo pelo novo ícone.
5. Quando aparecer o aviso **Nova versão disponível**, toque em **Atualizar**.

É recomendável abrir o aplicativo com conexão à internet pelo menos uma vez antes de uma celebração, para garantir que os arquivos mais recentes estejam disponíveis.

---

## 4. Como imprimir

1. Escolha a semana desejada.
2. Abra o conteúdo que deseja imprimir.
3. Toque ou clique em **Imprimir**.
4. Na caixa de impressão do navegador, selecione a impressora ou a opção **Salvar como PDF**.
5. Para melhor resultado, mantenha o formato de papel **A4** e a orientação indicada pelo navegador.

A versão impressa utiliza fonte mínima de 12pt para melhorar a leitura dos usuários.

---

## 5. Atualizações para usuários

A aplicação utiliza um Service Worker para controlar o cache e permitir funcionamento offline.

O comportamento atual é:

- arquivos HTML, CSS, JavaScript e JSON tentam ser obtidos primeiro da rede;
- imagens podem ser atendidas pelo cache para melhorar o desempenho;
- quando não há internet, o sistema utiliza os arquivos disponíveis no cache;
- ao detectar uma nova versão, o site mostra o aviso **🔄 Nova versão disponível**;
- o usuário toca em **Atualizar** para carregar a versão nova;
- ao voltar ao aplicativo, o sistema verifica novamente se existe atualização;
- uma verificação periódica também é feita enquanto a página permanece aberta.

### Observação importante

Usuários que instalaram uma versão muito antiga podem precisar abrir o endereço online e fazer uma atualização manual uma única vez. Depois que receberem o Service Worker atualizado, o processo passa a ser automático.

---

## 6. Estrutura do projeto

| Arquivo | Finalidade |
|---|---|
| `index.html` | Estrutura HTML da aplicação, cabeçalho, navegação, modais e área de impressão. |
| `styles.css` | Estilos da aplicação, responsividade, acessibilidade e regras de impressão. |
| `app.js` | Lógica da aplicação, navegação entre semanas, modais, leituras, impressão e atualização do PWA. |
| `programacao.js` | Dados estruturados da programação semanal. |
| `leituras.js` | Base das leituras bíblicas e textos relacionados. |
| `antifonas.js` | Antífonas, aclamações e citações da PASCOM. |
| `manifest.json` | Configuração do aplicativo instalável/PWA. |
| `sw.js` | Service Worker, cache offline e atualização dos arquivos. |
| `validate-data.js` | Script de validação das referências e da estrutura dos dados. |
| `package.json` | Scripts e configurações para validação local. |
| `icone.png` / `icone.svg` | Ícones usados pelo site e pelo aplicativo instalado. |

---

## 7. Requisitos de desenvolvimento

Para editar e validar o projeto, utilize:

- Git;
- Node.js 18 ou superior;
- um navegador moderno;
- acesso ao repositório GitHub;
- um servidor HTTP local para testar o Service Worker.

O site não deve ser testado abrindo diretamente o arquivo `index.html` com `file://`, pois Service Workers e alguns recursos do navegador exigem HTTP ou HTTPS.

---

## 8. Como executar localmente

Depois de clonar o repositório:

```bash
git clone https://github.com/rograhl75-spec/roteiro-liturgico.git
cd roteiro-liturgico
```

Instale as dependências, se houver:

```bash
npm install
```

Para iniciar um servidor local simples, uma opção é utilizar o módulo `http-server`:

```bash
npx http-server .
```

Depois, abra no navegador o endereço informado pelo comando, normalmente semelhante a:

```text
http://localhost:8080
```

Outra opção é usar a extensão **Live Server** do Visual Studio Code.

---

## 9. Como atualizar os dados litúrgicos

### 9.1 Atualizar a programação semanal

Edite `programacao.js`, especialmente o array `programacaoData.weeks`.

Cada semana deve possuir, conforme o padrão atual do projeto:

- `id`: identificador estável no formato `YYYY-MM-DD`;
- `shortTitle`: título curto exibido na aba;
- `fullTitle`: título completo exibido no cabeçalho;
- `legacyWeek`: identificador usado pelos conteúdos legados dos modais;
- `programacaoHtml`: conteúdo da programação semanal.

Exemplo de identificação:

```javascript
{
  id: '2026-09-28',
  shortTitle: '28 Set. a 04 Out. (27º Dom)',
  fullTitle: 'Semana de 28 de Setembro a 04 de Outubro de 2026 (27º Domingo)',
  legacyWeek: 1,
  programacaoHtml: '...'
}
```

Use o padrão já existente no arquivo antes de criar uma nova semana. Não altere identificadores antigos sem verificar os vínculos com o HTML.

### 9.2 Atualizar leituras

Edite `leituras.js` e adicione ou altere entradas em `readingsData`.

Cada chave deve ser única. As chaves utilizadas no atributo `data-reading-key` de `programacaoHtml` precisam existir em `readingsData`.

Exemplo:

```javascript
const readingsData = {
  leitura_exemplo: {
    day: 'Domingo',
    title: 'Primeira Leitura',
    text: 'Texto da leitura...'
  }
};
```

### 9.3 Atualizar antífonas

Edite `antifonas.js` mantendo a estrutura utilizada pelas funções de renderização. Verifique especialmente:

- título da antífona;
- rótulo de cada item;
- texto;
- referência bíblica;
- opções alternativas;
- citações da PASCOM.

### 9.4 Conteúdos dos roteiros e preces

Os roteiros, preces e reflexões estão relacionados aos identificadores das semanas e aos elementos existentes em `index.html` e `programacao.js`.

Ao adicionar uma semana, verifique se todos os elementos esperados para `legacyWeek` existem ou se a lógica dinâmica precisa ser ajustada.

---

## 10. Regras importantes para edição

### 10.1 Não remover identificadores usados pelo JavaScript

Antes de renomear ou remover um `id`, procure sua utilização em `app.js`, `index.html` e nos arquivos de dados.

Exemplos de identificadores importantes:

- `weeks-root`;
- `content_programacao`;
- `content_leituras_view`;
- `print-mount`;
- `modal_leituras_view`;
- `modal_seletor_leituras`;
- `modal_roteiro_*`;
- `modal_preces_*`;
- `modal_reflexoes_*`.

### 10.2 Referências de leitura

Todo `data-reading-key="..."` deve apontar para uma chave existente em `readingsData`.

### 10.3 HTML inserido nos dados

O conteúdo de `programacaoHtml` é inserido dinamicamente na página. Utilize somente HTML confiável e siga o padrão dos conteúdos já existentes.

Evite inserir:

- elementos `<script>`;
- atributos `onclick` ou outros eventos inline;
- links com `javascript:`;
- HTML incompleto ou tags sem fechamento.

### 10.4 Impressão

Ao alterar estilos ou criar novos componentes, confira também a seção `@media print` do `styles.css`.

Os textos principais impressos devem continuar com, no mínimo:

```css
font-size: 12pt;
```

Isso inclui, conforme o componente:

- `.script-text`;
- `.script-tag`;
- `.leitura-dia`;
- `.leitura-texto`;
- `table.liturgy-table`;
- textos de antífonas e preces impressos.

### 10.5 Acessibilidade

Preserve:

- foco visível em botões e links;
- navegação por teclado;
- atributos `role`, `aria-label`, `aria-labelledby` e `aria-hidden`;
- texto alternativo das imagens;
- contraste adequado entre texto e fundo;
- botões com nomes claros.

---

## 11. Validação dos dados

Execute:

```bash
npm run validate:data
```

A validação verifica principalmente:

- duplicidade de chaves em `leituras.js`;
- referências usadas em `programacao.js` que não existem em `leituras.js`;
- presença das abas esperadas de semana no `index.html`;
- consistência básica entre os arquivos de dados.

Faça a validação antes de publicar qualquer alteração.

---

## 12. Service Worker e cache

O arquivo `sw.js` controla o comportamento offline e a atualização do aplicativo.

### 12.1 Quando alterar a versão do cache

Ao publicar uma alteração relevante nos arquivos da aplicação, atualize a constante:

```javascript
const CACHE_VERSION = 'roteiro-liturgico-v3';
```

Por exemplo:

```javascript
const CACHE_VERSION = 'roteiro-liturgico-v4';
```

A alteração faz com que o navegador crie um novo cache e remova o cache antigo durante a ativação do Service Worker.

### 12.2 Regra de manutenção do projeto

Sempre que uma alteração for publicada por meio de uma solicitação ao Copilot, a versão do cache deve ser incrementada no mesmo conjunto de alterações, quando necessário.

Exemplo de sequência:

- primeira publicação com atualização automática: `v3`;
- próxima alteração publicada: `v4`;
- alteração seguinte: `v5`.

Não reutilize uma versão antiga depois que o conteúdo publicado mudou.

### 12.3 Cuidados

O Service Worker só funciona em:

- HTTPS; ou
- `localhost` durante o desenvolvimento.

Após alterar `sw.js`, teste em uma janela anônima ou limpe os dados do site se o navegador continuar usando uma versão anterior.

---

## 13. Publicação no GitHub Pages

O projeto é um site estático e pode ser publicado no GitHub Pages.

### 13.1 Arquivos necessários

A publicação deve incluir pelo menos:

- `index.html`;
- `styles.css`;
- `app.js`;
- `programacao.js`;
- `leituras.js`;
- `antifonas.js`;
- `manifest.json`;
- `sw.js`;
- imagens e ícones utilizados pelo projeto.

### 13.2 Configuração recomendada

No GitHub:

1. Abra **Settings** do repositório.
2. Acesse **Pages**.
3. Em **Build and deployment**, escolha a publicação a partir de uma branch.
4. Selecione a branch `main` e a pasta `/root`.
5. Salve a configuração.
6. Aguarde a publicação do endereço do GitHub Pages.

### 13.3 Após uma publicação

Depois de publicar:

1. abra o endereço online;
2. verifique se o CSS foi carregado;
3. teste a troca de semanas;
4. abra pelo menos um roteiro, uma prece e uma leitura;
5. teste a impressão;
6. confirme que o Service Worker foi atualizado;
7. teste o aviso de nova versão em um navegador ou dispositivo que tenha a versão anterior.

---

## 14. Checklist de publicação

Antes de publicar uma alteração:

- [ ] Os dados da nova semana estão em `programacao.js`.
- [ ] As leituras novas estão em `leituras.js`.
- [ ] As chaves de leitura são únicas.
- [ ] Todas as referências `data-reading-key` existem.
- [ ] As antífonas e citações foram atualizadas.
- [ ] Os modais abrem corretamente.
- [ ] A programação aparece na semana correta.
- [ ] Os botões A+ e A- funcionam.
- [ ] A impressão funciona.
- [ ] A impressão mantém fonte mínima de 12pt.
- [ ] O layout funciona no celular.
- [ ] O layout continua funcionando no computador.
- [ ] `npm run validate:data` foi executado sem erros.
- [ ] A versão do cache do `sw.js` foi incrementada quando necessário.
- [ ] A página foi testada com conexão à internet.
- [ ] A página foi testada em uma instalação antiga do aplicativo.

---

## 15. Solução de problemas

### 15.1 A página aparece sem formatação

Verifique:

1. se `styles.css` está presente no repositório;
2. se o caminho no `index.html` está correto;
3. se o navegador não está usando um cache antigo;
4. se o Service Worker foi atualizado;
5. se a página foi publicada pelo GitHub Pages após o último commit.

Como teste, faça uma atualização forçada ou limpe os dados do site.

### 15.2 O celular mostra conteúdo antigo

Abra o endereço online com internet e aguarde o aviso **Nova versão disponível**. Toque em **Atualizar**.

Se o aviso não aparecer:

- feche completamente o aplicativo instalado;
- abra o endereço pelo navegador;
- faça uma atualização forçada;
- abra novamente pelo ícone da tela inicial.

### 15.3 A página funciona no computador, mas não no ícone

Isso normalmente indica cache antigo do Service Worker. Confirme se:

- `sw.js` teve a versão incrementada;
- o usuário abriu o site online pelo menos uma vez;
- o navegador conseguiu instalar o novo Service Worker.

### 15.4 Uma leitura não aparece

Verifique se:

- a chave usada no HTML está escrita exatamente como em `readingsData`;
- não existem espaços ou caracteres diferentes na chave;
- o arquivo `leituras.js` está sendo carregado no `index.html`;
- a validação foi executada.

### 15.5 O roteiro abre, mas a impressão fica incorreta

Verifique:

- as regras da seção `@media print`;
- o elemento `#print-mount`;
- as classes usadas no conteúdo clonado;
- se algum estilo inline está sobrescrevendo o tamanho da fonte;
- se o navegador está configurado para imprimir gráficos de fundo quando necessário.

---

## 16. Convenções de manutenção

### Commits

Use mensagens de commit curtas e objetivas, por exemplo:

```text
feat: adicionar programação da semana
fix: corrigir atualização do cache no celular
fix: ajustar impressão das leituras
refactor: reorganizar dados das antífonas
docs: atualizar manual do projeto
```

### Processo recomendado

1. Faça uma cópia ou trabalhe em uma branch de teste.
2. Atualize os dados necessários.
3. Execute a validação.
4. Teste no computador e no celular.
5. Teste a impressão.
6. Incremente a versão do cache quando necessário.
7. Publique no GitHub Pages.
8. Abra a versão online e confirme o funcionamento.
9. Comunique aos usuários que existe uma nova versão, se necessário.

### Responsabilidade do mantenedor

Quem publicar uma alteração deve garantir que:

- os arquivos estejam consistentes;
- o conteúdo litúrgico esteja correto;
- os usuários consigam visualizar a atualização;
- o acesso pelo ícone do celular continue funcionando;
- a versão impressa permaneça legível.

---

## Informações do repositório

- **Repositório:** `rograhl75-spec/roteiro-liturgico`
- **Branch principal:** `main`
- **Tipo:** site estático/PWA
- **Linguagens predominantes:** JavaScript, HTML e CSS
- **Hospedagem prevista:** GitHub Pages

---

## Licença e conteúdo

Este projeto contém conteúdo litúrgico e materiais destinados ao uso pastoral da Paróquia Nossa Senhora Auxiliadora. Antes de redistribuir ou reutilizar os textos, imagens e materiais pastorais, confirme as permissões correspondentes.
