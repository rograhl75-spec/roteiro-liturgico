/* ==========================================================================
   BANCO DE DADOS LITÚRGICO INTEGRAL — PARÓQUIA NOSSA SENHORA AUXILIADORA
   ========================================================================== */

const readingsData = {
    /* =======================================================
       SEMANA 1: 07 A 13 DE SETEMBRO DE 2026 (24º DOMINGO)
       ======================================================= */
    '1l_seg': {
        title: '1ª Leitura — 1 Coríntios 5,1-8 (Lecionário II, pág. 963)',
        day: 'Segunda-feira (07/09)',
        text: `Leitura da Primeira Carta de São Paulo aos Coríntios 5,1-8\n\nIrmãos:\nOuve-se dizer que há entre vós grave desordem moral. Lançai fora o velho fermento, para que sejais uma massa nova, já que sois pães ázimos. Pois o nosso cordeiro pascal, Cristo, já foi imolado. Celebremos, pois, a festa, não com o fermento da maldade, mas com os pães ázimos da sinceridade e da verdade.\n\nPalavra do Senhor.\nR. Graças a Deus.`
    },
    'sl_seg': {
        title: 'Salmo Responsorial — Sl 5,5-6.7.12 (Lecionário II, pág. 964)',
        day: 'Segunda-feira (07/09)',
        text: `R. Conduzi-me, ó Senhor, na vossa justiça!\n\nNão sois um Deus a quem agrade a iniquidade, * não pode o mal morar convosco, ó Senhor; nem os ímpios poderão permanecer diante dos vossos olhos que tudo veem. R.\n\nDetestais a todos que praticam a injustiça, * exterminais os mentirosos e perversos; o homem sanguinário e traidor o Senhor abomina e rejeita. R.\n\nMas exultem os que em vós têm seu refúgio, * façam festa e cantem hinos para sempre; protegei-os e que em vós se alegrem todos os que amam o vosso santo nome. R.`
    },
    'ev_seg': {
        title: 'Evangelho — Lucas 6,6-11 (Lecionário II, pág. 965)',
        day: 'Segunda-feira (07/09)',
        text: `Proclamação do Evangelho de Jesus Cristo segundo Lucas 6,6-11\n\nNum outro sábado, Jesus entrou na sinagoga e começou a ensinar. Estava ali um homem cuja mão direita era seca. Os mestres da Lei e os fariseus espreitavam se Jesus curaria no sábado, para terem de que o acusar.\n\nJesus conhecia os seus pensamentos e disse ao homem: "Levanta-te e fica em pé no meio!" Ele levantou-se. Então Jesus perguntou: "O que é permitido fazer no sábado: o bem ou o mal? Salvar uma vida ou destruí-la?"\n\nOlhando para todos ao redor, disse ao homem: "Estende a mão!" Ele a estendeu, e a mão ficou curada. Mas eles ficaram furiosos e planejavam o que fazer contra Jesus.\n\nPalavra da Salvação.\nR. Glória a vós, Senhor.`
    },
    '1l_ter': {
        title: '1ª Leitura — Miquéias 5,1-4a (Lecionário III, pág. 165)',
        day: 'Terça-feira (08/09) — Natividade de Nossa Senhora',
        text: `Leitura da Profecia de Miquéias 5,1-4a\n\nAssim diz o Senhor:\n"Tu, Belém de Éfrata, pequenina entre os povoados de Judá, de ti sairá aquele que governará em Israel; sua origem vem desde os dias da eternidade.\n\nEle se levantará e apascentará o rebanho com a força do Senhor, com a majestade do nome do Senhor seu Deus; e eles habitarão em segurança, pois ele será grande até aos confins da terra, e ele mesmo será a Paz".\n\nPalavra do Senhor.\nR. Graças a Deus.`
    },
    'sl_ter': {
        title: 'Salmo Responsorial — Sl 70(71) (Lecionário III, pág. 166)',
        day: 'Terça-feira (08/09) — Natividade de Nossa Senhora',
        text: `R. Exulto de alegria no Senhor.\n\nSois meu apoio desde antes que eu nascesse, * desde o seio maternal, o meu amparo: para vós o meu louvor eternamente! R.\n\nUma vez que confiei no vosso amor, * meu coração, por vosso auxílio, rejubile, e que eu vos cante pelo bem que me fizestes! R.`
    },
    'ev_ter': {
        title: 'Evangelho — Mateus 1,18-23 (Lecionário III, pág. 167)',
        day: 'Terça-feira (08/09) — Natividade de Nossa Senhora',
        text: `Proclamação do Evangelho de Jesus Cristo segundo Mateus 1,18-23\n\nO nascimento de Jesus foi assim: Maria estava prometida em casamento a José. Antes de passarem a conviver, ela encontrou-se grávida pela ação do Espírito Santo.\n\nJosé, sendo justo, pensou em dispensá-la secretamente. Mas o anjo do Senhor lhe apareceu em sonho: "José, não tenhas medo de receber Maria por tua esposa, porque o que nela foi concebido vem do Espírito Santo. Ela dará à luz um filho e tu lhe darás o nome de Jesus, pois ele salvará o seu povo dos seus pecados".\n\nTudo aconteceu para cumprir o que o Senhor dissera pelo profeta: "Eis que a virgem conceberá e dará à luz um filho, e ele será chamado Emanuel: Deus conosco".\n\nPalavra da Salvação.\nR. Glória a vós, Senhor.`
    },
    '1l_qua': {
        title: '1ª Leitura — 1 Coríntios 7,25-31 (Lecionário II, pág. 966)',
        day: 'Quarta-feira (09/09)',
        text: `Leitura da Primeira Carta de São Paulo aos Coríntios 7,25-31\n\nIrmãos: O tempo é breve. Doravante, os que têm mulher vivam como se não tivessem; os que choram, como se não chorassem; os que estão alegres, como se não estivessem; os que compram, como se nada possuíssem; e os que usam deste mundo, como se dele não desfrutassem plenamente. Pois a aparência deste mundo passa.\n\nPalavra do Senhor.\nR. Graças a Deus.`
    },
    'sl_qua': {
        title: 'Salmo Responsorial — Sl 44(45) (Lecionário II, pág. 967)',
        day: 'Quarta-feira (09/09)',
        text: `R. Escutai, minha filha, olhai, ouvi isto!\n\nEscutai, minha filha, olhai, ouvi isto: * "Esquecei vosso povo e a casa paterna! Que o Rei se encante com vossa beleza! Prestai-lhe homenagem: é vosso Senhor!" R.\n\nMajestosa, a princesa real vem chegando, * vestida de ricos brocados de ouro. Em vestes vistosas ao Rei se dirige, * e as virgens amigas lhe formam cortejo. R.`
    },
    'ev_qua': {
        title: 'Evangelho — Lucas 6,20-26 (Lecionário II, pág. 968)',
        day: 'Quarta-feira (09/09)',
        text: `Proclamação do Evangelho de Jesus Cristo segundo Lucas 6,20-26\n\nJesus, levantando os olhos para os discípulos, disse:\n"Bem-aventurados vós, os pobres, porque vosso é o Reino de Deus!\nBem-aventurados vós que agora tendes fome, porque sereis saciados!\nBem-aventurados vós que agora chorais, porque haveis de rir!\nBem-aventurados sereis quando os homens vos odiarem e insultarem por causa do Filho do Homem! Alegrai-vos nesse dia, pois grande é a vossa recompensa no céu.\n\nMas ai de vós, ricos, porque já tendes vossa consolação! Ai de vós que agora estais fartos, porque haveis de passar fome!"\n\nPalavra da Salvação.\nR. Glória a vós, Senhor.`
    },
    '1l_qui': {
        title: '1ª Leitura — 1 Coríntios 8,1b-7.11-13 (Lecionário II, pág. 970)',
        day: 'Quinta-feira (10/09)',
        text: `Leitura da Primeira Carta de São Paulo aos Coríntios 8,1b-7.11-13\n\nIrmãos: O conhecimento envaidece, mas a caridade constrói. Se alguém ama a Deus, esse é conhecido por Ele. Para nós há um só Deus, o Pai, de quem tudo procede e para quem existimos; e um só Senhor, Jesus Cristo, por quem tudo existe e nós também. Cuidai para que a vossa liberdade não se torne ocasião de queda para os fracos.\n\nPalavra do Senhor.\nR. Graças a Deus.`
    },
    'sl_qui': {
        title: 'Salmo Responsorial — Sl 138(139) (Lecionário II, pág. 971)',
        day: 'Quinta-feira (10/09)',
        text: `R. Conduzi-me no caminho para a vida, ó Senhor!\n\nSenhor, vós me sondais e conheceis, * sabeis quando me sento ou me levanto; de longe penetrais meus pensamentos, * percebeis quando me deito e quando ando. R.\n\nFostes vós que me formastes as entranhas, * e no seio de minha mãe vós me tecestes. Eu vos dou graças, ó Senhor, * porque de modo admirável me formastes! R.`
    },
    'ev_qui': {
        title: 'Evangelho — Lucas 6,27-38 (Lecionário II, pág. 972)',
        day: 'Quinta-feira (10/09)',
        text: `Proclamação do Evangelho de Jesus Cristo segundo Lucas 6,27-38\n\nNaquele tempo, disse Jesus aos discípulos:\n"Amai os vossos inimigos, fazei o bem aos que vos odeiam, bendizei os que vos amaldiçoam e rezai pelos que vos caluniam. Como quereis que os outros vos façam, fazei também vós a eles. Sede misericordiosos como vosso Pai é misericordioso. Não julgueis e não sereis julgados; perdoai e sereis perdoados. Dai e vos será dado".\n\nPalavra da Salvação.\nR. Glória a vós, Senhor.`
    },
    '1l_sex': {
        title: '1ª Leitura — 1 Coríntios 9,16-19.22b-27 (Lecionário II, pág. 974)',
        day: 'Sexta-feira (11/09)',
        text: `Leitura da Primeira Carta de São Paulo aos Coríntios 9,16-19.22b-27\n\nIrmãos: Pregar o evangelho não é para mim motivo de vanglória, mas uma obrigação: ai de mim se eu não pregar o evangelho! Livre em relação a todos, fiz-me servo de todos para ganhar o maior número possível. Os atletas se privam de tudo para receber uma coroa perecível; nós, porém, buscamos uma coroa incorruptível.\n\nPalavra do Senhor.\nR. Graças a Deus.`
    },
    'sl_sex': {
        title: 'Salmo Responsorial — Sl 83(84) (Lecionário II, pág. 975)',
        day: 'Sexta-feira (11/09)',
        text: `R. Quão amável, ó Senhor, é vossa casa!\n\nMinha alma desfalece de saudades * e anseia pelos átrios do Senhor! Meu coração e meu ser se alegram * e exultam no Deus vivo! R.\n\nFelizes os que habitam vossa casa; * para sempre haverão de vos louvar! Felizes os que em vós encontram força * para caminhar com fé e esperança! R.`
    },
    'ev_sex': {
        title: 'Evangelho — Lucas 6,39-42 (Lecionário II, pág. 976)',
        day: 'Sexta-feira (11/09)',
        text: `Proclamação do Evangelho de Jesus Cristo segundo Lucas 6,39-42\n\nJesus contou uma parábola:\n"Pode um cego guiar outro cego? Não cairão ambos no buraco? Um discípulo não é maior do que o mestre; todo discípulo bem formado será como o mestre. Por que vês o cisco no olho do teu irmão e não notas a trave no teu próprio olho? Tira primeiro a trave do teu olho e então enxergarás bem para tirar o cisco do olho do teu irmão".\n\nPalavra da Salvação.\nR. Glória a vós, Senhor.`
    },
    '1l_dom': {
        title: '1ª Leitura — Eclesiástico 27,33-28,9 (Lecionário I, pág. 323)',
        day: 'Fim de Semana (12 e 13/09) — 24º Domingo',
        text: `Leitura do Livro do Eclesiástico 27,33-28,9\n\nO rancor e a cólera são detestáveis; o pecador os conserva consigo. Quem se vinga encontrará a retribuição do Senhor, que guardará com rigor os seus pecados. Perdoa a injustiça ao teu próximo e, quando orares, teus pecados serão cancelados. Se um mortal guarda rancor contra o outro, como pedirá cura a Deus? Se não tem compaixão do seu semelhante, como suplicará perdão para os seus próprios erros? Lembra-te do teu fim e cessa de odiar; pensa na morte e persevera na Aliança do Altíssimo.\n\nPalavra do Senhor.\nR. Graças a Deus.`
    },
    'sl_dom': {
        title: 'Salmo Responsorial — Sl 102(103) (Lecionário I, pág. 323)',
        day: 'Fim de Semana (12 e 13/09) — 24º Domingo',
        text: `R. O Senhor é bondoso, compassivo e carinhoso.\n\nBendize, ó minha alma, ao Senhor, * e todo o meu ser, seu santo nome! Bendize, ó minha alma, ao Senhor, * não te esqueças de nenhum de seus favores! R.\n\nPois ele te perdoa toda culpa, * e cura toda a tua enfermidade; da sepultura ele salva a tua vida * e te cerca de carinho e compaixão. R.\n\nNão nos trata como exigem nossas faltas, * nem nos castiga conforme nossos erros; quanto o céu se eleva sobre a terra, * tanto é grande o seu amor aos que o respeitam. R.`
    },
    '2l_dom': {
        title: '2ª Leitura — Romanos 14,7-9 (Lecionário I, pág. 324)',
        day: 'Fim de Semana (12 e 13/09) — 24º Domingo',
        text: `Leitura da Carta de São Paulo aos Romanos 14,7-9\n\nIrmãos:\nNenhum de nós vive para si mesmo e nenhum de nós morre para si mesmo. Se vivemos, é para o Senhor que vivemos; se morremos, é para o Senhor que morremos. Portanto, quer vivamos quer morramos, pertencemos ao Senhor. Cristo morreu e ressuscitou exatamente para ser o Senhor tanto dos mortos quanto dos vivos.\n\nPalavra do Senhor.\nR. Graças a Deus.`
    },
    'ev_dom': {
        title: 'Evangelho — Mateus 18,21-35 (Lecionário I, pág. 325)',
        day: 'Fim de Semana (12 e 13/09) — 24º Domingo',
        text: `Proclamação do Evangelho de Jesus Cristo segundo Mateus 18,21-35\n\nPedro aproximou-se de Jesus e perguntou: "Senhor, quantas vezes devo perdoar o irmão que pecar contra mim? Até sete vezes?" Jesus respondeu: "Não te digo até sete, mas até setenta vezes sete!"\n\nE contou a parábola: Um rei resolveu acertar contas e perdoou uma dívida imensa a um empregado que suplicou compaixão. Saindo dali, esse mesmo empregado encontrou um companheiro que lhe devia uma pequena quantia, agarrou-o e mandou prendê-lo até pagar a dívida. O rei chamou-o de volta indignado: "Empregado perverso, perdoei-te toda a dívida porque me suplicaste. Não devias também ter compaixão do teu companheiro?" E entregou-o à punição até saldar tudo.\n\n"Assim meu Pai celeste fará convosco, se cada um não perdoar de coração ao seu irmão".\n\nPalavra da Salvação.\nR. Glória a vós, Senhor.`
    },

    /* =======================================================
       SEMANA 4 (3º BLOCO NA TELA): 28 SET A 04 OUT (27º DOMINGO)
       ======================================================= */
    '1l_seg_w4': {
        title: '1ª Leitura — Jó 1,6-22 (Lecionário II, pág. 1027)',
        day: 'Segunda-feira (28/09) — 26ª Semana do Tempo Comum',
        text: `Leitura do Livro de Jó 1,6-22\n\nUm dia, foram os filhos de Deus apresentar-se ao Senhor; entre eles também Satanás.\nO Senhor, então, disse a Satanás: "Donde vens?"\n"Venho de dar umas voltas pela terra", respondeu ele.\n\nO Senhor disse-lhe: "Reparaste no meu servo Jó? Na terra não há outro igual: é um homem íntegro e correto, teme a Deus e afasta-se do mal".\n\nSatanás respondeu ao Senhor: "Mas será por nada que Jó teme a Deus? Porventura não levantaste um muro de proteção ao redor dele, de sua casa e de todos os seus bens? Tu abençoaste tudo o que ele fez, e seus rebanhos cobrem toda a região. Mas, estende a mão e toca em todos os seus bens; e eu garanto que ele te lançará maldições no rosto!"\n\nEntão o Senhor disse a Satanás: "Pois bem, de tudo o que ele possui, podes dispor, mas não estendas a mão contra ele". E Satanás saiu da presença do Senhor.\n\nOra, num dia em que os filhos e filhas de Jó comiam e bebiam vinho na casa do irmão mais velho, um mensageiro veio dizer a Jó: "Estavam os bois lavrando e as mulas pastando a seu lado, quando, de repente, apareceram os sabeus e roubaram tudo, passando os criados ao fio da espada. Só eu consegui escapar para trazer-te a notícia".\n\nEstava ainda falando, quando chegou outro e disse: "Caiu do céu o fogo de Deus e matou ovelhas e pastores, reduzindo-os a cinza. Só eu consegui escapar para trazer-te a notícia".\n\nEste ainda falava, quando chegou outro e disse: "Os caldeus, divididos em três bandos, lançaram-se sobre os camelos e levaram-nos consigo, depois de passarem os criados ao fio da espada. Só eu consegui escapar para trazer-te a notícia".\n\nEste ainda falava, quando chegou outro e disse: "Teus filhos e tuas filhas estavam comendo e bebendo vinho na casa do irmão mais velho, quando um furacão se levantou das bandas do deserto e se lançou contra os quatro cantos da casa, que desabou sobre os jovens e os matou. Só eu consegui escapar para trazer-te a notícia".\n\nEntão, Jó levantou-se, rasgou o manto, rapou a cabeça, caiu por terra e, prostrado, disse: "Nu eu saí do ventre de minha mãe e nu voltarei para lá. O Senhor deu, o Senhor tirou; como foi do agrado do Senhor, assim foi feito. Bendito seja o nome do Senhor!"\n\nApesar de tudo isso, Jó não cometeu pecado nem se revoltou contra Deus.\n\nPalavra do Senhor.\nR. Graças a Deus.`
    },
    'sl_seg_w4': {
        title: 'Salmo Responsorial — Sl 16(17) (Lecionário II, pág. 1029)',
        day: 'Segunda-feira (28/09) — 26ª Semana do Tempo Comum',
        text: `R. Inclinai o vosso ouvido e escutai-me!\n\nÓ Senhor, ouvi a minha justa causa, * escutai-me e atendei o meu clamor!\nInclinai o vosso ouvido à minha prece, * pois não existe falsidade nos meus lábios! R.\n\nDe vossa face é que me venha o julgamento, * pois vossos olhos sabem ver o que é justo.\nProvai meu coração durante a noite, † visitai-o, examinai-o pelo fogo, * mas em mim não achareis iniquidade. R.\n\nEu vos chamo, ó meu Deus, porque me ouvis, * inclinai o vosso ouvido e escutai-me!\nMostrai-me vosso amor maravilhoso, † vós que salvais e libertais do inimigo * quem procura a proteção junto de vós. R.`
    },
    'ev_seg_w4': {
        title: 'Evangelho — Lucas 9,46-50 (Lecionário II, pág. 1030)',
        day: 'Segunda-feira (28/09) — 26ª Semana do Tempo Comum',
        text: `Proclamação do Evangelho de Jesus Cristo segundo Lucas 9,46-50\n\nNaquele tempo, houve entre os discípulos uma discussão, para saber qual deles seria o maior.\n\nJesus sabia o que estavam pensando. Pegou então uma criança, colocou-a junto de si e disse-lhes: "Quem receber esta criança em meu nome, estará recebendo a mim. E quem me receber, estará recebendo aquele que me enviou. Pois aquele que entre todos vós for o menor, esse é o maior".\n\nJoão disse a Jesus: "Mestre, vimos um homem que expulsa demônios em teu nome. Mas nós o proibimos, porque não anda conosco".\n\nJesus disse-lhe: "Não o proibais, pois quem não está contra vós, está a vosso favor".\n\nPalavra da Salvação.\nR. Glória a vós, Senhor.`
    },
  '1l_ter_w4': {
        title: '1ª Leitura — Apocalipse 12,7-12a',
        day: 'Terça-feira (29/09) — Arcanjos',
        text: `Leitura do Livro do Apocalipse de São João 12,7-12a\n\nHouve uma batalha no céu: Miguel e seus anjos guerrearam contra o Dragão. O Dragão lutou juntamente com os seus anjos, mas foi derrotado, e não se encontrou mais o seu lugar no céu.\n\nE foi expulso o grande Dragão, a antiga Serpente, que é chamado Diabo e Satanás, o sedutor do mundo inteiro. Ele foi expulso para a terra, e os seus anjos foram expulsos com ele.\n\nOuvi então uma voz forte no céu, proclamando: "Agora realizou-se a salvação, a força e a realeza do nosso Deus, e o poder do seu Cristo. Porque foi expulso o acusador dos nossos irmãos, aquele que os acusava dia e noite diante do nosso Deus.\n\nEles venceram o Dragão pelo sangue do Cordeiro e pela palavra do seu próprio testemunho, pois não se apegaram à vida, mesmo diante da morte. Por isso, alegra-te, ó céu, e todos o que viveis nele".\n\nPalavra do Senhor.\nR. Graças a Deus.`
    },
    'sl_ter_w4': {
        title: 'Salmo Responsorial — Sl 137(138) (Lecionário III, pág. 181)',
        day: 'Terça-feira (29/09) — Santos Arcanjos',
        text: `R. Perante os vossos anjos vou cantar-vos, ó Senhor!\n\nÓ Senhor, de coração eu vos dou graças, * porque ouvistes as palavras dos meus lábios!\nPerante os vossos anjos vou cantar-vos * e ante o vosso templo vou prostrar-me. R.\n\nEu agradeço vosso amor, vossa verdade, * porque fizestes muito mais que prometestes;\nnaquele dia em que gritei, vós me escutastes * e aumentastes o vigor da minha alma. R.\n\nOs reis de toda a terra hão de louvar-vos, * quando ouvirem, ó Senhor, vossa promessa.\nHão de cantar vossos caminhos e dirão: * "Como a glória do Senhor é grandiosa!" R.`
    },
    'ev_ter_w4': {
        title: 'Evangelho — João 1,47-51 (Lecionário III, pág. 181)',
        day: 'Terça-feira (29/09) — Santos Arcanjos',
        text: `Proclamação do Evangelho de Jesus Cristo segundo João 1,47-51\n\nNaquele tempo, Jesus viu Natanael que vinha para ele e comentou: "Aí vem um israelita de verdade, um homem sem falsidade".\n\nNatanael perguntou: "De onde me conheces?"\nJesus respondeu: "Antes que Filipe te chamasse, enquanto estavas debaixo da figueira, eu te vi".\n\nNatanael respondeu: "Rabi, tu és o Filho de Deus, tu és o Rei de Israel".\n\nJesus disse: "Tu crês porque te disse: Eu te vi debaixo da figueira? Coisas maiores que esta verás!"\n\nE Jesus continuou: "Em verdade, em verdade, eu vos digo: Vereis o céu aberto e os anjos de Deus subindo e descendo sobre o Filho do Homem".\n\nPalavra da Salvação.\nR. Glória a vós, Senhor.`
    },
    '1l_qua_w4': {
        title: '1ª Leitura — Jó 9,1-12.14-16 (Lecionário II, pág. 1036)',
        day: 'Quarta-feira (30/09) — São Jerônimo',
        text: `Leitura do Livro de Jó 9,1-12.14-16\n\nJó respondeu a seus amigos e disse:\n"Sei muito bem que é assim: como poderia o homem ser justo diante de Deus?\nSe quisesse disputar com ele, entre mil razões não haverá uma para rebatê-lo.\n\nEle é sábio de coração e poderoso em força; quem poderia enfrentá-lo e ficar ileso?\nEle desloca as montanhas, sem que elas percebam e as derruba em sua cólera.\nEle abala a terra em suas bases e suas colunas vacilam.\nEle manda ao sol que não brilhe e guarda escondidas as estrelas.\n\nSozinho desdobra os céus, e caminha sobre as ondas do mar.\nCriou a Ursa e o Órion, as Plêiades e as constelações do Sul.\nFaz prodígios insondáveis, maravilhas sem conta.\nSe passa junto de mim, não o vejo, e quando se afasta, não o percebo.\nSe ele apanha uma presa, quem ousa impedi-lo? Quem pode dizer-lhe: - 'O que está fazendo?'\n\nQuem sou eu para replicar-lhe, e contra ele escolher meus argumentos?\nAinda que eu tivesse razão, não poderia replicar, e deveria pedir misericórdia ao meu juiz.\nSe eu clamasse e ele me respondesse, não creio que daria atenção à minha voz".\n\nPalavra do Senhor.\nR. Graças a Deus.`
    },
    'sl_qua_w4': {
        title: 'Salmo Responsorial — Sl 87(88) (Lecionário II, pág. 1037)',
        day: 'Quarta-feira (30/09) — São Jerônimo',
        text: `R. Chegue a minha oração até a vossa presença!\n\nClamo a vós, ó Senhor sem cessar, todo o dia, * minhas mãos para vós se levantam em prece.\nPara os mortos, acaso, faríeis milagres? * poderiam as sombras erguer-se e louvar-vos? R.\n\nNo sepulcro haverá quem vos cante o amor * e proclame entre os mortos a vossa verdade?\nVossas obras serão conhecidas nas trevas, * vossa graça, no reino onde tudo se esquece? R.\n\nQuanto a mim, ó Senhor, clamo a vós na aflição, * minha prece se eleva até vós desde a aurora.\nPor que vós, ó Senhor, rejeitais a minh'alma? * E por que escondeis vossa face de mim? R.`
    },
    'ev_qua_w4': {
        title: 'Evangelho — Lucas 9,57-62 (Lecionário II, pág. 1037)',
        day: 'Quarta-feira (30/09) — São Jerônimo',
        text: `Proclamação do Evangelho de Jesus Cristo segundo Lucas 9,57-62\n\nNaquele tempo, enquanto Jesus e seus discípulos caminhavam, alguém na estrada disse a Jesus: "Eu te seguirei para onde quer que fores".\n\nJesus lhe respondeu: "As raposas têm tocas e os pássaros têm ninhos; mas o Filho do Homem não tem onde repousar a cabeça".\n\nJesus disse a outro: "Segue-me".\nEste respondeu: "Deixa-me primeiro ir enterrar meu pai".\n\nJesus respondeu: "Deixa que os mortos enterrem os seus mortos; mas tu, vai anunciar o Reino de Deus".\n\nUm outro ainda lhe disse: "Eu te seguirei, Senhor, mas deixa-me primeiro despedir-me dos meus familiares".\n\nJesus, porém, respondeu-lhe: "Quem põe a mão no arado e olha para trás, não está apto para o Reino de Deus".\n\nPalavra da Salvação.\nR. Glória a vós, Senhor.`
    },
    '1l_qui_w4': {
        title: '1ª Leitura — Jó 19,21-27 (Lecionário II, pág. 1040)',
        day: 'Quinta-feira (01/10) — Santa Teresa do Menino Jesus',
        text: `Leitura do Livro de Jó 19,21-27\n\nDisse Jó:\n"Piedade, piedade de mim, meus amigos, pois a mão de Deus me feriu!\nPor que me perseguis como Deus, e não vos cansais de me torturar?\n\nGostaria que minhas palavras fossem escritas e gravadas numa inscrição com ponteiro de ferro e com chumbo, cravadas na rocha para sempre!\n\nEu sei que o meu redentor está vivo e que, por último, se levantará sobre o pó; e depois que tiverem destruído esta minha pele, na minha carne, verei a Deus.\n\nEu mesmo o verei, meus olhos o contemplarão, e não os olhos de outros. Dentro de mim consomem-se os meus rins".\n\nPalavra do Senhor.\nR. Graças a Deus.`
    },
    'sl_qui_w4': {
        title: 'Salmo Responsorial — Sl 26(27) (Lecionário II, pág. 1041)',
        day: 'Quinta-feira (01/10) — Santa Teresa do Menino Jesus',
        text: `R. Sei que a bondade do Senhor eu hei de ver, na terra dos viventes.\n\nÓ Senhor, ouvi a voz do meu apelo, * atendei por compaixão!\nMeu coração fala convosco confiante. * e os meus olhos vos procuram. R.\n\nSenhor é vossa face que eu procuro; * Não me escondais a vossa face!\nNão afasteis em vossa ira o vosso servo, * sois vós o meu auxílio!\nNão me esqueçais nem me deixeis abandonado, * meu Deus e Salvador! R.\n\nSei que a bondade do Senhor eu hei de ver * na terra dos viventes.\nEspera no Senhor e tem coragem, * espera no Senhor! R.`
    },
    'ev_qui_w4': {
        title: 'Evangelho — Lucas 10,1-12 (Lecionário II, pág. 1041)',
        day: 'Quinta-feira (01/10) — Santa Teresa do Menino Jesus',
        text: `Proclamação do Evangelho de Jesus Cristo segundo Lucas 10,1-12\n\nNaquele tempo, o Senhor escolheu outros setenta e dois discípulos e os enviou dois a dois, na sua frente, a toda cidade e lugar aonde ele próprio devia ir.\n\nE dizia-lhes: "A messe é grande, mas os trabalhadores são poucos. Por isso, pedi ao dono da messe que mande trabalhadores para a colheita.\n\nEis que vos envio como cordeiros para o meio de lobos. Não leveis bolsa, nem sacola, nem sandálias, e não cumprimenteis ninguém pelo caminho!\n\nEm qualquer casa em que entrardes, dizei primeiro: 'A paz esteja nesta casa!' Se ali morar um amigo da paz, a vossa paz repousará sobre ele; se não, ela voltará para vós.\n\nPermanecei naquela mesma casa, comei e bebei do que tiverem, porque o trabalhador merece o seu salário. Não passeis de casa em casa.\n\nQuando entrardes numa cidade e fordes bem recebidos, comei do que vos servirem, curai os doentes que nela houver e dizei ao povo: 'O Reino de Deus está próximo de vós.'\n\nMas, quando entrardes numa cidade e não fordes bem recebidos, saindo pelas ruas, dizei: 'Até a poeira de vossa cidade, que se apegou aos nossos pés, sacudimos contra vós. No entanto, sabei que o Reino de Deus está próximo!'\n\nEu vos digo que, naquele dia, Sodoma será tratada com menos rigor do que essa cidade".\n\nPalavra da Salvação.\nR. Glória a vós, Senhor.`
    },
    '1l_sex_w4': {
        title: '1ª Leitura — Êxodo 23,20-23a (Lecionário III, pág. 184)',
        day: 'Sexta-feira (02/10) — Santos Anjos da Guarda',
        text: `Leitura do Livro do Êxodo 23,20-23\n\nAssim diz o Senhor:\n"Vou enviar um anjo que vá à tua frente, que te guarde pelo caminho e te conduza ao lugar que te preparei.\n\nRespeita-o e ouve a sua voz. Não lhe sejas rebelde, porque não suportará as vossas transgressões, e nele está o meu nome.\n\nSe ouvires a sua voz e fizeres tudo o que eu disser, serei inimigo dos teus inimigos, e adversário dos teus adversários.\n\nO meu anjo irá à tua frente e te conduzirá à terra dos amorreus, dos hititas, dos fereseus, dos cananeus, dos heveus e dos jebuseus, e eu os exterminarei".\n\nPalavra do Senhor.\nR. Graças a Deus.`
    },
    'sl_sex_w4': {
        title: 'Salmo Responsorial — Sl 90(91) (Lecionário III, pág. 184)',
        day: 'Sexta-feira (02/10) — Santos Anjos da Guarda',
        text: `R. O Senhor deu uma ordem aos seus anjos, para em todos os caminhos te guardarem.\n\nQuem habita ao abrigo do Altíssimo * e vive à sombra do Senhor onipotente,\ndiz ao Senhor: "Sois meu refúgio e proteção, * sois o meu Deus, no qual confio inteiramente". R.\n\nDo caçador e do seu laço ele te livra. * Ele te salva da palavra que destrói.\nCom suas asas haverá de proteger-te, * com seu escudo e suas armas, defender-te. R.\n\nNão temerás terror algum durante a noite, * nem a flecha disparada em pleno dia;\nnem a peste que caminha pelo escuro, * nem a desgraça que devasta ao meio-dia. R.\n\nNenhum mal há de chegar perto de ti, * nem a desgraça baterá à tua porta;\npois o Senhor deu uma ordem a seus anjos * para em todos os caminhos te guardarem. R.`
    },
    'ev_sex_w4': {
        title: 'Evangelho — Mateus 18,1-5.10 (Lecionário III, pág. 185)',
        day: 'Sexta-feira (02/10) — Santos Anjos da Guarda',
        text: `Proclamação do Evangelho de Jesus Cristo segundo Mateus 18,1-5.10\n\nNaquela hora, os discípulos aproximaram-se de Jesus e perguntaram: "Quem é o maior no Reino dos Céus?"\n\nJesus chamou uma criança, colocou-a no meio deles e disse: "Em verdade vos digo, se não vos converterdes, e não vos tornardes como crianças, não entrareis no Reino dos Céus.\n\nQuem se faz pequeno como esta criança, esse é o maior no Reino dos Céus.\nE quem recebe em meu nome uma criança como esta, é a mim que recebe.\n\nNão desprezeis nenhum desses pequeninos, pois eu vos digo que os seus anjos nos céus veem sem cessar a face do meu Pai que está nos céus".\n\nPalavra da Salvação.\nR. Glória a vós, Senhor.`
    },
    '1l_dom_w4': {
        title: '1ª Leitura — Isaías 5,1-7 (Lecionário I, pág. 334)',
        day: 'Fim de Semana (03 e 04/10) — 27º Domingo',
        text: `Leitura do Livro do Profeta Isaías 5,1-7\n\nVou cantar para o meu amado o cântico da vinha de um amigo meu: Um amigo meu possuía uma vinha em fértil encosta.\nCercou-a, limpou-a de pedras, plantou videiras escolhidas, edificou uma torre no meio e construiu um lagar; esperava que ela produzisse uvas boas, mas produziu uvas selvagens.\n\nAgora, habitantes de Jerusalém e cidadãos de Judá, julgai a minha situação e a de minha vinha.\nO que poderia eu ter feito a mais por minha vinha e não fiz?\nEu contava com uvas de verdade, mas, por que produziu ela uvas selvagens?\n\nPois agora vou mostrar-vos o que farei com minha vinha: vou desmanchar a cerca, e ela será devastada; vou derrubar o muro, e ela será pisoteada.\nVou deixá-la inculta e selvagem: ela não será podada nem lavrada, espinhos e sarças tomarão conta dela; não deixarei as nuvens derramar a chuva sobre ela.\n\nPois bem, a vinha do Senhor dos exércitos é a casa de Israel, e o povo de Judá, sua dileta plantação; eu esperava deles frutos de justiça — e eis injustiça; esperava obras de bondade — e eis iniquidade.\n\nPalavra do Senhor.\nR. Graças a Deus.`
    },
    'sl_dom_w4': {
        title: 'Salmo Responsorial — Sl 79(80) (Lecionário I, pág. 335)',
        day: 'Fim de Semana (03 e 04/10) — 27º Domingo',
        text: `R. A vinha do Senhor é a casa de Israel.\n\nArrancastes do Egito esta videira, * e expulsastes as nações para plantá-la;\naté o mar se estenderam seus sarmentos, * até o rio os seus rebentos se espalharam. R.\n\nPor que razão vós destruístes sua cerca, * para que todos os passantes a vindimem,\no javali da mata virgem a devaste, * e os animais do descampado nela pastem? R.\n\nVoltai-vos para nós, Deus do universo! † Olhai dos altos céus e observai. * Visitai a vossa vinha e protegei-a!\nFoi a vossa mão direita que a plantou; * protegei-a, e ao rebento que firmastes! R.\n\nE nunca mais vos deixaremos, Senhor Deus! * Dai-nos vida, e louvaremos vosso nome!\nConvertei-nos, ó Senhor Deus do universo, † e sobre nós iluminai a vossa face! * Se voltardes para nós, seremos salvos! R.`
    },
    '2l_dom_w4': {
        title: '2ª Leitura — Filipenses 4,6-9 (Lecionário I, pág. 335)',
        day: 'Fim de Semana (03 e 04/10) — 27º Domingo',
        text: `Leitura da Carta de São Paulo aos Filipenses 4,6-9\n\nIrmãos:\nNão vos inquieteis com coisa alguma, mas apresentai as vossas necessidades a Deus, em orações e súplicas, acompanhadas de ação de graças.\n\nE a paz de Deus, que ultrapassa todo o entendimento, guardará os vossos corações e pensamentos em Cristo Jesus.\n\nQuanto ao mais, irmãos, ocupai-vos com tudo o que é verdadeiro, respeitável, justo, puro, amável, honroso, tudo o que é virtude ou de qualquer modo mereça louvor.\n\nPraticai o que aprendestes e recebestes de mim, ou que de mim vistes e ouvistes.\nAssim o Deus da paz estará convosco.\n\nPalavra do Senhor.\nR. Graças a Deus.`
    },
    'ev_dom_w4': {
        title: 'Evangelho — Mateus 21,33-43 (Lecionário I, pág. 336)',
        day: 'Fim de Semana (03 e 04/10) — 27º Domingo',
        text: `Proclamação do Evangelho de Jesus Cristo segundo Mateus 21,33-43\n\nNaquele tempo, Jesus disse aos sumos sacerdotes e aos anciãos do povo:\n"Escutai esta outra parábola: Certo proprietário plantou uma vinha, pôs uma cerca em volta, fez nela um lagar para esmagar as uvas, e construiu uma torre de guarda. Depois, arrendou-a a vinhateiros, e viajou para o estrangeiro.\n\nQuando chegou o tempo da colheita, o proprietário mandou seus empregados aos vinhateiros para receber seus frutos.\nOs vinhateiros, porém, agarraram os empregados, espancaram a um, mataram a outro, e ao terceiro apedrejaram.\n\nO proprietário mandou de novo outros empregados, em maior número do que os primeiros. Mas eles os trataram da mesma forma.\n\nFinalmente, o proprietário enviou-lhes o seu filho, pensando: 'Ao meu filho eles vão respeitar'.\nOs vinhateiros, porém, ao verem o filho, disseram entre si: 'Este é o herdeiro. Vinde, vamos matá-lo e tomar posse da sua herança!'\nEntão agarraram o filho, jogaram-no para fora da vinha e o mataram.\n\nPois bem, quando o dono da vinha voltar, o que fará com esses vinhateiros?"\n\nOs sumos sacerdotes e os anciãos do povo responderam: "Com certeza mandará matar de modo violento esses perversos e arrendará a vinha a outros vinhateiros, que lhe entregarão os frutos no tempo certo".\n\nEntão Jesus lhes disse: "Vós nunca lestes nas Escrituras: 'A pedra que os construtores rejeitaram tornou-se a pedra angular; isto foi feito pelo Senhor e é maravilhoso aos nossos olhos?'\n\nPor isso, eu vos digo: o Reino de Deus vos será tirado e será entregue a um povo que produzirá frutos".\n\nPalavra da Salvação.\nR. Glória a vós, Senhor.`
    },
    '1l_seg_w5': {
        title: '1ª Leitura — Gálatas 1,6-12 (Lecionário II, pág. 1053)',
        day: 'Segunda-feira (05/10) — 27ª Semana do Tempo Comum',
        text: `Leitura da Carta de São Paulo aos Gálatas 1,6-12 
 
 
Irmãos, 
6 
admiro-me de terdes abandonado tão depressa 
aquele que vos chamou, na graça de Cristo, 
e de terdes passado para um outro evangelho. 
7 
Não que haja outro evangelho, 
mas algumas pessoas vos estão perturbando 
e querendo mudar o evangelho de Cristo. 
8 
Pois bem, mesmo que nós ou um anjo vindo do céu 
vos pregasse um evangelho 
diferente daquele que vos pregamos, seja excomungado. 
9 
Como já dissemos e agora repito: 
Se alguém vos pregar um evangelho 
diferente daquele que recebestes, seja excomungado. 
10 

Será que eu estou buscando a aprovação dos homens 
ou a aprovação de Deus? 
Ou estou procurando agradar aos homens? 
Se eu ainda estivesse preocupado 
em agradar aos homens, 
não seria servo de Cristo. 
11 
Irmãos, asseguro-vos 
que o evangelho pregado por mim 
não é conforme a critérios humanos. 
12 
Com efeito, não o recebi nem aprendi de homem algum, 
mas por revelação de Jesus Cristo. 
Palavra do Senhor.`
    },
    'sl_seg_w5': {
        title: 'Salmo Responsorial — Sl 110(111),1-2.7-8.9 e 10c (R. 5b) (Lecionário II, pág. 1054)',
        day: 'Segunda-feira (05/10) — 27ª Semana do Tempo Comum',
        text: `R. O Senhor se lembra sempre da Aliança. 
 
Ou: Aleluia, Aleluia, Aleluia 
1 
Eu agradeço a Deus de todo o coração * 
junto com todos os seus justos reunidos! 
2 
Que grandiosas são as obras do Senhor, * 
elas merecem todo o amor e admiração! R. 
 
7 
Suas obras são verdade e são justiça, * 
seus preceitos, todos eles, são estáveis, 
8 

confirmados para sempre e pelos séculos, * 
realizados na verdade e retidão. R. 
 
9 
Enviou libertação para o seu povo, * 
confirmou sua Aliança para sempre. 
Seu nome é santo e é digno de respeito. * 
10c 
Permaneça eternamente o seu louvor. R.`
    },
    'ev_seg_w5': {
        title: 'Evangelho — Lucas 10,25-37 (Lecionário II, pág. 1055)',
        day: 'Segunda-feira (05/10) — 27ª Semana do Tempo Comum',
        text: `Proclamação do Evangelho de Jesus Cristo segundo Lucas 10,25-37 
 
Naquele tempo, 
25 
um mestre da Lei se levantou 
e, querendo pôr Jesus em dificuldade, 
perguntou: 
"Mestre, que devo fazer 
para receber em herança a vida eterna?" 
26 
Jesus lhe disse: 

"O que está escrito na Lei? 
Como lês?" 
27 
Ele então respondeu: 
"Amarás o Senhor, teu Deus, 
de todo o teu coração e com toda a tua alma, 
com toda a tua força e com toda a tua inteligência; 
e ao teu próximo como a ti mesmo!" 
28 
Jesus lhe disse: 
"Tu respondeste corretamente. 
Faze isso e viverás". 
29 
Ele, porém, querendo justificar-se, 
disse a Jesus: 
"E quem é o meu próximo?" 
30 
Jesus respondeu: 
"Certo homem descia de Jerusalém para Jericó 
e caiu nas mãos de assaltantes. 
Estes arrancaram-lhe tudo, espancaram-no, 
e foram-se embora deixando-o quase morto. 
31 
Por acaso, um sacerdote 
estava descendo por aquele caminho. 
Quando viu o homem, 
seguiu adiante, pelo outro lado. 
32 
O mesmo aconteceu com um levita: 
chegou ao lugar, viu o homem 
e seguiu adiante, pelo outro lado. 
33 

Mas um samaritano que estava viajando, 
chegou perto dele, viu e sentiu compaixão. 
34 
Aproximou-se dele e fez curativos, 
derramando óleo e vinho nas feridas. 
Depois colocou o homem em seu próprio animal 
e levou-o a uma pensão, onde cuidou dele. 
35 
No dia seguinte, pegou duas moedas de prata 
e entregou-as ao dono da pensão, recomendando: 
"Toma conta dele! 
Quando eu voltar, 
vou pagar o que tiveres gasto a mais'. 
E Jesus perguntou: 
36 
"Na tua opinião, qual dos três foi o próximo do homem 
que caiu nas mãos dos assaltantes?" 
37 
Ele respondeu: 
"Aquele que usou de misericórdia para com ele". 
Então Jesus lhe disse: 
"Vai e faze a mesma coisa". 
Palavra da Salvação.`
    },
    '1l_ter_w5': {
        title: '1ª Leitura — Gálatas 1,13-24 (Lecionário II, pág. 1058)',
        day: 'Terça-feira (06/10) — 27ª Semana do Tempo Comum',
        text: `Leitura da Carta de São Paulo aos Gálatas 1,13-24 
 
 
Irmãos, 
13 
certamente ouvistes falar 
como foi outrora a minha conduta no judaísmo, 
com que excessos perseguia 
e devastava a Igreja de Deus 
14 
e como progredia no judaísmo 
mais do que muitos judeus de minha idade, 
mostrando-me extremamente zeloso 
das tradições paternas. 
15 
Quando, porém, 
aquele que me separou desde o ventre materno 
e me chamou por sua graça 
16 
se dignou revelar-me o seu Filho, 
para que eu o pregasse entre os pagãos, 
não consultei carne nem sangue 

17 
nem subi, logo, a Jerusalém 
para estar com os que eram apóstolos antes de mim. 
Pelo contrário, parti para a Arábia 
e, depois, voltei ainda a Damasco. 
18 
Três anos mais tarde, fui a Jerusalém 
para conhecer Cefas 
e fiquei com ele quinze dias. 
19 
E não estive com nenhum outro apóstolo, 
a não ser Tiago, o irmão do Senhor. 
20 
Escrevendo estas coisas, 
afirmo diante de Deus que não estou mentindo. 
21 
Depois, fui para as regiões da Síria e da Cilícia. 
22 
Ainda não era pessoalmente conhecido 
das igrejas da Judéia que estão em Cristo. 
23 
Apenas tinham ouvido dizer que 
"aquele que, antes, nos perseguia, 
está agora pregando a fé 
que, antes, procurava destruir". 
24 
E glorificavam a Deus por minha causa. 
Palavra do Senhor.`
    },
    'sl_ter_w5': {
        title: 'Salmo Responsorial — Sl 138(139),1-3.13-14ab.14c-15 (R. 24b) (Lecionário II, pág. 1059)',
        day: 'Terça-feira (06/10) — 27ª Semana do Tempo Comum',
        text: `R. Conduzi-me no caminho para a vida, ó Senhor! 
1 
Senhor, vós me sondais e conheceis, * 
2 
sabeis quando me sento ou me levanto; 
de longe penetrais meus pensamentos, † 
3 
percebeis quando me deito e quando eu ando, * 
os meus caminhos vos são todos conhecidos. R. 
 
13 
Fostes vós que me formastes as entranhas, * 
e no seio de minha mãe vós me tecestes. 
14a 
Eu vos louvo e vos dou graças, ó Senhor, † 
porque de modo admirável me formastes! * 
b 
Que prodígio e maravilha as vossas obras! R. 
 
c 
Até o mais íntimo, Senhor me conheceis; * 
15 
nenhuma sequer de minhas fibras ignoráveis; 
quando eu era modelado ocultamente, * 
era formado nas entranhas subterrâneas. R.`
    },
    'ev_ter_w5': {
        title: 'Evangelho — Lucas 10,38-42 (Lecionário II, pág. 1059)',
        day: 'Terça-feira (06/10) — 27ª Semana do Tempo Comum',
        text: `Proclamação do Evangelho de Jesus Cristo segundo Lucas 10,38-42 
 
Naquele tempo, 
38 
Jesus entrou num povoado, 
e certa mulher, de nome Marta, 
recebeu-o em sua casa. 
39 
Sua irmã, chamada Maria, 
sentou-se aos pés do Senhor, 
e escutava a sua palavra. 
40 
Marta, porém, estava ocupada com muitos afazeres. 
Ela aproximou-se e disse: 
"Senhor, não te importas que minha irmã 
me deixe sozinha, com todo o serviço? 
Manda que ela me venha ajudar!" 
41 
O Senhor, porém, lhe respondeu: 
"Marta, Marta! Tu te preocupas 
e andas agitada por muitas coisas. 
42 
Porém, uma só coisa é necessária. 
Maria escolheu a melhor parte 
e esta não lhe será tirada". 
Palavra da Salvação.`
    },
    '1l_qua_w5': {
        title: '1ª Leitura — Atos 1,12-14 (Lecionário III, n. 1, pág. 257)',
        day: 'Quarta-feira (07/10) — Nossa Senhora do Rosário (Memória)',
        text: `Leitura dos Atos dos Apóstolos 1,12-14 
 
 
Depois que Jesus subiu ao céu, 
12 
os apóstolos voltaram para Jerusalém, 
vindo do monte das Oliveiras, 
que fica perto de Jerusalém, 
a mais ou menos um quilômetro. 
13 
Entraram na cidade e subiram para a sala de cima, 
onde costumavam ficar. 
Eram Pedro e João, Tiago e André, Filipe e Tomé, 
Bartolomeu e Mateus, Tiago, filho de Alfeu, 
Simão Zelota e Judas, filho de Tiago. 
14 
Todos eles perseveravam na oração em comum, 
junto com algumas mulheres, entre as quais Maria, 
mãe de Jesus, e com os irmãos de Jesus. 
Palavra do Senhor.`
    },
    'sl_qua_w5': {
        title: 'Cântico — Lc 1,46-47.48-49.50-51.52-53.54-55 (R. 49) (Lecionário III, n. 5, pág. 261)',
        day: 'Quarta-feira (07/10) — Nossa Senhora do Rosário (Memória)',
        text: `R. O Poderoso fez por mim maravilhas, 
  e Santo é o seu nome. 
ou: Bendita sejais, ó Virgem Maria; 
   trouxestes no ventre a Palavra eterna! 
46 
A minh'alma engrandece ao Senhor, * 
47 
e se alegrou o meu espírito em Deus, meu Salvador, R. 
 
48 
pois, ele viu a pequenez de sua serva, * 
desde agora as gerações hão de chamar-me de bendita. 
49 
O Poderoso fez por mim maravilhas * 
e Santo é o seu nome! R. 
 
50 
Seu amor, de geração em geração, * 
chega a todos que o respeitam. 
51 
Demonstrou o poder de seu braço, * 
dispersou os orgulhosos. R. 
 
52 
Derrubou os poderosos de seus tronos * 
e os humildes exaltou. 
53 

De bens saciou os famintos * 
e despediu, sem nada, os ricos. R. 
 
54 
Acolheu Israel, seu servidor, * 
fiel ao seu amor, 
55 
como havia prometido aos nossos pais, * 
em favor de Abraão e de seus filhos, para sempre. R.`
    },
    'ev_qua_w5': {
        title: 'Evangelho — Lucas 1,26-38 (Lecionário III, n. 4, pág. 269)',
        day: 'Quarta-feira (07/10) — Nossa Senhora do Rosário (Memória)',
        text: `Proclamação do Evangelho de Jesus Cristo segundo Lucas 1,26-38 
 
Naquele tempo, 
26 
o anjo Gabriel foi enviado por Deus 
a uma cidade da Galileia, chamada Nazaré, 
27 
a uma virgem, prometida em casamento 
a um homem chamado José. 
Ele era descendente de Davi 
e o nome da virgem era Maria. 
28 
O anjo entrou onde ela estava e disse: 
"Alegra-te, cheia de graça, o Senhor está contigo!" 
29 

Maria ficou perturbada com estas palavras 
e começou a pensar qual seria o significado da saudação. 
30 
O anjo, então, disse-lhe: 
"Não tenhas medo, Maria, 
porque encontraste graça diante de Deus. 
31 
Eis que conceberás e darás à luz um filho, 
a quem porás o nome de Jesus. 
32 
Ele será grande, 
será chamado Filho do Altíssimo, 
e o Senhor Deus lhe dará o trono de seu pai Davi. 
33 
Ele reinará para sempre 
sobre os descendentes de Jacó, 
e o seu reino não terá fim". 
34 
Maria perguntou ao anjo: 
"Como acontecerá isso, 
se eu não conheço homem algum?" 
35 
O anjo respondeu: 
"O Espírito virá sobre ti, 
e o poder do Altíssimo te cobrirá com sua sombra. 
Por isso, o menino que vai nascer 
será chamado Santo, Filho de Deus. 
36 
Também Isabel, tua parenta, 
concebeu um filho na velhice. 
Este já é o sexto mês daquela 
que era considerada estéril, 

37 
porque para Deus nada é impossível". 
38 
Maria, então, disse: 
"Eis aqui a serva do Senhor; 
faça-se em mim segundo a tua palavra!" 
E o anjo retirou-se. 
Palavra da Salvação.`
    },
    '1l_qui_w5': {
        title: '1ª Leitura — Gálatas 3,1-5 (Lecionário II, pág. 1066)',
        day: 'Quinta-feira (08/10) — 27ª Semana do Tempo Comum',
        text: `Leitura da Carta de São Paulo aos Gálatas 3,1-5 
 
1 
Ó gálatas insensatos, 
quem é que vos fascinou? 
Diante de vossos olhos, 
não foi acaso representado, 
como que ao vivo, 
Jesus Cristo crucificado? 
2 
Só isto quero saber de vós: 
Recebestes o Espírito pela prática da Lei 
ou pela fé através da pregação? 
3 
Sois assim tão insensatos? 
A ponto de, 
depois de terdes começado pelo espírito, 
quererdes terminar pela carne? 
4 
Foi acaso em vão que sofrestes tanto? 
Se é que foi mesmo em vão! 
5 

Aquele que vos dá generosamente o Espírito 
e realiza milagres entre vós, 
faz isso porque praticais a Lei 
ou porque crestes, através da pregação? 
Palavra do Senhor.`
    },
    'sl_qui_w5': {
        title: 'Cântico — Lc 1,69-70.71-72.73 e 75 (R. cf. 68) (Lecionário II, pág. 1066)',
        day: 'Quinta-feira (08/10) — 27ª Semana do Tempo Comum',
        text: `R. Bendito seja o Senhor Deus de Israel, 
   porque a seu povo visitou e libertou! 
69 
Fez surgir um poderoso Salvador * 
na casa de Davi, seu servidor, 
70 
como falara pela boca de seus santos, * 
os profetas desde os tempos mais antigos. R. 
 
71 
para salvar-nos do poder dos inimigos * 
e da mão de todos quantos nos odeiam. 
72 
Assim mostrou misericórdia a nossos pais, * 
recordando a sua santa Aliança. R. 
 
73 
e o juramento a Abraão, o nosso pai, * 
de conceder-nos 74que, libertos do inimigo, 
 
a ele nós sirvamos sem temor † 
75 

em santidade e em justiça diante dele, * 
enquanto perdurarem nossos dias. R.`
    },
    'ev_qui_w5': {
        title: 'Evangelho — Lucas 11,5-13 (Lecionário II, pág. 1067)',
        day: 'Quinta-feira (08/10) — 27ª Semana do Tempo Comum',
        text: `Proclamação do Evangelho de Jesus Cristo segundo Lucas 11,5-13 
 
Naquele tempo, disse Jesus aos seus discípulos: 
5 
"Se um de vós tiver um amigo 
e for procurá-lo à meia-noite 
e lhe disser: 
'Amigo, empresta-me três pães, 
6 
porque um amigo meu chegou de viagem 
e nada tenho para lhe oferecer', 
7 
e se o outro responder lá de dentro: 
'Não me incomodes! 
Já tranquei a porta, 
e meus filhos e eu já estamos deitados; 
não me posso levantar para te dar os pães'; 
8 
eu vos declaro: 
mesmo que o outro não se levante 

para dá-los porque é seu amigo, 
vai levantar-se 
ao menos por causa da impertinência dele 
e lhe dará quanto for necessário. 
9 
Portanto, eu vos digo: 
pedi e recebereis; 
procurai e encontrareis; 
batei e vos será aberto. 
10 
Pois quem pede, recebe; 
quem procura, encontra; 
e, para quem bate, se abrirá. 
11 
Será que algum de vós que é pai, 
se o filho pedir um peixe, 
lhe dará uma cobra? 
12 
Ou ainda, se pedir um ovo, 
lhe dará um escorpião? 
13 
Ora, se vós que sois maus, 
sabeis dar coisas boas aos vossos filhos, 
quanto mais o Pai do Céu dará o Espírito Santo 
aos que o pedirem!" 
Palavra da Salvação.`
    },
    '1l_sex_w5': {
        title: '1ª Leitura — Gálatas 3,7-14 (Lecionário II, pág. 1069)',
        day: 'Sexta-feira (09/10) — 27ª Semana do Tempo Comum',
        text: `Leitura da Carta de São Paulo aos Gálatas 3,7-14 
 
 
Irmãos, 
7 
ficai pois cientes que os que creem 
é que são verdadeiros filhos de Abraão. 
8 
E a Escritura, 
prevendo que Deus justificaria as nações pagãs pela fé, 
anunciou, muito antes, a Abraão: 
"Em ti serão abençoadas todas as nações". 
9 
Portanto, os crentes são abençoados 
com o crente Abraão. 
10 
Aliás, todos os que põem sua confiança na prática da Lei 
estão ameaçados pela maldição, 
porque está escrito: 
"Maldito quem não cumprir perseverantemente 
tudo o que está escrito no livro da Lei". 

11 
Pela Lei ninguém se justifica perante Deus; 
isso é evidente porque o justo vive da fé. 
12 
E a Lei não se funda na fé mas no cumprimento: 
Aquele que cumpre a Lei, por ela viverá. 
13 
Cristo resgatou-nos da maldição da Lei, 
fazendo-se maldição por nós, 
pois está escrito: 
'Maldito todo aquele que é suspenso no madeiro!' 
14 
Assim a bênção de Abraão 
se estendeu aos pagãos em Cristo Jesus 
e pela fé recebemos a promessa do Espírito. 
Palavra do Senhor.`
    },
    'sl_sex_w5': {
        title: 'Salmo Responsorial — Sl 110(111),1-2.3-4.5-6 (R. 5b) (Lecionário II, pág. 1070)',
        day: 'Sexta-feira (09/10) — 27ª Semana do Tempo Comum',
        text: `R. O Senhor se lembra sempre da Aliança! 
Ou: Aleluia, Aleluia, Aleluia. 
 
1 
Eu agradeço a Deus de todo o coração * 
junto com todos os seus justos reunidos! 
2 
Que grandiosas são as obras do Senhor, * 
elas merecem todo o amor e admiração! R. 
 
3 
Que beleza e esplendor são os seus feitos! * 
Sua justiça permanece eternamente! 

4 
O Senhor bom e clemente nos deixou * 
a lembrança de suas grandes maravilhas. R. 
 
5 
Ele dá o alimento aos que o temem * 
e jamais esquecerá sua Aliança. 
6 
ao seu povo manifesta seu poder, * 
dando a ele a herança das nações. R.`
    },
    'ev_sex_w5': {
        title: 'Evangelho — Lucas 11,15-26 (Lecionário II, pág. 1071)',
        day: 'Sexta-feira (09/10) — 27ª Semana do Tempo Comum',
        text: `Proclamação do Evangelho de Jesus Cristo segundo Lucas 11,15-26 
 
Naquele tempo, Jesus estava expulsando um demônio. 
15 
Mas alguns disseram: 
"É por Belzebu, o príncipe dos demônios, 
que ele expulsa os demônios". 
16 
Outros, para tentar Jesus, 
pediam-lhe um sinal do céu. 

17 
Mas, conhecendo seus pensamentos, 
Jesus disse-lhes: 
"Todo reino dividido contra si mesmo será destruído; 
e cairá uma casa por cima da outra. 
18 
Ora, se até Satanás está dividido contra si mesmo, 
como poderá sobreviver o seu reino? 
Vós dizeis que é por Belzebu 
que eu expulso os demônios. 
19 
Se é por meio de Belzebu 
que eu expulso demônios, 
vossos filhos os expulsam por meio de quem? 
Por isso, eles mesmos serão vossos juízes. 
20 
Mas, se é pelo dedo de Deus 
que eu expulso os demônios, 
então chegou para vós o Reino de Deus. 
21 
Quando um homem forte e bem armado 
guarda a própria casa, 
seus bens estão seguros. 
22 
Mas, quando chega um homem mais forte do que ele, 
vence-o, arranca-lhe a armadura na qual ele confiava, 
e reparte o que roubou. 
23 
Quem não está comigo, está contra mim. 
E quem não recolhe comigo, dispersa. 
24 

Quando o espírito mau sai de um homem, 
fica vagando em lugares desertos, 
à procura de repouso; 
não o encontrando, ele diz: 
'Vou voltar para minha casa de onde saí'. 
25 
Quando ele chega, 
encontra a casa varrida e arrumada. 
26 
Então ele vai, e traz consigo 
outros sete espíritos piores do que ele. 
E, entrando, instalam-se aí. 
No fim, esse homem 
fica em condição pior do que antes". 
Palavra da Salvação.`
    },
    '1l_dom_w5': {
        title: '1ª Leitura — Isaías 25,6-10a (Lecionário I, pág. 338)',
        day: 'Fim de Semana (10 e 11/10) — 28º Domingo do Tempo Comum',
        text: `Leitura do Livro do Profeta Isaías 25, 6-10a 
6 
O Senhor dos exércitos dará neste monte, 
para todos os povos, 
um banquete de ricas iguarias, regado com vinho puro, 
servido de pratos deliciosos e dos mais finos vinhos. 
7 
Ele removerá, neste monte, 
a ponta da cadeia que ligava todos os povos, 
a teia em que tinha envolvido todas as nações. 
8 
O Senhor Deus eliminará para sempre a morte 
e enxugará as lágrimas de todas as faces 
e acabará com a desonra do seu povo em toda a terra; 
o Senhor o disse. 
9 
Naquele dia, se dirá: "Este é o nosso Deus, 
esperamos nele, até que nos salvou; 
este é o Senhor, nele temos confiado: 
vamos alegrar-nos e exultar por nos ter salvo". 
10a 

E a mão do Senhor repousará sobre este monte. 
Palavra do Senhor.`
    },
    'sl_dom_w5': {
        title: 'Salmo Responsorial — Sl 22(23),1-3a.3b-4.5-6 (R. 6cd) (Lecionário I, pág. 338)',
        day: 'Fim de Semana (10 e 11/10) — 28º Domingo do Tempo Comum',
        text: `R. Na casa do Senhor habitarei, eternamente. 
 
1 
O Senhor é o pastor que me conduz; * 
não me falta coisa alguma. 
2 
Pelos prados e campinas verdejantes * 
ele me leva a descansar. 
Para as águas repousantes me encaminha, * 
3a 
e restaura as minhas forças. R. 
 
 b 
Ele me guia no caminho mais seguro, * 
pela honra do seu nome. 
4 
Mesmo que eu passe pelo vale tenebroso, * 
nenhum mal eu temerei; 
 
estais comigo com bastão e com cajado; * 
eles me dão a segurança! R. 
 
5 
Preparais à minha frente uma mesa, * 
bem à vista do inimigo, 
e com óleo vós ungis minha cabeça; * 
o meu cálice transborda. R. 
 

6 
Felicidade e todo bem hão de seguir-me * 
por toda a minha vida; 
 c 
e na casa do Senhor habitarei * 
d 
pelos tempos infinitos. R. 
 `
    },
    '2l_dom_w5': {
        title: '2ª Leitura — Filipenses 4,12-14.19-20 (Lecionário I, pág. 339)',
        day: 'Fim de Semana (10 e 11/10) — 28º Domingo do Tempo Comum',
        text: `Leitura da Carta de São Paulo aos Filipenses 4,12-14.19-20 
 
Irmãos: 
12 
Sei viver na miséria e sei viver na abundância. 
Eu aprendi o segredo de viver em toda e qualquer situação, 
estando farto ou passando fome, 
tendo de sobra ou sofrendo necessidade. 
13 
Tudo posso naquele que me dá força. 
14 
No entanto, fizestes bem em compartilhar 
as minhas dificuldades. 
19 
O meu Deus proverá esplendidamente com sua riqueza 
a todas as vossas necessidades, em Cristo Jesus. 
20 
Ao nosso Deus e Pai 
a glória pelos séculos dos séculos. Amém. 
Palavra do Senhor.`
    },
    'ev_dom_w5': {
        title: 'Evangelho — Mateus 22,1-14 (Lecionário I, pág. 340)',
        day: 'Fim de Semana (10 e 11/10) — 28º Domingo do Tempo Comum',
        text: `Proclamação do Evangelho de Jesus Cristo segundo Mateus 22,1-14 
 
 
Naquele tempo, 
1 
Jesus voltou a falar em parábolas 
aos sumos sacerdotes e aos anciãos do povo, dizendo: 
2 
"O Reino dos Céus é como a história do rei 
que preparou a festa de casamento do seu filho. 
3 
E mandou os seus empregados 
para chamar os convidados para a festa, 
mas estes não quiseram vir. 
4 
O rei mandou outros empregados, dizendo: 
'Dizei aos convidados: já preparei o banquete, 
os bois e os animais cevados já foram abatidos 
e tudo está pronto. Vinde para a festa!' 
5 
Mas os convidados não deram a menor atenção: 
um foi para o seu campo, outro para os seus negócios, 

6 
outros agarraram os empregados, 
bateram neles e os mataram. 
7 
O rei ficou indignado e mandou suas tropas 
para matar aqueles assassinos e incendiar a cidade deles. 
8 
Em seguida, o rei disse aos empregados: 
'A festa de casamento está pronta, 
mas os convidados não foram dignos dela. 
9 
Portanto, ide até às encruzilhadas dos caminhos 
e convidai para a festa todos os que encontrardes'. 
10 
Então os empregados saíram pelos caminhos 
e reuniram todos os que encontraram, maus e bons. 
E a sala da festa ficou cheia de convidados. 
11 
Quando o rei entrou para ver os convidados, 
observou aí um homem que não estava usando traje de festa 
12 
e perguntou-lhe: 'Amigo, 
como entraste aqui sem o traje de festa?' 
Mas o homem nada respondeu. 
13 
Então o rei disse aos que serviam: 
'Amarrai os pés e as mãos desse homem 
e jogai-o fora, na escuridão! 
Aí haverá choro e ranger de dentes'. 
14 
Por que muitos são chamados, e poucos são escolhidos". 
Palavra da Salvação.`
    },
};

window.readingsData = readingsData;
