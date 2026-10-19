# Missing asset drop-in folders

This package now contains the destination directories for all known missing original images and audio.
The directories mirror the original website paths. When you obtain the real files, copy them into these
folders using the exact names in `MISSING-ASSET-PLACEMENT-MANIFEST.csv`.

## Missing images
1. `Portals/0/ThemePluginPro/uploads/2024/12/23/GodsLoveHomeCare-Resources-Banner.jpg`
2. `Portals/0/ThemePluginPro/uploads/2024/12/23/Home-God's-Love-Home-Care-Career-Banner.jpg`
3. `Portals/0/ThemePluginPro/uploads/2024/12/24/God's-Love-Home-Care-COntact-Us-Banner.jpg`
4. `Portals/_default/ContentBuilder/glend-page/AboutUs03/AboutUs03-bg01.jpg`
5. `Portals/_default/ContentBuilder/glend-page/Medical01/medical01-bg01.png`
6. `Portals/_default/ContentBuilder/glend-page/Medical01/medical01-bg02.jpg`
7. `Portals/_default/ContentBuilder/glend-page/Medical01/medical01-bg06.png`
8. `Portals/_default/ContentBuilder/glend-page/Medical01/medical01-bg07.png`

## Missing audio
9. `Portals/0/ThemePluginPro/uploads/2026/5/26/Discover-God's-Love-Homecare.mp3`

## Important
- Exact filenames and capitalization matter on GitHub Pages.
- Do not create empty `.jpg`, `.png`, or `.mp3` files; the actual media bytes are required.
- Existing page markup and source references should point to these locations; adding the real files at these paths is the intended restoration method.
- The homepage video is already present at `Portals/0/ThemePluginPro/uploads/2024/12/21/Home-God's-Love-Home-Care-Video.mp4`.
- Use an HTTP server to preview the site rather than opening HTML files directly as `file://`.
