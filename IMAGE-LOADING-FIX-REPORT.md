# Image Loading Fix — v13

## Problem
The migrated pages retained the original ThemePluginPro/DNN lazy-image markup. Images used `data-src` with a transparent SVG placeholder in `src`, plus the `img-Lazy` class. The legacy CSS generated a circular spinner over `.img-Lazy-warp` elements. This left the loading indicator visible when the legacy lazy-loading script did not complete.

## Changes
- Promoted all 42 discovered `data-src` image URLs into normal `src` attributes across 19 HTML documents.
- Removed the legacy `img-Lazy` class from those images so the old plugin no longer controls their visibility.
- Added native browser `loading="lazy"` and `decoding="async"` hints to converted images.
- Added `assets/css/image-loading-fix.css` to all 19 HTML documents.
- Suppressed legacy spinner overlays and forced image visibility without hiding the actual images.

## Automated checks
- 19 HTML documents processed.
- 42 lazy image references converted.
- 42 legacy image classes removed.
- 0 remaining `img[data-src]` references.
- 0 pages missing the new stylesheet reference.
- Browser visual verification and Lighthouse testing have not yet been performed.

## Notes
The change removes the legacy spinner dependency and lets the browser load the image URLs directly. It does not guarantee that every remote or missing image URL is reachable; broken image URLs still need separate asset/link checks.
