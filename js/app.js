(function () {
  'use strict';

  const data = window.LiturgiaData || window.liturgiaData || {
    semanas: [],
    leituras: {}
  };

  const state = {
    semanaId: Number(sessionStorage.getItem('liturgia.semanaId')) || 1
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  function escapeHtml(value) {
    return String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function formatDate(isoDate) {
    if (!isoDate) return '';
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'long'
    }).format(new Date(`${isoDate}T12:00:00`));
  }

  function currentWeek() {
    return data.semanas.find((week) => week.id === state.semanaId) || data.semanas[0];
  }

  function renderWeekSelector() {
    const nav = $('#week-selector');
    if (!nav) return;

    nav.innerHTML = data.semanas.map((week) => `
      <button type="button" class="week-tab-btn ${week.id === state.semanaId ? 'active' : ''}"
        data-week-id="${week.id}" aria-pressed="${week.id === state.semanaId}">
        ${escapeHtml(week.label)}
      </button>
    `).join('');
  }

  function renderDay(day) {
    const readingRows = (day.leituras || []).map((id) => {
      const reading = data.leituras[id];
      if (!reading) return '';
      return `<tr><td>${escapeHtml(reading.tipo || reading.title)}</td>
        <td><button type="button" class="clickable-ref" data-reading-id="${escapeHtml(id)}">${escapeHtml(reading.referencia || reading.title)}</button></td></tr>`;
    }).join('');

    const schedules = (day.horarios || []).map((item) => `
      <tr><td><span class="p-dia">${escapeHtml(item.dia)}</span> <span class="p-hora">${escapeHtml(item.hora)}</span></td>
      <td class="p-loc">${escapeHtml(item.local)}</td><td class="p-cel">${escapeHtml(item.celebrante)}</td></tr>
    `).join('');

    return `<article class="card"><div class="card-header"><h2>${escapeHtml(day.diaSemana)}, ${escapeHtml(formatDate(day.data))}</h2>
      <span class="color-badge badge-${escapeHtml(day.cor)}">${escapeHtml(day.corLabel)}</span></div>
      <div class="celebracao">${escapeHtml(day.celebracao)}</div>
      <div class="presidency-box"><div class="presidency-title">Escala de Horários, Locais e Celebrantes</div>
        <table class="escala-table"><tbody>${schedules || '<tr><td colspan="3">Programação a confirmar.</td></tr>'}</tbody></table></div>
      <div class="tables-grid"><div><div class="table-caption">📖 Liturgia da Palavra</div>
        <table class="liturgy-table"><thead><tr><th>Momento</th><th>Referência</th></tr></thead><tbody>${readingRows || '<tr><td colspan="2">Leituras a confirmar.</td></tr>'}</tbody></table></div></div>
    </article>`;
  }

  function render() {
    const week = currentWeek();
    const app = $('#app');
    if (!app || !week) return;

    app.innerHTML = week.dias.length
      ? week.dias.map(renderDay).join('')
      : '<p class="empty-state">Esta semana ainda não possui dados publicados.</p>';

    renderWeekSelector();
    $('#header-subtitle').textContent = week.titulo;
    $('#active-week-text').textContent = `Exibindo: ${week.titulo}`;
  }

  function openReading(id) {
    const reading = data.leituras[id];
    if (!reading) return;
    const root = $('#modal-root');
    root.innerHTML = `<div class="modal" style="display:flex"><div class="modal-content" role="dialog" aria-modal="true">
      <div class="modal-header-bar"><h2 class="modal-title">${escapeHtml(reading.title || reading.titulo)}</h2>
      <button type="button" class="modal-close-btn" data-close-modal aria-label="Fechar">×</button></div>
      <div class="modal-body" style="white-space:pre-wrap">${escapeHtml(reading.text || reading.texto)}</div></div></div>`;
  }

  document.addEventListener('click', (event) => {
    const weekButton = event.target.closest('[data-week-id]');
    if (weekButton) {
      state.semanaId = Number(weekButton.dataset.weekId);
      sessionStorage.setItem('liturgia.semanaId', String(state.semanaId));
      render();
      return;
    }

    const readingButton = event.target.closest('[data-reading-id]');
    if (readingButton) openReading(readingButton.dataset.readingId);

    if (event.target.closest('[data-close-modal]') || event.target.classList.contains('modal')) {
      const root = $('#modal-root');
      if (root) root.innerHTML = '';
    }
  });

  document.addEventListener('DOMContentLoaded', render);
  window.LiturgiaApp = { state, render, openReading };
})();
