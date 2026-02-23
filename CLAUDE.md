# YComplex Website

Static website for YComplex — Digital & AI Consulting and Software Services.

## Structure

```
index.html              Homepage (landing page)
software.html           Software product showcase (card grid)
software/grokdown.html  GrokDown product detail page
style.css               Shared design system (variables, nav, animations, grain, corners)
mesh.js                 Shared animated network mesh background (configurable)
assets/                 Images (screenshots, etc.)
docs/plans/             Design documents
```

## Design System

- **Aesthetic**: Dark geometric minimalism — near-black background (#050508), warm gold accent (#c9a84c), grain texture overlay
- **Fonts**: Syne (display/headings, weight 800) + IBM Plex Mono (body/mono, weight 300-400) via Google Fonts
- **CSS variables**: Defined in `:root` in `style.css` — all pages must use these
- **Mesh background**: Canvas-based animated network nodes. Pass config to `initMesh()` — use fewer nodes on content pages (30-35) vs homepage (60)
- **Shared elements**: Nav bar, corner accents, grain overlay, link hover effects — all in `style.css`

## Adding a New Software Product

1. Add a card to `software.html` inside `.products` grid
2. Create `software/<product-name>.html` following the pattern of `software/grokdown.html`
3. Add screenshot to `assets/`

## Deployment

- **CI/CD**: GitHub Actions (`.github/workflows/deploy.yml`)
- **Trigger**: Push to `main`
- **Method**: rsync over SSH to remote host
- **Host**: Configured via GitHub Secrets (`DEPLOY_SSH_KEY`, `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_PATH`)
- **Excluded from deploy**: `.git/`, `.github/`, `docs/`, `CLAUDE.md`

## Commands

```bash
# Local dev server
python3 -m http.server 8000 --directory /Users/akshay/Development/website

# Deploy happens automatically on push to main
git push origin main
```

## Contact

contact@ycomplex.com
