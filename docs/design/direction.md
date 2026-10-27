# Design direction

The site is a senior engineer's notebook, not a product landing page. A reader should leave knowing
how Rafael thinks about systems, because they just read him do it. Every design decision below
serves that.

## Principles

1. **Writing is the product.** Case studies and posts carry the site. The home page is an index into
   them, not a pitch.
2. **Earn every claim.** A number appears only inside the case study that explains how it was
   measured. No free-floating metric tiles.
3. **Nothing announced before it exists.** A project appears once its repository is public and has a
   first milestone; a post appears once it is finished.
4. **Restraint over decoration.** One typeface family, one accent colour, no ornament that doesn't
   carry information.
5. **Real artefacts over illustration.** Architecture diagrams, charts drawn from real data and
   sanitized screenshots of real systems — never stock imagery, emoji or generated illustrations.

## Avoid — these read as templated or AI-generated

| Pattern | Why |
|---|---|
| Coloured or gradient words inside a headline | Landing-page trope; competes with content |
| "I build X for Y" hero with a row of CTA buttons | Sales voice, not engineer voice |
| Metric tiles (big number + caption grid) | Claims without methodology |
| Decorative grid / dot / glow backgrounds | Ornament with no information |
| Pills/chips on every card | Visual noise; tech stacks belong in prose or one metadata line |
| Hover-lift cards with shadows | Product-UI affordance on static reading content |
| "Let's talk" / "Get in touch" CTA blocks | Marketing pattern |
| Staggered entrance animations | Draws attention to the page instead of the text |
| Emoji in headings, "🚀", "✨" | Tone |

## Do

| Area | Rule |
|---|---|
| Layout | Single reading column, max ~680 px for text; wide figures may break out to ~960 px |
| Type | Geist for UI/headings, a text-optimised size (17–18 px body, 1.65 line-height); Geist Mono only for code, data and metadata |
| Colour | Near-black on off-white and the inverse; one accent used only for links and focus |
| Home | Short first-person intro (2–3 sentences, plain voice), then *Work* (case studies), *Writing*, *Projects* as simple lists with one-line descriptions and dates |
| Case study | Fixed structure: Context · Problem · Constraints · Architecture (diagram) · Key decisions and trade-offs · Results (with how they were measured) · What I'd do differently |
| Figures | Numbered, captioned (`Figure 2 — Ingestion pipeline`), light/dark aware, alt text that states what the figure shows |
| Diagrams | Rendered to static SVG at build time; consistent stroke, font and palette across the site |
| Charts | Static SVG from committed data files (CSV/JSON); axis labels and units always; no client-side chart libraries |
| Screenshots | Sanitized (no customer names, hosts, IPs, personal data), cropped to the point being made, framed with a 1 px border |
| Motion | None beyond colour transitions on links and focus states |
| Voice | First person, concrete, past tense for shipped work; no superlatives ("blazing", "cutting-edge", "world-class") |

## References

Sites whose restraint and depth to aim for: eugeneyan.com, brooker.co.za, jvns.ca,
lilianweng.github.io, danluu.com.

## Content rules

- Every figure on the site must match the CV. If a number cannot be sourced, it is removed.
- Employer systems are described only after the employer approves the text and every image; names
  of customers, partners, hosts and internal tools are generalised.
- Personal job-search notes never go in this repository — it is public.
