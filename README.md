# PDFKit — Free Browser-Based PDF Toolkit

A 100% client-side PDF toolkit. No backend, no uploads, no cost to run. Files are processed entirely in the user's browser.

## Tools

- **Merge PDF** (`merge.html`) — combine multiple PDFs in any order
- **Split PDF** (`split.html`) — extract page ranges or split into individual pages
- **Compress PDF** (`compress.html`) — re-rasterise pages at lower DPI / JPEG quality
- **PDF to Image** (`pdf-to-image.html`) — convert pages to JPG or PNG

## Tech

- Pure HTML / CSS / JS — no build step
- [pdf-lib](https://pdf-lib.js.org/) — merge/split/embed
- [pdf.js](https://mozilla.github.io/pdf.js/) — rendering for compress + image conversion
- [JSZip](https://stuk.github.io/jszip/) — bundling multi-file outputs
- All loaded via CDN (unpkg)

## Run locally

Open `index.html` directly in a browser, **or** serve the folder over HTTP (some browsers restrict `file://` for workers):

```powershell
# Python (if installed)
python -m http.server 8000

# or Node http-server (if installed)
npx http-server -p 8000
```

Then visit http://localhost:8000.

## Deploy

### Vercel (easiest)
1. Push folder to GitHub
2. Import on https://vercel.com/new — auto-detected as static, deploys in ~30s

### Netlify
- Drag-and-drop the folder onto https://app.netlify.com/drop

### GitHub Pages
- Push to GitHub, enable Pages on `main` branch, root directory

## Monetization roadmap

1. **Phase 1 (months 1–3)** — SEO + traffic
   - Each tool has its own URL with targeted meta tags
   - Add Google AdSense once approved
2. **Phase 2 (months 3–6)** — Pro tier
   - $9/mo: bulk processing, batch ZIP, larger files, OCR, watermark removal
3. **Phase 3** — API access for developers

## SEO checklist

- [ ] Add `sitemap.xml` listing all tool URLs
- [ ] Add `robots.txt`
- [ ] Add Open Graph + Twitter Card meta tags
- [ ] Submit to Google Search Console
- [ ] Build backlinks: list on AlternativeTo, Product Hunt, BetaList
