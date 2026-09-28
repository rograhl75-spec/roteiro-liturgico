# Manual Técnico

## Roteiro Litúrgico — Paróquia Nossa Senhora Auxiliadora

Este manual é destinado a programadores e mantenedores do repositório `rograhl75-spec/roteiro-liturgico`.

A aplicação é um site estático com comportamento de PWA. Não utiliza servidor de aplicação ou banco de dados: os conteúdos são mantidos em arquivos HTML, CSS e JavaScript e publicados pelo GitHub Pages.

---

## 1. Requisitos

- Git;
- Node.js 18 ou superior;
- navegador moderno;
- servidor HTTP local para testar o Service Worker;
- acesso ao repositório GitHub.

Não abra o projeto usando apenas `file://`. O Service Worker exige HTTPS ou `localhost`.

---

## 2. Estrutura do projeto

| Arquivo | Responsabilidade |
|---|---|
| `index.html` | Estrutura HTML, cabeçalho, navegação, botões, modais e área de impressão. |
| `styles.css` | Layout, cores, responsividade, foco, acessibilidade e regras `@media print`. |
| `app.js` | Renderização dinâmica, semanas, modais, leituras, antífonas, impressão e registro do Service Worker. |
| `programacao.js` | Array `programacaoData.weeks` com a programação semanal. |
| `leituras.js` | Objeto `readingsData` com as leituras. |
| `antifonas.js` | Dados de antífonas, aclamações e citações da PASCOM. |
| `manifest.json` | Metadados e configuração instalável do PWA. |
| `sw.js` | Cache, fallback offline e atualização dos assets. |
| `validate-data.js` | Validação de chaves, referências e estrutura esperada. |
| `package.json` | Scripts de desenvolvimento e validação. |

---

## 3. Executar localmente

```bash
git clone https://github.com/rograhl75-spec/roteiro-liturgico.git
cd roteiro-liturgico
npm install
npx http-server .
```

Abra o endereço local informado, normalmente `http://localhost:8080`.

Também é possível usar a extensão Live Server do Visual Studio Code.

---

## 4. Atualizar a programação

Edite `programacao.js` e mantenha o padrão do array `programacaoData.weeks`.

Uma semana normalmente utiliza:

```javascript
{
  id: '2026-09-28',
  shortTitle: '28 Set. a 04 Out. (27º Dom)',
  fullTitle: 'Semana de 28 de Setembro a 04 de Outubro de 2026 (27º Domingo)',
  legacyWeek: 1,
  programacaoHtml: '...'
}
```

### Regras

- `id` deve ser estável e seguir `YYYY-MM-DD`;
- `shortTitle` é usado nas abas;
- `fullTitle` é usado no cabeçalho;
- `legacyWeek` relaciona a semana aos modais legados;
- `programacaoHtml` deve conter HTML válido e confiável;
- não renomeie IDs ou identificadores sem procurar seus usos no projeto.

---

## 5. Atualizar leituras

Edite `leituras.js` e mantenha chaves únicas em `readingsData`.

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

As chaves referenciadas em `programacaoHtml` por `data-reading-key="..."` devem existir exatamente em `readingsData`.

---

## 6. Atualizar antífonas

Edite `antifonas.js` mantendo a estrutura consumida por `getAntifonasData()` e `createAntifonaBlock()` em `app.js`.

Verifique:

- título;
- itens e rótulos;
- textos;
- referências;
- opções alternativas;
- citações da PASCOM.

---

## 7. IDs e integração com `app.js`

Antes de remover ou renomear um ID, pesquise seu uso em todos os arquivos.

IDs importantes incluem:

- `weeks-root`;
- `print-mount`;
- `content_programacao`;
- `content_leituras_view`;
- `modal_programacao`;
- `modal_seletor_leituras`;
- `modal_leituras_view`;
- `modal_roteiro_*`;
- `modal_preces_*`;
- `modal_reflexoes_*`.

Os botões utilizam atributos `data-action`, tratados por `handleActionClick()` em `app.js`.

---

## 8. Impressão e acessibilidade

A impressão é montada em `#print-mount` e acionada por `window.print()`.

As regras de impressão estão na seção `@media print` de `styles.css`.

Os textos principais devem manter tamanho mínimo de 12pt quando impressos, incluindo:

```css
.script-text,
.script-tag,
.leitura-dia,
.leitura-texto,
table.liturgy-table {
  font-size: 12pt;
}
```

Ao adicionar um novo componente que aparece na impressão:

1. crie seu estilo para tela;
2. crie ou revise o estilo em `@media print`;
3. confirme a fonte mínima de 12pt;
4. teste quebra de página;
5. teste impressão e PDF.

