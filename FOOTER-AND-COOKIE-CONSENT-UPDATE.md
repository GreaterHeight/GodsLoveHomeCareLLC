# Footer and Cookie Consent Update v17

- Updated 19 HTML documents; replaced 17 legacy footer rows.
- `row-669714` now has copyright left, legal links centered, and developer credit right. Its existing background colour is preserved (no background declaration added).
- Empty DNN footer pane rows are hidden to remove the blank gap between the main footer and legal strip.
- Added a branded Cookie Consent banner with Cookie Settings, Only Necessary Cookies, and Accept All Cookies actions.
- Preferences are stored locally; analytics and marketing categories default to off unless accepted.
- Privacy and Cookie Policy links point to the existing Privacy page anchors.

Important: This static consent UI records preferences but does not automatically gate external analytics/marketing scripts. Those scripts must be connected to the `glhc:cookie-consent-updated` event and must not run before consent. No legal compliance or live-browser verification is claimed.
