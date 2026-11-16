# Painel de aprovação (Drive → página)

- Pasta no Drive: **PÁGINA LITÚRGICA – APROVAÇÃO** (dentro da pasta de liturgia da paróquia), uma subpasta por semana com os .docx e a prévia em PDF.
- Planilha: **Painel de Aprovação – Página Litúrgica** (Google Sheets, id `1tE_rOeQMfgNk7MgXTlv2HDQlXTBu3lKq6__0NMPNGVo`).
  - Aba *Documentos*: Situação = Pendente / OK / Revisado (Revisado = o próprio .docx foi corrigido no Drive).
  - Aba *Lecionário*: Página no formato `II / 54` + Situação OK.
- `dados/painel-aprovacao.json`: código → semana, arquivo do repositório, id do arquivo no Drive e a versão (modifiedTime) já aplicada.
- Rodada (tarefa agendada ou pedido no chat):
  1. exportar a planilha como .xlsx;
  2. para cada linha "Revisado", se o modifiedTime do arquivo no Drive for mais novo que `versao_aplicada`, baixar o .docx para uma pasta temporária com o nome da coluna "Arquivo no repositório" e atualizar `versao_aplicada`;
  3. `node ferramentas/aplicar-aprovacoes.js <painel.xlsx> <pasta-temporária>`;
  4. `node ferramentas/montar-site.js && node validate-data.js`; commit e push se algo mudou.
- Semana publicada quando todos os seus documentos estão OK/Revisado. A planilha de escala/espórtulas nunca é lida nem enviada.

## Cadastro do lecionário por livro e ciclo (dados/lecionario.json → _ciclos)
- `A`, `B`, `C`: Lecionário I (domingos e solenidades), por ciclo dominical do ano litúrgico (começa no 1º domingo do Advento; ano litúrgico 2027 = B, 2028 = C, 2029 = A).
- `semana`: Lecionário II (dias de semana); `santoral`: Lecionário III.
- Cada referência guarda a lista [página, 'MM-DD'] das vezes em que foi usada; a busca escolhe a da data mais próxima
  (no santoral, só a mesma data). Fonte: programações da paróquia de dez/2023 a set/2026 (ferramentas/docx/ler_programacoes.py).
- Sem página no ciclo certo, a página fica em branco (não se usa página de outro ciclo).


## Publicação
- Toda semana aprovada aparece na página assim que aprovada, **sem limite de semanas** (some quando termina).
- `"retidos"` no semana.json: documentos que entram mais tarde (ex.: Adoração Solene de 4/12). A semana é publicada
  sem eles; quando o documento é marcado OK/Revisado no painel, ele sai da lista e passa a aparecer.

## PDF real dos documentos (formato idêntico ao arquivo)

A página mostra, imprime e envia (WhatsApp) o **PDF gerado do próprio .docx** de cada roteiro, preces e cartão de rito — não uma recomposição. Depois de qualquer alteração em um .docx:

    python3 ferramentas/gerar-pdfs.py      # só regenera o que mudou (hash)
    node ferramentas/montar-site.js && node validate-data.js

Requer LibreOffice (soffice) e a fonte EB Garamond instalada (alias Garamond → EB Garamond no fontconfig). As leituras continuam no formato Lecionário.
