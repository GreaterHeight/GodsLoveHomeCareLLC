# Sitewide Footer & Mobile Compatibility — v20

## Footer consistency
- Standardised all 19 HTML pages to use the homepage's exact `is-boxes gh-footer-contrast home-footer` four-column content footer.
- The same Contacts, Opening Hours, Subscribe and Quick Links section is now present on the standalone Search and 404 pages as well as all content/legal pages.
- Preserved the shared `gh-footer-bottom-inner` legal strip and footer background.

## Mobile compatibility
- Added `assets/css/sitewide-mobile-compatibility.css` and linked it on all HTML pages.
- On mobile, content columns stack vertically; images/media scale within their containers; text wraps; tables scroll horizontally when needed.
- Disabled parallax and transform offsets on mobile, including `.pscroll` and the decorative `.img-01`/`.img-02`/`.img-03` classes, to prevent the About Us image/text overlap.
- Footer columns stack on phones and the legal strip becomes a centred vertical layout. Tablet footer columns use a two-column arrangement.

## Visual preservation
- Responsive rules are scoped to mobile/tablet breakpoints. Desktop design, colours, typography, content and existing imagery are retained.
- No page redesign or asset replacement was performed.

## Verification
- Source validation: all HTML pages include the canonical homepage content footer, shared footer-bottom strip, and mobile stylesheet.
- A live browser/device rendering session was not available here; visual confirmation on physical iOS/Android devices is still recommended.
