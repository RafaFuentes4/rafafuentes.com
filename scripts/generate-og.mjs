// Build-time Open Graph image generator for rafafuentes.com.
//
// Renders a 1200x630 social preview card per page in the site's own
// typography (Geist, SIL OFL 1.1 — see scripts/og/fonts/OFL.txt) and brand
// tokens, then writes PNGs into public/og/ so Astro ships them to dist.
//
// The prebuild npm hook runs this before every `astro build`, so cards stay
// in sync with src/site.ts and the writing collection. Generates:
//   /og/home.png          — the home page
//   /og/projects.png      — /projects
//   /og/writing.png       — /writing
//   /og/posts/<slug>.png  — each published writing post
//   /og/404.png           — the 404 page
//
// Run: node scripts/generate-og.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const FONT_DIR = path.join(__dirname, 'og', 'fonts');
const OUT_DIR = path.join(REPO_ROOT, 'public', 'og');

const { SITE } = await import('../src/site.ts');

const W = 1200;
const H = 630;

const FONTS = [
  path.join(FONT_DIR, 'geist-400.ttf'),
  path.join(FONT_DIR, 'geist-600.ttf'),
  path.join(FONT_DIR, 'geist-700.ttf'),
];

// Brand tokens mirrored from src/styles/global.css (dark theme).
const C = {
  bg: '#0b0b0d',
  bgElev: '#131316',
  fg: '#ededef',
  fg2: '#c4c5cb',
  muted: '#8d8e96',
  border: '#232328',
  accent: '#7d9bff',
  grid: 'rgb(255 255 255 / 0.04)',
};

function escapeXml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Rough per-glyph advance estimates for Geist (proportional). Good enough to
// wrap to a max width; resvg renders the real glyphs.
function charWidth(ch, weight) {
  if (ch === ' ') return weight >= 600 ? 0.3 : 0.28;
  if (
    ch === 'i' ||
    ch === 'l' ||
    ch === 't' ||
    ch === 'f' ||
    ch === 'j' ||
    ch === '.' ||
    ch === ','
  ) {
    return weight >= 600 ? 0.34 : 0.3;
  }
  if (ch === 'm' || ch === 'w' || ch === 'M' || ch === 'W') {
    return weight >= 600 ? 0.82 : 0.78;
  }
  return weight >= 600 ? 0.62 : 0.56;
}

function wrapText(text, maxWidthPx, fontSize, weight) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = '';
  let lineWidth = 0;

  const width = (s) =>
    [...s].reduce((acc, ch) => acc + charWidth(ch, weight) * fontSize, 0);

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    const candidateWidth = width(candidate);
    if (line && candidateWidth > maxWidthPx) {
      lines.push(line);
      line = word;
      lineWidth = width(word);
    } else {
      line = candidate;
      lineWidth = candidateWidth;
    }
    if (lines.length >= 3) break;
  }
  if (line && lines.length < 3) lines.push(line);
  return lines;
}

const TITLE_SIZE = 68;
const DESC_SIZE = 26;
const MAX_TITLE_W = 940;
const MAX_DESC_W = 900;

