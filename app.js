let currentWeekId = null;
const fontSizes = {};
const modalFocusReturn = new Map();
let printing = false;
let lastSelectedReadings = [];
let resumeUpdate = () => {};
let savedUpdateState = null;
try {
  savedUpdateState = JSON.parse(sessionStorage.getItem('roteiro-update-state'));
  sessionStorage.removeItem('roteiro-update-state');
} catch (error) {}

function getWeeks() {
  return (window.programacaoData && Array.isArray(window.programacaoData.weeks)) ? window.programacaoData.weeks : [];
}

function getAntifonasData() {
  return (window.antifonasData && typeof window.antifonasData === 'object') ? window.antifonasData : {};
}

function getRoteirosData() {
  return (window.roteirosData && typeof window.roteirosData === 'object') ? window.roteirosData : {};
}

function getCurrentWeek() {
  return getWeeks().find((week) => week.id === currentWeekId) || getWeeks()[0] || null;
}

/* Data de hoje no fuso de Brasília, no formato YYYY-MM-DD. */
function todayIso() {
  try {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date());
  } catch (error) {
    return new Date().toISOString().slice(0, 10);
  }
}

/* Semana que contém hoje; senão a próxima; senão a mais recente. */
function getDefaultWeek(weeks, today = todayIso()) {
  const ordered = [...weeks].sort((a, b) => (a.inicio || a.id).localeCompare(b.inicio || b.id));
  return ordered.find((week) => (week.inicio || week.id) <= today && today <= (week.fim || week.id))
    || ordered.find((week) => (week.inicio || week.id) > today)
    || ordered[ordered.length - 1]
    || null;
}

const ROLE_CLASSES = [
  [/^animador/i, 'animador'],
  [/^padre\s*\/\s*animador/i, 'todos'],
  [/^padre/i, 'padre'],
  [/^di[aá]cono/i, 'diacono'],
  [/^m[uú]sica/i, 'musica'],
  [/^todos/i, 'todos'],
  [/^(leitor|\d[ªa]\s*leitura)/i, 'leitor']
];

function roleClass(role) {
  const match = ROLE_CLASSES.find(([pattern]) => pattern.test(role));
  return match ? match[1] : 'rubrica';
}

function appendMultiline(element, text) {
  String(text || '').split('\n').forEach((line, index) => {
    if (index > 0) element.appendChild(document.createElement('br'));
    element.appendChild(document.createTextNode(line));
  });
}

function createScriptRow(role, text) {
  const kind = roleClass(role);
  const row = document.createElement('div');
  row.className = `script-row row-${kind}`;
  const tag = document.createElement('span');
  tag.className = `script-tag script-role tag-${kind}`;
  tag.textContent = role;
  const body = document.createElement('span');
  body.className = 'script-text';
  appendMultiline(body, text);
  row.append(tag, body);
  return row;
}

function createSourceRow(fileName, label) {
  const row = document.createElement('div');
  row.className = 'script-row row-rubrica';
  const tag = document.createElement('span');
  tag.className = 'script-tag script-role tag-rubrica';
  tag.textContent = 'Fonte';
  const body = document.createElement('span');
  body.className = 'script-text';
  const link = document.createElement('a');
  link.href = `./${fileName.split('/').map(encodeURIComponent).join('/')}`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = label;
  body.appendChild(link);
  row.append(tag, body);
  return row;
}

