# Pre-Publication Acceptance Checklist — God's Love Home Care, LLC

## Current state

This is a static reconstruction preview, not a production launch. The source archive remains the source of truth for copied content and assets. The current build deliberately avoids server-dependent DNN behavior.

## Automated checks completed

- [x] Static page-level audit generated.
- [x] Local HTML references checked against the generated files.
- [x] Responsive viewport metadata checked.
- [x] Image elements checked for missing `alt` attributes.
- [x] Presence of a primary `<h1>` checked per page.
- [x] Page-level QA matrix exported to `GodsLoveHomeCare_Page_QA_Matrix.csv`.
- [x] Previous HTML/CSS path checks, JavaScript syntax checks, and ZIP integrity checks recorded in the reconstruction QA report.

## Outstanding acceptance gates

### 1. Restore missing original assets
- [ ] Obtain the original missing banner/background images listed in `GodsLoveHomeCare_Missing_Background_Assets.csv`.
- [ ] Obtain the missing homepage audio file `Discover-God's-Love-Homecare.mp3`, or obtain written approval to omit the audio feature.
- [ ] Replace temporary neutral backgrounds with the recovered original assets.
- [ ] Re-run asset checks after assets are restored.

### 2. Human visual and responsive review
- [ ] Compare each reconstructed page with the offline/source reference at desktop width.
- [ ] Repeat at tablet and mobile widths.
- [ ] Verify navigation dropdowns, mobile menu, sliders/carousels, and other interactive controls.
- [ ] Verify image crops, background positioning, spacing, typography, and footer behavior.
- [x] Add visually-hidden primary headings to pages that lacked an `<h1>` without changing their visible layout; recheck the QA matrix.

**Important:** Automated browser screenshot capture could not be completed in this environment. No visual-equivalence or interaction-pass claim is made.

### 3. Forms and data handling
- [ ] Select and approve a form provider and endpoint for contact enquiries.
- [ ] Select and approve a newsletter provider and subscription workflow.
- [ ] Decide whether the job application form should collect sensitive identifiers at all. The captured source form requests SSN and date of birth; do not collect these through a basic static form or email.
- [ ] If applications remain in scope, use an approved secure provider and documented privacy/data-retention process.
- [ ] Test submissions with dummy data only and confirm validation, success/failure states, spam protection, and privacy wording.
- [ ] Keep form submission disabled until the above are completed.

### 4. GitHub Pages and domain
- [ ] Decide the GitHub repository and whether deployment will use a custom domain or a repository subpath.
- [ ] If retaining `godslovehomecarellc.com`, confirm who controls DNS and approve the cutover window.
- [ ] Confirm that all asset paths work for the chosen GitHub Pages URL structure.
- [ ] Configure GitHub Pages, HTTPS, and the custom domain only after visual, content, and form acceptance.
- [ ] Validate `sitemap.xml`, `robots.txt`, canonical URLs, and 404 behavior on the actual staging URL.

### 5. Final sign-off
- [ ] Client confirms all pages and copy are present.
- [ ] Client approves any unavoidable differences caused by missing source assets or unsupported DNN features.
- [ ] Accessibility and SEO review completed.
- [ ] Final desktop/mobile review signed off.
- [ ] Production deployment authorized.

## Deployment caution

Root-absolute paths in this build assume a root-hosted site/custom domain. A GitHub Pages project URL such as `username.github.io/repository/` may require a base-path adjustment. Do not publish to a repository subpath without testing and resolving that routing assumption.
