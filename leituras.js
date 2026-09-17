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
       SEMANA 2: 14 A 20 DE SETEMBRO DE 2026 (25º DOMINGO)
       ======================================================= */
    '1l_seg_w2': {
        title: '1ª Leitura — Números 21,4b-9 (Lecionário III, pág. 169)',
        day: 'Segunda-feira (14/09) — Exaltação da Santa Cruz',
        text: `Leitura do Livro dos Números 21,4b-9\n\nNaqueles dias, os filhos de Israel partiram do monte Hor, pelo caminho que leva ao mar Vermelho, para contornarem o país de Edom. Durante a viagem o povo começou a impacientar-se, e se pôs a falar contra Deus e contra Moisés, dizendo: "Por que nos fizestes sair do Egito para morrermos no deserto? Não há pão, falta água, e já estamos com nojo desse alimento miserável".\n\nEntão o Senhor mandou contra o povo serpentes venenosas, que os mordiam; e morreu muita gente em Israel. O povo foi ter com Moisés e disse: "Pecamos, falando contra o Senhor e contra ti. Roga ao Senhor que afaste de nós as serpentes". Moisés intercedeu pelo povo, e o Senhor respondeu: "Faze uma serpente de bronze e coloca-a como sinal sobre uma haste; aquele que for mordido e olhar para ela, viverá".\n\nMoisés fez, pois, uma serpente de bronze e colocou-a como sinal sobre uma haste. Quando alguém era mordido por uma serpente, e olhava para a serpente de bronze, ficava curado.\n\nPalavra do Senhor.\nR. Graças a Deus.`
    },
    'sl_seg_w2': {
        title: 'Salmo Responsorial — Sl 77(78) (Lecionário III, pág. 170)',
        day: 'Segunda-feira (14/09) — Exaltação da Santa Cruz',
        text: `R. Das obras do Senhor, ó meu povo, não te esqueças!\n\nEscuta, ó meu povo, a minha Lei, * ouve atento as palavras que eu te digo; abrirei a minha boca em parábolas, * os mistérios do passado lembrarei. R.\n\nQuando os feria, eles então o procuravam, * convertiam-se correndo para ele; recordavam que o Senhor é sua rocha * e que Deus, seu Redentor, é o Deus Altíssimo. R.\n\nMas apenas o honravam com seus lábios * e mentiam ao Senhor com suas línguas; seus corações enganadores eram falsos * e, infiéis, eles rompiam a Aliança. R.`
    },
    'ev_seg_w2': {
        title: 'Evangelho — João 3,13-17 (Lecionário III, pág. 171)',
        day: 'Segunda-feira (14/09) — Exaltação da Santa Cruz',
        text: `Proclamação do Evangelho de Jesus Cristo segundo João 3,13-17\n\nNaquele tempo, disse Jesus a Nicodemos: "Ninguém subiu ao céu, a não ser aquele que desceu do céu, o Filho do Homem. Do mesmo modo como Moisés levantou a serpente no deserto, assim é necessário que o Filho do Homem seja levantado, para que todos os que nele crerem tenham a vida eterna.\n\nPois Deus amou tanto o mundo, que deu o seu Filho unigênito, para que não morra todo o que nele crer, mas tenha a vida eterna. De fato, Deus não enviou o seu Filho ao mundo para condenar o mundo, mas para que o mundo seja salvo por ele".\n\nPalavra da Salvação.\nR. Glória a vós, Senhor.`
    },
    '1l_ter_w2': {
        title: '1ª Leitura — Hebreus 5,7-9 (Lecionário III, pág. 172)',
        day: 'Terça-feira (15/09) — Nossa Senhora das Dores',
        text: `Leitura da Carta aos Hebreus 5,7-9\n\nCristo, nos dias de sua vida terrestre, dirigiu preces e súplicas, com forte clamor e lágrimas, àquele que era capaz de salvá-lo da morte. E foi atendido, por causa de sua entrega a Deus.\n\nMesmo sendo Filho, aprendeu o que significa a obediência a Deus por aquilo que ele sofreu. Mas, na consumação de sua vida, tornou-se causa de salvação eterna para todos os que lhe obedecem.\n\nPalavra do Senhor.\nR. Graças a Deus.`
    },
    'sl_ter_w2': {
        title: 'Salmo Responsorial — Sl 30(31) (Lecionário III, pág. 172)',
        day: 'Terça-feira (15/09) — Nossa Senhora das Dores',
        text: `R. Salvai-me pela vossa compaixão, ó Senhor Deus!\n\nSenhor, eu ponho em vós minha esperança; * que eu não fique envergonhado eternamente! Porque sois justo, defendei-me e libertai-me * apressai-vos, ó Senhor, em socorrer-me! R.\n\nSede uma rocha protetora para mim, * um abrigo bem seguro que me salve! Sim, sois vós a minha rocha e fortaleza; * por vossa honra orientai-me e conduzi-me! R.`
    },
    'ev_ter_w2': {
        title: 'Evangelho — João 19,25-27 (Lecionário III, pág. 175)',
        day: 'Terça-feira (15/09) — Nossa Senhora das Dores',
        text: `Proclamação do Evangelho de Jesus Cristo segundo João 19,25-27\n\nNaquele tempo, perto da cruz de Jesus, estavam de pé a sua mãe, a irmã da sua mãe, Maria de Cléofas, e Maria Madalena.\n\nJesus, ao ver sua mãe e, ao lado dela, o discípulo que ele amava, disse à mãe: "Mulher, este é o teu filho". Depois disse ao discípulo: "Esta é a tua mãe". Daquela hora em diante, o discípulo a acolheu consigo.\n\nPalavra da Salvação.\nR. Glória a vós, Senhor.`
    },
    '1l_qua_w2': {
        title: '1ª Leitura — 1 Coríntios 12,31-13,13 (Lecionário II, pág. 989)',
        day: 'Quarta-feira (16/09) — Santos Cornélio e Cipriano',
        text: `Leitura da Primeira Carta de São Paulo aos Coríntios 12,31-13,13\n\nIrmãos: Aspirai aos dons mais elevados. Eu vou ainda mostrar-vos um caminho incomparavelmente superior. Se eu falasse todas as línguas, as dos homens e as dos anjos, mas não tivesse caridade, eu seria como um bronze que soa ou um címbalo que retine.\n\nA caridade é paciente, é benigna; não é invejosa, não é vaidosa, não se ensoberbece; não faz nada de inconveniente, não é interesseira, não se encoleriza, não guarda rancor. Suporta tudo, crê tudo, espera tudo, desculpa tudo. A caridade não acabará nunca.\n\nAtualmente permanecem estas três coisas: fé, esperança, caridade. Mas a maior delas é a caridade.\n\nPalavra do Senhor.\nR. Graças a Deus.`
    },
    'sl_qua_w2': {
        title: 'Salmo Responsorial — Sl 32(33) (Lecionário II, pág. 990)',
        day: 'Quarta-feira (16/09) — Santos Cornélio e Cipriano',
        text: `R. Feliz o povo que o Senhor escolheu por sua herança!\n\nDai graças ao Senhor ao som da harpa, * na lira de dez cordas celebrai-o! Cantai para o Senhor um canto novo, * com arte sustentai a louvação! R.\n\nPois reta é a palavra do Senhor, * e tudo o que ele faz merece fé. Deus ama o direito e a justiça, * transborda em toda a terra a sua graça. R.`
    },
    'ev_qua_w2': {
        title: 'Evangelho — Lucas 7,31-35 (Lecionário II, pág. 991)',
        day: 'Quarta-feira (16/09) — Santos Cornélio e Cipriano',
        text: `Proclamação do Evangelho de Jesus Cristo segundo Lucas 7,31-35\n\nNaquele tempo, disse Jesus: "Com quem hei de comparar os homens desta geração? Com quem eles se parecem? São como crianças que se sentam nas praças, e se dirigem aos colegas, dizendo: 'Tocamos flauta para vós e não dançastes; fizemos lamentações e não chorastes!'\n\nPois veio João Batista, que não comia pão nem bebia vinho, e vós dissestes: 'Ele está com um demônio!' Veio o Filho do Homem, que come e bebe, e vós dizeis: 'Ele é um comilão e beberrão, amigo dos publicanos e dos pecadores!' Mas a sabedoria foi justificada por todos os seus filhos".\n\nPalavra da Salvação.\nR. Glória a vós, Senhor.`
    },
    '1l_qui_w2': {
        title: '1ª Leitura — 1 Coríntios 15,1-11 (Lecionário II, pág. 993)',
        day: 'Quinta-feira (17/09) — 24ª Semana do Tempo Comum',
        text: `Leitura da Primeira Carta de São Paulo aos Coríntios 15,1-11\n\nIrmãos: Quero lembrar-vos o evangelho que vos preguei e que recebestes, e no qual estais firmes. Com efeito, transmiti-vos, em primeiro lugar, aquilo que eu mesmo tinha recebido, a saber: que Cristo morreu por nossos pecados, segundo as Escrituras; que foi sepultado; que, ao terceiro dia, ressuscitou, segundo as Escrituras; e que apareceu a Cefas e, depois, aos Doze.\n\nPalavra do Senhor.\nR. Graças a Deus.`
    },
    'sl_qui_w2': {
        title: 'Salmo Responsorial — Sl 117(118) (Lecionário II, pág. 994)',
        day: 'Quinta-feira (17/09) — 24ª Semana do Tempo Comum',
        text: `R. Dai graças ao Senhor, porque ele é bom!\n\nDai graças ao Senhor, porque ele é bom! * "Eterna é a sua misericórdia!" A casa de Israel agora o diga: * "Eterna é a sua misericórdia!" R.\n\nA mão direita do Senhor fez maravilhas, * a mão direita do Senhor me levantou, a mão direita do Senhor fez maravilhas!" Não morrerei, mas ao contrário, viverei * para cantar as grandes obras do Senhor! R.`
    },
    'ev_qui_w2': {
        title: 'Evangelho — Lucas 7,36-50 (Lecionário II, pág. 994)',
        day: 'Quinta-feira (17/09) — 24ª Semana do Tempo Comum',
        text: `Proclamação do Evangelho de Jesus Cristo segundo Lucas 7,36-50\n\nNaquele tempo, um fariseu convidou Jesus para uma refeição em sua casa. Jesus entrou na casa do fariseu e pôs-se à mesa. Certa mulher, conhecida na cidade como pecadora, soube que Jesus estava à mesa, e trouxe um frasco de alabastro com perfume, e, ficando por detrás, chorava aos pés de Jesus; com as lágrimas começou a banhar-lhe os pés, enxugava-os com os cabelos, cobria-os de beijos e os ungia com o perfume.\n\nPalavra da Salvação.\nR. Glória a vós, Senhor.`
    },
    '1l_sex_w2': {
        title: '1ª Leitura — 1 Coríntios 15,12-20 (Lecionário II, pág. 997)',
        day: 'Sexta-feira (18/09) — 24ª Semana do Tempo Comum',
        text: `Leitura da Primeira Carta de São Paulo aos Coríntios 15,12-20\n\nIrmãos, se se prega que Cristo ressuscitou dos mortos, como podem alguns dizer entre vós que não há ressurreição dos mortos? Se não há ressurreição dos mortos, então Cristo não ressuscitou. E se Cristo não ressuscitou, a nossa pregação é vã e a vossa fé é vã também.\n\nPalavra do Senhor.\nR. Graças a Deus.`
    },
    'sl_sex_w2': {
        title: 'Salmo Responsorial — Sl 16(17) (Lecionário II, pág. 998)',
        day: 'Sexta-feira (18/09) — 24ª Semana do Tempo Comum',
        text: `R. Ao despertar, me saciará vossa presença, ó Senhor.\n\nÓ Senhor, ouvi a minha justa causa, * escutai-me e atendei o meu clamor! Inclinai o vosso ouvido à minha prece, * pois não existe falsidade nos meus lábios! R.\n\nProtegei-me qual dos olhos a pupila * e guardai-me, à proteção de vossas asas. Mas eu verei, justificado, a vossa face * e ao despertar me saciará vossa presença. R.`
    },
    'ev_sex_w2': {
        title: 'Evangelho — Lucas 8,1-3 (Lecionário II, pág. 999)',
        day: 'Sexta-feira (18/09) — 24ª Semana do Tempo Comum',
        text: `Proclamação do Evangelho de Jesus Cristo segundo Lucas 8,1-3\n\nNaquele tempo, Jesus andava por cidades e povoados, pregando e anunciando a Boa-Nova do Reino de Deus. Os doze iam com ele; e também algumas mulheres que haviam sido curadas de maus espíritos e doenças: Maria, chamada Madalena, Joana, Susana, e várias outras mulheres que ajudavam a Jesus e aos discípulos com os bens que possuíam.\n\nPalavra da Salvação.\nR. Glória a vós, Senhor.`
    },
    '1l_dom_w2': {
        title: '1ª Leitura — Isaías 55,6-9 (Lecionário I, pág. 327)',
        day: 'Fim de Semana (19 e 20/09) — 25º Domingo',
        text: `Leitura do Livro do Profeta Isaías 55,6-9\n\nBuscai o Senhor, enquanto pode ser achado; invocai-o, enquanto ele está perto. Abandone o ímpio seu caminho, e o homem injusto, suas maquinações; volte para o Senhor, que terá piedade dele, volte para nosso Deus, que é generoso no perdão.\n\nMeus pensamentos não são como os vossos pensamentos, e vossos caminhos não são como os meus caminhos, diz o Senhor. Estão meus caminhos tão acima dos vossos caminhos e meus pensamentos acima dos vossos pensamentos, quanto está o céu acima da terra.\n\nPalavra do Senhor.\nR. Graças a Deus.`
    },
    'sl_dom_w2': {
        title: 'Salmo Responsorial — Sl 144(145) (Lecionário I, pág. 327)',
        day: 'Fim de Semana (19 e 20/09) — 25º Domingo',
        text: `R. O Senhor está perto da pessoa que o invoca!\n\nTodos os dias haverei de bendizer-vos, * hei de louvar o vosso nome para sempre. Grande é o Senhor e muito digno de louvores, * e ninguém pode medir sua grandeza. R.\n\nMisericórdia e piedade é o Senhor, * ele é amor, é paciência, é compaixão. O Senhor é muito bom para com todos, * sua ternura abraça toda criatura. R.`
    },
    '2l_dom_w2': {
        title: '2ª Leitura — Filipenses 1,20c-24.27a (Lecionário I, pág. 328)',
        day: 'Fim de Semana (19 e 20/09) — 25º Domingo',
        text: `Leitura da Carta de São Paulo aos Filipenses 1,20c-24.27a\n\nIrmãos: Cristo vai ser glorificado no meu corpo, seja pela minha vida, seja pela minha morte. Pois, para mim, o viver é Cristo e o morrer é lucro. Entretanto, se o viver na carne significa que meu trabalho será frutuoso, neste caso, não sei o que escolher. Sinto-me atraído para os dois lados: tenho o desejo de partir, para estar com Cristo — o que para mim seria de longe o melhor — mas para vós é mais necessário que eu continue minha vida neste mundo.\n\nSó uma coisa importa: vivei à altura do Evangelho de Cristo.\n\nPalavra do Senhor.\nR. Graças a Deus.`
    },
    'ev_dom_w2': {
        title: 'Evangelho — Mateus 20,1-16a (Lecionário I, pág. 328)',
        day: 'Fim de Semana (19 e 20/09) — 25º Domingo',
        text: `Proclamação do Evangelho de Jesus Cristo segundo Mateus 20,1-16a\n\nNaquele tempo, Jesus contou esta parábola a seus discípulos:\n"O Reino dos Céus é como a história do patrão que saiu de madrugada para contratar trabalhadores para a sua vinha. Combinou com os trabalhadores uma moeda de prata por dia, e os mandou para a vinha.\n\nQuando chegou a tarde, o patrão disse ao administrador: 'Chama os trabalhadores e paga-lhes uma diária a todos, começando pelos últimos até os primeiros!' Vieram os que tinham sido contratados às cinco da tarde e cada um recebeu uma moeda de prata. Em seguida vieram os que foram contratados primeiro, e pensavam que iam receber mais. Porém, cada um deles também recebeu uma moeda de prata.\n\nApesar de terem resmungado, o patrão respondeu: 'Amigo, eu não fui injusto contigo. Não combinamos uma moeda de prata? Toma o que é teu e volta para casa! Eu quero dar a este que foi contratado por último o mesmo que dei a ti. Por acaso não tenho o direito de fazer o que quero com aquilo que me pertence? Ou estás com inveja, porque estou sendo bom?'\n\nAssim, os últimos serão os primeiros, e os primeiros serão os últimos".\n\nPalavra da Salvação.\nR. Glória a vós, Senhor.`
    }
};
