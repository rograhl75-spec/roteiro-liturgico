const { test, expect } = require('@playwright/test');

const week = '#week-panel-2026-10-26';
const dates = ['2026-10-26', '2026-10-27', '2026-10-28', '2026-10-29',
  '2026-10-30', '2026-10-31', '2026-11-01'];
const sources = [
  'Escala Padres 26 outubro a 01 novembro 2026.pdf',
  'Leituras de 26 de outubro a 1 de novembro 2026.pdf',
  'Leituras e Lecionarios - 26 Outubro a 1 Novembro 2026.pdf',
  'Missal - 25 outubro a 1 novembro 2026.pdf',
  'Todos os Santos, Solenidade - 31 10 E 01 11 2026 - ANO A.pdf',
  'Antífona da entrada e comunhão - Todos os Santos, Solenidade.pdf',
  'PRECES - SOLENIDADE DE TODOS OS SANTOS.pdf'
];

async function openWeek(page) {
  await page.goto('/');
  await expect(page.locator('#week-panel-2026-10-19')).toBeVisible();
  await page.locator('#btn-tab-2026-10-26').click();
  await expect(page.locator(week)).toBeVisible();
}

for (const viewport of [{ width: 1280, height: 900 }, { width: 390, height: 844 }]) {
  test(`all seven dates, schedule and readings render at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await openWeek(page);
    await expect(page.locator(`${week} [data-date]`)).toHaveCount(7);
    const parish = 'Paróquia Nossa Senhora Auxiliadora';
    const expected = [
      [['Segunda 19h00', parish, 'Pe. Laurindo']],
      [['Terça 19h00', parish, 'Pe. Rafael']],
      [['Quarta 19h00', parish, 'Pe. Heriberto']],
      [['Quinta 19h00', parish, 'Pe. Afonso']],
      [['Sexta 19h00', parish, 'Pe. Heriberto']],
      [['Sábado 18h30', parish, 'Pe. Heriberto'], ['Sábado 19h00', 'Capela São Domingos Sávio', 'Pe. Djhon']],
      [['Domingo 09h00', parish, 'Pe. Heriberto'], ['Domingo 11h00', parish, 'Pe. Laurindo'],
        ['Domingo 18h30', parish, 'Pe. Heriberto']]
    ];
    for (const [index, date] of dates.entries()) {
      await page.locator(`${week} a[href="#dia-${date}"]`).click();
      const day = page.locator(`${week} [data-date="${date}"]`);
      await expect(day).toBeInViewport();
      const card = index === 6 ? page.locator(`${week} .card[data-date="2026-10-31"]`) : day;
      const rows = index === 6 ? day.locator('tr') : day.locator('.escala-table tr');
      expect(await rows.evaluateAll(rows =>
        rows.map(row => [...row.cells].map(cell => cell.textContent.trim()))))
        .toEqual(index === 5 ? expected[5].concat(expected[6]) : expected[index]);
      await expect(card.locator('.liturgy-table')).toHaveCount(index < 5 ? 2 : 4);
      for (const reading of await card.locator('[data-action="open-reading"]').all()) {
        await reading.click();
        await expect(page.locator('#generalModal')).toBeVisible();
        const text = await page.locator('#modalBody').innerText();
        expect(text.length).toBeGreaterThan(50);
        await page.locator('#generalModal [data-action="close-modal"]').click();
      }
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.locator('#btn-tab-2026-10-19').click();
    await expect(page.locator('#week-panel-2026-10-19')).toBeVisible();
    await expect(page.locator(week)).toBeHidden();
  });

  test(`All Saints shares the existing weekend components at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await openWeek(page);
    const weekend = page.locator(`${week} .card`).filter({ hasText: 'Fim de semana:' });
    const previous = page.locator('#week-panel-2026-10-19 .card').filter({ hasText: 'Fim de semana:' });
    await expect(weekend).toHaveCount(1);
    await expect(weekend.locator('.card-header h2')).toHaveText('Fim de semana: 31 de Outubro e 1 de Novembro de 2026');
    await expect(weekend.locator('.badge-branco')).toHaveText('Branca (Solenidade)');
    await expect(weekend.locator('[data-date="2026-11-01"]')).toHaveCount(1);
    await expect(weekend.locator('.note-gloria-box')).toHaveCount(2);
    await expect(weekend.locator('.note-gloria-box').last()).toContainText('No domingo, 01/11, a missa das 18h30 será solene');
    for (const selector of ['.card-header', '.presidency-box', '.escala-table tr', '.tables-grid', '.liturgy-table']) {
      expect(await weekend.locator(selector).count()).toBe(await previous.locator(selector).count());
    }
    await expect(weekend.locator('.table-caption')).toHaveText([
      '📌 Missal Romano', '📖 Liturgia da Palavra',
      '🎵 Antífonas e Canto Interlecionais', '📺 Citações Telão (PASCOM)'
    ]);
    const antiphons = await page.evaluate(() => window.antifonasData.antifonas_8);
    for (const item of antiphons.items) {
      for (const option of item.options || [item]) {
        await expect(weekend).toContainText(option.text.replace(/\s+/g, ' ').trim(), { useInnerText: true });
        await expect(weekend).toContainText(option.reference);
      }
    }
    for (const citation of antiphons.citations) await expect(weekend).toContainText(citation.text);
    await expect(weekend.locator('[data-action="open-reading"]')).toHaveCount(4);
    await expect(weekend).not.toContainText('30/10');
    await weekend.scrollIntoViewIfNeeded();
    expect(await weekend.evaluate(card => {
      const box = card.getBoundingClientRect();
      return box.left >= 0 && box.right <= innerWidth && card.scrollWidth <= card.clientWidth;
    })).toBe(true);
    expect(await weekend.locator('.tables-grid').first().evaluate(grid =>
      getComputedStyle(grid).gridTemplateColumns.split(' ').length)).toBe(viewport.width > 850 ? 2 : 1);
    await page.locator('[data-action="open-active-programacao"]').click();
    const modalWeekend = page.locator('#modal_programacao .card').filter({ hasText: 'Fim de semana:' });
    await expect(modalWeekend).toHaveCount(1);
    await expect(modalWeekend.locator('.liturgy-table')).toHaveCount(4);
    await expect(modalWeekend.locator('.escala-table tr')).toHaveCount(5);
  });
}

