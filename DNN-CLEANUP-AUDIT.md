# DNN Cleanup Audit — v19

## Scope
Static HTML/CSS/JavaScript export of the God's Love Home Care website. The cleanup is deliberately conservative: preserve the existing visual design, content, layout classes, local theme assets, and working page interactions.

## Removed
- Empty `DNNEmptyPane` placeholders that contained no content.
- Empty ASP.NET `aspNetHidden` wrappers.
- Empty DNN module-loader shells.
- Empty ContentBuilder pane placeholders.
- Legacy `CDF(...)` provider comments that describe server-side DNN resource injection and have no role in the static site.
- Old footer spacer `.home-footer-bottom` is now explicitly hidden at its actual location in the content pane. The previous selector incorrectly scoped it under `#Skip-footer`, so it did not match.

## Footer correction
- Copyright now reads: `© 2026 God's Love Home Care LLC. All Rights Reserved.`
- Existing footer colours, typography, columns, and spacing within the visible footer content are unchanged.
- The spacer itself is removed; the footer background and legal strip remain unchanged.

## Intentionally retained
- Bootstrap/DNG grid and content-builder classes used by the existing layout. Removing these would change the look and feel.
- Local `DependencyHandler.axd` bundled CSS/JS files and `Portals/` theme/media assets. These are static dependencies of the exported design, not live DNN server calls; deleting them without replacing their CSS/JS would break styling or interactions.
- Existing DNN-derived form markup where it is still used as static presentation or is handled by the site's local JavaScript. This audit does not pretend a server-side DNN form backend has been migrated.
- `dnn_content` / content pane wrappers where they contain real page content; they remain as compatibility hooks for existing styles and accessibility layout.

## Important boundary
This is a static-export cleanup, not a complete conversion of every DNN-originated component into a new framework. Any form whose original submission endpoint depended on DNN must be connected to a replacement service before it can be considered fully functional. No visual redesign or backend replacement was introduced.

## Files changed
- `About-Us/index.html`
- `Application-Form/index.html`
- `Blog/index.html`
- `Certified-Nursing-Care-Assistant/index.html`
- `Choosing-the-Best-Personal-Care-for-Your-Loved-Ones/index.html`
- `Contact-Us/index.html`
- `Office-Manager/index.html`
- `Our-Career/index.html`
- `Our-Services/index.html`
- `Peer-Support-for-Clients-Mental-Health-Recovery/index.html`
- `Privacy/index.html`
- `Registered-Nurses/index.html`
- `Resources/index.html`
- `Terms/index.html`
- `The-Director/index.html`
- `The-Future-of-Home-Care-Trends-and-Innovations/index.html`
- `index.html`
