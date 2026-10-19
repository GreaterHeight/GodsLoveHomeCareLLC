# GitHub Pages Deployment Notes

## Current state
This is a static-only site. No build step or server runtime is required. The current HTML assumes the site is served at the root of `https://godslovehomecarellc.com/`.

## Before publishing
1. Confirm the GitHub repository name and account/organization owner.
2. Upload the **contents** of the `site/` directory to the repository root (not the `site` folder itself, unless Pages is configured to publish that folder).
3. Keep `.nojekyll` at the published root.
4. Enable GitHub Pages for the selected branch and folder.
5. Test on the provided staging URL. If the staging URL is a project URL such as `username.github.io/repository/`, root-absolute links and assets will point to the host root. Use a custom-domain staging setup or configure a base path before testing there.
6. Do not create or publish `CNAME` until the client confirms the domain DNS owner and production cutover plan.
7. Once approved, configure the custom domain in GitHub Pages and set the DNS records according to GitHub's current official documentation. Verify HTTPS before announcing the site.

## Production gate
Do not switch DNS until:
- all pages have passed visual comparison at desktop and mobile sizes;
- missing images/audio have been recovered or replacements approved;
- contact, newsletter, and job application services are configured and tested with dummy data;
- the application form's sensitive fields have been reviewed and justified;
- legal content and current business information are client-approved;
- redirects and canonical URLs have been verified.

## Form providers
The HTML forms are currently preview-only. Do not treat button clicks as successful submissions. Configure endpoints only after the client approves the providers, account ownership, notification recipients, privacy terms, and data-retention controls.
