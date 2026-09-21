const WEEK_ID_FALLBACK = '2026-09-14';
let currentWeekId = WEEK_ID_FALLBACK;
const fontSizes = {};
const modalFocusReturn = new Map();

const antifonasData = {
  antifonas_1: {
    title: 'Antífonas e Aclamação (25º Domingo)',
    items: [
      {
        label: 'Antífona de Entrada',
        text: '(p. 407)\nA salvação do povo sou eu, diz o Senhor: *\nde qualquer tribulação em que clamarem por mim,\neu os ouvirei *\ne serei seu Deus para sempre.'
      },
      {
        label: 'Aclamação ao Evangelho',
        text: '(cf. At 16,14b)\nAleluia, Aleluia, Aleluia.\nV. Vinde abrir o nosso coração, Senhor; *\nó Senhor, abri o nosso coração,\ne, então, do vosso filho a palavra, *\npoderemos acolher com muito amor!'
      },
      {
        label: 'Antífona de Comunhão',
        text: '(Sl 118 / Jo 10)\nOs vossos mandamentos vós nos destes, *\npara serem fielmente observados.\nQue seja bem firme a minha vida *\nem cumprir vossa vontade e vossa lei!'
      }
    ]
  },
  antifonas_2: {
    title: 'Antífonas e Aclamação (26º Domingo)',
    items: [
      {
        label: 'Antífona de Entrada',
        text: '(p. 408)\nSenhor, tudo o que fizestes conosco, com razão o fizestes, pois pecamos contra vós e não obedecemos aos vossos mandamentos. Mas honrai o vosso nome, tratando-nos segundo a vossa misericórdia.'
      },
      {
        label: 'Aclamação ao Evangelho',
        text: '(Jo 10,27)\nAleluia, Aleluia, Aleluia.\nV. Minhas ovelhas escutam a minha voz,\nminha voz estão elas a escutar;\neu conheço, então, minhas ovelhas,\nque me seguem, comigo a caminhar!'
      },
      {
        label: 'Antífona de Comunhão',
        text: '(Sl 118,49-50)\nLembrai-vos, Senhor, da vossa palavra ao vosso servo, pela qual me destes esperança. Na minha aflição ela é o meu consolo.'
      }
    ]
  },
  antifonas_3: {
    title: 'Antífonas e Aclamação (27º Domingo)',
    items: [
      {
        label: 'Antífona de Entrada',
        text: '(cf. Est 4,17)\nAo vosso poder, Senhor, tudo está sujeito, e não há quem possa resistir à vossa vontade, porque sois o criador de todas as coisas, do céu e da terra e de tudo que eles contêm; vós sois o Senhor do universo.'
      },
      {
        label: 'Aclamação ao Evangelho',
        text: '(cf. Jo 15,16)\nAleluia, Aleluia, Aleluia.\nV. Eu vos escolhi, foi do meio do mundo, a fim de que deis um fruto que dure.'
      },
      {
        label: 'Antífona de Comunhão',
        text: '(Lm 3,25)\nO Senhor é bom para quem nele confia, para a alma que o procura.'
      }
    ]
  }
};

function getWeeks() {
  return (window.programacaoData && Array.isArray(window.programacaoData.weeks)) ? window.programacaoData.weeks : [];
}

function getCurrentWeek() {
  return getWeeks().find((week) => week.id === currentWeekId) || getWeeks()[0] || null;
}

function sanitizeTrustedHtml(htmlString) {
  const template = document.createElement('template');
  template.innerHTML = htmlString;

  template.content.querySelectorAll('script').forEach((scriptNode) => {
    scriptNode.remove();
  });

  template.content.querySelectorAll('*').forEach((element) => {
    Array.from(element.attributes).forEach((attribute) => {
      const name = attribute.name.toLowerCase();
      const value = attribute.value.trim().toLowerCase();

      if (name.startsWith('on')) {
        element.removeAttribute(attribute.name);
      }

      if (name === 'href' || name === 'src') {
        const normalized = value.replace(/\s+/g, '');
        if (
          normalized.startsWith('javascript:') ||
          normalized.startsWith('data:') ||
          normalized.startsWith('vbscript:')
        ) {
          element.removeAttribute(attribute.name);
        }
      }
    });
  });

  return template.content;
}