Preserve também:

- foco visível;
- navegação por teclado;
- atributos ARIA;
- contraste adequado;
- textos alternativos;
- botões com nomes claros.

---

## 9. Validação

Execute antes de publicar:

```bash
npm run validate:data
```

A validação verifica principalmente:

- duplicidade de chaves em `leituras.js`;
- referências ausentes;
- abas esperadas no `index.html`;
- consistência básica dos dados.

Também teste manualmente:

- seleção de semanas;
- abertura dos modais;
- A+ e A-;
- leituras e antífonas;
- impressão;
- visualização em celular;
- funcionamento online e offline.

---

## 10. Service Worker e atualizações

`sw.js` controla o cache do PWA.

O comportamento atual é:

- HTML, JavaScript, CSS e JSON usam estratégia network-first;
- imagens usam cache-first;
- em caso de falha de rede, o cache é usado como fallback;
- uma nova instalação aguarda o usuário escolher **Atualizar**;
- `app.js` detecta o Service Worker aguardando e mostra o banner de atualização;
- a página verifica atualizações ao voltar a ficar visível e periodicamente.

### Incrementar a versão do cache

Altere a constante quando o conteúdo publicado mudar:

```javascript
const CACHE_VERSION = 'roteiro-liturgico-v3';
```

Para a próxima versão:

```javascript
const CACHE_VERSION = 'roteiro-liturgico-v4';
```

A versão deve ser incrementada sempre que uma alteração publicada puder deixar arquivos antigos no cache. Quando o Copilot publicar uma alteração no projeto, deve tratar essa atualização de cache no mesmo conjunto de mudanças, quando aplicável.

### `updateViaCache: 'none'`

O registro em `app.js` utiliza:

```javascript
navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' });
```

Isso reduz o risco de o navegador reutilizar uma cópia antiga do próprio Service Worker.

---

## 11. Publicação no GitHub Pages

Configuração recomendada:

1. abra **Settings** do repositório;
2. acesse **Pages**;
3. escolha publicação a partir de uma branch;
4. selecione `main` e `/root`;
5. salve;
6. aguarde a publicação.

Arquivos necessários:

- `index.html`;
- `styles.css`;
- `app.js`;
- `programacao.js`;
- `leituras.js`;
- `antifonas.js`;
- `manifest.json`;
- `sw.js`;
- imagens e ícones referenciados.

---

## 12. Checklist de publicação

- [ ] Dados da nova semana atualizados.
- [ ] Leituras cadastradas e com chaves únicas.
- [ ] Referências `data-reading-key` conferidas.
- [ ] Antífonas e citações revisadas.
- [ ] `npm run validate:data` executado.
- [ ] Layout verificado em computador.
- [ ] Layout verificado em Android.
- [ ] Layout verificado em iPhone/Safari.
- [ ] Modais testados.
- [ ] Impressão testada.
- [ ] Fonte mínima de 12pt confirmada na impressão.
- [ ] Cache versionado quando necessário.
- [ ] Service Worker testado com uma versão antiga instalada.
- [ ] GitHub Pages atualizado.

---

## 13. Solução de problemas

### Página sem CSS

Verifique o caminho de `styles.css`, a publicação do commit e o cache do navegador. Teste em janela anônima e confirme se a requisição retorna o arquivo CSS.

### Conteúdo antigo no celular

Confirme o incremento de `CACHE_VERSION`, abra o endereço online, aguarde o banner e toque em **Atualizar**.

### Ícone continua antigo

Feche o aplicativo instalado, abra a versão online no navegador, atualize e abra novamente o ícone.

### Leitura não encontrada

Confira a correspondência exata entre `data-reading-key` e `readingsData`. Execute a validação.

### Impressão incorreta

Revise `#print-mount`, os clones usados pelas funções `print*()` e as regras de `@media print`.

---

## 14. Convenções de commit

Exemplos:

```text
feat: adicionar programação da semana
fix: corrigir atualização do cache no celular
fix: ajustar impressão das leituras
refactor: reorganizar dados das antífonas
docs: atualizar manual do projeto
```

Processo recomendado:

1. editar os dados;
2. validar;
3. testar no computador e no celular;
4. testar a impressão;
5. incrementar o cache quando necessário;
6. publicar;
7. verificar o GitHub Pages;
8. confirmar atualização em uma instalação antiga.

---

## 15. Informações do repositório

- **Repositório:** `rograhl75-spec/roteiro-liturgico`
- **Branch principal:** `main`
- **Tipo:** site estático/PWA
- **Linguagens:** JavaScript, HTML e CSS
- **Hospedagem:** GitHub Pages