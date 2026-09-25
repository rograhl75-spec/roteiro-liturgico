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
       SEMANA 3: 21 A 27 DE SETEMBRO DE 2026 (26º DOMINGO)
       ======================================================= */
    '1l_seg_w3': {
        title: '1ª Leitura — Efésios 4,1-7.11-13 (Lecionário III, pág. 177)',
        day: 'Segunda-feira (21/09) — São Mateus, Apóstolo',
        text: `Leitura da Carta de São Paulo aos Efésios 4,1-7.11-13\n\nIrmãos,\neu, prisioneiro no Senhor, vos exorto a caminhardes de acordo com a vocação que recebestes:\nCom toda a humildade e mansidão, suportai-vos uns aos outros com paciência, no amor.\nAplicai-vos a guardar a unidade do espírito pelo vínculo da paz.\n\nHá um só Corpo e um só Espírito, como também é uma só a esperança à qual fostes chamados.\nHá um só Senhor, uma só fé, um só batismo, um só Deus e Pai de todos, que reina sobre todos, age por meio de todos e permanece em todos.\n\nCada um de nós recebeu a graça na medida em que Cristo lha deu.\nE foi ele quem instituiu alguns como apóstolos, outros como profetas, outros ainda como evangelistas, outros, enfim, como pastores e mestres.\nAssim, ele capacitou os santos para o ministério, para edificar o corpo de Cristo, até que cheguemos todos juntos à unidade da fé e do conhecimento do Filho de Deus, ao estado do homem perfeito e à estatura de Cristo em sua plenitude.\n\nPalavra do Senhor.\nR. Graças a Deus.`
    },
    'sl_seg_w3': {
        title: 'Salmo Responsorial — Sl 18(19A) (Lecionário III, pág. 177)',
        day: 'Segunda-feira (21/09) — São Mateus, Apóstolo',
        text: `R. Seu som ressoa e se espalha em toda a terra.\n\nOs céus proclamam a glória do Senhor, * e o firmamento, a obra de suas mãos;\no dia ao dia transmite esta mensagem, * a noite à noite publica esta notícia. R.\n\nNão são discursos nem frases ou palavras, * nem são vozes que possam ser ouvidas;\nseu som ressoa e se espalha em toda a terra, * chega aos confins do universo a sua voz. R.`
    },
    'ev_seg_w3': {
        title: 'Evangelho — Mateus 9,9-13 (Lecionário III, pág. 178)',
        day: 'Segunda-feira (21/09) — São Mateus, Apóstolo',
        text: `Proclamação do Evangelho de Jesus Cristo segundo Mateus 9,9-13\n\nNaquele tempo, Jesus viu um homem chamado Mateus, sentado na coletoria de impostos, e disse-lhe: "Segue-me!" Ele se levantou e seguiu a Jesus.\n\nEnquanto Jesus estava à mesa, em casa de Mateus, vieram muitos cobradores de impostos e pecadores e sentaram-se à mesa com Jesus e seus discípulos.\n\nAlguns fariseus viram isso e perguntaram aos discípulos: "Por que vosso mestre come com os cobradores de impostos e pecadores?"\n\nJesus ouviu a pergunta e respondeu: "Aqueles que têm saúde não precisam de médico, mas sim os doentes. Aprendei, pois, o que significa: 'Quero misericórdia e não sacrifício'. De fato, eu não vim para chamar os justos, mas os pecadores".\n\nPalavra da Salvação.\nR. Glória a vós, Senhor.`
    },
    '1l_ter_w3': {
        title: '1ª Leitura — Provérbios 21,1-6.10-13 (Lecionário II, pág. 1009)',
        day: 'Terça-feira (22/09) — 25ª Semana do Tempo Comum',
        text: `Leitura do Livro dos Provérbios 21,1-6.10-13\n\nO coração do rei nas mãos do Senhor é como água corrente; ele o dirige para onde quer.\nO homem pensa que o seu caminho é sempre reto, mas é o Senhor quem sonda os corações.\nPraticar a justiça e o direito é mais agradável ao Senhor do que os sacrifícios.\n\nOlhar arrogante e coração orgulhoso, a lâmpada dos malvados não é senão o pecado.\nOs projetos do homem aplicado produzem abundância, mas todos os apressados só alcançam indigência.\nTesouros adquiridos com língua mentirosa são ilusão passageira dos que procuram a morte.\n\nA alma do malvado deseja o mal, ele olha sem piedade para o seu próximo.\nQuando se castiga o zombador, aprende o imbecil, e quando o sábio é instruído, ele adquire mais saber.\nO justo observa a casa do ímpio e leva os ímpios à desgraça.\nQuem tapa os ouvidos ao clamor do pobre, também há de clamar, mas não será ouvido.\n\nPalavra do Senhor.\nR. Graças a Deus.`
    },
    'sl_ter_w3': {
        title: 'Salmo Responsorial — Sl 118(119) (Lecionário II, pág. 1010)',
        day: 'Terça-feira (22/09) — 25ª Semana do Tempo Comum',
        text: `R. Guiai-me, Senhor, no caminho de vossos preceitos!\n\nFeliz o homem sem pecado em seu caminho, * que na lei do Senhor Deus vai progredindo! R.\n\nFazei-me conhecer vossos caminhos, * e então meditarei vossos prodígios! R.\n\nEscolhi seguir a trilha da verdade, * diante de mim eu coloquei vossos preceitos. R.\n\nDai-me o saber, e cumprirei a vossa lei, * e de todo o coração a guardarei. R.\n\nGuiai meus passos no caminho que traçastes, * pois só nele encontrarei felicidade. R.\n\nCumprirei constantemente a vossa lei; * para sempre, eternamente a cumprirei! R.`
    },
    'ev_ter_w3': {
        title: 'Evangelho — Lucas 8,19-21 (Lecionário II, pág. 1010)',
        day: 'Terça-feira (22/09) — 25ª Semana do Tempo Comum',
        text: `Proclamação do Evangelho de Jesus Cristo segundo Lucas 8,19-21\n\nNaquele tempo, a mãe e os irmãos de Jesus aproximaram-se, mas não podiam chegar perto dele, por causa da multidão.\n\nEntão anunciaram a Jesus: "Tua mãe e teus irmãos estão aí fora e querem te ver".\n\nJesus respondeu: "Minha mãe e meus irmãos são aqueles que ouvem a Palavra de Deus, e a põem em prática".\n\nPalavra da Salvação.\nR. Glória a vós, Senhor.`
    },
    '1l_qua_w3': {
        title: '1ª Leitura — Provérbios 30,5-9 (Lecionário II, pág. 1013)',
        day: 'Quarta-feira (23/09) — São Pio de Pietrelcina',
        text: `Leitura do Livro dos Provérbios 30,5-9\n\nA Palavra de Deus é comprovada. Ele é um escudo para os que nele se abrigam.\nNão acrescentes nada às suas palavras, para que ele não te repreenda e passes por mentiroso!\n\nDuas coisas eu te pedi; não mas recuses, antes de eu morrer:\nafasta de mim a falsidade e a mentira, não me dês pobreza nem riqueza, mas concede-me o pão que me é necessário.\n\nNão aconteça que, saciado, eu te renegue e diga: "Quem é o Senhor?" Ou que, empobrecido, eu me ponha a roubar e profane o nome de meu Deus.\n\nPalavra do Senhor.\nR. Graças a Deus.`
    },
    'sl_qua_w3': {
        title: 'Salmo Responsorial — Sl 118(119) (Lecionário II, pág. 1013)',
        day: 'Quarta-feira (23/09) — São Pio de Pietrelcina',
        text: `R. Vossa palavra é uma luz para os meus passos!\n\nAfastai-me do caminho da mentira * e dai-me a vossa lei como um presente! R.\n\nA lei de vossa boca, para mim, * vale mais do que milhões em ouro e prata. R.\n\nÉ eterna, ó Senhor, vossa palavra, * ela é tão firme e estável como o céu. R.\n\nDe todo mau caminho afasto os passos, * para que eu siga fielmente as vossas ordens. R.\n\nDe vossa lei eu recebi inteligência, * por isso odeio os caminhos da mentira. R.\n\nEu odeio e detesto a falsidade, * porém amo vossas leis e mandamentos! R.`
    },
    'ev_qua_w3': {
        title: 'Evangelho — Lucas 9,1-6 (Lecionário II, pág. 1014)',
        day: 'Quarta-feira (23/09) — São Pio de Pietrelcina',
        text: `Proclamação do Evangelho de Jesus Cristo segundo Lucas 9,1-6\n\nNaquele tempo, Jesus convocou os Doze, deu-lhes poder e autoridade sobre todos os demônios e para curar doenças, enviou-os a proclamar o Reino de Deus e a curar os enfermos.\n\nE disse-lhes: "Não leveis nada para o caminho: nem cajado, nem sacola, nem pão, nem dinheiro, nem mesmo duas túnicas. Em qualquer casa onde entrardes, ficai aí; e daí é que partireis de novo. Todos aqueles que não vos acolherem, ao sairdes daquela cidade, sacudi a poeira dos vossos pés, como protesto contra eles".\n\nOs discípulos partiram e percorriam os povoados, anunciando a Boa-Nova e fazendo curas em todos os lugares.\n\nPalavra da Salvação.\nR. Glória a vós, Senhor.`
    },
    '1l_qui_w3': {
        title: '1ª Leitura — Eclesiastes 1,2-11 (Lecionário II, pág. 1016)',
        day: 'Quinta-feira (24/09) — 25ª Semana do Tempo Comum',
        text: `Leitura do Livro do Eclesiastes 1,2-11\n\n"Vaidade das vaidades, diz o Eclesiastes, vaidade das vaidades! Tudo é vaidade".\n\nQue proveito tira o homem de todo o trabalho com o qual se afadiga debaixo do sol?\nUma geração passa, outra lhe sucede, enquanto a terra permanece sempre a mesma.\n\nO sol se levanta, o sol se deita, apressando-se para voltar ao seu lugar, donde novamente torna a levantar-se.\nDirigindo-se para o sul e voltando para o norte, ora para cá, ora para lá, vai soprando o vento, para retomar novamente o seu curso.\n\nTodos os rios correm para o mar, e contudo o mar não transborda; voltam ao lugar de onde saíram para tornarem a correr.\nTudo é penoso, difícil para o homem explicar. A vista não se cansa de ver, nem o ouvido se farta de ouvir.\n\nO que foi, será; o que aconteceu, acontecerá: não há nada de novo debaixo do sol. Uma coisa da qual se diz: "Eis aqui algo de novo", também esta já existiu nos séculos que nos precederam.\n\nNão há memória do que aconteceu no passado, nem também haverá lembrança do que acontecer, entre aqueles que viverão depois.\n\nPalavra do Senhor.\nR. Graças a Deus.`
    },
    'sl_qui_w3': {
        title: 'Salmo Responsorial — Sl 89(90) (Lecionário II, pág. 1017)',
        day: 'Quinta-feira (24/09) — 25ª Semana do Tempo Comum',
        text: `R. Ó Senhor, vós fostes sempre um refúgio para nós.\n\nVós fazeis voltar ao pó todo mortal, * quando dizeis: "Voltai ao pó, filhos de Adão!"\nPois mil anos para vós são como ontem, * qual vigília de uma noite que passou. R.\n\nEles passam como o sono da manhã, * são iguais à erva verde pelos campos:\nDe manhã ela floresce vicejante, * mas à tarde é cortada e logo seca. R.\n\nEnsinai-nos a contar os nossos dias, * e dai ao nosso coração sabedoria!\nSenhor, voltai-vos! Até quando tardareis? * Tende piedade e compaixão de vossos servos! R.\n\nSaciai-nos de manhã com vosso amor, * e exultaremos de alegria todo o dia!\nQue a bondade do Senhor e nosso Deus * repouse sobre nós e nos conduza!\nTornai fecundo, ó Senhor, nosso trabalho. R.`
    },
    'ev_qui_w3': {
        title: 'Evangelho — Lucas 9,7-9 (Lecionário II, pág. 1018)',
        day: 'Quinta-feira (24/09) — 25ª Semana do Tempo Comum',
        text: `Proclamação do Evangelho de Jesus Cristo segundo Lucas 9,7-9\n\nNaquele tempo, o tetrarca Herodes ouviu falar de tudo o que estava acontecendo, e ficou perplexo, porque alguns diziam que João Batista tinha ressuscitado dos mortos. Outros diziam que Elias tinha aparecido; outros ainda, que um dos antigos profetas tinha ressuscitado.\n\nEntão Herodes disse: "Eu mandei degolar João. Quem é esse homem, sobre quem ouço falar essas coisas?" E procurava ver Jesus.\n\nPalavra da Salvação.\nR. Glória a vós, Senhor.`
    },
    '1l_sex_w3': {
        title: '1ª Leitura — Eclesiastes 3,1-11 (Lecionário II, pág. 1020)',
        day: 'Sexta-feira (25/09) — 25ª Semana do Tempo Comum',
        text: `Leitura do Livro do Eclesiastes 3,1-11\n\nTudo tem seu tempo. Há um momento oportuno para tudo que acontece debaixo do céu.\n\nTempo de nascer e tempo de morrer; tempo de plantar e tempo de colher a planta.\nTempo de matar e tempo de salvar; tempo de destruir e tempo de construir.\nTempo de chorar e tempo de rir; tempo de lamentar e tempo de dançar.\nTempo de atirar pedras e tempo de as amontoar; tempo de abraçar e tempo de se separar.\nTempo de buscar e tempo de perder; tempo de guardar e tempo de esbanjar.\nTempo de rasgar e tempo de costurar; tempo de calar e tempo de falar.\nTempo de amar e tempo de odiar; tempo de guerra e tempo de paz.\n\nQue proveito tira o trabalhador de seu esforço?\nObservei a tarefa que Deus impôs aos homens, para que nela se ocupassem.\n\nAs coisas que ele fez são todas boas no tempo oportuno. Além disso, ele dispôs que fossem permanentes; no entanto o homem jamais chega a conhecer o princípio e o fim da ação que Deus realiza.\n\nPalavra do Senhor.\nR. Graças a Deus.`
    },
    'sl_sex_w3': {
        title: 'Salmo Responsorial — Sl 143(144) (Lecionário II, pág. 1021)',
        day: 'Sexta-feira (25/09) — 25ª Semana do Tempo Comum',
        text: `R. Bendito seja o Senhor, meu rochedo!\n\nBendito seja o Senhor, meu rochedo. Ele é meu amor, meu refúgio, * libertador, fortaleza e abrigo; É meu escudo: é nele que espero. R.\n\nQue é o homem, Senhor, para vós? * Por que dele cuidais tanto assim, e no filho do homem pensais?\nComo o sopro de vento é o homem, * os seus dias são sombra que passa. R.`
    },
    'ev_sex_w3': {
        title: 'Evangelho — Lucas 9,18-22 (Lecionário II, pág. 1021)',
        day: 'Sexta-feira (25/09) — 25ª Semana do Tempo Comum',
        text: `Proclamação do Evangelho de Jesus Cristo segundo Lucas 9,18-22\n\nAconteceu que Jesus estava rezando num lugar retirado, e os discípulos estavam com ele. Então Jesus perguntou-lhes: "Quem diz o povo que eu sou?"\n\nEles responderam: "Uns dizem que és João Batista; outros, que és Elias; mas outros acham que és algum dos antigos profetas que ressuscitou".\n\nMas Jesus perguntou: "E vós, quem dizeis que eu sou?"\nPedro respondeu: "O Cristo de Deus".\n\nMas Jesus proibiu-lhes severamente que contassem isso a alguém. E acrescentou: "O Filho do Homem deve sofrer muito, ser rejeitado pelos anciãos, pelos sumos sacerdotes e doutores da Lei, deve ser morto e ressuscitar no terceiro dia".\n\nPalavra da Salvação.\nR. Glória a vós, Senhor.`
    },
    '1l_dom_w3': {
        title: '1ª Leitura — Ezequiel 18,25-28 (Lecionário I, pág. 330)',
        day: 'Fim de Semana (26 e 27/09) — 26º Domingo',
        text: `Leitura da Profecia de Ezequiel 18,25-28\n\nAssim diz o Senhor:\nVós andais dizendo: "A conduta do Senhor não é correta".\n\nOuvi, vós da casa de Israel:\nÉ a minha conduta que não é correta, ou antes é a vossa conduta que não é correta?\n\nQuando um justo se desvia da justiça, pratica o mal e morre, é por causa do mal praticado que ele morre.\n\nQuando um ímpio se arrepende da maldade que praticou e observa o direito e a justiça, conserva a própria vida.\n\nArrependendo-se de todos os seus pecados, com certeza viverá; não morrerá.\n\nPalavra do Senhor.\nR. Graças a Deus.`
    },
    'sl_dom_w3': {
        title: 'Salmo Responsorial — Sl 24 (Lecionário I, pág. 330)',
        day: 'Fim de Semana (26 e 27/09) — 26º Domingo',
        text: `R. Recordai, Senhor meu Deus, vossa ternura e compaixão!\n\nMostrai-me, ó Senhor, vossos caminhos, * e fazei-me conhecer a vossa estrada!\nVossa verdade me oriente e me conduza, * porque sois o Deus da minha salvação; em vós espero, ó Senhor, todos os dias! R.\n\nRecordai, Senhor meu Deus, vossa ternura * e a vossa compaixão que são eternas!\nNão recordeis os meus pecados quando jovem, * nem vos lembreis de minhas faltas e delitos!\nDe mim lembrai-vos, porque sois misericórdia * e sois bondade sem limites, ó Senhor! R.\n\nO Senhor é piedade e retidão, * e reconduz ao bom caminho os pecadores.\nEle dirige os humildes na justiça, * e aos pobres ele ensina o seu caminho. R.`
    },
    '2l_dom_w3': {
        title: '2ª Leitura — Filipenses 2,1-11 (Lecionário I, pág. 332)',
        day: 'Fim de Semana (26 e 27/09) — 26º Domingo',
        text: `Leitura da Carta de São Paulo aos Filipenses 2,1-11\n\nIrmãos:\nSe existe consolação na vida em Cristo, se existe alento no mútuo amor, se existe comunhão no Espírito, se existe ternura e compaixão, tornai então completa a minha alegria: aspirai à mesma coisa, unidos no mesmo amor; vivei em harmonia, procurando a unidade.\n\nNada façais por competição ou vanglória, mas, com humildade, cada um julgue que o outro é mais importante, e não cuide somente do que é seu, mas também do que é do outro.\n\nTende entre vós o mesmo sentimento que existe em Cristo Jesus.\n\nJesus Cristo, existindo em condição divina, não fez do ser igual a Deus uma usurpação, mas esvaziou-se a si mesmo, assumindo a condição de escravo e tornando-se igual aos homens.\n\nEncontrado com aspecto humano, humilhou-se a si mesmo, fazendo-se obediente até à morte, e morte de cruz.\n\nPor isso, Deus o exaltou acima de tudo e lhe deu o Nome que está acima de todo nome.\nAssim, ao nome de Jesus, todo joelho se dobre no céu, na terra e abaixo da terra, e toda língua proclame: "Jesus Cristo é o Senhor!" — para a glória de Deus Pai.\n\nPalavra do Senhor.\nR. Graças a Deus.`
    },
    'ev_dom_w3': {
        title: 'Evangelho — Mateus 21,28-32 (Lecionário I, pág. 333)',
        day: 'Fim de Semana (26 e 27/09) — 26º Domingo',
        text: `Proclamação do Evangelho de Jesus Cristo segundo Mateus 21,28-32\n\nNaquele tempo, Jesus disse aos sacerdotes e anciãos do povo:\n"Que vos parece? Um homem tinha dois filhos. Dirigindo-se ao primeiro, ele disse: 'Filho, vai trabalhar hoje na vinha!' O filho respondeu: 'Não quero'. Mas depois mudou de opinião e foi.\n\nO pai dirigiu-se ao outro filho e disse a mesma coisa. Este respondeu: 'Sim, senhor, eu vou'. Mas não foi.\n\nQual dos dois fez a vontade do pai?"\nOs sumos sacerdotes e os anciãos do povo responderam: "O primeiro".\n\nEntão Jesus lhes disse: "Em verdade vos digo, que os cobradores de impostos e as prostitutas vos precedem no Reino de Deus.\n\nPorque João veio até vós, num caminho de justiça, e vós não acreditastes nele. Ao contrário, os cobradores de impostos e as prostitutas creram nele. Vós, porém, mesmo vendo isso, não vos arrependestes para crer nele".\n\nPalavra da Salvação.\nR. Glória a vós, Senhor.`
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
};

window.readingsData = readingsData;
