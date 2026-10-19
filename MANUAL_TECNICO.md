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
| `build-version.js` | Geração determinística dos metadados de publicação usando somente módulos nativos do Node.js. |
| `version.json` | Identificador da publicação e hashes SHA-256 dos arquivos públicos. |
| `.github/workflows/pages.yml` | Validação, geração dos metadados e implantação no Pages. |
| `package.json` | Scripts de desenvolvimento e validação. |

---

## 3. Executar localmente

```bash
git clone https://github.com/rograhl75-spec/roteiro-liturgico.git
cd roteiro-liturgico
npm run validate:data
npm run version
```

Sirva a pasta usando um servidor HTTP local já disponível, como a extensão Live Server do Visual Studio Code, e abra o endereço informado. Os scripts de validação e publicação não precisam de dependências npm.

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

Quando uma semana tem mais de um roteiro, use `roteiroLabel` (texto do botão principal) e `roteiroExtras` (ex.: `['aparecida']`) na semana em `programacao.js`. Cada chave extra precisa de um botão na barra com `data-roteiro-key` e de um modal `modal_roteiro_<semana>_<chave>` com conteúdo `content_roteiro_<semana>_<chave>`.

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

`sw.js` mantém snapshots completos e validados da publicação. Não há número de cache a incrementar manualmente.

### Metadados e integridade

Após as últimas edições dos arquivos públicos, execute `npm run version`. O gerador exige `index.html`, `styles.css`, `app.js`, `programacao.js`, `leituras.js`, `antifonas.js`, `manifest.json`, `sw.js`, `icone.png`, `icone.svg`, `Selo Auxiliadora 60 anos_Ano 3.png` e `RITO DE ENTREGA DO CREIO.pdf`.

Os sete PDFs-fonte da semana de 26/10 a 01/11/2026 também integram o snapshot offline. Ao incluir documentos nesse snapshot, mantenha as listas de assets de `build-version.js` e `sw.js` alinhadas e preserve os nomes originais.

O `version.json` contém `{ "version": "...", "files": { "./index.html": "...", ... } }`. Cada valor em `files` é o SHA-256 dos bytes publicados do arquivo. Para calcular `version`, o gerador remove as tags `<meta name="app-version">` do HTML, calcula os hashes na ordem fixa declarada em `build-version.js` e aplica SHA-256 ao `JSON.stringify` desse mapa. Depois insere a meta com o identificador e recalcula o hash real de `index.html` em `files`. Isso evita uma referência circular e torna execuções repetidas idempotentes.

O Service Worker confere todos os arquivos contra esses hashes antes de preparar o novo snapshot. Publicação incompleta, resposta inválida ou falha de rede não substitui o snapshot anterior. SHA-256 garante consistência dos arquivos com o manifesto, não uma assinatura independente da origem: HTTPS continua necessário.

### Carregamento e troca segura

- HTML, JavaScript, CSS e JSON usam network-first **somente quando a resposta corresponde ao hash do snapshot em uso**; caso contrário, usa-se a cópia validada em cache. Isso impede misturar código ou dados de publicações diferentes.
- Imagens usam cache-first dentro do snapshot validado.
- A meta `app-version` identifica a versão carregada pela página.
- `app.js` e o worker coordenam a preparação e a ativação com as mensagens `PREPARE_UPDATE` e `ACTIVATE_UPDATE`.
- A ativação exige uma verificação de segurança de todos os clientes abertos: nenhum modal aberto e nenhuma impressão em andamento. Uma aba ocupada impede a troca para todas as abas.
- A segurança da impressão aguarda o evento `afterprint`, sem cancelamento automático por tempo. Se uma interrupção do diálogo impedir esse evento e deixar a atualização pendente, feche e reabra o aplicativo ou a aba afetada.
- Após a troca, a seleção da semana, tamanho da fonte, rolagem e foco são restaurados quando seus destinos continuam disponíveis.
- A busca ocorre na abertura, no retorno à visibilidade, no evento `online` e a cada cinco minutos; navegadores podem suspender temporizadores em segundo plano.
- O botão permanente **Buscar atualização** permite uma busca explícita. O indicador offline informa o estado de conexão.

### `updateViaCache: 'none'`

O registro em `app.js` utiliza:

```javascript
navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' });
```

Isso reduz o risco de o navegador reutilizar uma cópia antiga do próprio Service Worker.

---

## 11. Publicação no GitHub Pages

Configuração obrigatória uma única vez:

1. abra **Settings** do repositório;
2. acesse **Pages**;
3. em **Build and deployment → Source**, selecione **GitHub Actions** (não publicação a partir de uma branch);
4. confira as permissões e proteções do ambiente `github-pages`;
5. publique um commit em `main` ou execute o workflow manualmente em **Actions → Publicar no GitHub Pages → Run workflow**.

O workflow roda em cada push para `main` e por `workflow_dispatch`. Primeiro executa `npm run validate:data`, depois `npm run version`, separa somente os arquivos públicos e envia/implanta o artefato estático. Assim, toda publicação gera metadados automaticamente, mesmo quando somente dados ou imagens mudaram. Os arquivos gerados ficam no artefato; o workflow não faz commit no repositório.

As ações estão fixadas por SHA imutável. O job de geração recebe somente leitura do repositório; apenas o job de implantação recebe `pages: write` e `id-token: write`.

Para publicação local ou de branch fora desse workflow, execute `npm run validate:data` e **`npm run version` após todas as edições finais**, então publique o HTML modificado junto com `version.json` e todos os assets correspondentes. Não altere assets depois de gerar os hashes sem executar novamente o gerador.

Arquivos necessários:

- `index.html`;
- `styles.css`;
- `app.js`;
- `programacao.js`;
- `leituras.js`;
- `antifonas.js`;
- `manifest.json`;
- `sw.js`;
- `version.json`;
- imagens e ícones referenciados.
- PDFs referenciados pelo HTML e pela programação (copiados para o artefato pelo workflow).

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
- [ ] Metadados gerados automaticamente no workflow, ou `npm run version` executado após as últimas edições na publicação manual.
- [ ] Service Worker testado com uma versão antiga instalada.
- [ ] Snapshot anterior preservado ao simular download incompleto ou hash incorreto.
- [ ] Atualização bloqueada por cada modal e pela impressão, inclusive em outra aba.
- [ ] Semana, fonte, rolagem e foco restaurados após a troca.
- [ ] Busca automática e botão Buscar atualização conferidos; indicador offline conferido.
- [ ] GitHub Pages atualizado.

Os testes em **aparelhos Android reais e iPhone/Safari reais**, tanto no navegador quanto no PWA instalado, são manuais e devem ser executados pela equipe. Este checklist não afirma que esses aparelhos já foram testados.

---

## 13. Solução de problemas

### Página sem CSS

Verifique o caminho de `styles.css`, a publicação do commit e o cache do navegador. Teste em janela anônima e confirme se a requisição retorna o arquivo CSS.

### Conteúdo antigo no celular

Confira se o workflow publicou com sucesso e se `version.json` corresponde aos assets servidos. Abra online e use **Buscar atualização**. Feche todos os modais e termine a impressão em todas as abas. Se um hash não conferir, corrija a publicação e gere novamente os metadados; não apague o snapshot anterior para forçar uma atualização incompleta.

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
5. deixar o workflow gerar metadados, ou executar `npm run version` após as últimas edições para publicação manual;
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