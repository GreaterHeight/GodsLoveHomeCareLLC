# Static form integration plan

GitHub Pages serves static files and cannot securely process submissions or send email by itself. Form delivery therefore requires an owner-approved third-party form service or an external endpoint.

## Recommendation
Use **Formspree** for contact/newsletter forms if its terms, privacy controls, retention settings and pricing fit the business. Basin or another reputable static-form provider can be evaluated as alternatives. The account owner must create the service, verify the destination inbox and supply the actual endpoint before the form is connected.

## Before connecting
- Confirm the actual business inbox and who is authorised to receive enquiries.
- Add spam prevention, field validation, success/error states and a clear privacy notice.
- Collect only information necessary to respond to a request.
- Do not collect Social Security numbers, dates of birth, health records or other sensitive application/medical information through a generic contact form or ordinary email.
- For employment applications that require sensitive data, use a secure, approved applicant-tracking or HR system with access controls and retention policies.
- Never show a success message until the provider confirms successful submission.

## Current status
The website package includes the migrated form interfaces, but no live submission endpoint is configured because no provider account, verified recipient or endpoint was supplied. Do not advertise these forms as live until end-to-end delivery has been tested.
