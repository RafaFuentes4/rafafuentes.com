import { expect, test } from '@playwright/test';

// Type and colour rules from docs/design/direction.md ("Do" table).
const routes = ['/', '/projects', '/writing', '/this-page-does-not-exist'];

for (const path of routes) {
  test(`${path} body text is 17–18 px with line-height ≥ 1.6`, async ({
    page,
  }) => {
    await page.goto(path);
    const { size, lineHeight } = await page.evaluate(() => {
      const style = getComputedStyle(document.body);
      return {
        size: parseFloat(style.fontSize),
        lineHeight: parseFloat(style.lineHeight),
      };
    });
    expect(size).toBeGreaterThanOrEqual(17);
    expect(size).toBeLessThanOrEqual(18);
    expect(lineHeight / size).toBeGreaterThanOrEqual(1.6);
  });

  test(`${path} text column is at most 700 px wide`, async ({ page }) => {
    await page.goto(path);
    const widths = await page.evaluate(() =>
      [...document.querySelectorAll('main .container')].map((el) => {
        const style = getComputedStyle(el);
        return (
          el.clientWidth -
          parseFloat(style.paddingLeft) -
          parseFloat(style.paddingRight)
        );
      }),
    );
    expect(widths.length).toBeGreaterThan(0);
    for (const width of widths) expect(width).toBeLessThanOrEqual(700);
  });

  test(`${path} uses the accent colour only on links`, async ({ page }) => {
    await page.goto(path);
    const offenders = await page.evaluate(() => {
      const probe = document.createElement('span');
      probe.style.color = 'var(--accent)';
      document.body.append(probe);
      const accent = getComputedStyle(probe).color;
      probe.remove();

      const props = [
        'color',
        'background-color',
        'border-top-color',
        'border-right-color',
        'border-bottom-color',
        'border-left-color',
      ] as const;
      const found: string[] = [];
      for (const el of document.body.querySelectorAll('*')) {
        if (el.closest('a')) continue;
        for (const pseudo of [null, '::before', '::after']) {
          const style = getComputedStyle(el, pseudo);
          if (pseudo && style.content === 'none') continue;
          for (const prop of props) {
            if (style.getPropertyValue(prop) === accent) {
              found.push(
                `${el.tagName.toLowerCase()}.${el.className}${pseudo ?? ''} ${prop}`,
              );
            }
          }
        }
      }
      return found;
    });
    expect(offenders).toEqual([]);
  });
}

test('focus ring and selection use the accent colour', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const { accent, outline, selection } = await page.evaluate(() => {
    const probe = document.createElement('span');
    probe.style.color = 'var(--accent)';
    document.body.append(probe);
    const accent = getComputedStyle(probe).color;
    probe.remove();
    return {
      accent,
      outline: getComputedStyle(document.activeElement!).outlineColor,
      selection: getComputedStyle(document.body, '::selection').backgroundColor,
    };
  });
  expect(outline).toBe(accent);
  expect(selection).toBe(accent);
});
