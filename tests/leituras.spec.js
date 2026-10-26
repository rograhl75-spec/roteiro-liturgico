const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { assets } = require('../build-version.js');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('the removed October week has no tab, content, or associated reading data', async ({ page }) => {
  const state = await page.evaluate(() => ({
    weekIds: window.programacaoData.weeks.map(week => week.id),
    currentWeek: document.querySelector('.week-tab-btn.active')?.dataset.weekId,
    staleIds: [
      'btn-tab-2026-10-19',
      'week-panel-2026-10-19',
      'leituras_semana_3',
      'leituras_semana_6',
      'modal_roteiro_2',
      'modal_roteiro_3',
      'modal_preces_3',
      'modal_reflexoes_3',
      'modal_roteiro_6',
      'modal_preces_6',
      'modal_reflexoes_6'
    ].filter(id => document.getElementById(id)),
    staleReadingKeys: Object.keys(window.readingsData).filter(key => !/^s[89]_/.test(key)),
    staleAntiphons: Object.keys(window.antifonasData).some(key => !/^antifonas_[89](?:_|$)/.test(key)),
    staleText: /19 a 25 de outubro|19\/10|20\/10|21\/10|22\/10|23\/10|24\/10|25\/10|30º Domingo/i.test(document.body.textContent),
    brokenTabRefs: [...document.querySelectorAll('.week-tab-btn[aria-controls]')]
      .filter(tab => !document.getElementById(tab.getAttribute('aria-controls'))).map(tab => tab.id),
    brokenCloseRefs: [...document.querySelectorAll('.modal-close-btn[data-modal-id]')]
      .filter(button => !document.getElementById(button.dataset.modalId)).map(button => button.dataset.modalId),
    duplicateIds: [...document.querySelectorAll('[id]')].map(element => element.id)
      .filter((id, index, ids) => ids.indexOf(id) !== index)
  }));

  expect(state).toEqual({
    weekIds: ['2026-10-26', '2026-11-02'],
    currentWeek: '2026-10-26',
    staleIds: [],
    staleReadingKeys: [],
    staleAntiphons: false,
    staleText: false,
    brokenTabRefs: [],
    brokenCloseRefs: [],
    duplicateIds: []
  });
});

test('October 28 celebration is assigned to Pe. Romão', async ({ page }) => {
  const day = page.locator('#week-panel-2026-10-26 [data-date="2026-10-28"]');
  await expect(day.locator('.p-cel')).toHaveText('Pe. Romão');
});

test('November 2–8 supplied materials replace the placeholder', async ({ page }) => {
  await page.locator('#btn-tab-2026-11-02').click();
  const week = page.locator('#week-panel-2026-11-02');
  await expect(week.locator('[data-date]')).toHaveCount(7);
  await expect(week).not.toContainText('serão adicionadas quando forem fornecidas');
  await expect(page.locator('#leituras_semana_8 .reading-checkbox')).toHaveCount(29);

  await page.locator('#btn-roteiro-principal').click();
  await expect(page.locator('#content_roteiro_8')).toContainText('32º Domingo do Tempo Comum');
  await expect(page.locator('#content_roteiro_8')).toContainText('TOMAI, TODOS');
  await page.locator('#modal_roteiro_8 [data-action="close-modal"]').click();

  await page.locator('.toolbar [data-action="open-active-preces"]:not([data-preces-key])').click();
  await expect(page.locator('#content_preces_8 h4')).toHaveCount(3);
  await expect(page.locator('#content_preces_8')).toContainText('Ouvi-nos, Senhor e atendei-nos!');
  await page.locator('#modal_preces_8 [data-action="close-modal"]').click();

  await page.locator('[data-action="open-active-reflexoes"]').click();
  await expect(page.locator('#content_reflexoes_8')).toBeEmpty();
});

