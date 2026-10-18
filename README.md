# God's Love Home Care, LLC — Static Reconstruction (Preview)

This is a first static reconstruction generated from the supplied WinHTTrack archive.

## Goals and current status
- Keeps the original public page content and most original layout markup/styles.
- Uses directory `index.html` routes to preserve extensionless URLs (e.g. `/About-Us/`).
- Removes DNN/WebForms server state and ASP.NET postback scripts.
- Replaces DNN search with a local static search index.
- Retains captured original images, CSS/JS bundles, logo, and homepage video. Suspect 1×1 DNN resource placeholders were excluded.
- Corrects the Privacy and Terms page title metadata only; legal wording is unchanged.
- Adds a small static JavaScript layer for search, mobile menu fallback, and honest form-pending messages.

## IMPORTANT — Not ready for production
1. Contact, newsletter, and job application submissions are not connected. The interface displays a clear notice instead of pretending to submit.
2. The original application form includes highly sensitive fields, including Social Security number and date of birth. Do not enable this form until the client approves a secure provider, access controls, data retention, and legal/privacy review.
3. The original archive has missing images/resources recorded in the audit. The site still needs a visual comparison against the live original and replacement of any confirmed missing assets.
4. The missing audio file `Discover-God's-Love-Homecare.mp3` was not included in the archive. The visible audio control now reports this rather than throwing a playback error.
5. The archive's HTTrack log identifies additional original image/banner resources that failed to download; these must be recovered or client-approved substitutes selected after visual comparison.
6. This is an initial reconstruction build; every page still needs browser testing at desktop/tablet/mobile widths.
7. Do not point production DNS to GitHub Pages until the client approves the content and the forms are configured and tested.
8. The target domain is `godslovehomecarellc.com`, but no `CNAME` file has been added to avoid changing the custom-domain configuration before QA.
9. All absolute asset/search paths assume the site is served at the root of the retained custom domain. A repository/project-site preview URL will need a configured base path or a custom domain attached before those paths work.

## Local preview
Serve the folder with any static HTTP server from its root. Do not open HTML files directly with `file://`, because the static search index uses `fetch()`.

## Expected routes
- `/`
- `/About-Us/`
- `/Our-Services/`
- `/Our-Career/`
- `/Contact-Us/`
- `/Application-Form/`
- `/Blog/`
- `/Resources/`
- `/Privacy/`
- `/Terms/`
- `/Certified-Nursing-Care-Assistant/`
- `/Registered-Nurses/`
- `/Office-Manager/`
- `/The-Director/`
- `/Choosing-the-Best-Personal-Care-for-Your-Loved-Ones/`
- `/Peer-Support-for-Clients-Mental-Health-Recovery/`
- `/The-Future-of-Home-Care-Trends-and-Innovations/`
- `/Search/`

## QA before production
- Compare each page screenshot against the original site.
- Verify all images and CSS background images.
- Test mobile navigation and page interactions.
- Verify internal links and canonical URLs.
- Approve the external form/newsletter services and connect real endpoints.
- Review legal text and current business information with the client.
- Add sitemap.xml, robots.txt, canonical tags and a CNAME only after domain/repository decisions.

## Additional files
- `404.html`: custom not-found page.
- `.nojekyll`: disables Jekyll processing.
- `GITHUB-PAGES-DEPLOYMENT.md`: deployment instructions and production checklist.

**Visual parity note:** The HTTrack archive has missing page-banner and decorative background images. Broken inline background references have been neutralized with a temporary light fallback rather than pointing to HTTrack error pages. See the audit package's `GodsLoveHomeCare_Missing_Background_Assets.csv`; restore original assets before production.
