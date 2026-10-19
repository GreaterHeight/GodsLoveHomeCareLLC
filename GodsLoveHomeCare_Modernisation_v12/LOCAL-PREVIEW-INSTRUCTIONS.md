# Local Preview Instructions

The previous screenshot showed unstyled HTML and broken images. The most likely cause is that the page was opened directly as a `file://` document, while its HTML referenced assets using site-root paths. This version rewrites those HTML asset and navigation references to page-relative paths.

For a proper preview, extract this ZIP and start an HTTP server from the extracted folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/` in your browser. Do not double-click `index.html` to preview it.

This path adjustment makes local preview and repository-subpath hosting more robust. Browser-based visual verification is still required; the changes do not prove pixel-perfect equivalence.