test('source references, missal pages and unresolved differences remain explicit', async ({ page }) => {
  await openWeek(page);
  const expected = [
    ['II / 1123', 'II / 1124', 'II / 1125'],
    ['II / 1127', 'II / 1128', 'II / 1129'],
    ['III / 195', 'III / 196', '498 (Apóstolos)', '593'],
    ['II / 1134', 'II / 1135', 'II / 1136'],
    ['II / 1138', 'II / 1139'],
    ['I / 1047', 'I / 1048', 'I / 1049', '843 (tabela); 844 (roteiro)', '587'],
    ['I / 1047', 'I / 1048', 'I / 1049', '843 (tabela); 844 (roteiro)', '587']
  ];
  for (const [index, date] of dates.entries()) {
    const day = page.locator(`${week} .card[data-date="${index === 6 ? '2026-10-31' : date}"]`);
    for (const text of expected[index]) await expect(day).toContainText(text);
    if ([0, 1, 3, 4].includes(index)) {
      await expect(day).toContainText('565 (OE V)');
      await expect(day).toContainText('413');
    }
  }
  await expect(page.locator(`${week} [data-date="2026-10-31"]`)).toContainText('31º Domingo do Tempo Comum');
  await expect(page.locator(`${week} [data-date="2026-10-30"]`)).toContainText('Féria do Tempo Comum');
  await expect(page.locator(`${week} .card[data-date="2026-10-31"]`)).toContainText('18h30 será solene');
  for (const file of sources) {
    const link = page.locator(`${week} a`).filter({ hasText: file });
    await expect(link).toHaveCount(1);
    expect(decodeURIComponent(await link.getAttribute('href'))).toBe(`./${file}`);
    const response = await page.request.get(await link.getAttribute('href'));
    expect(response.ok()).toBe(true);
    expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-');
  }
});

test('date navigation also targets unique days inside the schedule modal', async ({ page }) => {
  await openWeek(page);
  await page.locator('[data-action="open-active-programacao"]').click();
  const modal = page.locator('#modal_programacao');
  for (const date of dates) {
    const target = `programacao-dia-${date}`;
    await modal.locator(`a[href="#${target}"]`).click();
    await expect(modal.locator(`#${target}`)).toBeInViewport();
    await expect(page.locator(`#dia-${date}`)).toHaveCount(1);
    await expect(page.locator(`#${target}`)).toHaveCount(1);
  }
});

