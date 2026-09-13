/* ==========================================================================
   BANCO DE DADOS LITÚRGICO INTEGRAL — PARÓQUIA NOSSA SENHORA AUXILIADORA
   ========================================================================== */

window.readingsData = {

    /* ======================================================================
       SEMANA 2: 14 A 20 DE SETEMBRO DE 2026 (25º DOMINGO DO TEMPO COMUM)
       ====================================================================== */

    // Segunda-feira, 14/09/2026 — Festa da Exaltação da Santa Cruz
    '1l_seg_w2': {
        title: '1ª Leitura — Números 21,4b-9 (Lecionário III, pág. 174)',
        text: `Leitura do Livro dos Números.

Naqueles dias, os filhos de Israel partiram do monte Hor, pelo caminho que leva ao mar Vermelho, para contornarem o país de Edom. Durante a viagem o povo começou a impacientar-se, e se pôs a falar contra Deus e contra Moisés, dizendo: "Por que nos fizestes sair do Egito para morrermos no deserto? Não há pão, falta água, e já estamos com nojo desse alimento miserável".
Então o Senhor mandou contra o povo serpentes venenosas, que os mordiam; e morreu muita gente em Israel. O povo foi ter com Moisés e disse: "Pecamos, falando contra o Senhor e contra ti. Roga ao Senhor que afaste de nós as serpentes".
Moisés intercedeu pelo povo, e o Senhor respondeu: "Faze uma serpente de bronze e coloca-a como sinal sobre uma haste; aquele**Sim, o arquivo `leituras.js` precisa ser atualizado.**

O alerta da sua imagem (*"O arquivo leituras.js ainda não foi criado no GitHub"*) apareceu porque o código anterior do `leituras.js` foi cortado no final pelo limite de caracteres (terminou abruptamente na frase `...pois ele agora est`). Quando um arquivo JavaScript fica com aspas ou chaves abertas, o navegador identifica um erro de sintaxe (*SyntaxError*) e descarta o arquivo inteiro — daí a impressão de que ele "não existia".

O arquivo **`leituras.js`** abaixo está corrigido, com a sintaxe fechada e estruturado para alimentar as janelas de leitura e a impressão para o ambão:

---

### Código Corrigido (`leituras.js`)

No GitHub, abra o arquivo **`leituras.js`**, clique no lápis de edição, substitua todo o conteúdo por este código e confirme em **Commit changes**:

```javascript
/* BANCO DE DADOS LITÚRGICO — PARÓQUIA NOSSA SENHORA AUXILIADORA */

const readingsData = {
    /* =======================================================
       SEMANA 1: 07 A 13 DE SETEMBRO DE 2026 (24º DOMINGO)
       ======================================================= */
    '1l_seg': {
        title: '1ª Leitura — 1 Coríntios 5,1-8 (Lecionário II, pág. 963)',
        text: `Leitura da Primeira Carta de São Paulo aos Coríntios.

Irmãos:
Ouve-se dizer que há entre vós grave desordem moral. Lançai fora o velho fermento, para que sejais uma massa nova, já que sois pães ázimos. 
Pois o nosso cordeiro pascal, Cristo, já foi imolado. Celebremos, pois, a festa, não com o fermento da maldade, mas com os pães ázimos da sinceridade e da verdade.

Palavra do Senhor.
R. Graças a Deus.`
    },
    'sl_seg': {
        title: 'Salmo Responsorial — Sl 5,5-6.7.12 (Lecionário II, pág. 964)',
        text: `R. Conduzi-me, ó Senhor, na vossa justiça!

Não sois um Deus a quem agrade a iniquidade, *
não pode o mal morar convosco, ó Senhor;
nem os ímpios poderão permanecer *
diante dos vossos olhos que tudo veem. R.

Detestais a todos que praticam a injustiça, *
exterminais os mentirosos e perversos;
o homem sanguinário e traidor *
o Senhor abomina e rejeita. R.

Mas exultem os que em vós têm seu refúgio, *
façam festa e cantem hinos para sempre;
protegei-os e que em vós se alegrem todos *
os que amam o vosso santo nome. R.`
    },
    'ev_seg': {
        title: 'Evangelho — Lucas 6,6-11 (Lecionário II, pág. 965)',
        text: `Proclamação do Evangelho de Jesus Cristo segundo Lucas.

Num outro sábado, Jesus entrou na sinagoga e começou a ensinar. Estava ali um homem cuja mão direita era seca. Os mestres da Lei e os fariseus espreitavam se Jesus curaria no sábado, para terem de que o acusar.
Jesus conhecia os seus pensamentos e disse ao homem: "Levanta-te e fica em pé no meio!" Ele levantou-se. Então Jesus perguntou: "O que é permitido fazer no sábado: o bem ou o mal? Salvar uma vida ou destruí-la?"
Olhando para todos ao redor, disse ao homem: "Estende a mão!" Ele a estendeu, e a mão ficou curada. Mas eles ficaram furiosos e planejavam o que fazer contra Jesus.

Palavra da Salvação.
R. Glória a vós, Senhor.`
    },
    '1l_ter': {
        title: '1ª Leitura — Miquéias 5,1-4a (Lecionário III, pág. 165)',
        text: `Leitura da Profecia de Miquéias.

Assim diz o Senhor:
"Tu, Belém de Éfrata, pequenina entre os povoados de Judá, de ti sairá aquele que governará em Israel; sua origem vem desde os dias da eternidade.
Ele se levantará e apascentará o rebanho com a força do Senhor, com a majestade do nome do Senhor seu Deus; e eles habitarão em segurança, pois ele será grande até aos confins da terra, e ele mesmo será a Paz".

Palavra do Senhor.
R. Graças a Deus.`
    },
    'sl_ter': {
        title: 'Salmo Responsorial — Sl 70(71),6; Sl 12(13),6 (Lecionário III, pág. 166)',
        text: `R. Exulto de alegria no Senhor.

Sois meu apoio desde antes que eu nascesse, *
desde o seio maternal, o meu amparo:
para vós o meu louvor eternamente! R.

Uma vez que confiei no vosso amor, *
meu coração, por vosso auxílio, rejubile,
e que eu vos cante pelo bem que me fizestes! R.`
    },
    'ev_ter': {
        title: 'Evangelho — Mateus 1,18-23 (Lecionário III, pág. 167)',
        text: `Proclamação do Evangelho de Jesus Cristo segundo Mateus.

O nascimento de Jesus foi assim: Maria estava prometida em casamento a José. Antes de passarem a conviver, ela encontrou-se grávida pela ação do Espírito Santo.
José, sendo justo, pensou em dispensá-la secretamente. Mas o anjo do Senhor lhe apareceu em sonho: "José, não tenhas medo de receber Maria por tua esposa, porque o que nela foi concebido vem do Espírito Santo. Ela dará à luz um filho e tu lhe darás o nome de Jesus, pois ele salvará o seu povo dos seus pecados".
Tudo aconteceu para cumprir o que o Senhor dissera pelo profeta: "Eis que a virgem conceberá e dará à luz um filho, e ele será chamado Emanuel: Deus conosco".

Palavra da Salvação.
R. Glória a vós, Senhor.`
    },
    '1l_qua': {
        title: '1ª Leitura — 1 Coríntios 7,25-31 (Lecionário II, pág. 966)',
        text: `Leitura da Primeira Carta de São Paulo aos Coríntios.

Irmãos: O tempo é breve. Doravante, os que têm mulher vivam como se não tivessem; os que choram, como se não chorassem; os que estão alegres, como se não estivessem; os que compram, como se nada possuíssem; e os que usam deste mundo, como se dele não desfrutassem plenamente. Pois a aparência deste mundo passa.

Palavra do Senhor.
R. Graças a Deus.`
    },
    'sl_qua': {
        title: 'Salmo Responsorial — Sl 44(45),11-12.14-17 (Lecionário II, pág. 967)',
        text: `R. Escutai, minha filha, olhai, ouvi isto!

Escutai, minha filha, olhai, ouvi isto: *
"Esquecei vosso povo e a casa paterna!
Que o Rei se encante com vossa beleza! *
Prestai-lhe homenagem: é vosso Senhor!" R.

Majestosa, a princesa real vem chegando, *
vestida de ricos brocados de ouro.
Em vestes vistosas ao Rei se dirige, *
e as virgens amigas lhe formam cortejo. R.`
    },
    'ev_qua': {
        title: 'Evangelho — Lucas 6,20-26 (Lecionário II, pág. 968)',
        text: `Proclamação do Evangelho de Jesus Cristo segundo Lucas.

Jesus, levantando os olhos para os discípulos, disse:
"Bem-aventurados vós, os pobres, porque vosso é o Reino de Deus!
Bem-aventurados vós que agora tendes fome, porque sereis saciados!
Bem-aventurados vós que agora chorais, porque haveis de rir!
Bem-aventurados sereis quando os homens vos odiarem e insultarem por causa do Filho do Homem! Alegrai-vos nesse dia, pois grande é a vossa recompensa no céu.
Mas ai de vós, ricos, porque já tendes vossa consolação! Ai de vós que agora estais fartos, porque haveis de passar fome!"

Palavra da Salvação.
R. Glória a vós, Senhor.`
    },
    '1l_qui': {
        title: '1ª Leitura — 1 Coríntios 8,1b-7.11-13 (Lecionário II, pág. 970)',
        text: `Leitura da Primeira Carta de São Paulo aos Coríntios.

Irmãos: O conhecimento envaidece, mas a caridade constrói. Se alguém ama a Deus, esse é conhecido por Ele.
Para nós há um só Deus, o Pai, de quem tudo procede e para quem existimos; e um só Senhor, Jesus Cristo, por quem tudo existe e nós também.
Cuidai para que a vossa liberdade não se torne ocasião de queda para os fracos. Se um alimento faz cair o meu irmão, nunca mais comerei carne, para não ser motivo de escândalo.

Palavra do Senhor.
R. Graças a Deus.`
    },
    'sl_qui': {
        title: 'Salmo Responsorial — Sl 138(139),1-3.13-14ab.23-24 (Lecionário II, pág. 971)',
        text: `R. Conduzi-me no caminho para a vida, ó Senhor!

Senhor, vós me sondais e conheceis, *
sabeis quando me sento ou me levanto;
de longe penetrais meus pensamentos, *
percebeis quando me deito e quando ando. R.

Fostes vós que me formastes as entranhas, *
e no seio de minha mãe vós me tecestes.
Eu vos dou graças, ó Senhor, *
porque de modo admirável me formastes! R.`
    },
    'ev_qui': {
        title: 'Evangelho — Lucas 6,27-38 (Lecionário II, pág. 972)',
        text: `Proclamação do Evangelho de Jesus Cristo segundo Lucas.

Naquele tempo, disse Jesus aos discípulos:
"Amai os vossos inimigos, fazei o bem aos que vos odeiam, bendizei os que vos amaldiçoam e rezai pelos que vos caluniam.
Como quereis que os outros vos façam, fazei também vós a eles.
Sede misericordiosos como vosso Pai é misericordioso. Não julgueis e não sereis julgados; perdoai e sereis perdoados. Dai e vos será dado: uma medida boa, calcada e transbordante será colocada no vosso colo".

Palavra da Salvação.
R. Glória a vós, Senhor.`
    },
    '1l_sex': {
        title: '1ª Leitura — 1 Coríntios 9,16-19.22b-27 (Lecionário II, pág. 974)',
        text: `Leitura da Primeira Carta de São Paulo aos Coríntios.

Irmãos: Pregar o evangelho não é para mim motivo de vanglória, mas uma obrigação: ai de mim se eu não pregar o evangelho!
Livre em relação a todos, fiz-me servo de todos para ganhar o maior número possível. Fiz-me tudo para todos, para salvar alguns a todo custo.
Os atletas se privam de tudo para receber uma coroa perecível; nós, porém, buscamos uma coroa incorruptível.

Palavra do Senhor.
R. Graças a Deus.`
    },
    'sl_sex': {
        title: 'Salmo Responsorial — Sl 83(84),3-6.12 (Lecionário II, pág. 975)',
        text: `R. Quão amável, ó Senhor, é vossa casa!

Minha alma desfalece de saudades *
e anseia pelos átrios do Senhor!
Meu coração e meu ser se alegram *
e exultam no Deus vivo! R.

Felizes os que habitam vossa casa; *
para sempre haverão de vos louvar!
Felizes os que em vós encontram força *
para caminhar com fé e esperança! R.`
    },
    'ev_sex': {
        title: 'Evangelho — Lucas 6,39-42 (Lecionário II, pág. 976)',
        text: `Proclamação do Evangelho de Jesus Cristo segundo Lucas.

Jesus contou uma parábola:
"Pode um cego guiar outro cego? Não cairão ambos no buraco? Um discípulo não é maior do que o mestre; todo discípulo bem formado será como o mestre.
Por que vês o cisco no olho do teu irmão e não notas a trave no teu próprio olho? Tira primeiro a trave do teu olho e então enxergarás bem para tirar o cisco do olho do teu irmão".

Palavra da Salvação.
R. Glória a vós, Senhor.`
    },
    '1l_dom': {
        title: '1ª Leitura — Eclesiástico 27,33-28,9 (Lecionário I, pág. 323)',
        text: `Leitura do Livro do Eclesiástico.

O rancor e a cólera são detestáveis; o pecador os conserva consigo. Quem se vinga encontrará a retribuição do Senhor, que guardará com rigor os seus pecados.
Perdoa a injustiça ao teu próximo e, quando orares, teus pecados serão cancelados. Se um mortal guarda rancor contra o outro, como pedirá cura a Deus? Se não tem compaixão do seu semelhante, como suplicará perdão para os seus próprios erros?
Lembra-te do teu fim e cessa de odiar; pensa na morte e persevera na Aliança do Altíssimo.

Palavra do Senhor.
R. Graças a Deus.`
    },
    'sl_dom': {
        title: 'Salmo Responsorial — Sl 102(103),1-4.9-12 (Lecionário I, pág. 323)',
        text: `R. O Senhor é bondoso, compassivo e carinhoso.

Bendize, ó minha alma, ao Senhor, *
e todo o meu ser, seu santo nome!
Bendize, ó minha alma, ao Senhor, *
não te esqueças de nenhum de seus favores! R.

Pois ele te perdoa toda culpa, *
e cura toda a tua enfermidade;
da sepultura ele salva a tua vida *
e te cerca de carinho e compaixão. R.

Não nos trata como exigem nossas faltas, *
nem nos castiga conforme nossos erros;
quanto o céu se eleva sobre a terra, *
tanto é grande o seu amor aos que o respeitam. R.`
    },
    '2l_dom': {
        title: '2ª Leitura — Romanos 14,7-9 (Lecionário I, pág. 324)',
        text: `Leitura da Carta de São Paulo aos Romanos.

Irmãos:
Nenhum de nós vive para si mesmo e nenhum de nós morre para si mesmo. Se vivemos, é para o Senhor que vivemos; se morremos, é para o Senhor que morremos. Portanto, quer vivamos quer morramos, pertencemos ao Senhor.
Cristo morreu e ressuscitou exatamente para ser o Senhor tanto dos mortos quanto dos vivos.

Palavra do Senhor.
R. Graças a Deus.`
    },
    'ev_dom': {
        title: 'Evangelho — Mateus 18,21-35 (Lecionário I, pág. 325)',
        text: `Proclamação do Evangelho de Jesus Cristo segundo Mateus.

Pedro aproximou-se de Jesus e perguntou: "Senhor, quantas vezes devo perdoar o irmão que pecar contra mim? Até sete vezes?" Jesus respondeu: "Não te digo até sete, mas até setenta vezes sete!"
E contou a parábola: Um rei resolveu acertar contas e perdoou uma dívida imensa a um empregado que suplicou compaixão. Saindo dali, esse mesmo empregado encontrou um companheiro que lhe devia uma pequena quantia, agarrou-o e mandou prendê-lo até pagar a dívida.
O rei chamou-o de volta indignado: "Empregado perverso, perdoei-te toda a dívida porque me suplicaste. Não devias também ter compaixão do teu companheiro?" E entregou-o à punição até saldar tudo.
"Assim meu Pai celeste fará convosco, se cada um não perdoar de coração ao seu irmão".

Palavra da Salvação.
R. Glória a vós, Senhor.`
    },

    /* =======================================================
       SEMANA 2: 14 A 20 DE SETEMBRO DE 2026 (25º DOMINGO)
       ======================================================= */
    '1l_seg_w2': {
        title: '1ª Leitura — Números 21,4b-9 (Lecionário III, pág. 174)',
        text: `Leitura do Livro dos Números.

Durante a viagem pelo deserto, o povo impacientou-se e falou contra Deus e contra Moisés. O Senhor mandou serpentes venenosas que mordiam as pessoas, e muitos morreram em Israel.
O povo foi a Moisés: "Pecamos falando contra o Senhor e contra ti. Roga ao Senhor que afaste as serpentes". Moisés intercedeu pelo povo.
O Senhor disse a Moisés: "Faze uma serpente de bronze e coloca-a sobre uma haste. Quem for mordido e olhar para ela, viverá". Moisés fez a serpente de bronze. Quando alguém era mordido e olhava para a serpente sobre a haste, ficava curado.

Palavra do Senhor.
R. Graças a Deus.`
    },
    'sl_seg_w2': {
        title: 'Salmo Responsorial — Sl 77(78),1-2.34-38 (Lecionário III, pág. 175)',
        text: `R. Das obras do Senhor, ó meu povo, não te esqueças!

Escuta, ó meu povo, a minha Lei, *
ouve atento as palavras que te digo;
abrirei a minha boca em parábolas, *
os mistérios do passado lembrarei. R.

Quando os feria, eles o procuravam, *
e convertiam-se correndo para ele;
recordavam que o Senhor é sua rocha, *
que o Deus Altíssimo é seu Redentor. R.

Mas o Senhor, sempre compassivo e bom, *
não os destruía e perdoava seus pecados;
muitas vezes conteve a sua ira *
e guardou no coração o seu amor. R.`
    },
    'ev_seg_w2': {
        title: 'Evangelho — João 3,13-17 (Lecionário III, pág. 176)',
        text: `Proclamação do Evangelho de Jesus Cristo segundo João.

Naquele tempo, disse Jesus a Nicodemos:
"Ninguém subiu ao céu, a não ser aquele que desceu do céu, o Filho do Homem. Como Moisés levantou a serpente no deserto, assim deve ser levantado o Filho do Homem, para que todo o que nele crer tenha a vida eterna.
Pois Deus amou tanto o mundo, que entregou o seu Filho unigênito, para que todo o que nele crer não pereça, mas tenha a vida eterna. De fato, Deus não enviou o seu Filho ao mundo para condenar o mundo, mas para que o mundo seja salvo por meio dele".

Palavra da Salvação.
R. Glória a vós, Senhor.`
    },
    '1l_ter_w2': {
        title: '1ª Leitura — Hebreus 5,7-9 (Lecionário III, pág. 178)',
        text: `Leitura da Carta aos Hebreus.

Cristo, nos dias de sua vida na terra, dirigiu preces e súplicas com forte clamor e lágrimas àquele que era capaz de salvá-lo da morte, e foi atendido por causa de sua entrega confiante.
Mesmo sendo Filho de Deus, aprendeu o que significa a obediência por meio do sofrimento. E, levado à perfeição, tornou-se causa de salvação eterna para todos os que lhe obedecem.

Palavra do Senhor.
R. Graças a Deus.`
    },
    'sl_ter_w2': {
        title: 'Salmo Responsorial — Sl 30(31),2-6.15-16.20 (Lecionário III, pág. 179)',
        text: `R. Salvai-me pela vossa compaixão, ó Senhor Deus!

Senhor, eu ponho em vós minha esperança; *
que eu não fique desiludido para sempre!
Por vossa justiça, defendei-me e libertai-me, *
inclinai para mim vosso ouvido e salvai-me! R.

Sede para mim uma rocha protetora, *
um abrigo seguro que me acolha!
Sim, sois vós a minha rocha e fortaleza, *
por vosso nome guiai-me e conduzi-me! R.

Em vossas mãos entrego o meu espírito, *
pois me resgatastes, ó Senhor, Deus fiel! R.`
    },
    'ev_ter_w2': {
        title: 'Evangelho — João 19,25-27 (Lecionário III, pág. 181)',
        text: `Proclamação do Evangelho de Jesus Cristo segundo João.

Naquele tempo, perto da cruz de Jesus, estavam de pé a sua mãe, a irmã da sua mãe, Maria de Cléofas, e Maria Madalena.
Jesus, ao ver sua mãe e, ao lado dela, o discípulo que ele amava, disse à mãe: "Mulher, eis aí o teu filho".
Depois disse ao discípulo: "Eis aí a tua mãe".
E daquela hora em diante, o discípulo a acolheu em sua casa.

Palavra da Salvação.
R. Glória a vós, Senhor.`
    },
    '1l_qua_w2': {
        title: '1ª Leitura — 1 Coríntios 12,31-13,13 (Lecionário II, pág. 981)',
        text: `Leitura da Primeira Carta de São Paulo aos Coríntios.

Irmãos: Aspirai aos dons mais elevados. Eu vos mostrarei um caminho incomparavelmente superior:
Ainda que eu fale todas as línguas dos homens e dos anjos, se não tiver amor, serei como bronze barulhento ou címbalo estridente. Ainda que eu tenha o dom da profecia e conheça todos os mistérios, se não tiver amor, nada sou.
O amor é paciente, é prestativo; não inveja, não se vangloria, não se incha de orgulho. Tudo desculpa, tudo crê, tudo espera, tudo suporta.
Agora permanecem estas três: fé, esperança e amor. Mas a maior delas é o amor.

Palavra do Senhor.
R. Graças a Deus.`
    },
    'sl_qua_w2': {
        title: 'Salmo Responsorial — Sl 32(33),2-5.12.22 (Lecionário II, pág. 982)',
        text: `R. Feliz o povo que o Senhor escolheu por sua herança!

Dai graças ao Senhor ao som da cítara, *
cantai-lhe hinos com a harpa de dez cordas!
Entoai para ele um canto novo, *
tocai com arte e aclamai com alegria! R.

Pois reta é a palavra do Senhor, *
e tudo o que ele faz merece fé.
Ele ama a retidão e a justiça; *
da sua bondade está cheia a terra. R.`
    },
    'ev_qua_w2': {
        title: 'Evangelho — Lucas 7,31-35 (Lecionário II, pág. 983)',
        text: `Proclamação do Evangelho de Jesus Cristo segundo Lucas.

Naquele tempo, disse Jesus:
"A quem compararei os homens desta geração? São como crianças sentadas nas praças gritando: 'Tocamos flauta para vós e não dançastes; entoamos cantos de luto e não chorastes!'
Pois veio João Batista, que não comia pão nem bebia vinho, e dissestes: 'Tem demônio!' Veio o Filho do Homem, que come e bebe, e dizeis: 'Aí está um comilão e bebedor, amigo de publicanos e pecadores!' Mas a sabedoria é justificada por todos os seus filhos".

Palavra da Salvação.
R. Glória a vós, Senhor.`
    },
    '1l_qui_w2': {
        title: '1ª Leitura — 1 Coríntios 15,1-11 (Lecionário II, pág. 985)',
        text: `Leitura da Primeira Carta de São Paulo aos Coríntios.

Irmãos: Lembrai-vos do Evangelho que vos anunciei e no qual permaneceis firmes.
Transmiti-vos o que eu mesmo recebi: Cristo morreu por nossos pecados, segundo as Escrituras; foi sepultado e ressuscitou ao terceiro dia, segundo as Escrituras; e apareceu a Pedro e depois aos Doze.
É pela graça de Deus que sou o que sou, e a graça que me deu não foi estéril. É isso o que proclamamos e é nisso que crestes.

Palavra do Senhor.
R. Graças a Deus.`
    },
    'sl_qui_w2': {
        title: 'Salmo Responsorial — Sl 117(118),1-2.16-17.28 (Lecionário II, pág. 986)',
        text: `R. Dai graças ao Senhor, porque ele é bom!

Dai graças ao Senhor, porque ele é bom! *
Eterna é a sua misericórdia!
A casa de Israel agora o diga: *
"Eterna é a sua misericórdia!" R.

A mão direita do Senhor fez maravilhas, *
a mão direita do Senhor me levantou!
Não hei de morrer, mas viverei, *
para anunciar as obras do Senhor! R.`
    },
    'ev_qui_w2': {
        title: 'Evangelho — Lucas 7,36-50 (Lecionário II, pág. 987)',
        text: `Proclamação do Evangelho de Jesus Cristo segundo Lucas.

Um fariseu convidou Jesus para cear. Certa mulher da cidade, conhecida como pecadora, soube da presença de Jesus e trouxe um frasco de perfume. Ficando por detrás, aos pés de Jesus, começou a banhá-los com lágrimas, enxugava-os com os cabelos, beijava-os e ungia-os com o bálsamo.
O fariseu murmurava interiormente. Mas Jesus lhe disse: "Quem pouco é perdoado, pouco ama. Mas os muitos pecados dela estão perdoados, porque ela amou muito". E disse à mulher: "Os teus pecados estão perdoados. Tua fé te salvou; vai em paz!"

Palavra da Salvação.
R. Glória a vós, Senhor.`
    },
    '1l_sex_w2': {
        title: '1ª Leitura — 1 Coríntios 15,12-20 (Lecionário II, pág. 989)',
        text: `Leitura da Primeira Carta de São Paulo aos Coríntios.

Irmãos: Se anunciamos que Cristo ressuscitou dos mortos, como dizem alguns que não há ressurreição? Se não há ressurreição, então nem Cristo ressuscitou, e vã é nossa pregação e sem valor a vossa fé.
Mas, na realidade, Cristo ressuscitou dentre os mortos como primícias de todos os que adormeceram.

Palavra do Senhor.
R. Graças a Deus.`
    },
    'sl_sex_w2': {
        title: 'Salmo Responsorial — Sl 16(17),1.6-7.8b.15 (Lecionário II, pág. 990)',
        text: `R. Ao despertar, me saciará vossa presença, ó Senhor.

Ó Senhor, ouvi minha súplica sincera, *
escutai o meu clamor e atendei-me!
Eu vos invoco, ó Deus, porque me ouvis: *
inclinai para mim vosso ouvido! R.

Protegei-me à sombra de vossas asas, *
livrai-me de perigos e ciladas!
Ao despertar na vossa presença, *
terei a plenitude de minha alegria! R.`
    },
    'ev_sex_w2': {
        title: 'Evangelho — Lucas 8,1-3 (Lecionário II, pág. 991)',
        text: `Proclamação do Evangelho de Jesus Cristo segundo Lucas.

Jesus andava por cidades e povoados, anunciando a Boa-Nova do Reino de Deus. Os Doze o acompanhavam, e também algumas mulheres que tinham sido curadas de enfermidades: Maria, chamada Madalena; Joana, mulher de Cuza; Susana e muitas outras, que serviam a Jesus e aos apóstolos com os seus bens.

Palavra da Salvação.
R. Glória a vós, Senhor.`
    },
    '1l_dom_w2': {
        title: '1ª Leitura — Isaías 55,6-9 (Lecionário I, pág. 327)',
        text: `Leitura do Livro do Profeta Isaías.

Buscai o Senhor enquanto se pode encontrar; invocai-o enquanto está perto! Abandone o ímpio o seu caminho e volte para o Senhor, que terá compaixão; volte para o nosso Deus, que é generoso no perdão.
"Pois os meus pensamentos não são os vossos pensamentos, nem os vossos caminhos são os meus caminhos — diz o Senhor. Quanto o céu se ergue acima da terra, tanto os meus caminhos superam os vossos e meus planos superam os vossos".

Palavra do Senhor.
R. Graças a Deus.`
    },
    'sl_dom_w2': {
        title: 'Salmo Responsorial — Sl 144(145),2-3.8-9.17-18 (Lecionário I, pág. 327)',
        text: `R. O Senhor está perto da pessoa que o invoca!

Todos os dias haverei de bendizer-vos, *
hei de louvar o vosso nome para sempre!
Grande é o Senhor e muito digno de louvores; *
sua grandeza não tem limites! R.

Misericórdia e piedade é o Senhor, *
ele é amor, é paciência e compaixão.
O Senhor é bondoso para com todos, *
sua ternura abraça toda criatura. R.

É justo o Senhor em seus caminhos, *
é santo em todas as suas obras.
O Senhor está perto de quem o invoca, *
de todo aquele que o invoca lealmente. R.`
    },
    '2l_dom_w2': {
        title: '2ª Leitura — Filipenses 1,20c-24.27a (Lecionário I, pág. 328)',
        text: `Leitura da Carta de São Paulo aos Filipenses.

Irmãos:
Cristo será glorificado no meu corpo, quer pela minha vida, quer pela minha morte. Pois para mim o viver é Cristo e o morrer é lucro. Se o continuar a viver na carne me permite um trabalho fecundo, não sei o que escolher.
Sinto-me pressionado dos dois lados: desejo partir e estar com Cristo, o que seria de longe o melhor; mas continuar no mundo é mais necessário por vossa causa.
Apenas uma coisa importa: vivei de maneira digna do Evangelho de Cristo.

Palavra do Senhor.
R. Graças a Deus.`
    },
    'ev_dom_w2': {
        title: 'Evangelho — Mateus 20,1-16a (Lecionário I, pág. 328)',
        text: `Proclamação do Evangelho de Jesus Cristo segundo Mateus.

Jesus contou esta parábola aos discípulos:
"O Reino dos Céus é como um proprietário que saiu de madrugada a contratar trabalhadores para a sua vinha. Combinou uma moeda de prata por dia e mandou-os para a vinha.
Saiu de novo às nove horas, viu outros desocupados na praça e disse: 'Ide também vós para a vinha, e vos darei o que for justo'. E foram. Fez o mesmo ao meio-dia, às três da tarde e às cinco horas.
Ao entardecer, mandou pagar a todos, a começar pelos últimos até os primeiros. Os das cinco da tarde receberam uma moeda. Chegando os primeiros, pensavam receber mais, mas também receberam uma moeda. Começaram a murmurar contra o dono: 'Estes últimos trabalharam uma hora só, e tu os igualaste a nós, que suportamos o cansaço e o calor do dia todo!'
O patrão respondeu: 'Amigo, não sou injusto contigo. Não combinaste comigo uma moeda? Toma o que é teu e vai. Quero dar a este último tanto quanto a ti. Não tenho o direito de fazer o que quero com o que é meu? Ou tens inveja porque sou generoso?'
Assim, os últimos serão os primeiros, e os primeiros serão os últimos".

Palavra da Salvação.
R. Glória a vós, Senhor.`
    }
};
