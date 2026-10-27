// Lighthouse CI budget: every audited route must score 95+ in all four
// categories, or `npm run test:lighthouse` (and the `ci` workflow) fails.
// Runs after `npm run build`; audits the preview server of `dist/`.
const { readFileSync } = require('node:fs');

const PORT = 4398;
const BASE = `http://127.0.0.1:${PORT}`;

// The newest published post is the first <item> in the built RSS feed.
// No published post yet: only the fixed routes are audited.
function newestPostPath() {
  const rss = readFileSync('dist/rss.xml', 'utf8');
  const link = rss.match(/<item>[\s\S]*?<link>([^<]+)<\/link>/)?.[1];
  return link ? new URL(link).pathname : null;
}

const paths = ['/', '/writing/', '/projects/', newestPostPath()].filter(
  Boolean,
);

const budget = ['error', { minScore: 0.95 }];

module.exports = {
  ci: {
    collect: {
      startServerCommand: `npm run preview -- --ignore-lock --host 127.0.0.1 --port ${PORT}`,
      startServerReadyPattern: 'Local',
      url: paths.map((path) => BASE + path),
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': budget,
        'categories:accessibility': budget,
        'categories:best-practices': budget,
        'categories:seo': budget,
      },
    },
    upload: { target: 'filesystem', outputDir: '.lighthouseci/reports' },
  },
};
