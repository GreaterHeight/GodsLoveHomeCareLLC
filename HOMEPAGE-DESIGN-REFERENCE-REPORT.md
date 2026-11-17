# Homepage Design Reconstruction — v15

## Reference
Implemented against the user-supplied `HomeGodslove.png` reference. The homepage's existing content and public URL are retained.

## Homepage layout treatment
- Hero: full-width deep-green photographic treatment, centered headline and supporting copy.
- Four care-category cards: gold cards overlapping the hero, with circular image treatments.
- Welcome/about section: white background, green headline, two-column content and caregiver image.
- Services section: gold background, centered heading and service cards.
- Why Choose Us: deep-green section with four value propositions.
- Mission statement: white two-column editorial section.
- Service-area/map section: white two-column section.
- Footer: deep-green background with gold headings and white copy.

## Technical approach
- Added `assets/css/home-reference.css` as a homepage-only stylesheet.
- Added semantic classes to the homepage sections to avoid relying on fragile positional selectors.
- Other pages are not assigned the homepage-specific class and therefore do not inherit this visual treatment.
- Existing HTML content, links and asset paths are retained.

## QA limitations
Automated structural checks only. A full visual comparison at desktop and mobile breakpoints still requires browser rendering and human review. Hero background image treatment uses the existing page styling and available media; verify image selection and crop in staging.
