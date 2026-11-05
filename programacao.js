/* ==========================================================================
   PROGRAMAÇÃO SEMANAL — PARÓQUIA NOSSA SENHORA AUXILIADORA
   Cada semana é descrita apenas por dados (array `semanas`); o HTML é gerado
   por `montarSemana()`, igual para todas as semanas.
   ========================================================================== */
(() => {
  const PAROQUIA = 'Paróquia Nossa Senhora Auxiliadora';
  const CAPELA = 'Capela São Domingos Sávio';

  const CORES = {
    verde: 'Verde',
    branco: 'Branca',
    vermelho: 'Vermelha',
    roxo: 'Roxa'
  };

  const ROTULOS_MISSAL = [
    ['ritos', 'Ritos Iniciais (Ordinário)'],
    ['gloria', 'Hino de Louvor (Glória)'],
    ['coleta', 'Oração da Coleta'],
    ['creio', 'Profissão de Fé (Creio)'],
    ['oferendas', 'Oração sobre as Oferendas'],
    ['prefacio', 'Prefácio'],
    ['eucaristica', 'Oração Eucarística'],
    ['rito_comunhao', 'Rito da Comunhão'],
    ['comunhao', 'Oração depois da Comunhão'],
    ['bencao', 'Bênção Solene']
  ];

  const MISSAL_PADRAO = { ritos: '430', rito_comunhao: '569' };

  const escapar = (texto) => String(texto)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const dataCurta = (iso) => `${iso.slice(8)}/${iso.slice(5, 7)}`;

  const tabela = (titulo, cabecalho, linhas) => `<div><div class="table-caption">${titulo}</div>
          <table class="liturgy-table">${cabecalho.length ? `<thead><tr>${cabecalho.map((texto) => `<th scope="col">${texto}</th>`).join('')}</tr></thead>` : ''}
          <tbody>${linhas.map((linha) => `<tr>${linha.map((texto) => `<td>${texto}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

  const referenciaClicavel = (referencia, chave) =>
    `<button type="button" class="clickable-ref" data-action="open-reading" data-reading-key="${chave}">${escapar(referencia)}</button>`;

  function tabelaMissal(dia) {
    const missal = { ...MISSAL_PADRAO, ...dia.missal };
    const linhas = ROTULOS_MISSAL
      .filter(([chave]) => missal[chave])
      .map(([chave, rotulo]) => [rotulo, escapar(missal[chave])]);
    linhas.push(['Cor Litúrgica', CORES[dia.cor]]);
    return tabela('📌 Missal Romano', ['Parte / Oração Presidencial', 'Página'], linhas);
  }

  function tabelaLeituras(dia) {
    return tabela('📖 Liturgia da Palavra', ['Momento', 'Ref. Bíblica', 'Lec. / Pág.'],
      dia.leituras.map(([momento, referencia, chave, pagina]) =>
        [momento, referenciaClicavel(referencia, chave), pagina || '—']));
  }

  function blocoAntifonas(chave) {
    const antifonas = chave && window.antifonasData && window.antifonasData[chave];
    if (!antifonas) return '';
    const comQuebras = (texto) => escapar(texto).replace(/\n/g, '<br>');
    return `<div class="tables-grid tables-grid-antifonas">
                ${tabela('🎵 Antífonas e Aclamação', [], antifonas.items.map((item) => [
                  `<strong>${item.label}</strong><br>${(item.options || [item]).map((opcao, index) =>
                    `${index ? '<br><br><strong>Ou:</strong> ' : ''}<small>${escapar(opcao.reference)}</small><br>${comQuebras(opcao.text)}`).join('')}`
                ]))}
                ${tabela('📺 Citações Telão (PASCOM)', [], antifonas.citations.map((item) => [
                  `<strong>${item.label.toUpperCase()}</strong><br>${comQuebras(item.text)}`
                ]))}
              </div>`;
  }

  function cartaoDia(dia) {
    const dias = dia.dias || [dia];
    const botoes = (dia.botoes || []).map(({ tipo, chave, rotulo }) =>
      `<button type="button" class="action-btn" data-action="open-active-${tipo}" data-${tipo}-key="${chave}">${rotulo}</button>`).join('');
    return `<div class="card" id="dia-${dia.data}" data-date="${dia.data}">
              <div class="card-header"><h2>${dia.titulo}</h2>
                <span class="color-badge badge-${dia.cor}">${CORES[dia.cor]}${dia.grau ? ` (${dia.grau})` : ''}</span></div>
              <p><strong>Celebração:</strong> ${dia.celebracao}</p>
              <div class="presidency-box"><div class="presidency-title">Escala de Horários, Locais e Celebrantes</div>
                <table class="escala-table">${dias.map((item) =>
                  `<tbody${item.data !== dia.data ? ` id="dia-${item.data}" data-date="${item.data}"` : ''}>${item.escala.map(([hora, local, celebrante]) =>
                    `<tr><td><span class="p-dia">${item.dia}</span> <span class="p-hora">${hora}</span></td><td class="p-loc">${local}</td><td class="p-cel">${celebrante}</td></tr>`).join('')}</tbody>`).join('')}</table></div>
              ${dia.nota ? `<p class="source-note">${dia.nota}</p>` : ''}
              ${botoes ? `<div class="action-row">${botoes}</div>` : ''}
              <div class="tables-grid">
                ${tabelaMissal(dia)}
                ${tabelaLeituras(dia)}
              </div>
              ${blocoAntifonas(dia.antifonas)}
            </div>`;
  }

  function montarSemana(semana) {
    const todosOsDias = semana.dias.concat(semana.fimDeSemana.dias);
    const fimDeSemana = { ...semana.fimDeSemana, data: semana.fimDeSemana.dias[0].data };
    const navegacao = `<nav class="day-nav" aria-label="Dias de ${semana.periodo}">${todosOsDias.map((dia) =>
      `<a class="action-btn secondary" href="#dia-${dia.data}">${dataCurta(dia.data)}</a>`).join(' ')}</nav>`;
    const documentos = `<div class="card"><h2>Documentos originais</h2>
            <ul class="document-list">${semana.documentos.map((nome) =>
              `<li><a href="./${encodeURIComponent(nome)}" target="_blank" rel="noopener noreferrer">${nome}</a></li>`).join('')}</ul>
          </div>`;

    const selecaoLeituras = semana.dias.concat([fimDeSemana]).map((dia) => ({
      titulo: dia.selecaoTitulo,
      itens: dia.leituras.map(([momento, referencia, chave]) => [`${momento} (${referencia})`, chave])
        .concat(dia.antifonas ? [['🎵 Antífonas e Citações', dia.antifonas]] : [])
    }));

    return {
      legacyWeek: semana.legacyWeek,
      id: semana.id,
      inicio: semana.dias[0].data,
      fim: semana.fimDeSemana.dias[semana.fimDeSemana.dias.length - 1].data,
      shortTitle: semana.shortTitle,
      fullTitle: semana.fullTitle,
      roteiroLabel: semana.roteiroLabel,
      roteiroExtras: semana.roteiroExtras || [],
      precesExtras: semana.precesExtras || [],
      selecaoLeituras,
      programacaoHtml: navegacao +
        (semana.nota ? `<p class="source-note">${semana.nota}</p>` : '') +
        semana.dias.concat([fimDeSemana]).map(cartaoDia).join('') +
        documentos
    };
  }

  /* ------------------------------------------------------------------------
     DADOS DAS SEMANAS
     leituras: [momento, referência, chave em leituras.js, lecionário / página]
     ------------------------------------------------------------------------ */
  const semanas = [
    {
      legacyWeek: 8,
      id: '2026-11-02',
      periodo: '2 a 8 de novembro',
      shortTitle: '2 a 8 de novembro — 32º Domingo do Tempo Comum',
      fullTitle: 'Semana de 2 a 8 de novembro de 2026 — Fiéis Defuntos e 32º Domingo do Tempo Comum',
      roteiroLabel: '📖 Roteiro — 32º Domingo do Tempo Comum',
      roteiroExtras: ['defuntos', 'votiva', 'adoracao'],
      precesExtras: ['defuntos'],
      nota: 'Leituras conforme “Leituras de 2 a 8 de novembro de 2026.docx”; páginas do lecionário conforme “Leituras e Lecionarios - 2 a 15 novembro 2026.xlsx”; Missal conforme “Missal - 2 a 8 novembro_2026.xlsx”.',
      dias: [
        {
          data: '2026-11-02', titulo: 'Segunda-feira, 2 de Novembro de 2026', dia: 'Segunda', cor: 'roxo', grau: 'Comemoração',
          celebracao: 'Comemoração de Todos os Fiéis Defuntos (Finados)',
          selecaoTitulo: 'Segunda-feira — 02/11 — Fiéis Defuntos',
          escala: [['19h00', PAROQUIA, 'Pe. Heriberto']],
          leituras: [
            ['1ª Leitura', 'Jó 19,1.23-27a', 's9_seg_l1', 'I / 1052'],
            ['Salmo', 'Sl 22(23),1-3.4.5.6 (R. 1 ou 4a)', 's9_seg_sal', 'I / 1061'],
            ['2ª Leitura', '1Cor 15,20-24a.25-28', 's9_seg_l2', 'I / 1073'],
            ['Aclamação ao Evangelho', 'Jo 6,39', 's9_seg_acl'],
            ['Evangelho', 'Lc 12,35-40', 's9_seg_ev', 'I / 1087']
          ],
          missal: { coleta: '846', oferendas: '846', prefacio: '518 (Defuntos I)', eucaristica: '537 (OE II)', comunhao: '846', bencao: '588 (Fiéis Defuntos)' },
          antifonas: 'antifonas_9_defuntos',
          nota: 'Antes do “Oremos” da coleta, entrada das intenções pelos falecidos pelo corredor central, depositadas junto à cruz com velas (cruzeiro), conforme o roteiro revisado.',
          botoes: [
            { tipo: 'roteiro', chave: 'defuntos', rotulo: 'Roteiro — Fiéis Defuntos' },
            { tipo: 'preces', chave: 'defuntos', rotulo: 'Preces — Fiéis Defuntos' }
          ]
        },
        {
          data: '2026-11-03', titulo: 'Terça-feira, 3 de Novembro de 2026', dia: 'Terça', cor: 'verde', grau: 'Féria',
          celebracao: '31ª Semana do Tempo Comum, Ano Par (II) — Féria do Tempo Comum',
          selecaoTitulo: 'Terça-feira — 03/11',
          escala: [['19h00', PAROQUIA, 'Pe. Rafael']],
          leituras: [
            ['1ª Leitura', 'Fl 2,5-11', 's9_ter_l1', 'II / 1149'],
            ['Salmo', 'Sl 21(22),26b-27.28-30a.31-32 (R. 26a)', 's9_ter_sal', 'II / 1150'],
            ['Aclamação ao Evangelho', 'Mt 11,28', 's9_ter_acl'],
            ['Evangelho', 'Lc 14,15-24', 's9_ter_ev', 'II / 1150']
          ],
          missal: { coleta: '413', oferendas: '413', prefacio: '564 (próprio da OE V)', eucaristica: '565 (OE V)', comunhao: '413' }
        },
        {
          data: '2026-11-04', titulo: 'Quarta-feira, 4 de Novembro de 2026', dia: 'Quarta', cor: 'branco', grau: 'Memória',
          celebracao: 'São Carlos Borromeu, bispo — Memória; 31ª Semana do Tempo Comum',
          selecaoTitulo: 'Quarta-feira — 04/11 — São Carlos Borromeu',
          escala: [['19h00', PAROQUIA, 'Pe. Heriberto']],
          leituras: [
            ['1ª Leitura', 'Fl 2,12-18', 's9_qua_l1', 'II / 1152'],
            ['Salmo', 'Sl 26(27),1.4.13-14 (R. 1a)', 's9_qua_sal', 'II / 1153'],
            ['Aclamação ao Evangelho', '1Pd 4,14', 's9_qua_acl'],
            ['Evangelho', 'Lc 14,25-33', 's9_qua_ev', 'II / 1154']
          ],
          missal: { coleta: '849', oferendas: '850', prefacio: '504 (Santos Pastores I)', eucaristica: '537 (OE II)', comunhao: '850' }
        },
        {
          data: '2026-11-05', titulo: 'Quinta-feira, 5 de Novembro de 2026', dia: 'Quinta', cor: 'verde', grau: 'Féria',
          celebracao: '31ª Semana do Tempo Comum, Ano Par (II) — Féria do Tempo Comum',
          selecaoTitulo: 'Quinta-feira — 05/11',
          escala: [['19h00', PAROQUIA, 'Pe. Laurindo']],
          leituras: [
            ['1ª Leitura', 'Fl 3,3-8a', 's9_qui_l1', 'II / 1156'],
            ['Salmo', 'Sl 104(105),2-3.4-5.6-7 (R. 3b)', 's9_qui_sal', 'II / 1156'],
            ['Aclamação ao Evangelho', 'Mt 11,28', 's9_qui_acl'],
            ['Evangelho', 'Lc 15,1-10', 's9_qui_ev', 'II / 1157']
          ],
          missal: { coleta: '413', oferendas: '413', prefacio: '564 (próprio da OE V)', eucaristica: '565 (OE V)', comunhao: '413' }
        },
        {
          data: '2026-11-06', titulo: 'Sexta-feira, 6 de Novembro de 2026', dia: 'Sexta', cor: 'branco', grau: 'Missa Votiva',
          celebracao: 'Missa Votiva do Sagrado Coração de Jesus; Adoração Eucarística Solene',
          selecaoTitulo: 'Sexta-feira — 06/11',
          escala: [
            ['05h30', PAROQUIA, 'Pe. Djhon — Missa Votiva do Sagrado Coração de Jesus'],
            ['12h00', PAROQUIA, 'Pe. Heriberto — Missa Votiva do Sagrado Coração de Jesus'],
            ['12h00', PAROQUIA, 'Pe. Laurindo — confissão'],
            ['19h30', PAROQUIA, 'Pe. Heriberto — Adoração Eucarística Solene']
          ],
          leituras: [
            ['1ª Leitura', 'Fl 3,17-4,1', 's9_sex_l1', 'II / 1160'],
            ['Salmo', 'Sl 121(122),1-2.3-4a.4b-5 (R. 1)', 's9_sex_sal', 'II / 1160'],
            ['Aclamação ao Evangelho', '1Jo 2,5', 's9_sex_acl'],
            ['Evangelho', 'Lc 16,1-8', 's9_sex_ev', 'II / 1161']
          ],
          missal: { coleta: '1140', oferendas: '1140', prefacio: '1141 (Sagrado Coração de Jesus — O imenso amor de Cristo)', eucaristica: '537 (OE II)', comunhao: '1142' },
          nota: 'Missa Votiva do Sagrado Coração de Jesus (Missal, Missas Votivas, n. 8), com as leituras da féria. Somente na Missa das 12h00: 10 minutos antes, um integrante do Apostolado da Oração inicia a Ladainha do Sagrado Coração de Jesus.',
          botoes: [
            { tipo: 'roteiro', chave: 'votiva', rotulo: 'Roteiro — Missa Votiva do Sagrado Coração' },
            { tipo: 'roteiro', chave: 'adoracao', rotulo: 'Roteiro — Adoração Eucarística Solene (19h30)' }
          ]
        }
      ],
      fimDeSemana: {
        titulo: 'Fim de semana: 7 e 8 de Novembro de 2026', dia: 'Sábado', cor: 'verde', grau: 'Domingo',
        celebracao: '32º Domingo do Tempo Comum, Ano A — sábado vespertino e domingo',
        selecaoTitulo: 'Fim de semana — 07 e 08/11 — 32º Domingo do Tempo Comum',
        dias: [
          { data: '2026-11-07', dia: 'Sábado', escala: [['18h30', PAROQUIA, 'Pe. Djhon'], ['19h00', CAPELA, 'Pe. Heriberto']] },
          { data: '2026-11-08', dia: 'Domingo', escala: [['09h00', PAROQUIA, 'Pe. Laurindo'], ['11h00', PAROQUIA, 'Pe. Laurindo'], ['18h30', PAROQUIA, 'Pe. Heriberto']] }
        ],
        leituras: [
          ['1ª Leitura', 'Sb 6,12-16', 's9_dom_l1', 'I / 351'],
          ['Salmo', 'Sl 62(63),2.3-4.5-6.7-8 (R. 2b)', 's9_dom_sal', 'I / 351'],
          ['2ª Leitura', '1Ts 4,13-18', 's9_dom_l2', 'I / 352'],
          ['2ª Leitura (mais breve)', '1Ts 4,13-14', 's9_dom_l2_breve', 'I / 352'],
          ['Aclamação ao Evangelho', 'Mt 24,42a.44', 's9_dom_acl'],
          ['Evangelho', 'Mt 25,1-13', 's9_dom_ev', 'I / 353']
        ],
        missal: { gloria: 'Cantado (pág. 442)', coleta: '414', creio: 'Rezado (página omitida)', oferendas: '414', prefacio: '479 (Domingos do Tempo Comum VI)', eucaristica: '537 (OE II)', comunhao: '414' },
        antifonas: 'antifonas_9'
      },
      documentos: [
        'Escala Padres 2 a 8 novembro 2026.docx',
        'Leituras de 2 a 8 de novembro de 2026.docx',
        'Leituras e Lecionarios - 2 a 15 novembro 2026.xlsx',
        'Missal - 2 a 8 novembro_2026.xlsx',
        'Comemoração de Todos os Fiéis Defuntos - 02_11_2026 revisado.docx',
        'PRECES - COMEMORAÇÃO DE TODOS OS FIÉIS DEFUNTOS.docx',
        'Antífona da entrada e comunhão - Fiéis Defuntos 02-11-2026.docx',
        'MISSA VOTIVA DO SAGRADO CORAÇÃO DE JESUS - 06 NOVEMBRO 2026 - ANO A.docx',
        'ADORAÇÃO EUCARÍSTICA SOLENE - NOV 2026.pdf',
        '32º DOMINGO TEMPO COMUM -   7 E 8 NOVEMBRO 2026 - ANO A.docx',
        'PRECES - 32º DOMINGO TEMPO COMUM.docx',
        'Antífona da entrada e comunhão - 32º Domingo do Tempo Comum 08-11-2026.docx'
      ]
    },
    {
      legacyWeek: 9,
      id: '2026-11-09',
      periodo: '9 a 15 de novembro',
      shortTitle: '9 a 15 de novembro — 33º Domingo do Tempo Comum',
      fullTitle: 'Semana de 9 a 15 de novembro de 2026 — Dedicação da Basílica do Latrão e 33º Domingo do Tempo Comum',
      roteiroLabel: '📖 Roteiro — 33º Domingo do Tempo Comum',
      nota: 'Leituras conforme “Leituras 9 a 15 novembro 2026.docx”; páginas do lecionário conforme “Leituras e Lecionarios - 2 a 15 novembro 2026.xlsx”; Missal conforme “Missal - 9 a 15 novembro_2026.xlsx”.',
      dias: [
        {
          data: '2026-11-09', titulo: 'Segunda-feira, 9 de Novembro de 2026', dia: 'Segunda', cor: 'branco', grau: 'Festa',
          celebracao: 'Dedicação da Basílica do Latrão (Catedral de Roma) — Festa; 32ª Semana do Tempo Comum',
          selecaoTitulo: 'Segunda-feira — 09/11 — Dedicação da Basílica do Latrão',
          escala: [['19h00', PAROQUIA, 'Pe. Laurindo']],
          leituras: [
            ['1ª Leitura', 'Ez 47,1-2.8-9.12', 's10_seg_l1', 'III / 203'],
            ['Salmo', 'Sl 45(46),2-3.5-6.8-9 (R. 5)', 's10_seg_sal', 'III / 203'],
            ['Aclamação ao Evangelho', '2Cr 7,16', 's10_seg_acl'],
            ['Evangelho', 'Jo 2,13-22', 's10_seg_ev', 'III / 205']
          ],
          missal: { gloria: '442', coleta: '851', oferendas: '851', prefacio: '852 (próprio da festa)', eucaristica: '537 (OE II)', comunhao: '853', bencao: '588 (Dedicação de igreja)' },
          nota: 'Quando esta festa não cai em domingo, proclama-se uma só leitura antes do Evangelho (Ez 47 ou 1Cor 3,9c-11.16-17); o DOCX de leituras traz Ezequiel.'
        },
        {
          data: '2026-11-10', titulo: 'Terça-feira, 10 de Novembro de 2026', dia: 'Terça', cor: 'branco', grau: 'Memória',
          celebracao: 'São Leão Magno, papa e doutor da Igreja — Memória; 32ª Semana do Tempo Comum',
          selecaoTitulo: 'Terça-feira — 10/11 — São Leão Magno',
          escala: [['19h00', PAROQUIA, 'Pe. Manuel José']],
          leituras: [
            ['1ª Leitura', 'Tt 2,1-8.11-14', 's10_ter_l1', 'II / 1172'],
            ['Salmo', 'Sl 36(37),3-4.18-23.27 e 29 (R. 39a)', 's10_ter_sal', 'II / 1173'],
            ['Aclamação ao Evangelho', 'Jo 14,23', 's10_ter_acl'],
            ['Evangelho', 'Lc 17,7-10', 's10_ter_ev', 'II / 1173']
          ],
          missal: { coleta: '853', oferendas: '854', prefacio: '504 (Santos Pastores I)', eucaristica: '537 (OE II)', comunhao: '854' }
        },
        {
          data: '2026-11-11', titulo: 'Quarta-feira, 11 de Novembro de 2026', dia: 'Quarta', cor: 'branco', grau: 'Memória',
          celebracao: 'São Martinho de Tours, bispo — Memória; 32ª Semana do Tempo Comum',
          selecaoTitulo: 'Quarta-feira — 11/11 — São Martinho de Tours',
          escala: [['19h00', PAROQUIA, 'Pe. Heriberto']],
          leituras: [
            ['1ª Leitura', 'Tt 3,1-7', 's10_qua_l1', 'II / 1175'],
            ['Salmo', 'Sl 22(23),1-3a.3b-4.5.6 (R. 1)', 's10_qua_sal', 'II / 1176'],
            ['Aclamação ao Evangelho', '1Ts 5,18', 's10_qua_acl'],
            ['Evangelho', 'Lc 17,11-19', 's10_qua_ev', 'II / 1177']
          ],
          missal: { coleta: '855', oferendas: '855', prefacio: '504 (Santos Pastores I)', eucaristica: '537 (OE II)', comunhao: '855' }
        },
        {
          data: '2026-11-12', titulo: 'Quinta-feira, 12 de Novembro de 2026', dia: 'Quinta', cor: 'vermelho', grau: 'Memória',
          celebracao: 'São Josafá, bispo e mártir — Memória; 32ª Semana do Tempo Comum',
          selecaoTitulo: 'Quinta-feira — 12/11 — São Josafá',
          escala: [['19h00', PAROQUIA, 'Pe. Laurindo']],
          leituras: [
            ['1ª Leitura', 'Fm 1,7-20', 's10_qui_l1', 'II / 1179'],
            ['Salmo', 'Sl 145(146),7.8-9a.9bc-10 (R. 5a)', 's10_qui_sal', 'II / 1180'],
            ['Aclamação ao Evangelho', 'Jo 15,5', 's10_qui_acl'],
            ['Evangelho', 'Lc 17,20-25', 's10_qui_ev', 'II / 1181']
          ],
          missal: { coleta: '856', oferendas: '856', prefacio: '502 (Santos Mártires I)', eucaristica: '537 (OE II)', comunhao: '856' }
        },
        {
          data: '2026-11-13', titulo: 'Sexta-feira, 13 de Novembro de 2026', dia: 'Sexta', cor: 'verde', grau: 'Féria',
          celebracao: '32ª Semana do Tempo Comum, Ano Par (II) — Féria do Tempo Comum',
          selecaoTitulo: 'Sexta-feira — 13/11',
          escala: [['19h00', PAROQUIA, 'Pe. Heriberto']],
          leituras: [
            ['1ª Leitura', '2Jo 1,4-9', 's10_sex_l1', 'II / 1183'],
            ['Salmo', 'Sl 118(119),1.2.10.11.17.18 (R. 1b)', 's10_sex_sal', 'II / 1184'],
            ['Aclamação ao Evangelho', 'Lc 21,28', 's10_sex_acl'],
            ['Evangelho', 'Lc 17,26-37', 's10_sex_ev', 'II / 1184']
          ],
          missal: { coleta: '414', oferendas: '414', prefacio: '564 (próprio da OE V)', eucaristica: '565 (OE V)', comunhao: '414' }
        }
      ],
      fimDeSemana: {
        titulo: 'Fim de semana: 14 e 15 de Novembro de 2026', dia: 'Sábado', cor: 'verde', grau: 'Domingo',
        celebracao: '33º Domingo do Tempo Comum, Ano A — sábado vespertino e domingo',
        selecaoTitulo: 'Fim de semana — 14 e 15/11 — 33º Domingo do Tempo Comum',
        dias: [
          { data: '2026-11-14', dia: 'Sábado', escala: [['18h30', PAROQUIA, 'Pe. Laurindo'], ['19h00', CAPELA, 'Pe. Heriberto']] },
          { data: '2026-11-15', dia: 'Domingo', escala: [['09h00', PAROQUIA, 'Pe. Laurindo'], ['11h00', PAROQUIA, 'Pe. Heriberto'], ['18h30', PAROQUIA, 'Pe. Heriberto']] }
        ],
        leituras: [
          ['1ª Leitura', 'Pr 31,10-13.19-20.30-31', 's10_dom_l1', 'I / 355'],
          ['Salmo', 'Sl 127(128),1-2.3.4-5ab (R. cf. 1a)', 's10_dom_sal', 'I / 355'],
          ['2ª Leitura', '1Ts 5,1-6', 's10_dom_l2', 'I / 356'],
          ['Aclamação ao Evangelho', 'Jo 15,4a.5b', 's10_dom_acl'],
          ['Evangelho', 'Mt 25,14-30 (mais breve: 25,14-15.19-21)', 's10_dom_ev', 'I / 357']
        ],
        missal: { gloria: '442 (conforme roteiro)', coleta: '415', creio: 'Rezado (página omitida)', oferendas: '415', prefacio: '479 (Domingos do Tempo Comum VI, conforme roteiro)', eucaristica: '537 (OE II)', comunhao: '415' },
        antifonas: 'antifonas_10'
      },
      documentos: [
        'Escala Padres 9 a 15 novembro 2026.docx',
        'Leituras 9 a 15 novembro 2026.docx',
        'Leituras e Lecionarios - 2 a 15 novembro 2026.xlsx',
        'Missal - 9 a 15 novembro_2026.xlsx',
        '33º DOMINGO TEMPO COMUM - 14 E 15 NOVEMBRO 2026 - ANO A.docx',
        'PRECES - 33º DOMINGO TEMPO COMUM.docx',
        'Antífona da entrada e comunhão - 33º Domingo do Tempo Comum 15-11-2026.docx'
      ]
    }
  ];

  window.programacaoData = { weeks: semanas.map(montarSemana) };
})();
