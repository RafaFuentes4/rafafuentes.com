# Website improvements — plan

Small, independently shippable improvements to rafafuentes.com. Each ticket below is written in the
super-board ticket format (`.claude/skills/super-board/references/ticket-format.md`) so it can be
filed onto the board as-is: one ticket = one PR under 400 changed lines, merged only when every
check is green and the site still builds and deploys.

## Working agreement

- **One ticket, one branch, one PR.** No drive-by changes; anything found on the way becomes a new
  ticket.
- **Commits** follow the super-board writing standard: `<emoji> [<type>] <scope>: <subject>`,
  imperative, ≤ 72 chars, 1–4 bullet body, `Closes #N` on the commit that finishes the ticket.
- **Shippable at every merge.** `main` always builds and deploys. #1 adds the gate that enforces it;
  every later ticket is blocked by it.
- **Content stays truthful.** Every number on the site must match the CV in `../cvs/`. No invented
  metrics, testimonials or activity.
- **UI tickets** get a desktop screenshot embedded in the issue when filed (the repo is not public
  yet, so screenshots are added at filing time).

## Order

| # | Ticket | Blocked by |
|---|---|---|
| 1 | 🧪 [test] ci: gate every PR on type-check, format and build | — |
| 2 | 📝 [docs] readme: replace Astro template README with site guide | 1 |
| 3 | 🔒 [security] fonts: self-host Geist instead of Google Fonts | 1 |
| 4 | 🧪 [test] e2e: smoke-test every route in light, dark and mobile | 1 |
| 5 | ✨ [feat] seo: add Open Graph image and Person structured data | 1 |
| 6 | ✨ [feat] writing: group posts into project series | 1 |
| 7 | ✨ [feat] projects: give each project its own page | 6 |
| 8 | 💄 [ui] post: add heading anchors and a table of contents | 4 |
| 9 | ⚡ [perf] lighthouse: enforce a 95+ budget in CI | 3, 4 |
| 10 | ✨ [feat] home: add portrait to the hero | 5 |
| 11 | ✨ [feat] deploy: publish to rafafuentes.com on GitHub Pages | 1 |
| 12 | ✨ [feat] analytics: add cookieless page analytics | 11 |

---

## 1 · 🧪 [test] ci: gate every PR on type-check, format and build

## Problem
Nothing stops a broken or unformatted change from reaching `main`. The only workflow is the deploy,
which runs after merge.

## Context
- **Where:** repository, `.github/workflows/`
  - a. Open a PR that breaks a type in `src/`
  - b. The PR shows no failing check
- **Who:** every contributor and every super-board lane

## Fix
Add Prettier (with `prettier-plugin-astro`), an `npm run verify` script (`astro check`, `prettier
--check`, `astro build`) and a `ci.yml` workflow that runs it on every pull request.

## Acceptance Criteria
- [ ] `npm run verify` exits 0 on a clean checkout and non-zero on a type error
- [ ] A PR with an unformatted file shows a failing `ci` check
- [ ] The whole repo is formatted in one commit, separate from the tooling commit

## Risk
🟢 **Low** · tooling only, no runtime change

## Blocked by
- None.

---

## 2 · 📝 [docs] readme: replace Astro template README with site guide

## Problem
`README.md` is still the Astro starter text, so nobody (human or agent) knows how to write a post,
run the checks or deploy.

## Context
- **Where:** repository root, `README.md`
- **Who:** contributors and agents onboarding to the repo

## Fix
Rewrite the README: what the site is, `npm run dev` / `verify`, how to add a post (frontmatter
fields, `draft`), where content lives (`src/profile.ts`, `src/projects.ts`), and how deploy works.

## Acceptance Criteria
- [ ] README documents every frontmatter field defined in `src/content.config.ts`
- [ ] Every command in the README runs successfully as written
- [ ] No Astro template text remains

## Risk
🟢 **Low** · docs only

## Blocked by
- #1 — README documents `npm run verify`

---

## 3 · 🔒 [security] fonts: self-host Geist instead of Google Fonts

## Problem
Every visit sends the visitor's IP to Google Fonts before the page renders, which is a GDPR concern
for EU visitors and an extra render-blocking origin.

