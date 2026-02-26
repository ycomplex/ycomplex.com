# YComplex Website

Static website for YComplex — Digital & AI Consulting and Software Services.

## Structure

```
index.html              Homepage (landing page, links to Software)
software.html           Software product showcase (card grid)
software/grokdown.html  GrokDown product detail page with download
software/speedread.html SpeedRead product detail page (Coming Soon)
style.css               Shared design system (variables, nav, animations, grain, corners)
mesh.js                 Shared animated network mesh background (configurable)
404.html                Custom 404 error page
.htaccess               Apache config (routes 404s to 404.html)
assets/                 Images, screenshots, and downloadable files
  grokdown-screenshot.png
  GrokDown-1.0.0.dmg
  speedread-screenshot.png
docs/plans/             Design documents
```

## Design System

- **Aesthetic**: Dark geometric minimalism — near-black background (#050508), warm gold accent (#c9a84c), grain texture overlay
- **Fonts**: Syne (display/headings, weight 800) + IBM Plex Mono (body/mono, weight 300-400) via Google Fonts
- **CSS variables**: Defined in `:root` in `style.css` — all pages must use these
- **Mesh background**: Canvas-based animated network nodes. Pass config to `initMesh()` — use fewer nodes on content pages (30-35) vs homepage (60)
- **Shared elements**: Nav bar, corner accents, grain overlay, link hover effects — all in `style.css`

## Pages

- **Homepage** (`index.html`): Centered brand with animated mesh, tagline links to Software page, contact email
- **Software** (`software.html`): Product card grid. Each card has screenshot, name, description, platform badge, and links to its detail page
- **GrokDown** (`software/grokdown.html`): Product detail with hero screenshot, description, 2x2 feature grid, and DMG download button
- **SpeedRead** (`software/speedread.html`): Product detail with hero composite screenshot (library + reader views), description, 2x2 feature grid, and "Coming Soon" CTA. iOS & Android RSVP speed reading app.
- **404** (`404.html`): Ghost-outline 404 with sparse mesh and link back to homepage

## Adding a New Software Product

1. Add a card to `software.html` inside `.products` grid
2. Create `software/<product-name>.html` following the pattern of `software/grokdown.html`
3. Add screenshot to `assets/`

## Updating a Software Download

1. Copy the new DMG/binary to `assets/`
2. Update the download link and version info in the product's detail page

## Deployment

- **CI/CD**: GitHub Actions (`.github/workflows/deploy.yml`)
- **Trigger**: Push to `main`
- **Method**: rsync over SSH to remote host (Ed25519 deploy key)
- **Host**: Configured via GitHub Secrets (`DEPLOY_SSH_KEY`, `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_PATH`)
- **Deploy path**: `/home/akshayr/www/ycomplex.com`
- **Excluded from deploy**: `.git/`, `.github/`, `docs/`, `CLAUDE.md`

## Commands

```bash
# Local dev server (needed for sub-pages with relative paths)
python3 -m http.server 8000 --directory /Users/akshay/Development/website

# Deploy happens automatically on push to main
git push origin main
```

## Contact

contact@ycomplex.com
