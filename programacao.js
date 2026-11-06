/* ==========================================================================
   PROGRAMAÇÃO SEMANAL — PARÓQUIA NOSSA SENHORA AUXILIADORA
   Cada semana é descrita apenas por dados (array `semanas`); o HTML é gerado
   por `montarSemana()`, igual para todas as semanas.
   ========================================================================== */
(() => {
  const CORES = {
    verde: 'Verde',
    branco: 'Branca',
    vermelho: 'Vermelha',
    roxo: 'Roxa',
    rosa: 'Rósea'
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

  /* Tipos de linha da escala: [hora, local, responsável, tipo, descrição].
     Sem tipo = missa/celebração. Nunca publicar telefones nem valores de espórtulas. */
  const GRUPOS_ESCALA = [
    ['missa', '⛪ Missas e celebrações'],
    ['confissao', '🕊️ Confissões e direção espiritual'],
    ['casamento', '💍 Casamentos']
  ];
  const ICONES_ATENDIMENTO = { confissao: '🕊️', casamento: '💍' };
  const tipoDaLinha = (linha) => linha[3] || 'missa';

  function blocosEscala(dia, dias) {
    const ancorados = new Set([dia.data]);
    return GRUPOS_ESCALA.map(([tipo, titulo]) => {
      const linhas = dias.flatMap((item) => item.escala
        .filter((linha) => tipoDaLinha(linha) === tipo)
        .map((linha) => [item, linha]));
      if (!linhas.length) return '';
      return `<div class="presidency-box presidency-${tipo}"><div class="presidency-title">${titulo}</div>
                <table class="escala-table"><tbody>${linhas.map(([item, [hora, local, responsavel, , descricao]]) => {
                  const ancora = ancorados.has(item.data) ? '' : ` id="dia-${item.data}" data-date="${item.data}"`;
                  ancorados.add(item.data);
                  const texto = tipo === 'missa' ? responsavel : `${responsavel}<span class="p-desc">${descricao}</span>`;
                  return `<tr${ancora}><td><span class="p-dia">${item.dia}</span> <span class="p-hora">${hora}</span></td><td class="p-loc">${local}</td><td class="p-cel">${texto}</td></tr>`;
                }).join('')}</tbody></table></div>`;
    }).join('');
  }

  function resumoAtendimentos(semana) {
    const linhas = semana.dias.concat(semana.fimDeSemana.dias).flatMap((dia) => dia.escala
      .filter((linha) => tipoDaLinha(linha) !== 'missa')
      .map((linha) => [dia, linha]));
    if (!linhas.length) return '';
    return `<div class="card card-atendimentos"><h2>Confissões, direção espiritual e casamentos da semana</h2>
            <table class="liturgy-table"><thead><tr><th scope="col">Dia</th><th scope="col">Horário</th><th scope="col">Atendimento</th><th scope="col">Local</th><th scope="col">Responsável</th></tr></thead>
            <tbody>${linhas.map(([dia, [hora, local, responsavel, tipo, descricao]]) =>
              `<tr><td><a href="#dia-${dia.data}">${dataCurta(dia.data)} (${dia.dia})</a></td><td>${hora}</td><td>${ICONES_ATENDIMENTO[tipo]} ${descricao}</td><td>${local}</td><td><strong>${responsavel}</strong></td></tr>`).join('')}</tbody></table></div>`;
  }

  const MISSAL_PADRAO = { ritos: '430', rito_comunhao: '569' };

  const escapar = (texto) => String(texto)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const dataCurta = (iso) => `${iso.slice(8)}/${iso.slice(5, 7)}`;
  const enderecoArquivo = (caminho) => `./${caminho.split('/').map(encodeURIComponent).join('/')}`;
  const nomeArquivo = (caminho) => caminho.split('/').pop();

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
                ${tabela('📺 Citações para a transmissão', [], antifonas.citations.map((item) => [
                  `<strong>${item.label.toUpperCase()}</strong><br>${comQuebras(item.text)}`
                ]))}
              </div>`;
  }

  function cartaoDia(dia) {
    const dias = dia.dias || [dia];
    const botoes = (dia.botoes || []).map(({ tipo, chave, rotulo, arquivo }) => tipo === 'link'
      ? `<a class="action-btn" href="${enderecoArquivo(arquivo)}" target="_blank" rel="noopener noreferrer">${rotulo}</a>`
      : `<button type="button" class="action-btn" data-action="open-active-${tipo}" data-${tipo}-key="${chave}">${rotulo}</button>`).join('');
    return `<div class="card" id="dia-${dia.data}" data-date="${dia.data}">
              <div class="card-header"><h2>${dia.titulo}</h2>
                <span class="color-badge badge-${dia.cor}">${CORES[dia.cor]}${dia.grau ? ` (${dia.grau})` : ''}</span></div>
              <p><strong>Celebração:</strong> ${dia.celebracao}</p>
              ${blocosEscala(dia, dias)}
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
              `<li><a href="${enderecoArquivo(nome)}" target="_blank" rel="noopener noreferrer">${nomeArquivo(nome)}</a></li>`).join('')}</ul>
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
        resumoAtendimentos(semana) +
        semana.dias.concat([fimDeSemana]).map(cartaoDia).join('') +
        documentos
    };
  }

  /* Os dados das semanas vêm de semanas.js, gerado automaticamente por
     ferramentas/montar-site.js a partir das pastas semanas/<segunda-feira>/semana.json. */
  const semanas = Array.isArray(window.semanasData) ? window.semanasData : [];
  window.programacaoData = { weeks: semanas.map(montarSemana) };
})();