## Context
- **Where:** every page, `src/layouts/Base.astro`
  - a. Open any page with the network panel
  - b. Requests go to `fonts.googleapis.com` and `fonts.gstatic.com`
- **Who:** every visitor

## Fix
Serve Geist and Geist Mono from the site (Astro fonts API or `@fontsource`), preload the two
weights used above the fold, and drop the Google Fonts links.

## Acceptance Criteria
- [ ] No request leaves `rafafuentes.com` when loading `/`
- [ ] Headings and body still render in Geist, code in Geist Mono
- [ ] `font-display: swap` is set for every face

## Risk
🟢 **Low** · visual-only, checked by screenshot

## Blocked by
- #1 — needs the CI gate

---

## 4 · 🧪 [test] e2e: smoke-test every route in light, dark and mobile

## Problem
Layout regressions (horizontal overflow on phones, broken dark mode, console errors) are only caught
by looking at the page by hand.

## Context
- **Where:** `/`, `/projects`, `/writing`, one post, `/404`
- **Who:** every visitor; every future UI ticket

## Fix
Add Playwright tests against `astro preview` that visit every route at 1440 px and 390 px in both
colour schemes, and run them in the `ci` workflow.

## Acceptance Criteria
- [ ] Each route returns 200 (404 page returns 404) with no console errors
- [ ] At 390 px no route scrolls horizontally (`scrollWidth <= clientWidth`)
- [ ] The theme toggle switches `data-theme` and the choice survives a reload
- [ ] Tests run in CI and fail the PR on regression

## Risk
🟢 **Low** · test-only

## Blocked by
- #1 — tests plug into the CI workflow

---

## 5 · ✨ [feat] seo: add Open Graph image and Person structured data

## Problem
Sharing the site or a post on LinkedIn shows no image, and search engines have no structured data
tying the site to its author.

## Context
- **Where:** every page, `src/layouts/Base.astro`
  - a. Paste `https://rafafuentes.com/` into the LinkedIn post inspector
  - b. The preview has no image
- **Who:** anyone who sees a shared link

