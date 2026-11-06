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
| `index.html` | Estrutura fixa: cabeçalho, barra de ações, janelas genéricas (programação, seleção e visualização de leituras, mensagens) e área de impressão. Abas, roteiros, preces e blocos de leituras **não** ficam mais no HTML. |
| `styles.css` | Layout, cores, responsividade, foco, acessibilidade e regras `@media print`. |
| `app.js` | Renderização das abas, semanas, janelas de roteiro/preces, seleção de leituras, impressão e atualização do PWA. |
| `semanas/<segunda-feira>/` | **Fonte de cada semana**: `semana.json` (montado pela ferramenta) e os documentos originais publicados (Leituras, Roteiro, Preces, extras). |
| `dados/missal.json` | Índice do Missal Romano (2023): páginas de coleta, oferendas, depois da comunhão, prefácios, bênçãos e antífonas de cada formulário (tempo e santoral). |
| `dados/lecionario.json` | Cadastro único `referência → "Volume / página"` do lecionário; cresce a cada semana montada. |
| `ferramentas/montar-semana.html` | Ferramenta no navegador que lê os arquivos da semana e gera o pacote `.zip` (nada é enviado à internet). |
| `ferramentas/semana-lib.js`, `ferramentas/office.js` | Leitura de DOCX/XLSX e montagem da semana (sem dependências; funcionam no navegador e no Node.js). |
| `ferramentas/montar-site.js` | Gera `semanas.js`, `leituras.js`, `antifonas.js`, `roteiros.js` e as listas de arquivos de `sw.js`/`build-version.js`; com `--copiar _site` separa os arquivos públicos. |
| `programacao.js` | Gerador único `montarSemana()`, que produz `programacaoData.weeks` a partir de `semanasData`. |
| `semanas.js`, `roteiros.js`, `leituras.js`, `antifonas.js` | **Gerados automaticamente** por `montar-site.js` — não editar à mão. |
| `manifest.json` | Metadados e configuração instalável do PWA. |
| `sw.js` | Cache, fallback offline e atualização dos assets. |
| `validate-data.js` | Validação genérica de consistência entre todos os dados (não depende de datas fixas). |
| `build-version.js` | Geração determinística dos metadados de publicação usando somente módulos nativos do Node.js. |
| `version.json` | Identificador da publicação e hashes SHA-256 dos arquivos públicos. |
| `tests/site.spec.js` | Testes de navegador genéricos, que percorrem todas as semanas publicadas. |
| `.github/workflows/pages.yml` | Validação, geração dos metadados e implantação no Pages. |

---

## 3. Executar localmente

```bash
git clone https://github.com/rograhl75-spec/roteiro-liturgico.git
cd roteiro-liturgico
npm run validate:data
npm run version
python3 -m http.server 4173
```

Abra `http://localhost:4173`. Os scripts de validação e publicação não precisam de dependências npm.

---

## 4. Publicar uma nova semana (passo a passo)

Não é preciso editar código. O passo a passo para o usuário está em `GUIA_NOVA_SEMANA.md`. Resumo técnico:

1. Abrir `…/ferramentas/montar-semana.html` no site, escolher a segunda-feira e soltar os arquivos: Leituras (.docx), Roteiro e Preces do domingo, roteiros/preces de outras celebrações (com o dia), PDFs e a planilha “Escala e Espórtulas”.
2. A ferramenta (`semana-lib.js`):
   - **Leituras:** texto integral do DOCX semanal; referências do cabeçalho “Leituras:”; forma “mais breve” separada automaticamente; frases-título (linhas antes de “Leitura…/Proclamação…”) e refrão do salmo vão só para as **Citações para a transmissão**; a frase-título é retirada do texto da leitura.
   - **Missal:** páginas escritas nos roteiros (“Oração da Coleta (pág. 415)”, “Prefácio … (pág. 479)”, “ORAÇÃO EUCARÍSTICA II – pág. 537”, “Bênção Solene … (pág. 588)”) têm prioridade; nos demais dias usa `dados/missal.json` com as regras: féria verde → coleta do domingo da semana, prefácio 564 e OE V (565); memória/festa/solenidade → páginas do santoral (ou do Comum indicado), prefácio próprio ou do Comum, OE II (537); fim de semana → Glória/Creio/prefácio conforme o roteiro.
   - **Escala:** abas Missas, Confissões e Casamentos, só colunas públicas; telefones, vínculos e valores nunca são lidos. Missa votiva na coluna “Celebração” muda o grau e a cor do dia.
   - **Lecionário:** páginas de `dados/lecionario.json`; as que faltam são digitadas na revisão e voltam no pacote.
   - **Antífonas:** domingo e festas/solenidades/comemorações, a partir do índice do Missal + aclamação do DOCX de leituras.