function createModalShell(id, title, contentId, printAction, dataset = {}) {
  const modal = document.createElement('div');
  modal.id = id;
  modal.className = 'modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-hidden', 'true');
  modal.hidden = true;

  const content = document.createElement('div');
  content.className = 'modal-content';
  const header = document.createElement('div');
  header.className = 'modal-header-bar';
  const heading = document.createElement('h3');
  heading.className = 'modal-title';
  heading.textContent = title;
  const actions = document.createElement('div');
  actions.className = 'modal-actions';

  const button = (label, attributes, className = 'action-btn') => {
    const element = document.createElement('button');
    element.type = 'button';
    element.className = className;
    element.textContent = label;
    Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
    actions.appendChild(element);
  };
  button('A+', { 'data-action': 'text-size', 'data-step': '1', 'data-target': contentId, 'aria-label': 'Aumentar texto' }, 'action-btn secondary');
  button('A-', { 'data-action': 'text-size', 'data-step': '-1', 'data-target': contentId, 'aria-label': 'Diminuir texto' }, 'action-btn secondary');
  if (printAction) {
    button('🖨️ Imprimir', { 'data-action': printAction, ...dataset });
    if (printAction !== 'print-active-reflexoes') {
      button('📤 Enviar PDF', { 'data-action': printAction.replace('print-', 'share-'), ...dataset, 'aria-label': 'Enviar como PDF (WhatsApp, e-mail)' });
      button('⬇️ Baixar PDF', { 'data-action': printAction.replace('print-', 'share-'), 'data-modo': 'baixar', ...dataset, 'aria-label': 'Baixar como PDF' }, 'action-btn btn-baixar-pdf');
    }
  }
  button('×', { 'data-action': 'close-modal', 'data-modal-id': id }, 'modal-close-btn');

  header.append(heading, actions);
  const body = document.createElement('div');
  body.id = contentId;
  body.className = 'script-block';
  content.append(header, body);
  modal.appendChild(content);
  return { modal, body };
}

/* Monta as janelas de roteiro, preces e reflexões a partir de roteiros.js. */
function renderDocumentModals() {
  const root = document.getElementById('document-modals');
  if (!root) return;
  root.textContent = '';

  Object.entries(getRoteirosData()).forEach(([key, doc]) => {
    const [, type, suffix] = key.match(/^(roteiro|preces|reflexoes)_(.+)$/) || [];
    if (!type) return;
    const extra = suffix.includes('_') ? suffix.slice(suffix.indexOf('_') + 1) : null;
    const dataset = extra ? { [`data-${type}-key`]: extra } : {};
    const printAction = { roteiro: 'print-active-roteiro', preces: 'print-active-preces', reflexoes: 'print-active-reflexoes' }[type];
    const { modal, body } = createModalShell(`modal_${type}_${suffix}`, doc.titulo, `content_${type}_${suffix}`, printAction, dataset);
    if (type === 'reflexoes') body.className = 'modal-body';

    if (doc.fonte) {
      body.appendChild(createSourceRow(doc.fonte, type === 'preces' ? 'Abrir ou baixar as preces originais' : 'Abrir ou baixar o documento original'));
    }

    (doc.secoes || []).forEach((secao) => {
      const heading = document.createElement('h4');
      heading.className = 'roteiro-section-title';
      heading.textContent = secao.titulo;
      body.appendChild(heading);
      secao.linhas.forEach(([role, text]) => body.appendChild(createScriptRow(role, text)));
    });

    (doc.formularios || []).forEach((formulario, index) => {
      const section = document.createElement('section');
      section.id = `preces_${suffix}_${index + 1}`;
      section.className = 'preces-form';
      section.dataset.precesForm = String(index + 1);
      const heading = document.createElement('h4');
      heading.className = 'preces-form-title';
      heading.textContent = formulario.titulo;
      section.appendChild(heading);
      formulario.linhas.forEach(([role, text]) => section.appendChild(createScriptRow(role, text)));
      body.appendChild(section);
    });

    (doc.paragrafos || []).forEach((paragraph) => {
      const p = document.createElement('p');
      appendMultiline(p, paragraph);
      body.appendChild(p);
    });

    root.appendChild(modal);
  });
}

