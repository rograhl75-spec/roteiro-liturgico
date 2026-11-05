// Testes genéricos: percorrem as semanas existentes em programacao.js,
// sem datas fixas — continuam válidos quando a programação é atualizada.
const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { assets } = require('../build-version.js');

const root = path.join(__dirname, '..');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.locator('.week-tab-btn').first().waitFor();
});

test('estrutura: abas, painéis, janelas e IDs são consistentes', async ({ page }) => {
  const state = await page.evaluate(() => {
    const weeks = window.programacaoData.weeks;
    return {
      tabs: [...document.querySelectorAll('.week-tab-btn')].map((tab) => tab.dataset.weekId),
      weekIds: weeks.map((week) => week.id),
      activeTabs: document.querySelectorAll('.week-tab-btn[aria-selected="true"]').length,
      brokenTabRefs: [...document.querySelectorAll('.week-tab-btn')]
        .filter((tab) => !document.getElementById(tab.getAttribute('aria-controls'))).length,
      brokenCloseRefs: [...document.querySelectorAll('[data-action="close-modal"]')]
        .filter((button) => !document.getElementById(button.dataset.modalId)).length,
      duplicateIds: [...document.querySelectorAll('[id]')].map((element) => element.id)
        .filter((id, index, ids) => ids.indexOf(id) !== index),
      unlabeledModals: [...document.querySelectorAll('.modal')]
        .filter((modal) => !modal.getAttribute('aria-labelledby')).map((modal) => modal.id)
    };
  });
  expect(state.tabs).toEqual(state.weekIds);
  expect(state.activeTabs).toBe(1);
  expect(state.brokenTabRefs).toBe(0);
  expect(state.brokenCloseRefs).toBe(0);
  expect(state.duplicateIds).toEqual([]);
  expect(state.unlabeledModals).toEqual([]);
});

test('a semana padrão é a que contém a data atual (ou a próxima)', async ({ page }) => {
  const result = await page.evaluate(() => {
    const weeks = window.programacaoData.weeks;
    const first = weeks[0];
    return {
      inside: window.getDefaultWeek(weeks, first.inicio).id === first.id,
      before: window.getDefaultWeek(weeks, '2000-01-01').id === first.id,
      after: window.getDefaultWeek(weeks, '2999-12-31').id === weeks[weeks.length - 1].id
    };
  });
  expect(result).toEqual({ inside: true, before: true, after: true });
});

test('teclado: setas, Home e End alternam as abas', async ({ page }) => {
  const ids = await page.evaluate(() => window.programacaoData.weeks.map((week) => week.id));
  test.skip(ids.length < 2, 'necessário ao menos duas semanas');
  await page.locator(`#btn-tab-${ids[0]}`).click();
  await page.keyboard.press('End');
  await expect(page.locator(`#btn-tab-${ids[ids.length - 1]}`)).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('Home');
  await expect(page.locator(`#btn-tab-${ids[0]}`)).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('ArrowRight');
  await expect(page.locator(`#btn-tab-${ids[1]}`)).toHaveAttribute('aria-selected', 'true');
});

