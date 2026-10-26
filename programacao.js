const programacaoData = {
  weeks: [
    {
      legacyWeek: 7,
      id: '2026-10-26',
      shortTitle: '26 de outubro a 1 de novembro — Todos os Santos',
      fullTitle: 'Semana de 26 de outubro a 1 de novembro de 2026 — Todos os Santos',
      roteiroLabel: 'Roteiro da Missa — Todos os Santos',
      programacaoHtml: (() => {
        const paroquia = 'Paróquia Nossa Senhora Auxiliadora';
        const leiturasSantos = [
          ['1ª Leitura', 'Ap 7,2-4.9-14', 'I / 1047', 's8_dom_l1'],
          ['Salmo', 'Sl 23(24),1-2.3-4ab.5-6 (R. cf. 6)', 'I / 1048', 's8_dom_sal'],
          ['2ª Leitura', '1Jo 3,1-3', 'I / 1048', 's8_dom_l2'],
          ['Evangelho', 'Mt 5,1-12a', 'I / 1049', 's8_dom_ev']
        ];
        const dias = [
          {
            data: '2026-10-26', titulo: 'Segunda-feira, 26 de Outubro de 2026', dia: 'Segunda', cor: 'verde',
            celebracao: '30ª Semana do Tempo Comum (Ano Par II) — Féria do Tempo Comum',
            escala: [['19h00', paroquia, 'Pe. Laurindo']],
            leituras: [
              ['1ª Leitura', 'Ef 4,32-5,8', 'II / 1123', 's8_seg_l1'],
              ['Salmo', 'Sl 1,1-2.3.4 e 6 (R. cf. Ef 5,1)', 'II / 1124', 's8_seg_sal'],
              ['Evangelho', 'Lc 13,10-17', 'II / 1125', 's8_seg_ev']
            ]
          },
          {
            data: '2026-10-27', titulo: 'Terça-feira, 27 de Outubro de 2026', dia: 'Terça', cor: 'verde',
            celebracao: '30ª Semana do Tempo Comum (Ano Par II) — Féria do Tempo Comum',
            escala: [['19h00', paroquia, 'Pe. Rafael']],
            leituras: [
              ['1ª Leitura', 'Ef 5,21-33', 'II / 1127', 's8_ter_l1'],
              ['Salmo', 'Sl 127(128),1-2.3.4-5 (R. 1a)', 'II / 1128', 's8_ter_sal'],
              ['Evangelho', 'Lc 13,18-21', 'II / 1129', 's8_ter_ev']
            ]
          },
          {
            data: '2026-10-28', titulo: 'Quarta-feira, 28 de Outubro de 2026', dia: 'Quarta', cor: 'vermelho',
            celebracao: 'Santos Simão e Judas, Apóstolos — Festa',
            escala: [['19h00', paroquia, 'Pe. Romão']],
            leituras: [
              ['1ª Leitura', 'Ef 2,19-22', 'III / 195', 's8_qua_l1'],
              ['Salmo', 'Sl 18(19A),2-3.4-5 (R. 5a)', 'III / 196', 's8_qua_sal'],
              ['Evangelho', 'Lc 6,12-19', 'III / 196', 's8_qua_ev']
            ]
          },
          {
            data: '2026-10-29', titulo: 'Quinta-feira, 29 de Outubro de 2026', dia: 'Quinta', cor: 'verde',
            celebracao: '30ª Semana do Tempo Comum (Ano Par II) — Féria do Tempo Comum',
            escala: [['19h00', paroquia, 'Pe. Afonso']],
            leituras: [
              ['1ª Leitura', 'Ef 6,10-20', 'II / 1134', 's8_qui_l1'],
              ['Salmo', 'Sl 143(144),1.2.9-10 (R. 1a)', 'II / 1135', 's8_qui_sal'],
              ['Evangelho', 'Lc 13,31-35', 'II / 1136', 's8_qui_ev']
            ]
          },
          {
            data: '2026-10-30', titulo: 'Sexta-feira, 30 de Outubro de 2026', dia: 'Sexta', cor: 'verde',
            celebracao: '30ª Semana do Tempo Comum (Ano Par II) — Féria do Tempo Comum',
            escala: [['19h00', paroquia, 'Pe. Heriberto']],
            leituras: [
              ['1ª Leitura', 'Fl 1,1-11', 'II / 1138', 's8_sex_l1'],
              ['Salmo', 'Sl 110(111),1-2.3-4.5-6 (R. 2a)', 'II / 1139', 's8_sex_sal'],
              ['Evangelho', 'Lc 14,1-6', 'II / 1139', 's8_sex_ev']
            ]
          },
          {
            data: '2026-10-31', titulo: 'Sábado, 31 de Outubro de 2026', dia: 'Sábado', cor: 'branco',
            celebracao: 'Todos os Santos, Solenidade — missa noturna em 1ª Véspera',
            escala: [['18h30', paroquia, 'Pe. Heriberto'], ['19h00', 'Capela São Domingos Sávio', 'Pe. Djhon']],
            leituras: leiturasSantos
          },
          {
            data: '2026-11-01', titulo: 'Domingo, 1 de Novembro de 2026', dia: 'Domingo', cor: 'branco',
            celebracao: 'Todos os Santos, Solenidade',
            escala: [['09h00', paroquia, 'Pe. Heriberto'], ['11h00', paroquia, 'Pe. Laurindo'], ['18h30', paroquia, 'Pe. Heriberto']],
            leituras: leiturasSantos
          }
        ];
        const tabela = (titulo, cabecalho, linhas) => `<div><div class="table-caption">${titulo}</div>
          <table class="liturgy-table">${cabecalho.length ? `<thead><tr>${cabecalho.map(texto => `<th>${texto}</th>`).join('')}</tr></thead>` : ''}
          <tbody>${linhas.map(linha => `<tr>${linha.map(texto => `<td>${texto}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
        const fimDeSemana = {
          ...dias[5],
          titulo: 'Fim de semana: 31 de Outubro e 1 de Novembro de 2026',
          celebracao: 'Todos os Santos, Solenidade (Ano A) — missa noturna de 31/10 em 1ª Véspera',
          dias: dias.slice(5)
        };
        const antifonas = window.antifonasData.antifonas_8;
        return `<nav aria-label="Dias de 26 de outubro a 1 de novembro">${dias.map(dia =>
          `<a class="action-btn secondary" href="#dia-${dia.data}">${dia.data.slice(8)}/${dia.data.slice(5, 7)}</a>`).join(' ')}</nav>` +
          [...dias.slice(0, 5), fimDeSemana].map(dia => {
            const festa = dia.cor === 'vermelho';
            const santos = dia.cor === 'branco';
            const missal = [
              ['Ritos Iniciais (Ordinário)', '430'],
              ['Hino de Louvor (Glória)', festa || santos ? '442' : '—'],
              ['Oração da Coleta', santos ? '842' : festa ? '839' : '412'],
              ['Profissão de Fé (Creio)', santos ? 'Rezado, omitida a pág.' : '—'],
              ['Oração sobre as Oferendas', santos ? '842' : festa ? '840' : '412'],
              ['Prefácio', santos ? '843 (Todos os Santos)' : festa ? '498 (Apóstolos)' : '564 (Próprio)'],
              ['Oração Eucarística', festa || santos ? '537 (OE II)' : '565 (OE V)'],
              ['Rito da Comunhão', '569'],
              ['Oração pós Comunhão', santos ? '843 (tabela); 844 (roteiro)' : festa ? '840' : '413'],
              ['Bênção Solene', santos ? 'Própria (Solenidade), conforme tabela; 587 no roteiro' : festa ? '593' : '583'],
              ['Cor Litúrgica', santos ? 'Branca' : festa ? 'Vermelha' : 'Verde']
            ];
            return `<div class="card" id="dia-${dia.data}" data-date="${dia.data}">
              <div class="card-header"><h2>${dia.titulo}</h2>
                <span class="color-badge badge-${dia.cor}">${santos ? 'Branca (Solenidade)' : festa ? 'Vermelha (Festa)' : 'Verde (Féria)'}</span></div>
              <p><strong>Celebração:</strong> ${dia.celebracao}</p>
              <div class="presidency-box"><div class="presidency-title">Escala de Horários, Locais e Celebrantes</div>
                <table class="escala-table">${(dia.dias || [dia]).map(item =>
                  `<tbody${item.data !== dia.data ? ` id="dia-${item.data}" data-date="${item.data}"` : ''}>${item.escala.map(([hora, local, padre]) =>
                    `<tr><td><span class="p-dia">${item.dia}</span> <span class="p-hora">${hora}</span></td><td class="p-loc">${local}</td><td class="p-cel">${padre}</td></tr>`).join('')}</tbody>`).join('')}</table></div>
              <div class="tables-grid">
                ${tabela('📌 Missal Romano', ['Parte / Oração Presidencial', 'Página'], missal)}
                ${tabela('📖 Liturgia da Palavra', ['Momento', 'Ref. Bíblica', 'Lec. / Pág.'], dia.leituras.map(([momento, referencia, pagina, chave]) =>
                  [momento, `<span class="clickable-ref" data-action="open-reading" data-reading-key="${chave}">${referencia}</span>`, pagina]))}
              </div>
              ${!santos ? `<p><span class="clickable-ref" data-action="open-reading" data-reading-key="${dia.leituras[0][3].replace('_l1', '_acl')}">Aclamação ao Evangelho — texto integral do PDF de leituras</span> (sem página de lecionário indicada nas fontes).</p>` : ''}
              ${santos ? `<div class="tables-grid" style="margin-top: 0.8rem;">
                ${tabela('🎵 Antífonas e Canto Interlecionais', [], antifonas.items.map(item => [
                  `<strong>${item.label}</strong><br>${(item.options || [item]).map((opcao, index) =>
                    `${index ? '<br><br><strong>Ou:</strong> ' : ''}<small>${opcao.reference}</small><br>${opcao.text.replace(/\n/g, '<br>')}`).join('')}`
                ]))}
                ${tabela('📺 Citações Telão (PASCOM)', [], antifonas.citations.map(item => [
                  `<strong>${item.label.toUpperCase()}</strong><br>${item.text}`
                ]))}
              </div>` : ''}
            </div>`;
          }).join('') +
          `<div class="card"><h2>Documentos originais</h2>
            <ul>${[
              'Escala Padres 26 outubro a 01 novembro 2026.pdf',
              'Leituras de 26 de outubro a 1 de novembro 2026.pdf',
              'Leituras e Lecionarios - 26 Outubro a 1 Novembro 2026.pdf',
              'Missal - 25 outubro a 1 novembro 2026.pdf',
              'Todos os Santos, Solenidade - 31 10 E 01 11 2026 - ANO A.pdf',
              'Antífona da entrada e comunhão - Todos os Santos, Solenidade.pdf',
              'PRECES - SOLENIDADE DE TODOS OS SANTOS.pdf'
            ].map(nome => `<li><a href="./${encodeURIComponent(nome)}" target="_blank" rel="noopener noreferrer">${nome}</a></li>`).join('')}</ul>
          </div>`;
      })()
    },
    {
      legacyWeek: 8,
      id: '2026-11-02',
      shortTitle: '2 a 8 de novembro de 2026',
      fullTitle: 'Semana de 2 a 8 de novembro de 2026',
      roteiroLabel: 'Roteiro',
      programacaoHtml: `<div class="card"><div class="card-header"><h2>Semana de 2 a 8 de novembro de 2026</h2></div><p>As informações desta semana serão adicionadas quando forem fornecidas.</p></div>`
    }
  ]
};
window.programacaoData = programacaoData;
