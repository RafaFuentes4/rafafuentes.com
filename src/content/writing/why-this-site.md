---
title: 'Building in public: agents, durable execution and storage engines'
description: 'What I am building outside work over the next months, and why each project goes deep instead of wide.'
date: 2026-10-27
tags: ['meta']
draft: true
---

By day I'm Tech Lead at Bettergy, building multi-tenant platforms, retrieval systems and the
Kubernetes infrastructure underneath them. This site is where I go deeper on the parts of that work
I want to understand from first principles.

Over the next months I'm building three projects, one per language, each with a design doc,
reproducible benchmarks and a series of write-ups:

- **Agent Efficiency Lab (Python).** At work, routing tasks to models by complexity was a big part
  of cutting our infrastructure and model spend by 43%. I want to do that rigorously and in the open:
  per-task cost, latency and quality telemetry on Google ADK, routing learned from evals, and a
  semantic cache that measures its own false hits.
- **Durable Executor (Go).** Our document-ingestion pipeline completed 11,500+ runs at 99.7% success
  on Celery. The remaining 0.3% is where the interesting problems live: leases, idempotency,
  replicated logs and what "exactly once" really means.
- **Columnar Time-Series Engine (C++).** I run TimescaleDB in production. Building a small columnar
  store with modern compression and pushdown is the best way I know to understand what it does for me.

I'll write up what works, what doesn't, and the numbers behind both.
