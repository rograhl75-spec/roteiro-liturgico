# Como publicar uma semana nova

Guia simples, sem programação. Leva cerca de 10 minutos por semana.

---

## O que preparar (os mesmos arquivos de sempre)

| Arquivo | Obrigatório? | Dica para o nome do arquivo |
|---|---|---|
| Leituras da semana (.docx, com o texto completo) | **Sim** | começar com **Leituras** |
| Roteiro do domingo (.docx) | Sim | ter a palavra **DOMINGO** |
| Preces do domingo (.docx) | Sim | começar com **PRECES** e ter **DOMINGO** |
| Roteiros e preces de outras celebrações (Finados, missa votiva…) | Quando houver | ter a data, ex.: `02_11_2026` ou `06 NOVEMBRO 2026` |
| PDFs (ex.: Adoração) | Quando houver | — |
| Planilha **Escala e Espórtulas** (.xlsx) atualizada | Sim | — |

**Não são mais necessários:** a escala dos padres em Word, a planilha do Missal e a planilha de lecionários.
As páginas do Missal saem dos roteiros e do índice do Missal. As páginas do lecionário ficam guardadas: você só digita as que faltarem.

> 🔒 **A planilha Escala e Espórtulas é lida só no seu computador.** Telefones e espórtulas nunca são lidos nem publicados. **Nunca envie essa planilha ao GitHub.**

---

## Passo 1 — Abrir a ferramenta

Abra no navegador (Chrome ou Edge, no computador):

**https://rograhl75-spec.github.io/roteiro-liturgico/ferramentas/montar-semana.html**

Dica: salve esse endereço nos favoritos.

## Passo 2 — Escolher a semana

Em **“Segunda-feira da semana”**, escolha a segunda-feira (já vem marcada a próxima).

## Passo 3 — Colocar os arquivos

Arraste todos os arquivos da semana para o quadro tracejado (ou clique em **Escolher arquivos**).

Confira a coluna **“O que é”**. Ela já vem preenchida; mude só se estiver errada.
Para roteiros, preces e PDFs de outras celebrações, escolha também o **dia** e o **nome do botão** (ex.: “Fiéis Defuntos”).

## Passo 4 — Montar e conferir

Clique em **Montar a semana**.

1. Leia o quadro amarelo **⚠️ Confira**, se aparecer. Ele avisa o que faltou.
2. Abra cada dia (clique na faixa azul) e confira:
   - **Missal Romano:** páginas já preenchidas. Corrija se precisar; deixe vazio o que não se aplica.
   - **Leituras:** se a página do lecionário estiver vazia, digite assim: `II / 1172` (volume / página).
   - **Escala:** vem da planilha. Se estiver errada, corrija **na planilha** e clique de novo em **Montar a semana**.
   - **Antífonas e telão:** confira o texto; as frases do telão podem ser digitadas ou corrigidas.

## Passo 5 — Baixar o pacote

Clique em **⬇️ Baixar pacote da semana (.zip)**.
Depois, no computador, clique com o botão direito no arquivo baixado → **Extrair tudo**.
Aparecem duas pastas: **semanas** e **dados**.

## Passo 6 — Enviar ao GitHub

1. Entre em **github.com** e abra o repositório **roteiro-liturgico**.
2. Clique em **Add file → Upload files**.
3. Arraste as **duas pastas** (**semanas** e **dados**) para a página.
4. Desça e clique em **Commit changes**.

## Passo 7 — Pronto

Em 2 ou 3 minutos o site é atualizado sozinho. No celular, toque em **Buscar atualização**.

- **As semanas que já passaram saem do site sozinhas** (todo dia de madrugada). Não precisa apagar nada.
- O site mostra até 3 semanas: a atual e as próximas que já foram enviadas.

---

## Precisa corrigir algo depois de enviar?

Monte a semana de novo na ferramenta, baixe o pacote e envie as pastas outra vez. O envio novo substitui o anterior.

## Se algo der errado

| Situação | O que fazer |
|---|---|
| Aviso “não identifiquei a celebração” | Preencha as páginas do Missal daquele dia na conferência. |
| Aviso “nenhuma missa encontrada na planilha” | Confira as datas na aba **Missas** da planilha e monte de novo. |
| O site não mudou depois de 5 minutos | No GitHub, abra a aba **Actions**. Um **X vermelho** indica erro: clique nele e envie a mensagem para quem cuida do site. |
| Enviou a planilha de espórtulas por engano | Apague o arquivo no GitHub imediatamente (abra o arquivo → ícone da lixeira → **Commit changes**) e avise quem cuida do site. |
