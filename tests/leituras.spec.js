const { test, expect } = require('@playwright/test');

const selector = '#modal_seletor_leituras';
const view = '#content_leituras_view';

async function openWeek(page, week) {
  await page.locator(`#btn-tab-${week}`).click();
  await page.locator('[data-action="open-active-leituras"]').click();
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('header hides redundant details and uses a compact logo', async ({ page }) => {
  const styles = await page.evaluate(() => ({
    logoMaxWidth: getComputedStyle(document.querySelector('#header-logo')).maxWidth,
    subtitleDisplay: getComputedStyle(document.querySelector('#header-subtitle')).display,
    badgeDisplay: getComputedStyle(document.querySelector('.version-badge')).display
  }));

  expect(styles).toEqual({
    logoMaxWidth: '120px',
    subtitleDisplay: 'none',
    badgeDisplay: 'none'
  });
});

test('October 5–11 week is removed while the remaining weeks still load', async ({ page }) => {
  const state = await page.evaluate(() => ({
    weekIds: window.programacaoData.weeks.map(week => week.id),
    staleElements: [
      'btn-tab-2026-10-05',
      'week-panel-2026-10-05',
      'leituras_semana_4',
      'modal_reflexoes_4',
      'modal_roteiro_4',
      'modal_preces_4'
    ].filter(id => document.getElementById(id)),
    staleReadingKeys: Object.keys(window.readingsData).filter(key => key.endsWith('_w5')),
    staleAntiphon: Boolean(window.antifonasData.antifonas_4),
    staleText: /05 a 11|05\/10|10 e 11\/10|28º DOMINGO/i.test(document.body.textContent),
    currentWeek: document.querySelector('.week-tab-btn.active')?.dataset.weekId
  }));

  expect(state).toEqual({
    weekIds: ['2026-10-12', '2026-10-19'],
    staleElements: [],
    staleReadingKeys: [],
    staleAntiphon: false,
    staleText: false,
    currentWeek: '2026-10-12'
  });

  await page.locator('#btn-tab-2026-10-19').click();
  await expect(page.locator('#week-panel-2026-10-19')).toBeVisible();
});

test('October 19–25 schedule matches the updated PDF on the page and in the modal', async ({ page }) => {
  await page.locator('#btn-tab-2026-10-19').click();

  const parish = 'Paróquia Nossa Senhora Auxiliadora';
  const expectedRows = [
    ['Segunda 19h00', parish, 'Pe. Laurindo'],
    ['Terça 19h00', parish, 'Pe. Manuel'],
    ['Quarta 19h00', parish, 'Pe. Heriberto'],
    ['Quinta 19h00', parish, 'Pe. Afonso'],
    ['Sexta 19h00', parish, 'Pe. Heriberto'],
    ['Sábado 18h30', parish, 'Pe. Heriberto'],
    ['Sábado 19h00', 'Capela São Domingos Sávio', 'Pe. Djhon'],
    ['Domingo 09h00', parish, 'Pe. Heriberto'],
    ['Domingo 11h00', parish, 'Pe. Heriberto'],
    ['Domingo 18h30', parish, 'Pe. Heriberto']
  ];
  const readRows = (locator) => locator.locator('.escala-table tr').evaluateAll(rows =>
    rows.map(row => Array.from(row.cells, cell => cell.textContent.trim()))
  );

  await expect(page.locator('#week-panel-2026-10-19')).toBeVisible();
  expect(await readRows(page.locator('#week-panel-2026-10-19'))).toEqual(expectedRows);

  await page.locator('[data-action="open-active-programacao"]').click();
  await expect(page.locator('#modal_programacao')).toBeVisible();
  expect(await readRows(page.locator('#content_programacao'))).toEqual(expectedRows);
});

test('remaining Sunday roteiros are present and week 30 opens its roteiro', async ({ page }) => {
  const structure = await page.evaluate(() => {
    const roteiroModals = [
      ['modal_roteiro_2', 'content_roteiro_2', '26º DOMINGO'],
      ['modal_roteiro_3', 'content_roteiro_3', '27º DOMINGO'],
      ['modal_roteiro_5_aparecida', 'content_roteiro_5_aparecida', 'NOSSA SENHORA APARECIDA'],
      ['modal_roteiro_5', 'content_roteiro_5', '29º DOMINGO'],
      ['modal_roteiro_6', 'content_roteiro_6', '30º DOMINGO']
    ];
    const modals = roteiroModals.map(([modalId, contentId, title]) => {
      const modal = document.getElementById(modalId);
      const content = document.getElementById(contentId);
      return Boolean(modal && content && content.textContent.trim()
        && modal.textContent.includes(title)
        && modal.querySelector(`[data-modal-id="${modalId}"]`));
    });
    const week = window.programacaoData.weeks.find(item => item.id === '2026-10-19');
    return { modals, legacyWeek: week?.legacyWeek };
  });

  expect(structure).toEqual({ modals: [true, true, true, true, true], legacyWeek: 6 });

  await page.locator('#btn-tab-2026-10-19').click();
  await page.locator('#btn-roteiro-principal').click();
  await expect(page.locator('#modal_roteiro_6')).toBeVisible();
  await expect(page.locator('#content_roteiro_6'))
    .toContainText('30º Domingo do Tempo Comum — 24 e 25 de outubro de 2026');
});

test('reading blocks are siblings with unique IDs and effectively visible daily groups', async ({ page }) => {
  const structure = await page.evaluate(() => {
    const blocks = [...document.querySelectorAll('.leituras-bloco')];
    const ids = [...document.querySelectorAll('[id]')].map(node => node.id);
    const parent = document.querySelector('#modal_seletor_leituras > .modal-content');
    return {
      siblings: blocks.every(block => block.parentElement === parent),
      nested: blocks.some(block => block.parentElement.closest('.leituras-bloco')),
      duplicateIds: ids.filter((id, index) => ids.indexOf(id) !== index),
      legacyWeek: window.programacaoData.weeks.find(week => week.id === '2026-10-19').legacyWeek
    };
  });
  expect(structure).toEqual({ siblings: true, nested: false, duplicateIds: [], legacyWeek: 6 });

  for (const [week, legacy, count] of [
    ['2026-10-19', 6, 20],
    ['2026-10-12', 5, 22],
    ['2026-10-19', 6, 20],
    ['2026-10-12', 5, 22]
  ]) {
    await openWeek(page, week);
    const block = page.locator(`#leituras_semana_${legacy}`);
    await expect(block.locator('.leitura-col')).toHaveCount(6);
    for (const group of await block.locator('.leitura-col').all()) {
      await expect(group).toBeVisible();
    }
    await expect(page.locator(`${selector} .reading-checkbox:visible`)).toHaveCount(count);
    await expect(page.locator(`${selector} .leituras-bloco:visible`)).toHaveCount(1);
    await page.locator(`${selector} [data-action="close-modal"]`).click();
  }
});

test('select all, deselect and preview exclude checked boxes from inactive weeks', async ({ page }) => {
  await openWeek(page, '2026-10-12');
  await page.getByRole('button', { name: 'Marcar Todas', exact: true }).click();
  await expect(page.locator('#leituras_semana_5 input:checked')).toHaveCount(22);
  await expect(page.locator('.reading-checkbox:checked')).toHaveCount(22);
  await page.locator(`${selector} [data-action="close-modal"]`).click();

  await openWeek(page, '2026-10-19');
  await page.getByRole('button', { name: 'Marcar Todas', exact: true }).click();
  await expect(page.locator('#leituras_semana_6 input:checked')).toHaveCount(20);
  await expect(page.locator('#leituras_semana_5 input:checked')).toHaveCount(22);
  await expect(page.locator('#leituras_semana_3 input:checked')).toHaveCount(0);
  await page.getByRole('button', { name: 'Desmarcar Todas', exact: true }).click();
  await expect(page.locator('#leituras_semana_6 input:checked')).toHaveCount(0);
  await expect(page.locator('#leituras_semana_5 input:checked')).toHaveCount(22);
  await page.getByRole('button', { name: 'Marcar Todas', exact: true }).click();
  await page.locator('[data-action="preview-selected-readings"]').click();
  await expect(page.locator(`${view} .reading-print-block`)).toHaveCount(19);
  await expect(page.locator(`${view} .antifona-print-box`)).toHaveCount(1);
  const texts = await page.evaluate(() =>
    [...document.querySelectorAll('#leituras_semana_6 input')].map(input =>
      window.readingsData[input.value]?.text).filter(Boolean));
  const renderedTexts = await page.locator(`${view} .leitura-texto`).allInnerTexts();
  const normalize = text => text.replace(/\s+/g, ' ').trim();
  expect(renderedTexts.map(normalize)).toEqual(texts.map(normalize));
  await expect(page.locator(view)).toContainText('Cf. Sl 104,3-4');
  const inactiveTitle = await page.evaluate(() => window.readingsData['1l_seg_w6'].title);
  await expect(page.locator(view)).not.toContainText(inactiveTitle);
});

test('individual readings and antiphons reach a nonempty A4 print document', async ({ page }) => {
  for (const [week, legacy, suffix] of [
    ['2026-10-19', 6, 7], ['2026-10-12', 5, 6],
    ['2026-10-19', 6, 7], ['2026-10-12', 5, 6]
  ]) {
    await openWeek(page, week);
    const keys = [`1l_seg_w${suffix}`, `ev_sex_w${suffix}`, `ev_dom_w${suffix}`, `antifonas_${suffix}`];
    for (const key of keys) {
      await page.locator(`#leituras_semana_${legacy} input[value="${key}"]`).check();
    }
    await page.locator('[data-action="preview-selected-readings"]').click();
    await expect(page.locator('#modal_leituras_view')).toBeVisible();
    await expect(page.locator(`${view} .reading-print-block`)).toHaveCount(3);
    await expect(page.locator(`${view} .antifona-print-box`)).toHaveCount(1);
    const previewText = await page.locator(view).textContent();
    expect(previewText.length).toBeGreaterThan(1000);

    // Retain the mount while checking print media; PDF generation exercises Chromium's print lifecycle.
    await page.evaluate(() => {
      window.printRequested = false;
      window.print = () => {
        window.dispatchEvent(new Event('beforeprint'));
        window.printRequested = true;
      };
    });
    await page.locator('[data-action="print-leituras-view"]').click();
    await expect.poll(() => page.evaluate(() => window.printRequested)).toBe(true);
    await expect(page.locator('#print-mount .reading-print-block')).toHaveCount(3);
    await expect(page.locator('#print-mount .antifona-print-box')).toHaveCount(1);
    await expect(page.locator('#print-mount')).toContainText(previewText.replace(/\s+/g, ' '));
    await page.emulateMedia({ media: 'print' });
    await expect(page.locator('#print-mount')).toBeVisible();
    for (const block of await page.locator('#print-mount .reading-print-block, #print-mount .antifona-print-box').all()) {
      await expect(block).toBeVisible();
    }
    await expect(page.locator('.toolbar')).toBeHidden();
    const pdf = await page.pdf({ preferCSSPageSize: true });
    expect(pdf.subarray(0, 5).toString()).toBe('%PDF-');
    expect(pdf.length).toBeGreaterThan(10000);
    await expect(page.locator('#print-mount')).toBeEmpty();
    await page.emulateMedia({ media: 'screen' });
    await expect(page.locator('#print-mount')).toBeHidden();
  }
});

test('native window.print receives the mounted content before PDF cleanup', async ({ page }) => {
  await openWeek(page, '2026-10-19');
  await page.locator('input[value="1l_seg_w7"]').check();
  await page.locator('input[value="antifonas_7"]').check();
  await page.locator('[data-action="preview-selected-readings"]').click();
  const previewText = await page.locator(view).textContent();
  await page.evaluate(() => {
    window.addEventListener('beforeprint', () => {
      window.nativePrintText = document.getElementById('print-mount').textContent;
    });
  });
  await page.locator('[data-action="print-leituras-view"]').click();
  await expect.poll(() => page.evaluate(() => window.nativePrintText || ''))
    .toContain(previewText);
  await expect(page.locator('#print-mount .leitura-texto')).toHaveCount(1);
  await expect(page.locator('#print-mount .antifona-print-box')).toHaveCount(1);
  const pdf = await page.pdf({ preferCSSPageSize: true });
  expect(pdf.length).toBeGreaterThan(10000);
  await expect(page.locator('#print-mount')).toBeEmpty();
});

for (const problem of ['missing', 'empty']) {
  test(`a ${problem} active block produces a useful diagnostic instead of an empty selector`, async ({ page }) => {
    await page.locator('#btn-tab-2026-10-19').click();
    await page.locator('#leituras_semana_6').evaluate((block, problem) => {
      if (problem === 'missing') block.remove();
      else block.replaceChildren();
    }, problem);
    await page.locator('[data-action="open-active-leituras"]').click();
    await expect(page.locator(selector)).toBeHidden();
    await expect(page.locator('#generalModal')).toBeVisible();
    await expect(page.locator('#modalBody')).toContainText('2026-10-19');
    await expect(page.locator('#modalBody')).toContainText('leituras_semana_6');
  });
}
