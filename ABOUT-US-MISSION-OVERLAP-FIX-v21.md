# About Us Mission Statement Overlap Fix — v21

## Observed issue
The Mission Statement paragraph was rendering on top of the photograph at desktop/tablet widths, reducing text contrast and readability.

## Root cause identified in the page markup
- The image and copy were placed in separate Bootstrap columns (`col-lg-5` and `col-lg-6`), but the copy column also carried the `.container` class.
- That nested container introduced its own width and horizontal padding inside the parent grid, making the two columns encroach on one another.
- The row relied on legacy grid/flex styling and did not establish a robust two-column layout.

## Correction
- Added a dedicated `about-mission-row` class to the Mission Statement row only.
- Removed the conflicting `.container` class from the text column.
- Applied an explicit two-column CSS grid at desktop widths with a clear gap.
- At tablet/mobile widths, the image and text stack into separate full-width rows.
- Preserved the existing image, text, typography, colours and section content.

## Verification
- Confirmed the Mission Statement image and copy are separate grid children in the source.
- Confirmed the mobile breakpoint switches the row to one column.
- Archive integrity is checked after packaging. Live browser visual verification is not claimed.