for (const viewport of [{ width: 1280, height: 900 }, { width: 390, height: 844 }]) {
  test(`extra celebration modals and printing follow the selected week at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    for (const [weekId, legacyWeek, key, text] of [
      ['2026-10-26', 7, 'simao_judas', 'Senhor, enviai operários para a vossa messe!'],
      ['2026-11-02', 8, 'defuntos', 'Senhor, sois nossa vida e ressurreição!']
    ]) {
      await page.locator(`#btn-tab-${weekId}`).click();
      const other = key === 'defuntos' ? 'simao_judas' : 'defuntos';
      for (const type of ['roteiro', 'preces']) {
        const button = page.locator(`.toolbar [data-${type}-key="${key}"]`);
        await expect(button).toBeVisible();
        await expect(page.locator(`.toolbar [data-${type}-key="${other}"]`)).toBeHidden();
        await button.click();
        const modal = page.locator(`#modal_${type}_${legacyWeek}_${key}`);
        const content = modal.locator(`#content_${type}_${legacyWeek}_${key}`);
        await expect(modal).toBeVisible();
        if (type === 'preces') await expect(content).toContainText(text);
        else await expect(content).toContainText('TOMAI, TODOS');
        const size = modal.locator('[data-action="text-size"][data-step="1"]');
        await size.click();
        await expect(content.locator('.script-text').first()).toHaveCSS('font-size', '18px');
        await page.evaluate(() => { window.print = () => {}; });
        await modal.locator(`[data-action="print-active-${type}"]`).click();
        const mount = page.locator('#print-mount');
        await expect(mount).toBeVisible();
        await expect(mount).toContainText(type === 'preces' ? text : 'TOMAI, TODOS');
        const pdf = await page.pdf({ preferCSSPageSize: true });
        expect(pdf.length).toBeGreaterThan(10000);
        await page.evaluate(() => window.dispatchEvent(new Event('afterprint')));
        await expect(mount).toBeHidden();
      }
    }
  });
}

test('November daily readings, celebrations and antiphons are selectable', async ({ page }) => {
  await page.locator('#btn-tab-2026-11-02').click();
  const week = page.locator('#week-panel-2026-11-02');
  for (let day = 2; day <= 8; day++) {
    const date = `2026-11-0${day}`;
    await week.locator(`a[href="#dia-${date}"]`).click();
    await expect(week.locator(`[data-date="${date}"]`)).toBeInViewport();
  }
  await expect(week).toContainText('São Carlos Borromeu');
  await expect(week).toContainText('05h30');
  await expect(week).toContainText('12h00');
  await expect(week).toContainText('19h30');
  for (const reading of await week.locator('[data-action="open-reading"]').all()) {
    await reading.click();
    await expect(page.locator('#generalModal')).toBeVisible();
    expect((await page.locator('#modalBody').innerText()).length).toBeGreaterThan(50);
    await page.locator('#generalModal [data-action="close-modal"]').click();
  }
  await page.locator('[data-action="open-active-leituras"]').click();
  await page.getByRole('button', { name: 'Marcar Todas', exact: true }).click();
  await page.locator('[data-action="preview-selected-readings"]').click();
  await expect(page.locator('#content_leituras_view .reading-print-block')).toHaveCount(27);
  await expect(page.locator('#content_leituras_view .antifona-print-box')).toHaveCount(2);
});

test('published assets use only current sources and matching integrity hashes', async ({ page }) => {
  const root = path.join(__dirname, '..');
  const metadata = JSON.parse(fs.readFileSync(path.join(root, 'version.json'), 'utf8'));
  const correctMissal = 'Missal - 2 a 8 novembro_2026.xlsx';
  const incorrectMissal = correctMissal.replace('_2026', ' 2026');
  expect(fs.existsSync(path.join(root, incorrectMissal))).toBe(false);
  expect(assets).toContain(correctMissal);
  expect(Object.keys(metadata.files)).toEqual(assets.map(file => `./${file}`));
  for (const file of assets) {
    expect(createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex'))
      .toBe(metadata.files[`./${file}`]);
  }
  const sourceFiles = fs.readdirSync(root).filter(file => /\.(pdf|docx|xlsx)$/i.test(file));
  expect(sourceFiles.filter(file => !assets.includes(file))).toEqual([]);
  const workflow = fs.readFileSync(path.join(root, '.github/workflows/pages.yml'), 'utf8');
  expect(workflow).toContain('cp -- *.pdf *.docx *.xlsx _site/');
  const refs = await page.locator('#weeks-root a[href^="./"]').evaluateAll(links =>
    links.map(link => decodeURIComponent(link.getAttribute('href')).slice(2)));
  expect(refs).not.toContain(incorrectMissal);
  for (const file of refs) expect(assets).toContain(file);
  for (const file of assets.filter(file => /\.(docx|xlsx)$/.test(file))) {
    const response = await page.request.get(`/${encodeURIComponent(file)}`);
    expect(response.ok()).toBe(true);
    expect((await response.body()).subarray(0, 2).toString()).toBe('PK');
  }
});
