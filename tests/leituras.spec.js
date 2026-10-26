const { test, expect } = require('@playwright/test');

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
      'leituras_semana_6',
      'modal_roteiro_6',
      'modal_preces_6',
      'modal_reflexoes_6'
    ].filter(id => document.getElementById(id)),
    staleReadingKeys: Object.keys(window.readingsData).filter(key => key.includes('_w7')),
    staleAntiphons: Boolean(window.antifonasData.antifonas_7),
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

test('November 2–8 is available as a content-free placeholder', async ({ page }) => {
  await page.locator('#btn-tab-2026-11-02').click();
  await expect(page.locator('#week-panel-2026-11-02')).toContainText(
    'As informações desta semana serão adicionadas quando forem fornecidas.'
  );
  await expect(page.locator('#leituras_semana_8 .reading-checkbox')).toHaveCount(0);

  await page.locator('[data-action="open-active-roteiro"]').click();
  await expect(page.locator('#content_roteiro_8')).toContainText('serão adicionadas quando forem fornecidas');
  await page.locator('#modal_roteiro_8 [data-action="close-modal"]').click();

  await page.locator('[data-action="open-active-preces"]').click();
  await expect(page.locator('#content_preces_8')).toContainText('serão adicionadas quando forem fornecidas');
  await page.locator('#modal_preces_8 [data-action="close-modal"]').click();

  await page.locator('[data-action="open-active-reflexoes"]').click();
  await expect(page.locator('#content_reflexoes_8')).toContainText('serão adicionadas quando forem fornecidas');
});