function createTrustedSection(week) {
  const section = document.createElement('section');
  section.id = `week-panel-${week.id}`;
  section.className = 'week-panel';
  section.setAttribute('role', 'tabpanel');
  section.setAttribute('aria-labelledby', `btn-tab-${week.id}`);

  section.appendChild(sanitizeTrustedHtml(week.programacaoHtml).cloneNode(true));
  return section;
}

function renderWeeks() {
  const weeksRoot = document.getElementById('weeks-root');
  const weeks = getWeeks();
  if (!weeksRoot || weeks.length === 0) {
    return;
  }

  weeksRoot.textContent = '';
  weeks.forEach((week) => {
    const section = createTrustedSection(week);
    section.hidden = true;
    weeksRoot.appendChild(section);

    const tab = document.getElementById(`btn-tab-${week.id}`);
    if (tab) {
      tab.dataset.title = week.shortTitle;
      tab.dataset.full = week.fullTitle;
      tab.textContent = `👉 ${week.shortTitle}`;
    }
  });
}

function showWeek(weekId, options = { focusTab: false }) {
  const weeks = getWeeks();
  const selectedWeek = weeks.find((week) => week.id === weekId);
  if (!selectedWeek) {
    return;
  }

  currentWeekId = selectedWeek.id;

  weeks.forEach((week) => {
    const tab = document.getElementById(`btn-tab-${week.id}`);
    const panel = document.getElementById(`week-panel-${week.id}`);
    const active = week.id === selectedWeek.id;

    if (tab) {
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
      tab.textContent = `${active ? '✅ VISUALIZANDO:' : '👉'} ${week.shortTitle}`;
      if (active && options.focusTab) {
        tab.focus();
      }
    }

    if (panel) {
      panel.hidden = !active;
    }
  });

  const subtitle = document.getElementById('header-subtitle');
  const activeWeekText = document.getElementById('active-week-text');
  if (subtitle) {
    subtitle.textContent = `Programação Litúrgica e Roteiro Completo | ${selectedWeek.fullTitle}`;
  }
  if (activeWeekText) {
    activeWeekText.textContent = `EXIBINDO NA TELA: ${selectedWeek.fullTitle}`;
  }

  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function adjustTextSize(step, containerId) {
  if (!containerId) return;

  if (!fontSizes[containerId]) {
    fontSizes[containerId] = 12;
  }

  fontSizes[containerId] += Number(step) * 1.5;
  if (fontSizes[containerId] < 8) fontSizes[containerId] = 8;
  if (fontSizes[containerId] > 28) fontSizes[containerId] = 28;

  const container = document.getElementById(containerId);
  if (!container) return;

  if (containerId === 'modalBody' || containerId === 'content_leituras_view' || containerId.includes('reflexoes') || containerId.includes('programacao')) {
    container.style.fontSize = `${fontSizes[containerId]}pt`;
    return;
  }

  const texts = container.querySelectorAll('.script-text');
  texts.forEach((element) => {
    element.style.fontSize = `${fontSizes[containerId]}pt`;
  });
}

function openModal(id, trigger = document.activeElement) {
  const modal = document.getElementById(id);
  if (!modal) return;

  modalFocusReturn.set(id, trigger || null);
  modal.hidden = false;
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (focusable) {
    focusable.focus();
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;

  modal.hidden = true;
  modal.setAttribute('aria-hidden', 'true');

  const hasOpenModals = Array.from(document.querySelectorAll('.modal')).some((item) => !item.hidden);
  if (!hasOpenModals) {
    document.body.style.overflow = '';
  }

  const trigger = modalFocusReturn.get(id);
  if (trigger && typeof trigger.focus === 'function') {
    trigger.focus();
  }
  modalFocusReturn.delete(id);
}

function closeTopModal() {
  const openModals = Array.from(document.querySelectorAll('.modal')).filter((modal) => !modal.hidden);
  if (openModals.length === 0) return;

  closeModal(openModals[openModals.length - 1].id);
}

function openActiveProgramacaoModal(trigger) {
  const week = getCurrentWeek();
  if (!week) return;

  const sourceDiv = document.getElementById(`week-panel-${week.id}`);
  const contentDiv = document.getElementById('content_programacao');
  if (!sourceDiv || !contentDiv) return;

  const cloned = sourceDiv.cloneNode(true);
  cloned.removeAttribute('role');
  cloned.removeAttribute('aria-labelledby');
  cloned.removeAttribute('hidden');
  cloned.querySelectorAll('[id]').forEach((node) => {
    node.removeAttribute('id');
  });
  if (cloned.id) {
    cloned.removeAttribute('id');
  }

  contentDiv.textContent = '';
  contentDiv.appendChild(cloned);
  openModal('modal_programacao', trigger);
}

function openActiveRoteiroModal(trigger) {
  const week = getCurrentWeek();
  if (!week) return;
  openModal(`modal_roteiro_${week.legacyWeek}`, trigger);
}

function openActivePrecesModal(trigger) {
  const week = getCurrentWeek();
  if (!week) return;
  openModal(`modal_preces_${week.legacyWeek}`, trigger);
}

function openActiveReflexoesModal(trigger) {
  const week = getCurrentWeek();
  if (!week) return;
  openModal(`modal_reflexoes_${week.legacyWeek}`, trigger);
}

function openActiveLeiturasModal(trigger) {
  const week = getCurrentWeek();
  if (!week) return;

  document.querySelectorAll('.leituras-bloco').forEach((block) => {
    block.style.display = 'none';
  });
  selectAllReadings(false);

  const activeBlock = document.getElementById(`leituras_semana_${week.legacyWeek}`);
  if (activeBlock) {
    activeBlock.style.display = 'block';
  }

  openModal('modal_seletor_leituras', trigger);
}

function showMessageModal(message, trigger, title = 'Aviso') {
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  if (!modalTitle || !modalBody) return;

  modalTitle.textContent = title;
  modalBody.textContent = message;
  fontSizes.modalBody = 12;
  modalBody.style.fontSize = '12pt';
  openModal('generalModal', trigger);
}

function createReadingParagraphs(text) {
  const fragment = document.createDocumentFragment();
  const paragraphs = (text || '').split('\n\n');

  paragraphs.forEach((paragraph) => {
    const p = document.createElement('p');
    p.style.margin = '0 0 12px 0';
    p.style.pageBreakInside = 'avoid';

    const lines = paragraph.split('\n');
    lines.forEach((line, index) => {
      p.appendChild(document.createTextNode(line));
      if (index < lines.length - 1) {
        p.appendChild(document.createElement('br'));
      }
    });

    fragment.appendChild(p);
  });

  return fragment;
}

function openReading(key, trigger) {
  if (typeof window.readingsData === 'undefined') {
    showMessageModal('O arquivo leituras.js ainda não foi carregado corretamente.', trigger, 'Erro de carregamento');
    return;
  }

  const reading = window.readingsData[key];
  if (!reading) {
    showMessageModal('Leitura não encontrada para esta referência. Verifique a programação desta semana.', trigger, 'Leitura não encontrada');
    return;
  }

  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  if (!modalTitle || !modalBody) return;

  modalTitle.textContent = reading.title;
  modalBody.textContent = '';
  modalBody.appendChild(createReadingParagraphs(reading.text));
  fontSizes.modalBody = 14;
  modalBody.style.fontSize = '14pt';
  openModal('generalModal', trigger);
}

function selectAllReadings(check) {
  document.querySelectorAll('.reading-checkbox').forEach((checkbox) => {
    checkbox.checked = Boolean(check);
  });
}

function createAntifonaBlock(typeKey) {
  const antifona = antifonasData[typeKey];
  if (!antifona) return null;

  const wrap = document.createElement('div');
  wrap.className = 'antifona-print-box';
  wrap.style.marginBottom = '15px';
  wrap.style.border = '1px solid #ccc';
  wrap.style.padding = '15px';
  wrap.style.lineHeight = '1.5';
  wrap.style.fontFamily = "'Georgia',serif";
  wrap.style.pageBreakInside = 'avoid';

  const title = document.createElement('h3');
  title.style.margin = '0 0 10px 0';
  title.style.color = '#1a365d';
  title.style.borderBottom = '1px solid #1a365d';
  title.style.paddingBottom = '5px';
  title.style.textTransform = 'uppercase';
  title.textContent = antifona.title;
  wrap.appendChild(title);

  antifona.items.forEach((item, idx) => {
    const p = document.createElement('p');
    p.style.margin = idx === antifona.items.length - 1 ? '0' : '0 0 10px 0';

    const strong = document.createElement('strong');
    strong.textContent = item.label;
    p.appendChild(strong);
    p.appendChild(document.createTextNode(` ${item.text}`));

    wrap.appendChild(p);
  });

  return wrap;
}

function previewSelectedReadings() {
  if (typeof window.readingsData === 'undefined') {
    showMessageModal('Aguarde o carregamento do arquivo de leituras.', document.activeElement, 'Aguarde');
    return;
  }

  const selected = Array.from(document.querySelectorAll('.reading-checkbox:checked')).map((checkbox) => checkbox.value);
  if (selected.length === 0) {
    showMessageModal('Por favor, selecione ao menos uma leitura ou antífona.', document.activeElement, 'Seleção necessária');
    return;
  }

  const viewDiv = document.getElementById('content_leituras_view');
  if (!viewDiv) return;

  viewDiv.textContent = '';

  selected.forEach((key) => {
    if (key.startsWith('antifonas_')) {
      const antiBlock = createAntifonaBlock(key);
      if (antiBlock) {
        viewDiv.appendChild(antiBlock);
      }
      return;
    }

    const reading = window.readingsData[key];
    if (!reading) {
      const warning = document.createElement('div');
      warning.className = 'reading-print-block';
      warning.textContent = `Leitura não encontrada para a chave: ${key}.`;
      viewDiv.appendChild(warning);
      return;
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'reading-print-block';
    wrapper.style.marginBottom = '25px';
    wrapper.style.paddingBottom = '15px';
    wrapper.style.borderBottom = '1px dashed #ccc';
    wrapper.style.pageBreakInside = 'avoid';

    const day = document.createElement('div');
    day.className = 'leitura-dia';
    day.style.fontWeight = 'bold';
    day.style.color = '#1a365d';
    day.style.marginBottom = '4px';
    day.style.textTransform = 'uppercase';
    day.textContent = reading.day;

    const title = document.createElement('div');
    title.className = 'leitura-titulo';
    title.style.fontSize = '1.2rem';
    title.style.fontWeight = 'bold';
    title.style.color = '#8c6414';
    title.style.marginBottom = '12px';
    title.style.borderBottom = '1px solid #e2e8f0';
    title.style.paddingBottom = '4px';
    title.style.textTransform = 'uppercase';
    title.textContent = reading.title;

    const text = document.createElement('div');
    text.className = 'leitura-texto';
    text.style.lineHeight = '1.6';
    text.style.textAlign = 'justify';
    text.style.wordWrap = 'break-word';
    text.appendChild(createReadingParagraphs(reading.text));

    wrapper.appendChild(day);
    wrapper.appendChild(title);
    wrapper.appendChild(text);
    viewDiv.appendChild(wrapper);
  });

  fontSizes.content_leituras_view = 14;
  viewDiv.style.fontSize = '14pt';

  const trigger = modalFocusReturn.get('modal_seletor_leituras') || document.activeElement;
  closeModal('modal_seletor_leituras');
  openModal('modal_leituras_view', trigger);
}

function runPrintMount(nodeBuilder) {
  document.querySelectorAll('.modal').forEach((modal) => {
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
  });
  document.body.style.overflow = 'visible';

  const mount = document.getElementById('print-mount');
  if (!mount) return;

  mount.textContent = '';
  mount.hidden = false;
  mount.appendChild(nodeBuilder());

  window.addEventListener('afterprint', () => {
    mount.textContent = '';
    mount.hidden = true;
  }, { once: true });

  setTimeout(() => {
    window.print();
  }, 150);
}

function buildHeaderNode(title, subtitle = null) {
  const header = document.createElement('div');
  header.className = 'print-sheet-header';

  const h2 = document.createElement('h2');
  h2.textContent = 'Paróquia Nossa Senhora Auxiliadora';

  const h3 = document.createElement('h3');
  h3.textContent = title;

  header.appendChild(h2);
  header.appendChild(h3);

  if (subtitle) {
    const badge = document.createElement('div');
    badge.style.background = '#1a365d';
    badge.style.color = '#ffffff';
    badge.style.display = 'inline-block';
    badge.style.padding = '4px 10px';
    badge.style.borderRadius = '4px';
    badge.style.fontSize = '10pt';
    badge.style.fontWeight = 'bold';
    badge.style.marginTop = '6px';
    badge.textContent = subtitle;
    header.appendChild(badge);
  }

  return header;
}

function printProgramacaoGeral() {
  const week = getCurrentWeek();
  if (!week) return;

  const source = document.getElementById(`week-panel-${week.id}`);
  if (!source) return;

  runPrintMount(() => {
    const wrapper = document.createElement('div');
    wrapper.style.padding = '0.2cm';
    wrapper.appendChild(buildHeaderNode('Programação Litúrgica Oficial', week.fullTitle));
    wrapper.appendChild(source.cloneNode(true));
    return wrapper;
  });
}

function printActiveRoteiro() {
  const week = getCurrentWeek();
  if (!week) return;

  const content = document.getElementById(`content_roteiro_${week.legacyWeek}`);
  if (!content) return;

  runPrintMount(() => {
    const wrapper = document.createElement('div');
    wrapper.style.padding = '0.5cm';
    wrapper.appendChild(buildHeaderNode(`Roteiro Litúrgico — ${week.shortTitle}`));
    wrapper.appendChild(content.cloneNode(true));
    return wrapper;
  });
}

function printActivePreces() {
  const week = getCurrentWeek();
  if (!week) return;

  const sab = document.getElementById(`preces_sabado_${week.legacyWeek}`);
  const dManha = document.getElementById(`preces_domingo_manha_${week.legacyWeek}`);
  const dNoite = document.getElementById(`preces_domingo_noite_${week.legacyWeek}`);
  if (!sab || !dManha || !dNoite) return;

  runPrintMount(() => {
    const wrapper = document.createElement('div');
    [sab, dManha, dNoite].forEach((block) => {
      const page = document.createElement('div');
      page.style.pageBreakAfter = 'always';
      page.appendChild(buildHeaderNode(`Oração dos Fiéis — ${week.shortTitle}`));
      page.appendChild(block.cloneNode(true));
      wrapper.appendChild(page);
    });
    return wrapper;
  });
}

function printActiveReflexoes() {
  const week = getCurrentWeek();
  if (!week) return;

  const content = document.getElementById(`content_reflexoes_${week.legacyWeek}`);
  if (!content) return;

  runPrintMount(() => {
    const wrapper = document.createElement('div');
    wrapper.style.padding = '0.5cm';
    wrapper.appendChild(buildHeaderNode('Reflexões Litúrgicas'));
    wrapper.appendChild(content.cloneNode(true));
    return wrapper;
  });
}

function printLeiturasFromView() {
  const view = document.getElementById('content_leituras_view');
  if (!view) return;

  runPrintMount(() => {
    const wrapper = document.createElement('div');
    wrapper.style.padding = '0.5cm';
    wrapper.appendChild(buildHeaderNode('Leituras Selecionadas — Ambão'));
    wrapper.appendChild(view.cloneNode(true));
    return wrapper;
  });
}

function handleScrollButton() {
  const button = document.getElementById('btn-topo');
  if (!button) return;

  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    button.style.display = 'block';
  } else {
    button.style.display = 'none';
  }
}

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  const register = () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {
      // Falha silenciosa para manter a experiência estática
    });
  };

  if (document.readyState === 'complete') {
    register();
    return;
  }

  window.addEventListener('load', register, { once: true });
}