/* Monta os blocos de seleção de leituras (leituras_semana_<legacyWeek>) a partir de programacao.js. */
function renderLeiturasBlocks() {
  const root = document.getElementById('leituras-blocos');
  if (!root) return;
  root.textContent = '';

  getWeeks().forEach((week) => {
    const block = document.createElement('div');
    block.id = `leituras_semana_${week.legacyWeek}`;
    block.className = 'leituras-bloco';
    block.hidden = true;

    const heading = document.createElement('h4');
    heading.className = 'leituras-bloco-title';
    heading.textContent = `Selecione para imprimir: ${week.shortTitle}`;
    const grid = document.createElement('div');
    grid.className = 'leitura-grid';

    (week.selecaoLeituras || []).forEach((group) => {
      const column = document.createElement('fieldset');
      column.className = 'leitura-col';
      const legend = document.createElement('legend');
      legend.textContent = group.titulo;
      column.appendChild(legend);
      group.itens.forEach(([label, value]) => {
        const item = document.createElement('label');
        if (value.startsWith('antifonas_')) item.className = 'leitura-antifona';
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.className = 'reading-checkbox';
        input.value = value;
        item.append(input, document.createTextNode(` ${label}`));
        column.appendChild(item);
      });
      grid.appendChild(column);
    });

    block.append(heading, grid);
    root.appendChild(block);
  });
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

  const tabsRoot = document.getElementById('week-tabs');
  weeksRoot.textContent = '';
  if (tabsRoot) tabsRoot.textContent = '';

  weeks.forEach((week) => {
    const section = createTrustedSection(week);
    section.hidden = true;
    weeksRoot.appendChild(section);

    if (tabsRoot) {
      const tab = document.createElement('button');
      tab.type = 'button';
      tab.className = 'week-tab-btn';
      tab.id = `btn-tab-${week.id}`;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', 'false');
      tab.setAttribute('aria-controls', `week-panel-${week.id}`);
      tab.tabIndex = -1;
      tab.dataset.action = 'show-week';
      tab.dataset.weekId = week.id;
      tab.dataset.title = week.shortTitle;
      tab.dataset.full = week.fullTitle;
      tab.textContent = `👉 ${week.shortTitle}`;
      tabsRoot.appendChild(tab);
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
      tab.tabIndex = active ? 0 : -1;
      tab.textContent = `${active ? '✅ VISUALIZANDO:' : '👉'} ${week.shortTitle}`;
      if (active && options.focusTab) {
        tab.focus();
      }
    }

    if (panel) {
      panel.hidden = !active;
    }
  });

  const activeWeekText = document.getElementById('active-week-text');
  if (activeWeekText) {
    activeWeekText.textContent = `EXIBINDO NA TELA: ${selectedWeek.fullTitle}`;
  }

  updateRoteiroButtons(selectedWeek);

  if (!options.preserveScroll) {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }
}

function getRoteiroExtras(week) {
  return Array.isArray(week.roteiroExtras) ? week.roteiroExtras : [];
}

function getRoteiroSuffix(week, roteiroKey) {
  const extras = getRoteiroExtras(week);
  return roteiroKey && extras.includes(roteiroKey) ? `${week.legacyWeek}_${roteiroKey}` : `${week.legacyWeek}`;
}

function getPrecesSuffix(week, precesKey) {
  const extras = Array.isArray(week.precesExtras) ? week.precesExtras : [];
  return precesKey && extras.includes(precesKey) ? `${week.legacyWeek}_${precesKey}` : `${week.legacyWeek}`;
}

function updateRoteiroButtons(week) {
  const documents = getRoteirosData();
  const mainButton = document.getElementById('btn-roteiro-principal');
  if (mainButton) {
    mainButton.textContent = week.roteiroLabel || '📖 Roteiro';
    mainButton.hidden = !documents[`roteiro_${week.legacyWeek}`];
  }
  const precesButton = document.getElementById('btn-preces-principal');
  if (precesButton) {
    precesButton.hidden = !documents[`preces_${week.legacyWeek}`];
  }
  const reflexoesButton = document.getElementById('btn-reflexoes');
  if (reflexoesButton) {
    reflexoesButton.hidden = !documents[`reflexoes_${week.legacyWeek}`];
  }

  [['roteiro', getRoteiroExtras(week)], ['preces', Array.isArray(week.precesExtras) ? week.precesExtras : []]]
    .forEach(([type, extras]) => {
      const container = document.getElementById(`toolbar-${type}-extras`);
      if (!container) return;
      container.textContent = '';
      extras.forEach((key) => {
        const doc = documents[`${type}_${week.legacyWeek}_${key}`];
        if (!doc) return;
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'action-btn';
        button.dataset.action = `open-active-${type}`;
        button.dataset[`${type}Key`] = key;
        button.textContent = doc.botao || doc.titulo;
        container.appendChild(button);
      });
    });
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
  setTimeout(() => resumeUpdate(), 0);
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
  cloned.querySelectorAll('[data-date]').forEach((day) => {
    const sourceId = `dia-${day.dataset.date}`;
    day.id = `programacao-${sourceId}`;
    cloned.querySelectorAll(`a[href="#${sourceId}"]`).forEach((link) => {
      link.setAttribute('href', `#${day.id}`);
    });
  });

  contentDiv.textContent = '';
  contentDiv.appendChild(cloned);
  openModal('modal_programacao', trigger);
}

