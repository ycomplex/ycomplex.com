# Design: Software Showcase + GrokDown Product Page

## Site Structure

```
index.html                  (homepage — add link on "Software")
software.html               (product showcase — card grid)
software/grokdown.html      (GrokDown detail page)
style.css                   (shared design system extracted from homepage)
assets/grokdown-screenshot.png
```

## Shared Design System

Extract CSS from homepage into `style.css`:
- CSS variables (colors, fonts)
- Grain overlay, corner accents, animated mesh background
- Typography classes, link hover effects, animations
- Minimal nav: YComplex wordmark (links home) + breadcrumbs

## Homepage Change

Make "Software" in the tagline `Digital · AI · Software` a link to `software.html`. Same dim color, gold underline-on-hover matching the email link style.

## Software Page (software.html)

- Minimal header: YComplex wordmark top-left, email top-right
- Page title: "Software" in large Syne + subtitle
- Card grid (responsive CSS grid), one card per product:
  - Screenshot hero image with subtle border/glow
  - Product name in Syne bold
  - One-line description in IBM Plex Mono dim
  - Platform badge ("macOS")
  - Entire card links to detail page
  - Hover: lift + gold border glow
- Scales to more products by adding cards

## GrokDown Page (software/grokdown.html)

- Same nav header
- Hero: large screenshot with gold glow/shadow, product name + one-liner
- Description: 2-3 friendly sentences about what GrokDown does
- Feature highlights: 4 key features as minimal cards
  - Local-first media library
  - Smart tagging & filtering
  - Direct import from Grok
  - HD video support
- "Coming Soon" CTA button/badge + contact email for inquiries
- Platform badge: "Built for macOS"

## GrokDown Copy

**One-liner:** Your Grok Imagine media, organized locally on your Mac.

**Description:** GrokDown is a native macOS app that brings order to your Grok Imagine creations. Browse, tag, and filter your AI-generated images and videos in a beautiful local gallery — no cloud, no accounts, just your media on your Mac.

**Features:**
- Local-first library — your media stays on your Mac, organized in folders you control
- Smart tagging & filtering — tag media, filter by type, find anything instantly
- Direct Grok import — download favorites straight from Grok Imagine without leaving the app
- HD video support — automatic SD/HD matching with inline and fullscreen playback