function initializeModalLabels() {
  document.querySelectorAll('.modal').forEach((modal) => {
    const title = modal.querySelector('.modal-title, #modalTitle');
    if (title && title.id) {
      modal.setAttribute('aria-labelledby', title.id);
      return;
    }
    if (title && !title.id) {
      const generatedId = `${modal.id}-title`;
      title.id = generatedId;
      modal.setAttribute('aria-labelledby', generatedId);
      return;
    }
    modal.setAttribute('aria-label', 'Janela modal');
  });

  document.querySelectorAll('.modal-close-btn').forEach((btn) => {
    btn.setAttribute('aria-label', 'Fechar janela modal');
  });
}

function handleActionClick(event) {
  const target = event.target.closest('[data-action]');
  if (!target) return;

  const action = target.dataset.action;
  switch (action) {
    case 'show-week':
      showWeek(target.dataset.weekId, { focusTab: true });
      break;
    case 'open-active-programacao':
      openActiveProgramacaoModal(target);
      break;
    case 'open-active-roteiro':
      openActiveRoteiroModal(target);
      break;
    case 'open-active-preces':
      openActivePrecesModal(target);
      break;
    case 'open-active-leituras':
      openActiveLeiturasModal(target);
      break;
    case 'open-active-reflexoes':
      openActiveReflexoesModal(target);
      break;
    case 'open-reading':
      openReading(target.dataset.readingKey, target);
      break;
    case 'text-size':
      adjustTextSize(Number(target.dataset.step), target.dataset.target);
      break;
    case 'close-modal':
      closeModal(target.dataset.modalId);
      break;
    case 'preview-selected-readings':
      previewSelectedReadings();
      break;
    case 'select-all-readings':
      selectAllReadings(target.dataset.check === 'true');
      break;
    case 'print-programacao-geral':
      printProgramacaoGeral();
      break;
    case 'print-active-roteiro':
      printActiveRoteiro();
      break;
    case 'print-active-preces':
      printActivePreces();
      break;
    case 'print-active-reflexoes':
      printActiveReflexoes();
      break;
    case 'print-leituras-view':
      printLeiturasFromView();
      break;
    case 'back-to-top':
      window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      break;
    default:
      break;
  }
}

