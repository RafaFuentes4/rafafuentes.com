import { defineConfig, devices } from '@playwright/test';

// Not 4321, so a running `astro dev` (which shows drafts) is never reused.
const PORT = 4399;

// Two widths x two colour schemes. Every smoke test runs in all four.
const widths = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
} as const;
const schemes = ['light', 'dark'] as const;

export default defineConfig({
  testDir: './e2e',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: 'retain-on-failure',
  },
  projects: Object.entries(widths).flatMap(([name, viewport]) =>
    schemes.map((colorScheme) => ({
      name: `${name}-${colorScheme}`,
      use: { ...devices['Desktop Chrome'], viewport, colorScheme },
    })),
  ),
  webServer: {
    command: `npm run build && npm run preview -- --ignore-lock --host 127.0.0.1 --port ${PORT}`,
    url: `http://127.0.0.1:${PORT}`,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
