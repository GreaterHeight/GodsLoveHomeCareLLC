# God's Love Home Care — v16 Homepage Regression Correction

## Purpose
Correct the homepage regressions visible in the supplied v15 screenshot. The v15 homepage styling had expanded the hero, lost the video presentation, compressed the four care cards, and left unwanted document-height behaviour.

## Changes
1. Restored the original local homepage MP4 as the actual hero video layer. The existing `<video autoplay loop muted playsinline>` source is retained and the video is positioned to cover the hero section.
2. Corrected the hero section's sizing and content container. Desktop hero height is constrained with a responsive clamp rather than growing with the content.
3. Corrected the care-card carousel layout. Four cards display in four equal desktop columns, two columns on medium screens, and one column on narrow mobile screens. Legacy carousel flex widths are overridden.
4. Removed the empty legacy audio-player section from the homepage. It contained only comments and created an unnecessary layout section.
5. Added document-flow rules so the main wrapper fills the viewport and the footer follows content without leaving a large blank region below it.
6. Kept the v13 image-loading fix and the v15 homepage design styles.

## Automated checks
- Homepage HTML is present and parseable as text.
- Homepage fix stylesheet is linked.
- Original video source reference is retained.
- Original video file exists in the package.
- Empty audio widget shell removed.
- Legacy image-loading fix remains linked.
- ZIP archive integrity verified.

## Not yet verified
A real browser visual review and playback check have not been performed in this environment. Please preview the package locally before deployment. Browser-specific video autoplay can be restricted by device/browser power-saving settings; the video is muted and uses `playsinline` to support autoplay policies.

## Deployment
Replace the staging site's files with the contents of this ZIP. Do not deploy to the live domain until the desktop and mobile visual checks are approved.
