# Painel de aprovação (Drive → página)

- Pasta no Drive: **PÁGINA LITÚRGICA – APROVAÇÃO** (dentro da pasta de liturgia da paróquia), uma subpasta por semana com os .docx e a prévia em PDF.
- Planilha: **Painel de Aprovação – Página Litúrgica** (Google Sheets, id `1zjSbTiewE9FlrchSn-Vt0E1G64b8x9XmYplim42sRiU`).
  - Aba *Documentos*: Situação = Pendente / OK / Revisado (Revisado = o próprio .docx foi corrigido no Drive).
  - Aba *Lecionário*: Página no formato `II / 54` + Situação OK.
- `dados/painel-aprovacao.json`: código → semana, arquivo do repositório, id do arquivo no Drive e a versão (modifiedTime) já aplicada.
- Rodada (tarefa agendada ou pedido no chat):
  1. exportar a planilha como .xlsx;
  2. para cada linha "Revisado", se o modifiedTime do arquivo no Drive for mais novo que `versao_aplicada`, baixar o .docx para uma pasta temporária com o nome da coluna "Arquivo no repositório" e atualizar `versao_aplicada`;
  3. `node ferramentas/aplicar-aprovacoes.js <painel.xlsx> <pasta-temporária>`;
  4. `node ferramentas/montar-site.js && node validate-data.js`; commit e push se algo mudou.
- Semana publicada quando todos os seus documentos estão OK/Revisado. A planilha de escala/espórtulas nunca é lida nem enviada.