test('complete readings, weekday acclamations and All Saints antiphons can be selected and printed', async ({ page }) => {
  await openWeek(page);
  await page.locator('[data-action="open-active-leituras"]').click();
  const block = page.locator('#leituras_semana_7');
  await expect(block).toBeVisible();
  await expect(block.locator('.reading-checkbox')).toHaveCount(25);
  await page.getByRole('button', { name: 'Marcar Todas', exact: true }).click();
  await page.locator('[data-action="preview-selected-readings"]').click();
  const preview = page.locator('#content_leituras_view');
  await expect(preview.locator('.reading-print-block')).toHaveCount(24);
  await expect(preview.locator('.antifona-print-box')).toHaveCount(1);
  await expect(preview).toContainText('Alegremo-nos todos no Senhor');
  await expect(preview).toContainText('pacificadores');
  await expect(preview).toContainText('Mt 11,28');
  const texts = await page.evaluate(() =>
    [...document.querySelectorAll('#leituras_semana_7 .reading-checkbox')]
      .map(input => window.readingsData[input.value]?.text).filter(Boolean));
  const normalize = text => text.replace(/\s+/g, ' ').trim();
  expect((await preview.locator('.leitura-texto').allInnerTexts()).map(normalize))
    .toEqual(texts.map(normalize));
  await page.evaluate(() => {
    window.print = () => window.dispatchEvent(new Event('beforeprint'));
  });
  await page.locator('[data-action="print-leituras-view"]').click();
  await expect(page.locator('#print-mount .reading-print-block')).toHaveCount(24);
  const pdf = await page.pdf({ preferCSSPageSize: true });
  expect(pdf.length).toBeGreaterThan(10000);
});

test('All Saints roteiro, prayer forms and source gaps are accessible without replacing previous content', async ({ page }) => {
  await openWeek(page);
  await page.locator('#btn-roteiro-principal').click();
  const roteiro = page.locator('#content_roteiro_7');
  await expect(roteiro).toBeVisible();
  await expect(roteiro.locator('.roteiro-source-text')).toContainText('TODOS OS SANTOS, SOLENIDADE – 31 10 A 01 11 2026');
  await expect(roteiro).not.toContainText('30 10');
  await expect(roteiro).not.toContainText('30/10');
  for (const text of ['SILÊNCIO', 'purificação', '1. RITOS INICIAIS', '2. LITURGIA DA PALAVRA',
    '3. LITURGIA EUCARÍSTICA', '4. RITO DA COMUNHÃO', '5. RITOS DE ENCERRAMENTO',
    'TOMAI, TODOS', 'Papa Leão', 'Geremias', 'Deus, glória e exultação dos Santos']) {
    await expect(roteiro).toContainText(text);
  }
  await page.locator('#modal_roteiro_7 [data-action="close-modal"]').click();
  await page.locator('[data-action="open-active-preces"]').click();
  const preces = page.locator('#content_preces_7');
  for (const text of ['31/10', '01/11', '09h00 e 11h00', '18h30',
    'Salvai-nos, Senhor, por intercessão de vossos santos!', '19h00']) {
    await expect(preces).toContainText(text);
  }
  expect((await preces.innerText()).match(/Oração da Assembleia Paroquial 2026/g)).toHaveLength(3);
  await page.locator('#modal_preces_7 [data-action="close-modal"]').click();
  await page.locator('[data-action="open-active-reflexoes"]').click();
  await expect(page.locator('#content_reflexoes_7')).toContainText('não foram fornecidas reflexões litúrgicas');
  await page.keyboard.press('Escape');
  await page.locator('#btn-tab-2026-10-19').click();
  await page.locator('#btn-roteiro-principal').click();
  await expect(page.locator('#content_roteiro_6')).toContainText('30º Domingo do Tempo Comum');
});

test.describe('offline snapshot', () => {
  test.use({ serviceWorkers: 'allow' });

  test('new dates, readings and original PDFs remain available offline', async ({ page, context }) => {
    await page.goto('/');
    await page.evaluate(async () => {
      await navigator.serviceWorker.ready;
      if (!navigator.serviceWorker.controller) {
        await new Promise(resolve => navigator.serviceWorker.addEventListener('controllerchange', resolve, { once: true }));
      }
    });
    await page.reload();
    await context.setOffline(true);
    await page.reload();
    await page.locator('#btn-tab-2026-10-26').click();
    await expect(page.locator(`${week} [data-date]`)).toHaveCount(7);
    await page.locator(`${week} [data-reading-key="s8_dom_ev"]`).first().click();
    await expect(page.locator('#modalBody')).toContainText('Bem-aventurados');
    const urls = sources.flatMap(file => [`./${file}`, `./${encodeURIComponent(file)}`]);
    const responses = await page.evaluate(async urls => Promise.all(urls.map(async url => {
      const response = await fetch(url);
      return { ok: response.ok, signature: (await response.text()).slice(0, 5) };
    })), urls);
    expect(responses).toEqual(urls.map(() => ({ ok: true, signature: '%PDF-' })));
  });
});