## Fix
Generate a 1200×630 OG image per page at build time (title + name on the site's styling), add
`og:image`/`twitter:image`, JSON-LD `Person` on the home page and `BlogPosting` on posts.

## Acceptance Criteria
- [ ] Every built HTML page has an `og:image` that resolves to a 1200×630 PNG
- [ ] Home page JSON-LD validates as `Person` with `sameAs` LinkedIn and GitHub
- [ ] Post pages include `BlogPosting` with `datePublished` and `author`

## Risk
🟢 **Low** · metadata only

## Blocked by
- #1 — needs the CI gate

---

## 6 · ✨ [feat] writing: group posts into project series

## Problem
Each project will produce a 2–3 part deep-dive series, but posts have no way to say which series
they belong to or link to the next part.

## Context
- **Where:** post pages, `/writing/<slug>`
- **Who:** readers following a project; hiring managers reading one deep dive

## Fix
Add optional `series` and `part` fields to the writing schema, show "Part N of M" with
previous/next links on posts, and list a series' posts together on `/writing`.

## Acceptance Criteria
- [ ] A post with `series` shows "Part N of M" and links to its neighbours
- [ ] Posts without `series` render exactly as before
- [ ] Two posts in the same series with the same `part` fail the build

## Risk
🟢 **Low** · additive schema change

## Blocked by
- #1 — needs the CI gate

---

## 7 · ✨ [feat] projects: give each project its own page

## Problem
Projects are only cards; there is nowhere to send someone for the design doc, benchmarks, repo and
write-ups of one project.

## Context
- **Where:** `/projects`
  - a. Click a project card
  - b. Nothing happens unless it has a repo
- **Who:** hiring managers and engineers preparing for a deep-dive conversation

## Fix
Move projects into a content collection and render `/projects/<slug>` with summary, status, repo
link, design-doc link, key results and the posts of its series (#6).

## Acceptance Criteria
- [ ] Each project card links to `/projects/<slug>`
- [ ] The page lists every published post whose `series` matches the project
- [ ] Projects without a repo or results yet render without empty sections

## Risk
🟢 **Low** · new pages, existing cards keep their layout

## Blocked by
- #6 — lists the project's series

---

## 8 · 💄 [ui] post: add heading anchors and a table of contents

## Problem
Deep dives will run long; readers can't jump to a section or link to one.

## Context
- **Where:** post pages, `/writing/<slug>`
- **Who:** readers of long posts; anyone sharing a specific section

## Fix
Add autolinked heading anchors and, for posts with 3+ `h2`, a table of contents (sticky beside the
text on wide screens, collapsed above it on mobile).

## Acceptance Criteria
- [ ] Every `h2`/`h3` in a post has an `id` and a visible anchor link on hover/focus
- [ ] Posts with fewer than 3 `h2` show no table of contents
- [ ] At 390 px the table of contents does not cause horizontal scroll (#4 test passes)

## Risk
🟢 **Low** · post layout only

## Blocked by
- #4 — relies on the overflow test

---

## 9 · ⚡ [perf] lighthouse: enforce a 95+ budget in CI

## Problem
Performance and accessibility can silently degrade as pages are added.

## Context
- **Where:** `/`, `/writing`, one post
- **Who:** every visitor; the site itself is part of the portfolio

## Fix
Run Lighthouse CI against the preview build in the `ci` workflow with a minimum score of 95 for
performance, accessibility, best practices and SEO; fix whatever falls short.

## Acceptance Criteria
- [ ] CI fails if any category drops below 95 on any audited route
- [ ] All audited routes currently score 95+ in all four categories

## Risk
🟢 **Low** · CI-only plus small fixes

## Blocked by
- #3 — third-party fonts would cap the score
- #4 — shares the preview-server CI step

---

## 10 · ✨ [feat] home: add portrait to the hero

## Problem
The home page has no photo, so the site feels anonymous next to LinkedIn.

## Context
- **Where:** home, `/`
- **Who:** recruiters and hiring managers landing from LinkedIn or a CV

## Fix
Add an optimised portrait (Astro `<Image>`, AVIF/WebP, explicit size) to the right of the hero on
wide screens and above the title on mobile; reuse it in the home OG image (#5).

## Acceptance Criteria
- [ ] Portrait is served as AVIF/WebP under 60 KB with width/height set (no layout shift)
- [ ] Image has meaningful `alt` text
- [ ] Hero layout passes the #4 mobile overflow test

## Risk
🟢 **Low** · needs a photo from the owner

## Blocked by
- #5 — OG image reuses the portrait

`needs-you: add a professional portrait at src/assets/portrait.jpg`

---

## 11 · ✨ [feat] deploy: publish to rafafuentes.com on GitHub Pages

## Problem
The site is not online: the repo is local only and `rafafuentes.com` has no A record.

## Context
- **Where:** GitHub repo settings and the IONOS DNS panel
- **Who:** everyone

## Fix
Publish the repo, enable Pages with the existing `deploy.yml`, set the custom domain, add the GitHub
Pages A records and `www` CNAME at IONOS (keep the Google Workspace MX records), then enforce HTTPS.

## Acceptance Criteria
- [ ] `https://rafafuentes.com/` serves the latest `main` build over HTTPS
- [ ] `https://www.rafafuentes.com/` redirects to the apex
- [ ] MX records for `rafafuentes.com` are unchanged

## Risk
🟡 **Medium** · DNS change on the domain that also carries email

## Blocked by
- #1 — only gated builds get deployed

`needs-you: approve making the repo public and add the DNS records at IONOS`

---

## 12 · ✨ [feat] analytics: add cookieless page analytics

## Problem
There is no way to know whether posts are read or where visitors come from (LinkedIn, CV, search).

## Context
- **Where:** every page, `src/layouts/Base.astro`
- **Who:** the site owner

## Fix
Add a cookieless analytics script (Cloudflare Web Analytics or Plausible) loaded `defer`, with no
cookie banner needed.

## Acceptance Criteria
- [ ] The analytics script sets no cookies and no `localStorage` keys
- [ ] Page views from the production domain appear in the analytics dashboard
- [ ] Lighthouse budget from #9 still passes

## Risk
🟢 **Low** · one script tag

## Blocked by
- #11 — needs the production domain

`needs-you: create the analytics site and provide its token`
