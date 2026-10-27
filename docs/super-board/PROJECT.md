# rafafuentes.com

Personal site of Rafael Fuentes: profile, impact metrics, case studies, projects and writing
(agent efficiency, distributed systems, data infrastructure). Static Astro site.

## Stack

| Thing | Value |
|---|---|
| Framework | Astro 7 (static output), MDX, RSS, sitemap |
| Language | TypeScript (`astro check` via `@astrojs/check`) |
| Node | >= 22.23.4 |
| Hosting | GitHub Pages, custom domain `rafafuentes.com` (`public/CNAME`) |
| Deploy | `.github/workflows/deploy.yml` on push to `main` |
| Tests | none yet; `npm run build` is the verify gate |

## Commands

| Command | Does |
|---|---|
| `npm run dev` / `astro dev --background` | dev server, `localhost:4321` |
| `npm run build` | build to `dist/` |
| `npm run preview` | serve the build |
| `npx astro check` | type-check `.astro` + `.ts` |

## Where things live

| Path | Holds |
|---|---|
| `src/pages/` | routes: `/`, `/projects`, `/writing`, `/writing/[...slug]`, `/rss.xml`, `404` |
| `src/layouts/Base.astro` | shared page shell |
| `src/components/` | `PostList`, `ProjectCard` |
| `src/content/writing/` | posts (Markdown/MDX), schema in `src/content.config.ts` |
| `src/site.ts` · `profile.ts` · `projects.ts` · `posts.ts` | site metadata, profile data, project list, post helpers |
| `src/styles/global.css` | global styles |
| `public/` | favicon, CNAME |

## Branches

`staging` = board base branch (robot merges here). `main` = production; moving `staging` →
`main` publishes to GitHub Pages.