function init() {
  renderWeeks();
  initializeModalLabels();

  const weeks = getWeeks();
  if (weeks.length > 0) {
    showWeek(weeks[0].id);
  }

  document.addEventListener('click', handleActionClick);

  document.addEventListener('click', (event) => {
    const modal = event.target.classList && event.target.classList.contains('modal') ? event.target : null;
    if (modal) {
      closeModal(modal.id);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeTopModal();
      return;
    }

    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      const activeElement = document.activeElement;
      if (!activeElement || activeElement.getAttribute('role') !== 'tab') {
        return;
      }

      const weeks = getWeeks();
      const index = weeks.findIndex((week) => week.id === activeElement.dataset.weekId);
      if (index < 0) return;

      const delta = event.key === 'ArrowRight' ? 1 : -1;
      const nextIndex = (index + delta + weeks.length) % weeks.length;
      showWeek(weeks[nextIndex].id, { focusTab: true });
      event.preventDefault();
    }
  });

  window.addEventListener('scroll', handleScrollButton, { passive: true });

  const logo = document.getElementById('header-logo');
  if (logo) {
    logo.addEventListener('error', () => {
      logo.style.display = 'none';
    });
  }

  registerServiceWorker();
}

document.addEventListener('DOMContentLoaded', init);

window.printProgramacaoGeral = printProgramacaoGeral;
window.printActiveRoteiro = printActiveRoteiro;
window.printActivePreces = printActivePreces;
window.printActiveReflexoes = printActiveReflexoes;
window.printLeiturasFromView = printLeiturasFromView;