function openDocumentModal(id, trigger, label) {
  if (!document.getElementById(id)) {
    showMessageModal(`${label} ainda não disponível para esta semana. Verifique a atualização do aplicativo.`, trigger, 'Conteúdo indisponível');
    return;
  }
  openModal(id, trigger);
}

function openActiveRoteiroModal(trigger) {
  const week = getCurrentWeek();
  if (!week) return;
  openDocumentModal(`modal_roteiro_${getRoteiroSuffix(week, trigger && trigger.dataset.roteiroKey)}`, trigger, 'Roteiro');
}

function openActivePrecesModal(trigger) {
  const week = getCurrentWeek();
  if (!week) return;
  openDocumentModal(`modal_preces_${getPrecesSuffix(week, trigger && trigger.dataset.precesKey)}`, trigger, 'Formulário de preces');
}

function openActiveReflexoesModal(trigger) {
  const week = getCurrentWeek();
  if (!week) return;
  openDocumentModal(`modal_reflexoes_${week.legacyWeek}`, trigger, 'Reflexão');
}

function getActiveLeiturasBlock() {
  const week = getCurrentWeek();
  return week ? document.getElementById(`leituras_semana_${week.legacyWeek}`) : null;
}

function openActiveLeiturasModal(trigger) {
  const week = getCurrentWeek();
  if (!week) return;

  document.querySelectorAll('.leituras-bloco').forEach((block) => {
    block.hidden = true;
  });
  selectAllReadings(false);

  const activeBlock = getActiveLeiturasBlock();
  if (!activeBlock || !activeBlock.querySelector('.reading-checkbox')) {
    showMessageModal(
      `Não há opções de leituras para a semana ${week.id} (bloco leituras_semana_${week.legacyWeek} ausente ou vazio). Verifique a atualização do aplicativo e os dados desta semana.`,
      trigger,
      'Leituras indisponíveis'
    );
    return;
  }
  activeBlock.hidden = false;

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
  getActiveLeiturasBlock()?.querySelectorAll('.reading-checkbox').forEach((checkbox) => {
    checkbox.checked = Boolean(check);
  });
}

function buildReferenceNode(reference, prefix = null) {
  if (!reference) {
    return null;
  }

  const line = document.createElement('div');
  line.style.margin = '4px 0 8px 0';
  line.style.fontSize = '0.95em';
  line.style.color = '#475569';

  if (prefix) {
    const strong = document.createElement('strong');
    strong.textContent = `${prefix} `;
    line.appendChild(strong);
  }

  const small = document.createElement('small');
  small.textContent = reference;
  line.appendChild(small);
  return line;
}

function buildAntifonaTextNode(text) {
  const block = document.createElement('div');
  block.style.margin = '0';
  block.appendChild(createReadingParagraphs(text || ''));
  return block;
}

