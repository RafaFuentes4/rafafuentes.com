export interface Project {
  name: string;
  language: string;
  status: 'In progress' | 'Planned' | 'Shipped';
  summary: string;
  topics: string[];
  repo?: string;
}

export const PROJECTS: Project[] = [
  {
    name: 'Agent Efficiency Lab',
    language: 'Python',
    status: 'In progress',
    summary:
      'Per-task cost, latency and quality telemetry for LLM agents built on Google ADK, with model routing learned from evals and a semantic cache that measures its own false hits. Benchmarked on public agent benchmarks.',
    topics: ['LLM evaluation', 'model routing', 'inference caching', 'OpenTelemetry'],
  },
  {
    name: 'Durable Executor',
    language: 'Go',
    status: 'Planned',
    summary:
      'A small durable-execution engine for long-running agent workflows: Raft-replicated log, leases, idempotent activities, SLO-based alerting and fault-injection tests with published postmortems.',
    topics: ['consensus', 'exactly-once semantics', 'SRE', 'fault injection'],
  },
  {
    name: 'Columnar Time-Series Engine',
    language: 'C++',
    status: 'Planned',
    summary:
      'A columnar time-series store with Gorilla and delta-of-delta compression and vectorized execution, exposed as a DuckDB extension that supports federated queries with predicate and aggregate pushdown.',
    topics: ['storage formats', 'compression', 'SIMD', 'query pushdown'],
  },
];
