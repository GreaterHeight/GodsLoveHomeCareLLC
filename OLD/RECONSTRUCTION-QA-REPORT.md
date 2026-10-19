# Reconstruction QA — God's Love Home Care, LLC

## Current preview-path fix
The earlier preview screenshot showed browser-default styling and broken images. The HTML was using root-absolute local paths, which can fail when opened directly from disk or served beneath a repository subpath. This version rewrites root-absolute HTML `href`, `src`, `poster`, `action`, and common lazy-image attributes to page-relative paths.

## Structural checks
- 19 HTML documents included.
- HTML local-reference audit: zero unresolved references after the path rewrite.
- The latest prior audit found no missing viewport metadata, primary H1 headings, image alt attributes, or meta descriptions.
- 16 JavaScript files passed syntax checks in the prior audit.
- ZIP integrity is checked after packaging.

## Still not verified
- No successful browser screenshot comparison has been completed in this execution environment.
- Eight original banner/background asset paths remain absent from the HTTrack archive.
- The homepage audio file `Discover-God's-Love-Homecare.mp3` remains absent.
- Contact, newsletter, and application forms are not production-connected.
- The source application form requests SSN and date of birth. Do not activate collection without an approved secure provider and data-handling process.
- GitHub Pages deployment and domain cutover have not been performed.

## Preview
Extract the package and run `python -m http.server 8000` from the extracted site directory, then open `http://localhost:8000/`. Do not open the HTML file directly as `file://`.

## Acceptance sequence
1. Preview through a local HTTP server and inspect desktop/tablet/mobile.
2. Recover original missing assets or obtain approval for replacements.
3. Test navigation, search, forms, and interactive controls.
4. Approve secure form/newsletter providers.
5. Deploy to a staging GitHub Pages URL, verify paths, and obtain sign-off before DNS changes.
