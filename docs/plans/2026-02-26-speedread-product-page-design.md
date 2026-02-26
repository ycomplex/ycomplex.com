# SpeedRead Product Page Design

## Overview

Add SpeedRead as a second software product on the YComplex website. SpeedRead is a cross-platform (iOS & Android) speed reading app using RSVP (Rapid Serial Visual Presentation) — displaying words one at a time with a highlighted focal letter.

**Status**: Coming Soon (not yet released)

## Deliverables

### 1. Composite screenshot (`assets/speedread-screenshot.png`)

Combine two phone screenshots side by side on a dark background:
- Left: Library view (IMG_3923.PNG) — document list with search
- Right: RSVP reader view (IMG_3925.PNG) — word display with focal letter, WPM controls

Source files: `/Users/akshay/Development/FastReader/repo/tmp/`

### 2. Product card on `software.html`

New card in the `.products` grid, following the existing GrokDown card pattern:
- Image: `assets/speedread-screenshot.png`
- Name: "SpeedRead"
- Badge: "iOS & Android"
- Description: Short tagline about speed reading with RSVP
- Footer: "Coming Soon" badge + "View →" link
- Links to: `software/speedread.html`

### 3. Detail page (`software/speedread.html`)

Mirrors `software/grokdown.html` structure exactly:

**Hero section:**
- Composite screenshot with radial glow and shadow
- Title: "SpeedRead"
- Tagline: "Read anything, faster. One word at a time."

**Platform badges:** "iOS" · "Android" · "React Native"

**Description paragraph:**
SpeedRead uses RSVP to display text one word at a time with a highlighted focal letter, enabling rapid reading at up to 1000 WPM. Import EPUB, PDF, TXT, and Markdown files, or add web articles by URL — then read them at your own pace.

**Feature grid (2x2):**

| Feature | Description |
|---------|-------------|
| RSVP Speed Reading | Word-by-word display with a highlighted focal letter for rapid reading at up to 1000 WPM |
| Multi-Format Support | Import and read EPUB, PDF, TXT, and Markdown files, or add web articles by URL |
| Customizable Reader | Choose from 9 monospace fonts, adjust reading speed, pick your highlight color, and select play mode |
| Smart Navigation | Chapter-by-chapter navigation for EPUBs with intelligent pausing at sentence and paragraph boundaries |

**CTA section:**
- "Coming Soon" styled text (no download button)
- Subtext: "iOS & Android"

## Technical notes

- All CSS follows existing patterns in `grokdown.html` — no new design system additions needed
- Mesh background: `initMesh({ nodeCount: 30, connectionDistance: 160 })` (same as GrokDown)
- Nav includes back-link to `../software.html`
