# Issue #3 QA v1

Head tested: `32e23be` (code) · evidence commit on top.

| AC | Result | Proof |
|---|---|---|
| AC1 body 17–18 px, line-height ≥ 1.6, column ≤ 700 px | pass | `e2e/type-and-colour.spec.ts:7`, `:23` · 4 routes × 4 projects |
| AC2 accent only on links, focus, selection | pass | `e2e/type-and-colour.spec.ts:39`, `:77` · CSS grep: 4 `var(--accent)` uses = `::selection`, `:focus-visible`, `.post-list a:hover .post-title`, `.prose a` |
| AC3 #2 smoke tests in light, dark, 390 px | pass | `e2e/smoke.spec.ts` · 72 passed, 4 skipped (no published post) |

Commands: `npm run verify` (clean) · `npm run test:e2e` (log: `e2e.log`).

Mutation check (not committed): body 16px/1.6, `--container: 68rem`, `.case-context` accent → 9 of 13 desktop-light specs red; restored → green.

## Test gaps (not written)
- Medium: `/writing/<slug>` post page is not covered (only post is a draft); `.prose` sets 17 px / 1.75, checked by reading CSS only.
- Low: hover states are not scanned by the accent spec; CSS grep shows the only hover accent sits inside a link.
