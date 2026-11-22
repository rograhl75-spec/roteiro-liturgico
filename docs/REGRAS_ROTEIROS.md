# Regras gerais dos roteiros e da programação (Paróquia N. Sra. Auxiliadora)

1. **Preces** (até 23/05/2027): formulário de 2025 (Liturgia das Horas) – introdução + 3 preces + Oração do Jubileu.
2. **Roteiros**: repetir o que foi feito em 2025, inclusive as dinâmicas descritas nos roteiros daquele ano.
3. **Acolhida**: sempre neutra – boas-vindas e avisos da Igreja, sem antecipar a liturgia do dia.
4. **Breves ritos e bênçãos** — na página, o cartão abre na tela como o roteiro (🕯️), com Imprimir, Enviar PDF e Baixar PDF
   (ferramentas/cartoes-na-pagina.py); o .docx continua disponível em «Fonte». Detalhes:
   **Breves ritos e bênçãos que não constam no Missal** (bênção da coroa do Advento, velas, bênção do presépio, ritos próprios da paróquia, Te Deum etc.):
   além de constarem no roteiro, ganham um **arquivo separado** (`RITO - <nome> - <data>.docx`) para impressão em papel duro:
   - identifica a Missa (celebração, data e horários) e o **momento** (rubrica);
   - traz o texto completo da bênção/rito com ℟. e ✠;
   - formato litúrgico, **papel A4** (todos os documentos são A4: roteiros, preces e cartões), letras grandes: texto 16 pt, rubricas 14 pt em vermelho itálico, títulos em vermelho;
   - entra no painel de aprovação e na página como botão “📄 … (impressão)”.
5. **Forma dos roteiros (aproximar dos livros litúrgicos)**:
   - somente informações do próprio dia (nada sobre outros domingos, Páscoa, Tempo Comum etc.); nenhum aviso antecipado na monição nem nas orientações (ex.: coleta do domingo seguinte);
   - uma única fonte (Garamond, serifada como os livros litúrgicos); a cruz ✠ em vermelho, com fonte que a exibe (Segoe UI Symbol);
   - «Oremos.» em linha própria, em negrito, antes da oração;
   - rubricas (o que se faz) em vermelho itálico; o que se diz em preto, sem aspas, negrito ou itálico;
   - abertura: saudação do comentarista (℟. Para sempre seja louvado) → intenções, lidas em todas as Missas, com duas versões:
     «Missa com transmissão» (inclui as intenções deixadas nas redes sociais) e «Missa sem transmissão» → monição inicial → canto de entrada;
   - a monição inicial não cita a transmissão;
   - ritos próprios (ex.: coroa do Advento) com as rubricas na ordem em que acontecem;
   - os roteiros de 2025 são a base, mas sem notas internas («como em 2025», «dinâmica de 2025»).
5b. **Paginação dos arquivos**: nenhuma página em branco; nenhuma oração ou fala quebrada entre páginas (a linha passa inteira
   para a página seguinte e termina no ponto final); rubricas ficam junto do que vem depois; nas preces, cada horário numa página;
   nos cartões de bênção, cada oração fica inteira com o seu ℟. Rodapé apenas «página N». Ferramenta: ferramentas/docx/paginacao.py.
   Cartões de rito: além disso, **quebras de página fixas** entre blocos (ferramentas/docx/cartao_paginas.py), porque
   alguns visualizadores (Drive, celular) ignoram «manter linhas juntas»; conferido também no Google Docs.
5c. **Símbolo de música**: todo momento cantado leva, ao fim da rubrica/título, o par de ícones que a Pastoral da Música
   já usa (nota musical + violão): Entrada, procissões, Ato Penitencial, Glória, Salmo, Aclamação, Oferendas, Santo,
   «Amém» cantado, Comunhão, hinos (Te Deum, Noite Feliz…), fundo musical e Canto Final; nos cartões
   de rito, nas rubricas «canta-se…», «durante o canto…». Respostas faladas («Glória a vós, Senhor») não levam. O **Cordeiro de Deus não é cantado** na paróquia: não leva símbolo.
   Na página e no PDF aparece ♫ verde. Ferramenta: ferramentas/docx/musica.py (regra igual em lecionario.js → Musica.cantado).
