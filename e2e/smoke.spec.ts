import { expect, test, type Page } from '@playwright/test';

const SCREENSHOT_DIR = 'e2e-screenshots';

const routes = [
  { name: 'home', path: '/', status: 200 },
  { name: 'projects', path: '/projects', status: 200 },
  { name: 'writing', path: '/writing', status: 200 },
  { name: '404', path: '/this-page-does-not-exist', status: 404 },
];

// Collects console errors and uncaught exceptions for one page.
function watchErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(err.message));
  return errors;
}

async function checkRoute(
  page: Page,
  path: string,
  status: number,
  shot: string,
  projectName: string,
) {
  const errors = watchErrors(page);
  const response = await page.goto(path, { waitUntil: 'networkidle' });
  expect(response?.status(), `${path} status`).toBe(status);

  // The browser logs the 404 document itself as a failed resource; that is the
  // expected response, not a page error.
  const real =
    status === 404
      ? errors.filter((e) => !e.includes('status of 404'))
      : errors;
  expect(real, `${path} console errors`).toEqual([]);

  const { scrollWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  if (projectName.startsWith('mobile')) {
    expect(scrollWidth, `${path} scrolls horizontally`).toBeLessThanOrEqual(
      clientWidth,
    );
  }

  await page.screenshot({
    path: `${SCREENSHOT_DIR}/${projectName}/${shot}.png`,
    fullPage: true,
  });
}

for (const route of routes) {
  test(`${route.name} renders`, async ({ page }, testInfo) => {
    await checkRoute(
      page,
      route.path,
      route.status,
      route.name,
      testInfo.project.name,
    );
  });
}

test('a post renders', async ({ page }, testInfo) => {
  await page.goto('/writing');
  const links = page.locator('main a[href^="/writing/"]');
  test.skip((await links.count()) === 0, 'no published post on /writing');
  const href = (await links.first().getAttribute('href'))!;
  await checkRoute(page, href, 200, 'post', testInfo.project.name);
});

test('theme toggle sets data-theme and survives a reload', async ({ page }) => {
  await page.goto('/');
  const html = page.locator('html');
  const before = await html.getAttribute('data-theme');

  await page.getByRole('button', { name: 'Toggle dark mode' }).click();
  const after = await html.getAttribute('data-theme');
  expect(after).toMatch(/^(light|dark)$/);
  expect(after).not.toBe(before);

  await page.reload();
  await expect(html).toHaveAttribute('data-theme', after!);
});
