# issue #1 · QA v1 · head `ff7e40c`

| AC | Witness | Result | Log |
|---|---|---|---|
| AC1 clean | `npm ci && npm run verify` on a clean worktree (Node 24.13) | exit 0 | `ac1-verify-clean.log` |
| AC1 type error `.ts` | `export const qaPlanted: number = "not a number"` in `src/posts.ts` | exit 1, `ts(2322)` | `ac1-type-error-ts.log` |
| AC1 type error `.astro` | same line in `src/pages/404.astro` frontmatter | exit 1, `ts(2322)` | `ac1-type-error-astro.log` |
| AC2 local `.ts` | `export const   qaUgly   =   1` in `src/posts.ts` | exit 1, Prettier `[warn]` | `ac2-unformatted-ts.log` |
| AC2 local `.astro` | unformatted `<div>` in `src/pages/404.astro` | exit 1, Prettier `[warn]` | `ac2-unformatted-astro.log` |
| AC2 real PR | throwaway draft PR #28 (`src/qa-unformatted.ts`) → `staging` | `ci` FAILURE on Prettier, run 40523857287; PR closed, branch deleted | `ac2-pr28-ci.log` |
| AC3 | `372e41a` tooling only · `05588cc` = `prettier --write .` on `372e41a`, byte-identical (lockfile aside) · `ff7e40c` lockfile only | pass | — |

Test gaps (not written):
- Medium: `staging` and `main` have no branch protection, so a red `ci` does not block a merge. Mark `ci` required to make it a gate.
- Low: a build-only failure (bad content frontmatter) is not witnessed; `npm run verify` runs `astro build` last.
- Low: `astro check` warnings (`'z' is deprecated`, `src/content.config.ts`) do not fail verify, by design.

Outside this ticket: https://rafafuentes.com is down. Pages has `cname: rafafuentes.com` and `status: null`, and serves a `*.github.io` cert with a 404.