5d. **Leituras na página e no PDF**: formato do Lecionário (rubrica e referência em vermelho, abertura, versículos, ℟), **sem a frase-título** em vermelho, que não se lê e confundia os leitores.
6. **Natal – Missa da Noite**: as preces são as próprias da bênção do presépio (seguidas da Oração do Jubileu), e a oração de bênção do presépio conclui a oração dos fiéis.
7. **Aprovação**: nada é publicado sem aprovação no painel do Drive (ver `APROVACAO.md`).
8. **Locais (nomes padronizados)**: Missas e casamentos: «Igreja Matriz», «Capela de Pedra» (mesmo endereço) e «Capela São Domingos Sávio» (nunca «Paróquia…»/«Templo» como local). **Confissões e direção espiritual: sempre na «Secretaria»**, exceto na 1ª sexta-feira do mês, das 11h30 às 13h00, na «Igreja Matriz». O importador da escala aplica isso sozinho (semana-lib.js → localPadrao/localConfissao).
9. **Privacidade**: celulares e espórtulas nunca entram na página nem no repositório.

9. **Cores (economia de tinta, como nos roteiros do Diácono Rogério)**: sem fundos coloridos nas células e títulos; texto em preto; rubricas em vermelho; **marca-texto amarelo** no texto do Comentarista/Animador e em **todas as respostas de «Todos»** (o animador também responde), incluindo o rótulo da linha — as rubricas vermelhas dentro dessas linhas ficam sem amarelo. Aplicar com `python3 ferramentas/docx/cores.py <roteiro/preces>.docx` antes de `gerar-pdfs.py`.

10. **Fonte litúrgica e tamanhos (todos os documentos)**: Garamond (a fonte serifada dos livros litúrgicos) em roteiros, preces, leituras, escala, antífonas e cartões. Como a Garamond tem letra menor que a Abadi, os tamanhos sobem 1–2 pt:
    - roteiros: texto 13–14 pt, rubricas e rótulos 11–12 pt;
    - preces: texto 15 pt (lidas no ambão), rubricas 13 pt — cada celebração cabe numa página;
    - leituras: 14 pt; escala: 11 pt; antífonas: 13 pt;
    - **cartões do padre (orações e bênçãos em arquivo separado): 16 pt, rubricas 14 pt** — letra grande;
    - **Adoração Solene: Garamond, mantendo os tamanhos do roteiro original** (texto 16 pt, rubricas 12–13 pt).
    Aplicar com `python3 ferramentas/docx/fontes.py <roteiro|preces|leituras|escala|antifona|cartao|manter> ARQ.docx`.

11. **Primeiro sábado do mês — Missa em ação de graças pelo ECC e pelos empreendedores da paróquia**: no roteiro do fim de semana que contém o primeiro sábado do mês, incluir nos Ritos Iniciais (depois das intenções e antes da monição inicial) uma rubrica «Na Missa de sábado…» e a acolhida do comentarista aos casais do ECC (Encontro de Casais com Cristo) e aos empreendedores da paróquia, que participam da Missa em ação de graças. Quando a Missa do ECC for transferida para outro sábado, a acolhida vai no roteiro desse fim de semana — o texto lido nunca menciona a transferência nem que é «excepcional».

12. **Nome dos arquivos (PDF impresso, enviado ou baixado da página)**: o PDF sai com o nome do próprio documento, que identifica a celebração e os dias — ex.: «CRISTO REI - 34º DOMINGO TEMPO COMUM - 21 E 22 NOVEMBRO 2026 - ANO A.pdf», «PRECES - CRISTO REI - 21 E 22 NOVEMBRO 2026.pdf», «RITO - 2ª VELA DO ADVENTO - 5 E 6 DEZEMBRO 2026.pdf». Quando houver mais de um roteiro no fim de semana (ritos diferentes nas Missas), o nome do arquivo indica também a Missa — ex.: «CRISTO REI - SÁBADO 18H30 - 21 NOVEMBRO 2026.docx» — e cada roteiro aparece na página como documento próprio. Programação, leituras e reflexões saem com o tipo e a semana no nome.

13. **Missas solenes (com incenso) — fundo musical ao teclado**: na Oração da Coleta, no início do Evangelho («O Senhor esteja convosco»), na Oração sobre as Oferendas, no Prefácio e na Oração depois da Comunhão, incluir a rubrica «… fundo musical ao teclado durante … – o Ministério de Música deve confirmar antes com o padre.», com o mesmo prefixo das rubricas de incenso do roteiro («Missa solene:» ou «Na Missa de domingo às 18h30:»). Nas Missas sem incenso, não se inclui.

