# QA v1 · issue #5 · head ee7fc7e

Local tests: npm run verify (astro check, prettier --check, astro build) -> pass

| AC | Result | Proof |
|---|---|---|
| Project without `repo` is not rendered on `/` or `/projects` | pass | built `dist/index.html` and `dist/projects/index.html` contain none of Agent Efficiency Lab, Durable Executor, Columnar; home has no "Building in public" section |
| Each listed project links to its repository | pass | with `repo` set on Agent Efficiency Lab, both pages render `<a href="https://github.com/example/agent-efficiency-lab">Agent Efficiency Lab`; the two repo-less projects stay hidden; home section appears |
| Zero listed projects: `/projects` shows a one-line note | pass | `dist/projects/index.html` has "No public repositories yet. Projects appear here once their code is open." and no `project-grid` |

Method: static build output inspection; the repo has no test runner or browser tooling installed, so no screenshots were taken. The temporary `repo` edit was reverted (`git checkout src/projects.ts`).
