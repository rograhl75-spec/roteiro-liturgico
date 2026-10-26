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
    /* =======================================================
       SEMANA 8: 26 DE OUTUBRO A 01 DE NOVEMBRO DE 2026
       Todos os Santos: mesmo conjunto em 31/10 e 01/11.
       As fontes não fornecem leituras feriais para 31/10.
       ======================================================= */
    's8_seg_l1': {
        title: '1ª Leitura — Efésios 4,32-5,8 (Lecionário II, pág. 1123)',
        day: 'Segunda-feira (26/10)',
        text: `Andai no caminho da caridade, como Cristo.

Leitura da Carta de São Paulo aos Efésios 4,32-5,8

Irmãos,
32
sede bons uns para com os outros,
sede compassivos;
perdoai-vos mutuamente,
como Deus vos perdoou por meio de Cristo.
5,1
Sede imitadores de Deus,
como filhos que ele ama.
2
Vivei no amor, como Cristo nos amou
e se entregou a si mesmo a Deus por nós,
em oblação e sacrifício de suave odor.
3
A devassidão,
ou qualquer espécie de impureza ou cobiça
sequer sejam mencionadas entre vós,
como convém a santos.
4
Nada de palavras grosseiras,
insensatas ou obscenas,
que são inconvenientes;
dedicai-vos antes à ação de graças.
5
Pois, sabei-o bem, o devasso, o impuro,
o avarento - que é um idólatra -
são excluídos da herança
no reino de Cristo e de Deus.
6
Que ninguém vos engane com palavras vazias.
Tudo isso atrai a cólera de Deus
sobre os que lhe desobedecem.
7
Não sejais seus cúmplices.
8
Outrora éreis trevas,
mas agora sois luz no Senhor.
Vivei como filhos da luz.

Palavra do Senhor.
R. Graças a Deus.`
    },
    's8_seg_sal': {
        title: 'Salmo Responsorial — Sl 1,1-2.3.4.6 (R. cf. Ef 5,1) (Lecionário II, pág. 1124)',
        day: 'Segunda-feira (26/10)',
        text: `R. Sejamos, pois, imitadores do Senhor,
como convém aos amados filhos seus.

1
Feliz é todo aquele que não anda *
conforme os conselhos dos perversos;
que não entra no caminho dos malvados, *
nem junto aos zombadores vai sentar-se;
2
mas encontra seu prazer na lei de Deus *
e a medita, dia e noite, sem cessar. R.

3
Eis que ele é semelhante a uma árvore *
que à beira da torrente está plantada;
ela sempre dá seus frutos a seu tempo, †
e jamais as suas folhas vão murchar. *
Eis que tudo o que ele faz vai prosperar, R.

4
mas bem outra é a sorte dos perversos. †
Ao contrário, são iguais à palha seca *
espalhada e dispersada pelo vento.
6
Pois Deus vigia o caminho dos eleitos, *
mas a estrada dos malvados leva à morte. R.`
    },
    's8_seg_ev': {
        title: 'Evangelho — Lucas 13,10-17 (Lecionário II, pág. 1125)',
        day: 'Segunda-feira (26/10)',
        text: `Evangelho
Esta filha de Abraão, não deveria ser
libertada dessa prisão, em dia de sábado?

Proclamação do Evangelho de Jesus Cristo segundo Lucas 13,10-17

Naquele tempo,
10
Jesus estava ensinando numa sinagoga,
em dia de sábado.
11
Havia aí uma mulher que, fazia dezoito anos,
estava com um espírito que a tornava doente.
Era encurvada e incapaz de se endireitar.
12
Vendo-a, Jesus chamou-a e lhe disse:
"Mulher, estás livre da tua doença".
13
Jesus colocou as mãos sobre ela,
e imediatamente a mulher se endireitou,
e começou a louvar a Deus.
14
O chefe da sinagoga ficou furioso,
porque Jesus tinha feito uma cura
em dia de sábado.
E, tomando a palavra,
começou a dizer à multidão:
"Existem seis dias para trabalhar.
Vinde, então, nesses dias para serdes curados,
mas não em dia de sábado".
15
O Senhor lhe respondeu:
"Hipócritas!
Cada um de vós
não solta do curral o boi ou o jumento,
para dar-lhe de beber,
mesmo que seja dia de sábado?
16
Esta filha de Abraão,
que Satanás amarrou durante dezoito anos,
não deveria ser libertada dessa prisão,
em dia de sábado?"
17
Esta resposta envergonhou
todos os inimigos de Jesus.
E a multidão inteira se alegrava
com as maravilhas que ele fazia.

Palavra da Salvação.
R. Glória a vós, Senhor.`
    },
    's8_ter_l1': {
        title: '1ª Leitura — Efésios 5,21-33 (Lecionário II, pág. 1127)',
        day: 'Terça-feira (27/10)',
        text: `Este mistério é grande,
e eu o interpreto em relação a Cristo e à Igreja.

Leitura da Carta de São Paulo aos Efésios 5,21-33

Irmãos,
21
vós que temeis a Cristo,
sede solícitos uns para com os outros.
22
As mulheres sejam submissas aos seus maridos
como ao Senhor.
23
Pois o marido é a cabeça da mulher,
do mesmo modo que Cristo é a cabeça da Igreja,
ele, o Salvador do seu Corpo.
24
Mas como a Igreja é solícita por Cristo,
sejam as mulheres solícitas em tudo
pelos seus maridos.
25
Maridos, amai as vossas mulheres,
como o Cristo amou a Igreja
e se entregou por ela.
26
Ele quis assim torná-la santa,
purificando-a com o banho da água unida à Palavra.
27
Ele quis apresentá-la a si mesmo esplêndida,
sem mancha nem ruga, nem defeito algum,
mas santa e irrepreensível.
28
Assim é que o marido deve amar a sua mulher,
como ao seu próprio corpo.
Aquele que ama a sua mulher ama-se a si mesmo.
29
Ninguém jamais odiou a sua própria carne.
Ao contrário,
alimenta-a e cerca-a de cuidados,
como o Cristo faz com a sua Igreja;
30
e nós somos membros do seu corpo!
31
Por isso o homem deixará seu pai e sua mãe
e se unirá à sua mulher,
e os dois serão uma só carne.
32
Este mistério é grande,
e eu o interpreto em relação a Cristo e à Igreja.
33
Em todo caso, cada um, no que lhe toca,
deve amar a sua mulher como a si mesmo;
e a mulher deve respeitar o seu marido.

Palavra do Senhor.
R. Graças a Deus.`
    },
    's8_ter_sal': {
        title: 'Salmo Responsorial — Sl 127(128),1-2.3.4-5 (R. 1a) (Lecionário II, pág. 1128)',
        day: 'Terça-feira (27/10)',
        text: `R. Felizes todos que respeitam o Senhor!

1
Feliz és tu se temes o Senhor*
e trilhas seus caminhos!
2
Do trabalho de tuas mãos hás de viver,*
serás feliz, tudo irá bem! R.

3
A tua esposa é uma videira bem fecunda*
no coração da tua casa;
os teus filhos são rebentos de oliveira*
ao redor de tua mesa. R.

4
Será assim abençoado todo homem*
que teme o Senhor.
5
O Senhor te abençoe de Sião,*
cada dia de tua vida. R.`
    },
    's8_ter_ev': {
        title: 'Evangelho — Lucas 13,18-21 (Lecionário II, pág. 1129)',
        day: 'Terça-feira (27/10)',
        text: `Evangelho
A semente cresce e torna-se uma grande árvore.

Proclamação do Evangelho de Jesus Cristo segundo Lucas 13,18-21

Naquele tempo,
18
Jesus dizia:
"A que é semelhante o Reino de Deus,
e com que poderei compará-lo?
19
Ele é como a semente de mostarda,
que um homem pega e atira no seu jardim.
A semente cresce, torna-se uma grande árvore,
e as aves do céu fazem ninhos nos seus ramos".
20
Jesus disse ainda:
"Com que poderei ainda comparar o Reino de Deus?
21
Ele é como o fermento que uma mulher pega
e mistura com três porções de farinha,
até que tudo fique fermentado".

Palavra da Salvação.
R. Glória a vós, Senhor.`
    },
    's8_qua_l1': {
        title: '1ª Leitura — Efésios 2,19-22 (Lecionário III, pág. 195)',
        day: 'Quarta-feira (28/10) — Santos Simão e Judas, Apóstolos, Festa',
        text: `Vós fostes integrados no edifício que tem como fundamento os apóstolos
e o próprio Jesus Cristo como pedra principal.

Leitura da Carta de São Paulo aos Efésios 2,19-22

Irmãos,
19
já não sois mais estrangeiros nem migrantes,
mas concidadãos dos santos.
Sois da família de Deus.
20
Vós fostes integrados no edifício
que tem como fundamento os apóstolos e os profetas,
e o próprio Jesus Cristo como pedra principal.
21
É nele que toda a construção se ajusta e se eleva
para formar um templo Santo no Senhor.
22
E vós também sois integrados nesta construção,
para vos tornardes morada de Deus pelo Espírito.

Palavra do Senhor.
R. Graças a Deus.`
    },
    's8_qua_sal': {
        title: 'Salmo Responsorial — Sl 18(19A),2-3.4-5 (R. 5a) (Lecionário III, pág. 196)',
        day: 'Quarta-feira (28/10) — Santos Simão e Judas, Apóstolos, Festa',
        text: `R. Seu som ressoa e se espalha em toda terra.

2
Os céus proclamam a glória do Senhor, *
e o firmamento, a obra de suas mãos;
3
o dia ao dia transmite esta mensagem, *
a noite à noite publica esta notícia. R.

4
Não são discursos nem frases ou palavras, *
nem são vozes que possam ser ouvidas;
5
seu som ressoa e se espalha em toda a terra, *
chega aos confins do universo a sua voz. R.`
    },
    's8_qua_ev': {
        title: 'Evangelho — Lucas 6,12-19 (Lecionário III, pág. 196)',
        day: 'Quarta-feira (28/10) — Santos Simão e Judas, Apóstolos, Festa',
        text: `Evangelho
Escolheu doze dentre eles, aos quais deu o nome de apóstolos.

Proclamação do Evangelho de Jesus Cristo segundo Lucas 6,12-19

12
Naqueles dias, Jesus foi à montanha para rezar.
E passou a noite toda em oração a Deus.
13
Ao amanhecer, chamou seus discípulos
e escolheu doze dentre eles,
aos quais deu o nome de apóstolos:
14
Simão, a quem impôs o nome de Pedro,
e seu irmão André;
Tiago e João;
Filipe e Bartolomeu;
15
Mateus e Tomé;
Tiago, filho de Alfeu, e Simão, chamado Zelota;
16
Judas, filho de Tiago,
e Judas Iscariotes, aquele que se tornou traidor.
17
Jesus desceu da montanha com eles
e parou num lugar plano.
Ali estavam muitos dos seus discípulos
e grande multidão de gente
de toda a Judéia e de Jerusalém,
do litoral de Tiro e Sidônia.
18
Vieram para ouvir Jesus
e serem curados de suas doenças.
E aqueles que estavam atormentados por espíritos maus
também foram curados.
19
A multidão toda procurava tocar em Jesus,
porque uma força saía dele, e curava a todos.

Palavra da Salvação.
R. Glória a vós, Senhor.`
    },
    's8_qui_l1': {
        title: '1ª Leitura — Efésios 6,10-20 (Lecionário II, pág. 1134)',
        day: 'Quinta-feira (29/10)',
        text: `Revesti, portanto, a armadura de Deus, a fim de que,
no dia mau, possais resistir e permanecer firmes em tudo.

Leitura da Carta de São Paulo aos Efésios 6,10-20

10
Para terminar, irmãos,
confortai-vos no Senhor,
e no domínio de sua força,
11
revesti-vos da armadura de Deus,
para estardes em condições
de enfrentar as manobras do diabo.
12
Pois não é a homens que enfrentamos,
mas as autoridades, os poderes,
as dominações deste mundo de trevas,
os espíritos do mal que estão nos céus.
13
Revesti, portanto, a armadura de Deus,
a fim de que no dia mau possais resistir
e permanecer firmes em tudo.
14
De pé, portanto!
Cingi os vossos rins com a verdade,
revesti-vos com a couraça da justiça
15
e calçai os vossos pés
com a prontidão em anunciar o Evangelho da paz.
16
Tomai o escudo da fé,
o qual vos permitirá apagar
todas as flechas ardentes do Maligno.
17
Tomai, enfim, o capacete da salvação
e o gládio do espírito,
isto é, a Palavra de Deus.
18
Com preces e súplicas de vária ordem,
orai em todas as circunstâncias, no Espírito,
e vigiai com toda a perseverança,
intercedendo por todos os santos.
19
Orai também por mim,
para que a palavra seja colocada em minha boca
para anunciar corajosamente o mistério do Evangelho,
20
do qual sou embaixador acorrentado.
Possa eu, como é minha obrigação,
proclamá-lo com toda a ousadia.

Palavra do Senhor.
R. Graças a Deus.`
    },
    's8_qui_sal': {
        title: 'Salmo Responsorial — Sl 143(144),1.2.9-10 (R. 1a) (Lecionário II, pág. 1135)',
        day: 'Quinta-feira (29/10)',
        text: `R. Bendito seja o Senhor, meu rochedo!

1
Bendito seja o Senhor, meu rochedo, †
que adestrou minhas mãos para a luta, *
e os meus dedos treinou para a guerra! R.

2
Ele é meu amor, meu refúgio, *
libertador, fortaleza e abrigo;
É meu escudo: é nele que espero, *
ele submete as nações a meus pés. R.

9
Um canto novo, meu Deus, vou cantar-vos, *
nas dez cordas da harpa louvar-vos,
10
a vós que dais a vitória aos reis *
e salvais vosso servo Davi. R.`
    },
    's8_qui_ev': {
        title: 'Evangelho — Lucas 13,31-35 (Lecionário II, pág. 1136)',
        day: 'Quinta-feira (29/10)',
        text: `Evangelho
Não convém que um profeta morra fora de Jerusalém.

Proclamação do Evangelho de Jesus Cristo segundo Lucas 13,31-35

31
Naquela hora, alguns fariseus aproximaram-se
e disseram a Jesus:
"Tu deves ir embora daqui,
porque Herodes quer te matar".
32
Jesus disse:
"Ide dizer a essa raposa:
eu expulso demônios
e faço curas hoje e amanhã;
e no terceiro dia terminarei o meu trabalho.
33
Entretanto, preciso caminhar hoje,
amanhã e depois de amanhã,
porque não convém
que um profeta morra fora de Jerusalém.
34
Jerusalém, Jerusalém!
Tu que matas os profetas
e apedrejas os que te foram enviados!
Quantas vezes eu quis reunir teus filhos,
como a galinha reúne os pintainhos debaixo das asas,
mas tu não quiseste!
35
Eis que vossa casa ficará abandonada.
Eu vos digo: não me vereis mais,
até que chegue o tempo em que vós mesmos direis:
'Bendito aquele que vem em nome do Senhor' ".

Palavra da Salvação.
R. Glória a vós, Senhor.`
    },
    's8_sex_l1': {
        title: '1ª Leitura — Filipenses 1,1-11 (Lecionário II, pág. 1138)',
        day: 'Sexta-feira (30/10)',
        text: `Tenho a certeza de que aquele que começou em vós uma
boa obra, há de levá-la à perfeição até ao dia de Cristo Jesus.

Início da Carta de São Paulo aos Filipenses 1,1-11

1
Paulo e Timóteo, servos de Cristo Jesus,
a todos os santos em Cristo Jesus
que estão em Filipos,
com os seus bispos e diáconos:
2
graça e paz a vós da parte de Deus nosso Pai
e do Senhor Jesus Cristo.
3
Dou graças ao meu Deus,
todas as vezes que me lembro de vós.
4
Sempre em todas as minhas orações
rezo por vós, com alegria,
5
por causa da vossa comunhão conosco
na divulgação do evangelho,
desde o primeiro dia até agora.
6
Tenho a certeza de que aquele
que começou em vós uma boa obra,
há de levá-la à perfeição até ao dia de Cristo Jesus.
7
É justo que eu pense assim a respeito de vós todos,
pois a todos trago no coração,
porque, tanto na minha prisão
como na defesa e confirmação do Evangelho,
participais na graça que me foi dada.
8
Deus é testemunha de que tenho saudade de todos vós,
com a ternura de Cristo Jesus.
9
E isto eu peço a Deus:
que o vosso amor cresça sempre mais,
em todo o conhecimento e experiência,
10
para discernirdes o que é o melhor.
E assim ficareis puros e sem defeito
para o dia de Cristo,
11
cheios do fruto da justiça
que nos vem por Jesus Cristo,
para a glória e o louvor de Deus.

Palavra do Senhor.
R. Graças a Deus.`
    },
    's8_sex_sal': {
        title: 'Salmo Responsorial — Sl 110(111),1-2.3-4.5-6 (R. 2a) (Lecionário II, pág. 1139)',
        day: 'Sexta-feira (30/10)',
        text: `R. Grandiosas são as obras do Senhor!

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
Ao seu povo manifesta seu poder, *
dando a ele a herança das nações. R.`
    },
    's8_sex_ev': {
        title: 'Evangelho — Lucas 14,1-6 (Lecionário II, pág. 1139)',
        day: 'Sexta-feira (30/10)',
        text: `Evangelho
Se algum de vós tem um filho ou um boi que caiu num poço,
não o tira logo, mesmo em dia de sábado?'

Proclamação do Evangelho de Jesus Cristo segundo Lucas 14,1-6

1
Aconteceu que, num dia de sábado,
Jesus foi comer na casa de um dos chefes dos fariseus.
E eles o observavam.
2
Diante de Jesus, havia um hidrópico.
3
Tomando a palavra,
Jesus falou aos mestres da Lei e aos fariseus:
"A Lei permite curar em dia de sábado, ou não?"
4
Mas eles ficaram em silêncio.
Então Jesus tomou o homem pela mão,
curou-o e despediu-o.
5
Depois lhes disse:
"Se algum de vós tem um filho ou um boi
que caiu num poço,
não o tira logo, mesmo em dia de sábado?"
6
E eles não foram capazes de responder a isso.

Palavra da Salvação.
R. Glória a vós, Senhor.`
    },
    's8_seg_acl': {
        title: 'Aclamação ao Evangelho — Cf. Jo 17,17ba',
        day: 'Segunda-feira (26/10)',
        text: `R. Aleluia, Aleluia, Aleluia.
V. Vossa palavra é a verdade;
   santificai-nos na verdade!`
    },
    's8_ter_acl': {
        title: 'Aclamação ao Evangelho — Cf. Mt 11,25',
        day: 'Terça-feira (27/10)',
        text: `R. Aleluia, Aleluia, Aleluia.
V. Graças te dou, ó Pai, Senhor do céu e da terra,
  pois revelaste os mistérios do teu Reino
  aos pequeninos, escondendo-os aos doutores!`
    },
    's8_qua_acl': {
        title: 'Aclamação ao Evangelho — Santos Simão e Judas, Apóstolos',
        day: 'Quarta-feira (28/10) — Santos Simão e Judas, Apóstolos, Festa',
        text: `R. Aleluia, Aleluia, Aleluia.
V. A vós, ó Deus, louvamos, a vós, Senhor, cantamos;
  vos louva, ó Senhor, o coro dos Apóstolos!`
    },
    's8_qui_acl': {
        title: 'Aclamação ao Evangelho — Cf. Lc 19,38; 2,14',
        day: 'Quinta-feira (29/10)',
        text: `R. Aleluia, Aleluia, Aleluia.
V. Bendito é o rei que vem em nome do Senhor!
  Glória a Deus nos altos céus e na terra paz aos homens!`
    },
    's8_sex_acl': {
        title: 'Aclamação ao Evangelho — Jo 10,27',
        day: 'Sexta-feira (30/10)',
        text: `R. Aleluia, aleluia, aleluia.
V. Minhas ovelhas escutam minha voz,
  eu as conheço e elas me seguem.`
    },
    's8_dom_l1': {
        title: '1ª Leitura — Apocalipse 7,2-4.9-14 (Lecionário I, pág. 1047)',
        day: 'Sábado (31/10) e Domingo (01/11) — Todos os Santos, Solenidade',
        text: `Vi uma multidão imensa
de gente de todas as nações, tribos, povos e línguas.

Leitura do Livro do Apocalipse de São João 7,2-4.9-14

Eu, João,
2
vi um outro anjo,
que subia do lado onde nasce o sol.
Ele trazia a marca do Deus vivo
e gritava, em alta voz,
aos quatro anjos que tinham recebido o poder
de danificar a terra e o mar,
dizendo-lhes:
3
"Não façais mal à terra, nem ao mar nem às arvores,
até que tenhamos marcado na fronte
os servos do nosso Deus".
4
Ouvi então o número dos que tinham sido marcados:
eram cento e quarenta e quatro mil,
de todas as tribos dos filhos de Israel.
9
Depois disso, vi uma multidão imensa
de gente de todas as nações,
tribos, povos e línguas,
e que ninguém podia contar.
Estavam de pé diante do trono e do Cordeiro;
trajavam vestes brancas
e traziam palmas na mão.
10
Todos proclamavam com voz forte:
"A salvação pertence ao nosso Deus,
que está sentado no trono, e ao Cordeiro".
11
Todos os anjos estavam de pé, em volta do trono
e dos Anciãos e dos quatro Seres vivos e prostravam-se,
com o rosto por terra, diante do trono.
E adoravam a Deus, dizendo:
12
"Amém. O louvor, a glória e a sabedoria,
a ação de graças, a honra, o poder e a força
pertencem ao nosso Deus para sempre.
Amém"
13
E um dos Anciãos falou comigo e perguntou:
"Quem são esses vestidos com roupas brancas?
De onde vieram?"
14
Eu respondi:
"Tu é que sabes, meu senhor".
E então ele me disse:
"Esses são os que vieram da grande tribulação.
Lavaram e alvejaram as suas roupas
no sangue do Cordeiro".

Palavra do Senhor.
R. Graças a Deus.`
    },
    's8_dom_sal': {
        title: 'Salmo Responsorial — Sl 23(24),1-2.3-4ab.5-6 (R. cf. 6) (Lecionário I, pág. 1048)',
        day: 'Sábado (31/10) e Domingo (01/11) — Todos os Santos, Solenidade',
        text: `R. É assim a geração dos que procuram o Senhor!

1
Ao Senhor pertence a terra e o que ela encerra, *
o mundo inteiro com os seres que o povoam;
2
porque ele a tornou firme sobre os mares, *
e sobre as águas a mantém inabalável. R.

3
"Quem subirá até o monte do Senhor, *
quem ficará em sua santa habitação?"
4a
"Quem tem mãos puras e inocente coração, *
4b
quem não dirige sua mente para o crime. R.

5
Sobre este desce a bênção do Senhor *
e a recompensa de seu Deus e Salvador".
6
"É assim a geração dos que o procuram, *
e do Deus de Israel buscam a face". R.`
    },
    's8_dom_l2': {
        title: '2ª Leitura — 1 João 3,1-3 (Lecionário I, pág. 1048)',
        day: 'Sábado (31/10) e Domingo (01/11) — Todos os Santos, Solenidade',
        text: `Veremos Deus tal como é.

Leitura da Primeira Carta de São João 3,1-3

Caríssimos,
1
vede que grande presente de amor o Pai nos deu:
de sermos chamados filhos de Deus!
E nós o somos!
Se o mundo não nos conhece,
é porque não conheceu o Pai.
2
Caríssimos, desde já somos filhos de Deus,
mas nem sequer se manifestou o que seremos!
Sabemos que,
quando Jesus se manifestar,
seremos semelhantes a ele,
porque o veremos tal como ele é.
3
Todo o que espera nele,
purifica-se a si mesmo,
como também ele é puro.

Palavra do Senhor.
R. Graças a Deus.`
    },
    's8_dom_ev': {
        title: 'Evangelho — Mateus 5,1-12a (Lecionário I, pág. 1049)',
        day: 'Sábado (31/10) e Domingo (01/11) — Todos os Santos, Solenidade',
        text: `Aclamação ao Evangelho — Mt 11,28

R. Aleluia, Aleluia, Aleluia.
V. Vinde a mim, todos vós que estais cansados
  e penais a carregar pesado fardo,
  e descanso eu vos darei, diz o Senhor.

Evangelho
Alegrai-vos e exultai, porque será grande a vossa recompensa nos céus.

Proclamação do Evangelho de Jesus Cristo segundo Mateus 5,1-12a

Naquele tempo,
1
vendo Jesus as multidões,
subiu ao monte e sentou-se.
Os discípulos aproximaram-se,
2
e Jesus começou a ensiná-los:
3
"Bem-aventurados os pobres em espírito,
porque deles é o Reino dos Céus.
4
Bem-aventurados os aflitos,
porque serão consolados.
5
Bem-aventurados os mansos,
porque possuirão a terra.
6
Bem-aventurados os que têm fome e sede de justiça,
porque serão saciados.
7
Bem-aventurados os misericordiosos,
porque alcançarão misericórdia.
8
Bem-aventurados os puros de coração,
porque verão a Deus.
9
Bem-aventurados os que promovem a paz,
porque serão chamados filhos de Deus.
10
Bem-aventurados os que são perseguidos
por causa da justiça,
porque deles é o Reino dos Céus.
11
Bem-aventurados sois vós, quando vos injuriarem
e perseguirem, e mentindo,
disserem todo tipo de mal contra vós,
por causa de mim.
12
Alegrai-vos e exultai,
porque será grande a vossa recompensa nos céus".

Palavra da Salvação.
R. Glória a vós, Senhor.`
    },
};

window.readingsData = readingsData;