3. O pacote `.zip` contém `semanas/<segunda>/semana.json`, os documentos e `dados/lecionario.json`. Enviar as pastas ao GitHub (*Add file → Upload files*).
4. O workflow executa `node ferramentas/montar-site.js`, valida, gera `version.json` e publica. Ele roda também todo dia às 03h17 (Londrina): publica só as semanas que ainda não terminaram (até 3); as antigas saem sozinhas, sem apagar pastas.

Correções pontuais podem ser feitas editando o `semana.json` da pasta (ou montando a semana de novo e reenviando).

A semana exibida ao abrir o aplicativo é escolhida automaticamente pela data (fuso de Brasília): a semana que contém o dia de hoje, senão a próxima, senão a mais recente.

### Papéis reconhecidos nos roteiros

O texto do papel define a cor da linha: `Animador`, `Padre`, `Diácono`, `Música`, `Todos`, `Leitor`/`1ª Leitura`/`2ª Leitura`; qualquer outro (ex.: `Orientação`, `Liturgia`, `Acólito`, `Coroinhas`) aparece como rubrica.

---

## 5. IDs e integração com `app.js`

`app.js` gera, a partir dos dados, os seguintes IDs (não os escreva no HTML):

- abas `btn-tab-<id>` e painéis `week-panel-<id>`;
- `modal_roteiro_<sufixo>` / `content_roteiro_<sufixo>`, `modal_preces_<sufixo>` / `content_preces_<sufixo>`, `modal_reflexoes_<legacyWeek>`;
- formulários de preces `preces_<sufixo>_<n>` (cada um impresso em página própria);
- blocos de seleção `leituras_semana_<legacyWeek>`.

Elementos fixos do `index.html`: `week-tabs`, `weeks-root`, `document-modals`, `leituras-blocos`, `print-mount`, `modal_programacao`, `modal_seletor_leituras`, `modal_leituras_view`, `generalModal`, `btn-roteiro-principal`, `btn-preces-principal`, `toolbar-roteiro-extras`, `toolbar-preces-extras`.

Os botões utilizam atributos `data-action`, tratados por `handleActionClick()` em `app.js`. As referências bíblicas são `<button>` (acessíveis por teclado).

---

## 6. Impressão e acessibilidade

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

## 7. Validação

Execute antes de publicar:

```bash
npm run validate:data
```

A validação é genérica e verifica:

- chaves de leitura duplicadas ou incompletas;
- referências de leituras e antífonas inexistentes, e itens órfãos (sem uso em nenhuma semana);
- roteiros e preces principais/adicionais de cada semana;
- datas dentro do período da semana e navegação por dia;
- IDs duplicados e elementos obrigatórios do `index.html`;
- listas de assets idênticas em `build-version.js` e `sw.js`, arquivos existentes e documentos vinculados;
- privacidade: telefones e valores em reais na página, documentos soltos na raiz e qualquer arquivo de espórtulas no repositório.

Antes da validação, rode `node ferramentas/montar-site.js` (com `HOJE=AAAA-MM-DD` para simular outra data).

Testes de navegador (opcional): `npm ci`, `npx playwright install chromium` e `npm run test:browser`.

Também teste manualmente:

- seleção de semanas;
- abertura dos modais;
- A+ e A-;
- leituras e antífonas;
- impressão;
- visualização em celular;
- funcionamento online e offline.

---

## 8. Service Worker e atualizações

