export const METRICS = [
  {
    value: '18,000+',
    label: 'conversations served by a retrieval platform I designed',
  },
  {
    value: '52→89%',
    label: 'answer accuracy after building an LLM evaluation harness',
  },
  {
    value: '−43%',
    label:
      'infrastructure and model spend through rightsizing and model tiering',
  },
  {
    value: '4 months',
    label: 'from blank repo to production for a multi-tenant IoT platform',
  },
];

export interface CaseStudy {
  title: string;
  context: string;
  summary: string;
  points: string[];
  stack: string[];
  /** Optional ISO date; when set, the home page Article JSON-LD includes datePublished. */
  datePublished?: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    title: 'Retrieval & document-verification platform',
    context: 'Bettergy · AI platform',
    summary:
      'Multi-tenant retrieval over regulatory documentation with cited answers, plus an agentic workflow that verifies case files against a 29-item regulatory specification.',
    points: [
      'Hybrid BM25 + vector retrieval with cross-encoder reranking on pgvector',
      'Idempotent ingestion pipeline: 11,500+ runs at 99.7% success',
      'LangGraph state machine with human-in-the-loop checkpoints; review time from 3–4 hours to minutes',
    ],
    stack: ['Python', 'Django', 'pgvector', 'Celery', 'LangGraph', 'Langfuse'],
  },
  {
    title: 'MIOT — multi-tenant IoT monitoring',
    context: 'Bettergy · new product line',
    summary:
      'Designed and launched a new revenue stream: telemetry ingestion from Modbus, MQTT and LoRaWAN devices with electricity-cost simulation over historical data.',
    points: [
      'Tenant isolation with PostgreSQL Row-Level Security across HTTP and async workers',
      'TimescaleDB hypertables with real-time continuous aggregates',
      '189 API endpoints, 5-level RBAC, 4,000+ tests and 14 architecture checks in CI',
    ],
    stack: ['Django Ninja', 'TimescaleDB', 'Next.js', 'Kubernetes'],
  },
  {
    title: 'Energy-certification platform',
    context: 'Bettergy · core platform',
    summary:
      'Core platform processing 1,200+ certificates a year for 97+ partner organizations, representing €40M in annual projects.',
    points: [
      'Versioned external API with scoped auth, throttling and dedicated queues',
      'Certificate state machine enforced by PostgreSQL triggers, invariants verified in CI',
      'PAdES digital signing with multiparty signature chains',
    ],
    stack: ['Django', 'PostgreSQL', 'Celery', 'PAdES'],
  },
  {
    title: 'Soil-moisture data pipeline',
    context: 'University of Málaga · R&D',
    summary:
      'Production pipeline for a national research project processing 300 GB/month of geospatial and meteorological data.',
    points: [
      'Replaced a paid system with in-house evapotranspiration and water-balance models',
      'Runtime from 4+ hours to under a minute via vectorization and columnar storage',
      'Regression Kriging across Andalusia; thesis graded 9.8/10 with Honors',
    ],
    stack: ['Python', 'GeoPandas', 'Parquet', 'Django'],
  },
];

export const EXPERIENCE = [
  { role: 'Tech Lead', org: 'Bettergy', period: '2025 — now' },
  {
    role: 'Senior Software Engineer',
    org: 'Startup Wise Guys',
    period: '2024 — 2025',
  },
  { role: 'Founding Engineer', org: 'Blueberry Málaga', period: '2023 — 2024' },
  {
    role: 'Software Engineer, R&D',
    org: 'Universidad de Málaga',
    period: '2022 — 2023',
  },
];
