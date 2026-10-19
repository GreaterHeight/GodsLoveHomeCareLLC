# God's Love Home Care, LLC — Modern Static Website

This is a modernisation layer over the verified static reconstruction. It remains compatible with GitHub Pages and uses HTML, CSS and JavaScript; no server runtime or CMS is required.

## Preview locally
Run a static server from this directory (do not open nested HTML files directly with `file://`):

```bash
python -m http.server 8000
```
Then open `http://localhost:8000/`.

## Public URL preservation
Existing route folders and case-sensitive public URL paths are retained. Canonical URLs and sitemap entries use `https://godslovehomecarellc.com/`. Keep the deployed repository/site root aligned with this package and verify all paths before publishing.

## Included improvements
- Premium responsive design layer at `assets/css/modern.css`.
- Per-page title/description inventory and canonical/social metadata.
- XML sitemap, robots directives and homepage Organization JSON-LD.
- Optional analytics loader, disabled until the owner supplies a real GA4 Measurement ID and completes privacy/consent requirements.
- Web app manifest.
- Setup guides for Search Console, analytics and safe form integration.

## Items that still require owner access or additional source media
- Google Search Console verification and sitemap submission.
- GA4 property/Measurement ID and consent configuration.
- Form provider account, verified recipient and end-to-end form delivery test.
- Eight missing original background/banner images and homepage audio are still not present as actual media files in the supplied HTTrack archive. The archive contains error-page captures for several image URLs, not the original image bytes. See `MISSING-ASSET-PLACEMENT-MANIFEST.csv` and `ASSET-RECOVERY-LOG.md`.
- Visual acceptance on a live-like browser/staging deployment and actual field-data performance checks.

## Sensitive application data
Do not use a static form or generic email workflow to collect Social Security numbers, dates of birth, health records or other sensitive applicant/client data. Use a secure, approved workflow if such data is necessary.

## Deployment
Follow `GITHUB-PAGES-DEPLOYMENT.md` and `PRE-PUBLISH-CHECKLIST.md`. Do not change the domain's DNS until the owner approves the release and the staging build has passed visual and functional QA.
