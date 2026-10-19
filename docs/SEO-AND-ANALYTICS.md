# SEO, Search Console and Analytics Setup

## Implemented in this package
- Page-specific meta descriptions, canonical URLs and Open Graph/Twitter metadata for all 18 public page routes.
- XML sitemap uses the existing public URL paths and excludes `/Search/` and `/Application-Form/`.
- `robots.txt` references the sitemap and discourages crawling of search/application URLs.
- Homepage JSON-LD `Organization` data uses only the verified company name, canonical domain and existing logo asset. No unverified address, telephone number, service area, accreditation or opening hours are invented.
- A local analytics loader is present but inert until a real GA4 Measurement ID is configured.
- Sitemap, metadata inventory and canonical URLs should be rechecked after any future content/URL change.

## Google Search Console
1. Add `https://godslovehomecarellc.com/` as a Domain property (recommended) or URL-prefix property.
2. Complete Google's verification using DNS or the chosen verification method. The verification token must be supplied by the site owner; none is fabricated here.
3. Submit `https://godslovehomecarellc.com/sitemap.xml`.
4. Inspect the homepage, About, Services, Contact, Resources and article pages; monitor indexing and Core Web Vitals.
5. Recheck redirects and canonical URLs after deployment.

## Google Analytics 4
1. Create or select the company's GA4 property and obtain its Measurement ID (`G-XXXXXXXXXX`).
2. In each page's `<head>`, add `window.GLHC_GA4_ID = 'G-XXXXXXXXXX';` before the `assets/js/analytics.js` loader. Use `../assets/js/analytics.js` on nested routes. Do not commit credentials or API secrets (the Measurement ID itself is public configuration, not a secret).
3. Publish an appropriate privacy/cookie notice and implement consent controls where legally required before enabling analytics. The current loader does not load anything until a valid ID is set.
4. Validate with GA4 Realtime/DebugView and test that no analytics requests occur while disabled.

## Important scope boundary
Search Console verification and GA4 property setup require access to the owner's accounts. They are not represented as completed in this package. Analytics event definitions should be added only after the actual form/contact workflow is connected and tested.
