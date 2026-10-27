#!/usr/bin/env bash
# AC1 negative check: break ONE audited route in the built output, then run the
# unchanged budget. Expect `npm run test:lighthouse` to exit non-zero and name
# only that route. Run from the repo root after `npm run build`.
set -u
mode="${1:?usage: regress.sh seo|a11y}"
case "$mode" in
  # SEO: noindex on /projects/ only (is-crawlable fails)
  seo)  perl -0pi -e 's#<head>#<head><meta name="robots" content="noindex">#' dist/projects/index.html ;;
  # Accessibility: drop <html lang> and add an unlabelled image on /writing/ only
  a11y) perl -0pi -e 's#<html lang="[^"]*"#<html#; s#<main([^>]*)>#<main$1><img src="/favicon.svg"><button></button>#' dist/writing/index.html ;;
esac
npm run test:lighthouse