function createAntifonaBlock(typeKey) {
  const antifona = getAntifonasData()[typeKey];
  if (!antifona) {
    const fallback = document.createElement('div');
    fallback.className = 'antifona-print-box';
    fallback.style.marginBottom = '15px';
    fallback.style.border = '1px solid #ccc';
    fallback.style.padding = '15px';
    fallback.style.lineHeight = '1.5';
    fallback.style.fontFamily = "'Georgia',serif";
    fallback.style.pageBreakInside = 'avoid';

    const title = document.createElement('h3');
    title.style.margin = '0 0 10px 0';
    title.style.color = '#1a365d';
    title.style.borderBottom = '1px solid #1a365d';
    title.style.paddingBottom = '5px';
    title.style.textTransform = 'uppercase';
    title.textContent = 'Antífonas e citações indisponíveis';
    fallback.appendChild(title);

    const message = document.createElement('p');
    message.textContent = 'Este conteúdo ainda não está disponível no cache atual. Recarregue a página com conexão para concluir a atualização dos dados desta semana.';
    fallback.appendChild(message);

    return fallback;
  }

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

  const hasCitations = Array.isArray(antifona.citations) && antifona.citations.length > 0;

  antifona.items.forEach((item, idx) => {
    const section = document.createElement('section');
    section.style.margin = idx === antifona.items.length - 1 && !hasCitations ? '0' : '0 0 16px 0';
    const strong = document.createElement('strong');
    strong.textContent = item.label;
    section.appendChild(strong);

    if (Array.isArray(item.options) && item.options.length > 0) {
      item.options.forEach((option, optionIndex) => {
        const referenceNode = buildReferenceNode(option.reference, optionIndex === 0 ? null : 'Ou:');
        if (referenceNode) {
          section.appendChild(referenceNode);
        }
        section.appendChild(buildAntifonaTextNode(option.text));
      });
    } else {
      const referenceNode = buildReferenceNode(item.reference);
      if (referenceNode) {
        section.appendChild(referenceNode);
      }
      section.appendChild(buildAntifonaTextNode(item.text));
    }

    wrap.appendChild(section);
  });

  if (hasCitations) {
    const citationsTitle = document.createElement('h4');
    citationsTitle.style.margin = '10px 0';
    citationsTitle.style.color = '#1a365d';
    citationsTitle.style.textTransform = 'uppercase';
    citationsTitle.textContent = 'Citações para a transmissão';
    wrap.appendChild(citationsTitle);

    antifona.citations.forEach((citation, idx) => {
      const citationWrap = document.createElement('div');
      citationWrap.style.margin = idx === antifona.citations.length - 1 ? '0' : '0 0 10px 0';

      const citationLabel = document.createElement('strong');
      citationLabel.textContent = citation.label;
      citationWrap.appendChild(citationLabel);
      citationWrap.appendChild(buildAntifonaTextNode(citation.text));
      wrap.appendChild(citationWrap);
    });
  }

  return wrap;
}

