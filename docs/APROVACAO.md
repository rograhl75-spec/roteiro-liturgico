# Painel de aprovação (Drive → página)

- Pasta no Drive: **PÁGINA LITÚRGICA – APROVAÇÃO** (dentro da pasta de liturgia da paróquia), uma subpasta por semana com os .docx e a prévia em PDF.
- Planilha: **Painel de Aprovação – Página Litúrgica** (Google Sheets, id `1lwaHonSS-SUp3CZW2a4_Zr0QTiE0z1m1E--G0VyEoOA`).
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