for (const viewport of [{ width: 1280, height: 900 }, { width: 390, height: 844 }]) {
  test(`todas as semanas: dias, leituras, roteiros e preces em ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    const weeks = await page.evaluate(() => window.programacaoData.weeks.map((week) => ({
      id: week.id, legacy: week.legacyWeek,
      roteiroExtras: week.roteiroExtras, precesExtras: week.precesExtras
    })));
    for (const week of weeks) {
      await page.locator(`#btn-tab-${week.id}`).click();
      const panel = page.locator(`#week-panel-${week.id}`);
      await expect(panel).toBeVisible();
      expect(await page.evaluate(() =>
        document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);

      for (const link of await panel.locator('.day-nav a').all()) {
        await link.click();
        const target = (await link.getAttribute('href')).slice(1);
        await expect(page.locator(`#${target}`)).toBeInViewport();
      }

      for (const reading of await panel.locator('[data-action="open-reading"]').all()) {
        await reading.click();
        await expect(page.locator('#generalModal')).toBeVisible();
        await expect(page.locator('#modalTitle')).not.toHaveText('Leitura não encontrada');
        await page.keyboard.press('Escape');
        await expect(page.locator('#generalModal')).toBeHidden();
      }

      const documents = [['roteiro', null], ['preces', null]]
        .concat(week.roteiroExtras.map((key) => ['roteiro', key]))
        .concat(week.precesExtras.map((key) => ['preces', key]));
      for (const [type, key] of documents) {
        const selector = key
          ? `.toolbar [data-action="open-active-${type}"][data-${type}-key="${key}"]`
          : `#btn-${type}-principal`;
        await page.locator(selector).click();
        const suffix = key ? `${week.legacy}_${key}` : `${week.legacy}`;
        const modal = page.locator(`#modal_${type}_${suffix}`);
        await expect(modal).toBeVisible();
        await expect(modal.locator('.script-row').nth(3)).toBeVisible();
        await page.keyboard.press('Escape');
        await expect(modal).toBeHidden();
      }
    }
  });
}

test('seleção de leituras e impressão do roteiro geram PDF', async ({ page }) => {
  const week = await page.evaluate(() => {
    const last = window.programacaoData.weeks.at(-1);
    return { id: last.id, legacyWeek: last.legacyWeek };
  });
  await page.locator(`#btn-tab-${week.id}`).click();

  await page.locator('[data-action="open-active-leituras"]').click();
  const block = page.locator(`#leituras_semana_${week.legacyWeek}`);
  await expect(block).toBeVisible();
  const total = await block.locator('.reading-checkbox').count();
  expect(total).toBeGreaterThan(10);
  await page.getByRole('button', { name: 'Marcar Todas', exact: true }).click();
  await page.locator('[data-action="preview-selected-readings"]').click();
  await expect(page.locator('#content_leituras_view > div')).toHaveCount(total);
  await expect(page.locator('#content_leituras_view')).not.toContainText('Leitura não encontrada');
  await page.keyboard.press('Escape');

  await page.locator('#btn-roteiro-principal').click();
  const modal = page.locator(`#modal_roteiro_${week.legacyWeek}`);
  await modal.locator('[data-action="text-size"][data-step="1"]').click();
  await expect(modal.locator('.script-text').first()).toHaveCSS('font-size', '18px');
  await page.evaluate(() => { window.print = () => {}; });
  await modal.locator('[data-action="print-active-roteiro"]').click();
  const mount = page.locator('#print-mount');
  await expect(mount).toContainText('TOMAI, TODOS');
  const pdf = await page.pdf({ preferCSSPageSize: true });
  expect(pdf.length).toBeGreaterThan(10000);
  await page.evaluate(() => window.dispatchEvent(new Event('afterprint')));
  await expect(mount).toBeHidden();
});

test('arquivos publicados conferem com os hashes e os documentos abrem', async ({ page }) => {
  const metadata = JSON.parse(fs.readFileSync(path.join(root, 'version.json'), 'utf8'));
  expect(Object.keys(metadata.files)).toEqual(assets.map((file) => `./${file}`));
  for (const file of assets) {
    expect(createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex'))
      .toBe(metadata.files[`./${file}`]);
  }
  const workflow = fs.readFileSync(path.join(root, '.github/workflows/pages.yml'), 'utf8');
  expect(workflow).toContain('node ferramentas/montar-site.js --copiar _site');
  expect(workflow).toContain('node ferramentas/montar-site.js\n');
  for (const file of assets.filter((name) => /\.(docx|xlsx|pdf)$/.test(name))) {
    const response = await page.request.get(`/${file.split("/").map(encodeURIComponent).join("/")}`);
    expect(response.ok()).toBe(true);
    const magic = (await response.body()).subarray(0, 4).toString();
    expect(magic.startsWith(file.endsWith('.pdf') ? '%PDF' : 'PK')).toBe(true);
  }
});
