# Production configuration checklist

## Analytics and Search Console
- Create/confirm the owner's GA4 property and insert the approved `G-XXXXXXXXXX` measurement ID in the documented analytics configuration. Do not publish a placeholder ID.
- Verify the domain in Google Search Console, then submit `/sitemap.xml`.
- Check consent and privacy obligations applicable to the business and its visitors before enabling analytics.

## Forms
- Select an owner-approved form provider compatible with static hosting.
- Configure verified recipient addresses and spam protection.
- Test contact, newsletter and job application delivery end-to-end.
- Do not request Social Security numbers or sensitive health information in an ordinary web form. Use a vetted secure workflow if legally required.

## Media
- Eight unavailable background assets have been replaced with relevant existing photography from the supplied site archive. These are substitutions, not recovered originals.
- The homepage audio file was not present in the archive. The website must not claim audio is available until an MP3 is supplied or a replacement recording is approved.

## Release
- Test at desktop, tablet and mobile widths in a real browser.
- Run Lighthouse and accessibility checks against the deployed candidate.
- Check canonical URLs, sitemap, forms, analytics and redirects before pointing the production domain.
