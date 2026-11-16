# Regras gerais dos roteiros e da programação (Paróquia N. Sra. Auxiliadora)

1. **Preces** (até 23/05/2027): formulário de 2025 (Liturgia das Horas) – introdução + 3 preces + Oração do Jubileu.
2. **Roteiros**: repetir o que foi feito em 2025, inclusive as dinâmicas descritas nos roteiros daquele ano.
3. **Acolhida**: sempre neutra – boas-vindas e avisos da Igreja, sem antecipar a liturgia do dia.
4. **Breves ritos e bênçãos que não constam no Missal** (bênção da coroa do Advento, velas, bênção do presépio, ritos próprios da paróquia, Te Deum etc.):
   além de constarem no roteiro, ganham um **arquivo separado** (`RITO - <nome> - <data>.docx`) para impressão em papel duro:
   - identifica a Missa (celebração, data e horários) e o **momento** (rubrica);
   - traz o texto completo da bênção/rito com ℟. e ✠;
   - formato litúrgico, papel A5, letras grandes: texto 16 pt, rubricas 14 pt em vermelho itálico, títulos em vermelho;
   - entra no painel de aprovação e na página como botão “📄 … (impressão)”.
5. **Forma dos roteiros (aproximar dos livros litúrgicos)**:
   - somente informações do próprio dia (nada sobre outros domingos, Páscoa, Tempo Comum etc.);
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
5c. **Símbolo de música**: todo momento cantado leva, ao fim da rubrica/título, o par de ícones que a Pastoral da Música
   já usa (nota musical + violão): Entrada, procissões, Ato Penitencial, Glória, Salmo, Aclamação, Oferendas, Santo,
   «Amém» cantado, Cordeiro de Deus, Comunhão, hinos (Te Deum, Noite Feliz…), fundo musical e Canto Final; nos cartões
   de rito, nas rubricas «canta-se…», «durante o canto…». Respostas faladas («Glória a vós, Senhor») não levam.
   Na página e no PDF aparece ♫ verde. Ferramenta: ferramentas/docx/musica.py (regra igual em lecionario.js → Musica.cantado).
6. **Natal – Missa da Noite**: as preces são as próprias da bênção do presépio (seguidas da Oração do Jubileu), e a oração de bênção do presépio conclui a oração dos fiéis.
7. **Aprovação**: nada é publicado sem aprovação no painel do Drive (ver `APROVACAO.md`).
8. **Privacidade**: celulares e espórtulas nunca entram na página nem no repositório.