`sw.js` mantém snapshots completos e validados da publicação. Não há número de cache a incrementar manualmente.

### Metadados e integridade

Após as últimas edições dos arquivos públicos, execute `npm run version`. O gerador exige os arquivos públicos e documentos declarados em `build-version.js`.

Os documentos-fonte (DOCX, XLSX e PDF) das semanas publicadas também integram o snapshot offline. Ao incluir documentos, mantenha as listas de assets de `build-version.js` e `sw.js` idênticas e preserve os nomes originais. O fluxo do Pages copia esses formatos para `_site`.

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

## 9. Publicação no GitHub Pages

Configuração obrigatória uma única vez:

1. abra **Settings** do repositório;
2. acesse **Pages**;
3. em **Build and deployment → Source**, selecione **GitHub Actions** (não publicação a partir de uma branch);
4. confira as permissões e proteções do ambiente `github-pages`;
5. publique um commit em `main` ou execute o workflow manualmente em **Actions → Publicar no GitHub Pages → Run workflow**.

O workflow roda em cada push para `main`, todos os dias às 03h17 (horário de Londrina, para retirar semanas encerradas) e por `workflow_dispatch`. Primeiro executa `node ferramentas/montar-site.js`, depois `npm run validate:data`, depois `npm run version`, separa somente os arquivos públicos e envia/implanta o artefato estático. Assim, toda publicação gera metadados automaticamente, mesmo quando somente dados ou imagens mudaram. Os arquivos gerados ficam no artefato; o workflow não faz commit no repositório.

As ações estão fixadas por SHA imutável. O job de geração recebe somente leitura do repositório; apenas o job de implantação recebe `pages: write` e `id-token: write`.

Para publicação local ou de branch fora desse workflow, execute `npm run validate:data` e **`npm run version` após todas as edições finais**, então publique o HTML modificado junto com `version.json` e todos os assets correspondentes. Não altere assets depois de gerar os hashes sem executar novamente o gerador.

Arquivos necessários:

- `index.html`;
- `styles.css`;
- `app.js`;
- `programacao.js`;
- `semanas.js`;
- `leituras.js`;
- `antifonas.js`;
- `roteiros.js`;
- `manifest.json`;
- `sw.js`;
- `version.json`;
- imagens e ícones referenciados.
- documentos de `semanas/<segunda>/` das semanas publicadas, `ferramentas/` e `dados/` (copiados por `montar-site.js --copiar _site`).

---

## 10. Checklist de publicação

- [ ] Semana montada na ferramenta, avisos conferidos e pastas `semanas/` e `dados/` enviadas.
- [ ] Nenhuma planilha de escala/espórtulas enviada ao repositório.
- [ ] Antífonas, citações e páginas do lecionário revisadas na ferramenta.
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

## 11. Solução de problemas

### Página sem CSS

Verifique o caminho de `styles.css`, a publicação do commit e o cache do navegador. Teste em janela anônima e confirme se a requisição retorna o arquivo CSS.

### Conteúdo antigo no celular

Confira se o workflow publicou com sucesso e se `version.json` corresponde aos assets servidos. Abra online e use **Buscar atualização**. Feche todos os modais e termine a impressão em todas as abas. Se um hash não conferir, corrija a publicação e gere novamente os metadados; não apague o snapshot anterior para forçar uma atualização incompleta.

### Ícone continua antigo

Feche o aplicativo instalado, abra a versão online no navegador, atualize e abra novamente o ícone.

### Leitura não encontrada

Confira, no `semana.json` da pasta da semana, a correspondência entre a chave em `leituras` de cada dia e o objeto `leituras`. Execute a validação.

### Impressão incorreta

Revise `#print-mount`, os clones usados pelas funções `print*()` e as regras de `@media print`.

---

## 12. Convenções de commit

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

## 13. Informações do repositório

- **Repositório:** `rograhl75-spec/roteiro-liturgico`
- **Branch principal:** `main`
- **Tipo:** site estático/PWA
- **Linguagens:** JavaScript, HTML e CSS
- **Hospedagem:** GitHub Pages