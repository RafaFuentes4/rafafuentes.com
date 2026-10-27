# QA v1 · issue #17 · head 10ce364

| AC | Result | Proof |
|---|---|---|
| AC1 CI fails when any category drops below 95 on any audited route | ✅ | `regress.sh seo`: noindex on /projects/ only → seo 0.63, exit 1 (`lhci-fail-seo-projects.log`) · `regress.sh a11y`: no `lang` + unlabelled img/button on /writing/ only → a11y 0.79, seo 0.92, exit 1 (`lhci-fail-a11y-writing.log`) · other routes not flagged |
| AC2 All audited routes score 95+ in all four categories on the merge commit | ✅ | local: 100/100/100/100 on /, /writing/, /projects/, 9 of 9 runs (`scores.md`, `lhci-pass.log`) · GitHub `ci` on the PR merge ref passed the Lighthouse step (run 40530806407) |

Extra: newest-post route. With `why-this-site` flipped to `draft: false` (not committed), the config adds `/writing/why-this-site/` and it passes the budget (`urls-with-published-post.txt`, `lhci-pass-with-published-post.log`).

No UI change, so no screenshots.

Test gaps (not written):
- Medium: no automated negative test in CI; AC1 rests on `regress.sh` here.
- Low: `npm run test:lighthouse` without a prior build throws ENOENT on `dist/rss.xml` instead of a clear message.
