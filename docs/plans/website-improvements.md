# Website roadmap

Goal: a content-first engineering site whose case studies and writing show depth on production
systems. Design rules live in [`docs/design/direction.md`](../design/direction.md); tickets live on
the board ("Rafafuentes.com board", #3) in super-board format, one PR each.

## Milestones

| Milestone | Tickets | Done when |
|---|---|---|
| 1 · Quality gates | #1 CI · #2 e2e · #14 fonts · #17 Lighthouse | Every PR is type-checked, formatted, built, screenshot-tested and scored 95+ |
| 2 · Editorial redesign | #3 design system · #4 home · #5 projects · #6 about · #16 anchors and TOC | No pattern from the "Avoid" table remains |
| 3 · Case-study engine | #7 collection · #8 diagrams · #9 charts · #18 README | A draft case study renders with numbered figures, diagrams and charts |
| 4 · Case studies | #10 retrieval · #11 IoT telemetry · #12 certification · #13 reliability and cost | Four approved case studies published |
| 5 · Launch | #15 SEO · #19 deploy · #20 analytics | Site live on `rafafuentes.com` with previews and analytics |

## Dependency order

| Ticket | Blocked by |
|---|---|
| #1 | — |
| #2, #5, #14, #19 | #1 |
| #3 | #2 |
| #4, #6, #7 | #3 |
| #8, #9, #16, #18 | #7 |
| #10, #13 | #8, #9 |
| #11, #12 | #8 |
| #15 | #4 |
| #17 | #2, #14 |
| #20 | #19 |

## Needs the owner

| Ticket | What |
|---|---|
| #6 | Portrait and CV PDF |
| #10–#13 | Employer approval of text and sanitized screenshots |
| #19 | DNS records at the registrar |
| #20 | Analytics site token |
