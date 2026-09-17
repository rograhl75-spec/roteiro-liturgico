/* Camada de apresentação opcional e incremental.
 *
 * Este arquivo não substitui a lógica legada de index.html de uma vez.
 * Ele fornece utilitários seguros para a migração gradual:
 * - estado da semana atual;
 * - abertura/fechamento acessível de modais;
 * - tamanho de texto persistido por sessão;
 * - validação básica da base readingsData;
 * - navegação por teclado nos modais.
 */
(function () {
  'use strict';

  const state = {
    week: Number(window.currentWeek) || 1,
    fontSizes: Object.create(null)
  };

  function byId(id) {
    return document.getElementById(id);
  }

  function openModal(id) {
    const modal = byId(id);
    if (!modal) return false;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    const close = modal.querySelector('.modal-close-btn');
    if (close) close.focus();
    return true;
  }

  function closeModal(id) {
    const modal = byId(id);
    if (!modal) return false;
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    if (!document.querySelector('.modal[aria-hidden="false"]')) {
      document.body.classList.remove('modal-open');
    }
    return true;
  }

  function setFontSize(id, delta) {
    const element = byId(id);
    if (!element) return;
    const current = state.fontSizes[id] || 14;
    const next = Math.min(28, Math.max(8, current + delta * 1.5));
    state.fontSizes[id] = next;
    element.style.fontSize = `${next}pt`;
  }

  function validateReadings() {
    const data = window.readingsData;
    if (!data || typeof data !== 'object') {
      console.warn('[roteiro-liturgico] readingsData não foi carregado.');
      return { valid: false, missing: [] };
    }

    const missing = [];
    document.querySelectorAll('[onclick*="openReading"]').forEach((element) => {
      const match = element.getAttribute('onclick').match(/openReading\(['"]([^'"]+)/);
      if (match && !data[match[1]]) missing.push(match[1]);
    });

    if (missing.length) {
      console.warn('[roteiro-liturgico] Leituras sem registro:', [...new Set(missing)]);
    }
    return { valid: missing.length === 0, missing: [...new Set(missing)] };
  }

  function enhanceModals() {
    document.querySelectorAll('.modal').forEach((modal) => {
      if (!modal.hasAttribute('aria-hidden')) modal.setAttribute('aria-hidden', 'true');
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
    });

    document.querySelectorAll('.modal-close-btn').forEach((button) => {
      button.setAttribute('aria-label', 'Fechar janela');
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      document.querySelectorAll('.modal[aria-hidden="false"]').forEach((modal) => closeModal(modal.id));
    }
  });

  window.RoteiroApp = Object.freeze({
    state,
    openModal,
    closeModal,
    setFontSize,
    validateReadings,
    enhanceModals
  });

  document.addEventListener('DOMContentLoaded', () => {
    enhanceModals();
    validateReadings();
  });
})();