function renderCard({ eyebrow, title, description, pathLabel }) {
  const titleLines = wrapText(title, MAX_TITLE_W, TITLE_SIZE, 700).slice(0, 2);
  const descLines = wrapText(description, MAX_DESC_W, DESC_SIZE, 400).slice(
    0,
    3,
  );

  // If the wrapped title overflows, ellipsize the last line.
  if (wrapText(title, MAX_TITLE_W, TITLE_SIZE, 700).length > 2) {
    const last = titleLines[titleLines.length - 1];
    titleLines[titleLines.length - 1] = last.slice(0, -1) + '…';
  }
  if (wrapText(description, MAX_DESC_W, DESC_SIZE, 400).length > 3) {
    const last = descLines[descLines.length - 1];
    descLines[descLines.length - 1] = last.slice(0, -1) + '…';
  }

  const titleY = 248;
  const titleGap = 78;
  const descY = titleY + titleLines.length * titleGap + 16;

  const gridLines = [];
  for (let x = 0; x <= W; x += 32) {
    gridLines.push(
      `<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${C.grid}" stroke-width="1"/>`,
    );
  }
  for (let y = 0; y <= H; y += 32) {
    gridLines.push(
      `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${C.grid}" stroke-width="1"/>`,
    );
  }

  const titleSvg = titleLines
    .map(
      (line, i) =>
        `<text x="64" y="${titleY + i * titleGap}" font-family="Geist" font-weight="700" font-size="${TITLE_SIZE}" fill="${C.fg}">${escapeXml(line)}</text>`,
    )
    .join('\n');

  const descSvg = descLines
    .map(
      (line, i) =>
        `<text x="64" y="${descY + i * 42}" font-family="Geist" font-weight="400" font-size="${DESC_SIZE}" fill="${C.muted}">${escapeXml(line)}</text>`,
    )
    .join('\n');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${C.accent}" stop-opacity="0.16"/>
      <stop offset="1" stop-color="${C.accent}" stop-opacity="0.02"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${C.bg}"/>
  ${gridLines.join('\n')}
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <line x1="64" y1="0" x2="64" y2="${H}" stroke="${C.accent}" stroke-opacity="0.35" stroke-width="2"/>
  <rect x="96" y="64" width="8" height="8" rx="2" fill="${C.accent}"/>
  <text x="120" y="74" font-family="Geist" font-weight="600" font-size="20" fill="${C.fg2}">${escapeXml(SITE.title)}</text>
  <text x="${W - 64}" y="74" text-anchor="end" font-family="Geist" font-weight="400" font-size="16" fill="${C.muted}">${escapeXml(pathLabel)}</text>
  ${titleSvg}
  ${descSvg}
  <text x="64" y="${H - 64}" font-family="Geist" font-weight="600" font-size="18" fill="${C.accent}">${escapeXml(eyebrow)}</text>
  <text x="${W - 64}" y="${H - 64}" text-anchor="end" font-family="Geist" font-weight="400" font-size="18" fill="${C.fg2}">rafafuentes.com</text>
  <rect x="64" y="${H - 88}" width="48" height="4" rx="2" fill="${C.accent}"/>
</svg>`;

  return new Resvg(svg, {
    font: {
      fontFiles: FONTS,
      defaultFontFamily: 'Geist',
      loadSystemFonts: false,
    },
    fitTo: { mode: 'width', value: W },
  })
    .render()
    .asPng();
}

function readFrontmatter(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const fm = {};
  for (const line of match[1].split('\n')) {
    const m = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (m) {
      let value = m[2].trim();
      if (/^['"].*['"]$/.test(value)) value = value.slice(1, -1);
      if (value === 'true') value = true;
      if (value === 'false') value = false;
      fm[m[1]] = value;
    }
  }
  return fm;
}

async function main() {
  fs.mkdirSync(path.join(OUT_DIR, 'posts'), { recursive: true });

  const writingDir = path.join(REPO_ROOT, 'src', 'content', 'writing');
  const posts = fs
    .readdirSync(writingDir)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .map((f) => {
      const fm = readFrontmatter(path.join(writingDir, f));
      return { slug: f.replace(/\.(md|mdx)$/, ''), ...fm };
    })
    .filter((p) => p.title && p.description && !p.draft);

  // Same filtering as getPublishedPosts() in production (drafts excluded).
  const cards = [
    {
      file: 'home.png',
      eyebrow: 'Software Engineer · Málaga, Spain',
      title: 'Rafael Fuentes — Software Engineer',
      description: SITE.description,
      pathLabel: 'HOME',
    },
    {
      file: 'projects.png',
      eyebrow: 'Open source',
      title: 'Projects',
      description:
        'Open-source projects on agent efficiency, durable execution and storage engines.',
      pathLabel: 'PROJECTS',
    },
    {
      file: 'writing.png',
      eyebrow: 'Notes & deep dives',
      title: 'Writing',
      description:
        'Notes and deep dives on agents, distributed systems and data infrastructure.',
      pathLabel: 'WRITING',
    },
    {
      file: '404.png',
      eyebrow: 'Rafael Fuentes · Software Engineer',
      title: 'Page not found',
      description: "The page you're looking for doesn't exist or has moved.",
      pathLabel: '404',
    },
    ...posts.map((p) => ({
      file: `posts/${p.slug}.png`,
      eyebrow: 'Writing',
      title: p.title,
      description: p.description,
      pathLabel: 'POST',
    })),
  ];

  for (const card of cards) {
    const png = renderCard(card);
    const out = path.join(OUT_DIR, card.file);
    fs.writeFileSync(out, png);
    console.log(`og ${card.file} -> ${png.length} bytes`);
  }

  console.log(`Generated ${cards.length} OG image(s) in public/og/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
