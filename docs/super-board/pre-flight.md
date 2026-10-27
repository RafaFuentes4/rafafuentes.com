# Pre-flight — rafafuentes.com

Checked 2026-10-27 by `super-board lint`. Every `[ ]` blocks `super-board run`.

🔑 Credentials the loop will need:
   [✓] None for the startable cards (#1, #2, #5, #14 and their followers). Static site, no API keys.

🛠 Tools the loop will need:
   [✓] gh CLI authenticated as RafaFuentes4 with project, repo, workflow scopes (verified)
   [✓] Node 24.13.0 (package.json needs >= 22.23.4) (verified)
   [✓] Astro 7.4.2 via `npx astro` (verified)
   [✓] Playwright Chromium for #2: the lane installs it with `npx playwright install chromium`

🌐 Environment:
   [✓] Repo RafaFuentes4/rafafuentes.com, base branch `staging` in sync with `main`
   [✓] No live URL needed: lanes test against `astro build` / `astro preview`

🙋 Human-only steps (tracked on the tickets with the `needs-you` label, not run gates):
- #6 portrait and CV PDF · #10–#13 numbers, screenshots, employer approval
- #19 GitHub Pages + DNS records · #20 analytics account and token