function previewSelectedReadings() {
  if (typeof window.readingsData === 'undefined') {
    showMessageModal('Aguarde o carregamento do arquivo de leituras.', document.activeElement, 'Aguarde');
    return;
  }

  const selected = Array.from(getActiveLeiturasBlock()?.querySelectorAll('.reading-checkbox:checked') || []).map((checkbox) => checkbox.value);
  lastSelectedReadings = selected;
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
  printing = true;
  document.querySelectorAll('.modal').forEach((modal) => {
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
  });
  document.body.style.overflow = 'visible';

  const mount = document.getElementById('print-mount');
  if (!mount) { printing = false; return; }

  mount.textContent = '';
  mount.hidden = false;
  mount.appendChild(nodeBuilder());

  let cleanedUp = false;
  const cleanup = () => {
    if (cleanedUp) return;
    cleanedUp = true;
    mount.textContent = '';
    mount.hidden = true;
    printing = false;
    resumeUpdate();
  };

  window.addEventListener('afterprint', cleanup, { once: true });
  setTimeout(() => {
    try {
      window.print();
    } catch (error) {
      cleanup();
    }
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

function printActiveRoteiro(roteiroKey) {
  const week = getCurrentWeek();
  if (!week) return;

  const suffix = getRoteiroSuffix(week, roteiroKey);
  const content = document.getElementById(`content_roteiro_${suffix}`);
  if (!content) return;
  const title = getRoteirosData()[`roteiro_${suffix}`]?.titulo || `Roteiro Litúrgico — ${week.shortTitle}`;

  runPrintMount(() => {
    const wrapper = document.createElement('div');
    wrapper.style.padding = '0.5cm';
    wrapper.appendChild(buildHeaderNode(title));
    wrapper.appendChild(content.cloneNode(true));
    return wrapper;
  });
}

function printActivePreces(precesKey) {
  const week = getCurrentWeek();
  if (!week) return;

  const suffix = getPrecesSuffix(week, precesKey);
  const content = document.getElementById(`content_preces_${suffix}`);
  if (!content) return;
  // Cada formulário (horário) é impresso em uma página própria.
  const forms = Array.from(content.querySelectorAll('[data-preces-form]'));
  const blocks = forms.length ? forms : [content];

  runPrintMount(() => {
    const wrapper = document.createElement('div');
    const title = getRoteirosData()[`preces_${suffix}`]?.titulo || `Oração dos Fiéis — ${week.shortTitle}`;
    blocks.forEach((block, index) => {
      const page = document.createElement('div');
      if (index < blocks.length - 1) page.style.pageBreakAfter = 'always';
      page.appendChild(buildHeaderNode(title));
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
  const status = document.getElementById('update-status');
  const button = document.getElementById('check-update');
  const setStatus = (text, state = 'ready') => {
    status.textContent = text;
    status.dataset.state = state;
  };
  if (!('serviceWorker' in navigator)) {
    setStatus('Atualização automática indisponível neste navegador', 'error');
    button.addEventListener('click', () => window.location.reload());
    return;
  }
  const localVersion = document.querySelector('meta[name="app-version"]')?.content;
  const contextSafe = () => !printing &&
    !Array.from(document.querySelectorAll('.modal')).some((modal) => !modal.hidden);
  const safe = () => contextSafe() && document.visibilityState === 'visible';
  let registration;
  let pending;
  let checking = false;
  let activating = false;
  let activatedVersion;
  let refreshing = false;
  const reloadSafely = () => {
    if (!activatedVersion || activatedVersion === localVersion || refreshing) return;
    if (!safe()) { setStatus('Atualização pronta — será aplicada ao fechar o conteúdo', 'pending'); return; }
    try {
      sessionStorage.setItem('roteiro-update-state', JSON.stringify({
        week: currentWeekId, fonts: fontSizes, scroll: window.scrollY,
        focus: document.activeElement && document.activeElement.id,
        focusAction: document.activeElement?.dataset.action,
        readings: Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
          .map((input) => input.value)
      }));
    } catch (error) {
      setStatus('Permita o armazenamento para preservar sua seleção ao atualizar', 'error');
      return;
    }
    refreshing = true;
    window.location.reload();
  };
  const send = (worker, message) => new Promise((resolve, reject) => {
    const channel = new MessageChannel();
    const timer = setTimeout(() => {
      channel.port1.close();
      reject(new Error('Tempo limite da atualização'));
    }, 240000);
    channel.port1.onmessage = (event) => {
      clearTimeout(timer);
      channel.port1.close();
      if (event.data.error) reject(new Error(event.data.error));
      else resolve(event.data);
    };
    worker.postMessage(message, [channel.port2]);
  });
  const identify = () => {
    navigator.serviceWorker.controller?.postMessage({ type: 'CLIENT_VERSION', version: localVersion });
  };
  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data.type === 'CHECK_UPDATE_SAFE') {
      event.ports[0]?.postMessage(contextSafe());
    } else if (event.data.type === 'VERSION_ACTIVATED') {
      activatedVersion = event.data.version;
      reloadSafely();
    }
  });
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    identify();
    check();
  });
  const applyPending = async () => {
    reloadSafely();
    if (!pending || activating || refreshing) return;
    if (!safe()) {
      setStatus('Atualização pronta — será aplicada ao fechar o conteúdo', 'pending');
      return;
    }
    activating = true;
    try {
      const result = await send(pending.worker, {
        type: 'ACTIVATE_UPDATE', version: pending.version,
        waiting: registration.waiting === pending.worker
      });
      if (result.deferred) {
        setStatus('Atualização pronta — aguardando outras janelas do aplicativo', 'pending');
      } else if (result.activating) {
        setStatus('Atualizando — ativando versão validada', 'updating');
        pending = null;
      } else {
        activatedVersion = pending.version;
        pending = null;
        reloadSafely();
      }
    } catch (error) {
      setStatus('Não foi possível atualizar — versão anterior preservada', 'error');
    } finally {
      activating = false;
    }
  };
  resumeUpdate = applyPending;
  const check = async () => {
    if (checking || refreshing) return;
    if (!navigator.onLine) {
      setStatus('Sem internet — usando conteúdo salvo', 'offline');
      return;
    }
    checking = true;
    button.disabled = true;
    setStatus('Atualizando — verificando arquivos', 'updating');
    try {
      if (!registration) {
        registration = await navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' });
        identify();
      }
      await registration.update();
      if (registration.installing) {
        await new Promise((resolve, reject) => {
          const worker = registration.installing;
          worker.addEventListener('statechange', () => {
            if (worker.state === 'installed' || worker.state === 'activated') resolve();
            if (worker.state === 'redundant') reject(new Error('Instalação incompleta'));
          });
        });
      }
      const worker = registration.waiting || registration.active;
      if (!worker) throw new Error('Atualização indisponível');
      const { metadata } = await send(worker, { type: 'PREPARE_UPDATE' });
      if (metadata.version !== localVersion || registration.waiting) {
        pending = { worker, version: metadata.version };
        await applyPending();
      } else {
        setStatus('Atualizado');
      }
    } catch (error) {
      setStatus(navigator.onLine ? 'Não foi possível atualizar — usando conteúdo salvo' :
        'Sem internet — usando conteúdo salvo', navigator.onLine ? 'error' : 'offline');
    } finally {
      checking = false;
      button.disabled = false;
    }
  };
  button.addEventListener('click', check);
  window.addEventListener('beforeprint', () => { printing = true; });
  window.addEventListener('afterprint', () => {
    printing = false;
    setTimeout(() => resumeUpdate(), 0);
  });
  window.addEventListener('offline', () => setStatus('Sem internet — usando conteúdo salvo', 'offline'));
  window.addEventListener('online', check);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') { applyPending(); check(); }
  });
  setInterval(() => {
    if (document.visibilityState === 'visible') { applyPending(); check(); }
  }, 5 * 60 * 1000);
  check();
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
      printActiveRoteiro(target.dataset.roteiroKey);
      break;
    case 'print-active-preces':
      printActivePreces(target.dataset.precesKey);
      break;
    case 'print-active-reflexoes':
      printActiveReflexoes();
      break;
    case 'print-leituras-view':
      printLeiturasFromView();
      break;
    case 'share-programacao-geral':
      if (getCurrentWeek()) window.Compartilhar?.programacao(getCurrentWeek().id, target);
      break;
    case 'share-active-roteiro':
      if (getCurrentWeek()) window.Compartilhar?.roteiro(`roteiro_${getRoteiroSuffix(getCurrentWeek(), target.dataset.roteiroKey)}`, target);
      break;
    case 'share-active-preces':
      if (getCurrentWeek()) window.Compartilhar?.roteiro(`preces_${getPrecesSuffix(getCurrentWeek(), target.dataset.precesKey)}`, target);
      break;
    case 'share-leituras-view':
      window.Compartilhar?.leituras(lastSelectedReadings,
        `Leituras — ${getCurrentWeek() ? getCurrentWeek().shortTitle : 'Selecionadas'}`, target);
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
  renderDocumentModals();
  renderLeiturasBlocks();
  initializeModalLabels();

  const weeks = getWeeks();
  if (weeks.length > 0) {
    const selected = weeks.find((week) => week.id === savedUpdateState?.week) || getDefaultWeek(weeks);
    showWeek(selected.id, { preserveScroll: Boolean(savedUpdateState) });
    if (savedUpdateState) {
      Object.entries(savedUpdateState.fonts || {}).forEach(([id, size]) => {
        if (typeof size !== 'number' || size < 8 || size > 28) return;
        fontSizes[id] = size;
        const element = document.getElementById(id);
        if (element) element.style.fontSize = `${size}pt`;
      });
      document.getElementById(savedUpdateState.focus)?.focus({ preventScroll: true });
      if (!savedUpdateState.focus && savedUpdateState.focusAction) {
        Array.from(document.querySelectorAll('[data-action]'))
          .find((element) => element.dataset.action === savedUpdateState.focusAction && !element.hidden)
          ?.focus({ preventScroll: true });
      }
      document.querySelectorAll('input[type="checkbox"]').forEach((input) => {
        input.checked = (savedUpdateState.readings || []).includes(input.value);
      });
      requestAnimationFrame(() => window.scrollTo({ top: savedUpdateState.scroll || 0, behavior: 'instant' }));
    }
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

    if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) {
      const activeElement = document.activeElement;
      if (!activeElement || activeElement.getAttribute('role') !== 'tab') {
        return;
      }

      const weeks = getWeeks();
      const index = weeks.findIndex((week) => week.id === activeElement.dataset.weekId);
      if (index < 0) return;

      const delta = event.key === 'ArrowRight' ? 1 : -1;
      const nextIndex = event.key === 'Home' ? 0
        : event.key === 'End' ? weeks.length - 1
          : (index + delta + weeks.length) % weeks.length;
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
window.getDefaultWeek = getDefaultWeek;
