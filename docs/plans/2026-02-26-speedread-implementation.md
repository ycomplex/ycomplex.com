# SpeedRead Product Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add SpeedRead as a second product on the YComplex software page, with a product card and detail page.

**Architecture:** Static HTML pages following the existing GrokDown pattern. A composite screenshot is generated from two phone screenshots using a Python script. No new CSS patterns — reuses all existing styles from `grokdown.html`.

**Tech Stack:** HTML, CSS (existing design system), Python/Pillow (one-time image generation), JavaScript (existing mesh.js)

---

### Task 1: Generate composite screenshot

**Files:**
- Source: `/Users/akshay/Development/FastReader/repo/tmp/IMG_3923.PNG` (library view, 1206x2622)
- Source: `/Users/akshay/Development/FastReader/repo/tmp/IMG_3925.PNG` (reader view, 1206x2622)
- Create: `assets/speedread-screenshot.png`

**Step 1: Create composite image with Python**

Run this Python script to place the two phone screenshots side by side on a dark background with padding and rounded corners:

```python
python3 -c "
from PIL import Image, ImageDraw

# Load screenshots
lib = Image.open('/Users/akshay/Development/FastReader/repo/tmp/IMG_3923.PNG')
reader = Image.open('/Users/akshay/Development/FastReader/repo/tmp/IMG_3925.PNG')

# Scale down to reasonable size (50% — each phone becomes 603x1311)
scale = 0.5
lib = lib.resize((int(lib.width * scale), int(lib.height * scale)), Image.LANCZOS)
reader = reader.resize((int(reader.width * scale), int(reader.height * scale)), Image.LANCZOS)

# Canvas: phones side by side with gap and padding
gap = 40
pad_x = 80
pad_y = 60
w = pad_x * 2 + lib.width + gap + reader.width
h = pad_y * 2 + lib.height

# Dark background matching site (#050508)
canvas = Image.new('RGB', (w, h), (5, 5, 8))

# Paste screenshots
canvas.paste(lib, (pad_x, pad_y))
canvas.paste(reader, (pad_x + lib.width + gap, pad_y))

canvas.save('/Users/akshay/Development/ycomplex.com/assets/speedread-screenshot.png', optimize=True)
print(f'Created {w}x{h} composite')
"
```

Expected: Creates `assets/speedread-screenshot.png` (~1286x1431)

**Step 2: Verify the image looks correct**

Open in Finder to visually verify:
```bash
open assets/speedread-screenshot.png
```

Expected: Two phone screenshots side by side on dark background, library on left, reader on right.

**Step 3: Commit**

```bash
git add assets/speedread-screenshot.png
git commit -m "Add SpeedRead composite screenshot"
```

---

### Task 2: Add product card to software.html

**Files:**
- Modify: `software.html:184-203` (inside `.products` grid, after the GrokDown card)

**Step 1: Add the SpeedRead card**

Insert a new `<a>` card after the closing `</a>` of the GrokDown card (line 202) and before the closing `</div>` of `.products` (line 203). Follow the exact same HTML pattern as the GrokDown card:

```html
    <a href="software/speedread.html" class="product-card">
      <div class="product-card-img">
        <img src="assets/speedread-screenshot.png" alt="SpeedRead — RSVP speed reading app" loading="lazy">
      </div>
      <div class="product-card-body">
        <div class="product-card-top">
          <span class="product-card-name">SpeedRead</span>
          <span class="badge">iOS & Android</span>
        </div>
        <p class="product-card-desc">
          Read anything, faster. RSVP speed reading with a highlighted focal letter — import books, articles, and documents, then read at up to 1,000 words per minute.
        </p>
        <div class="product-card-footer">
          <span class="badge">Coming Soon</span>
          <span class="product-card-arrow">View &rarr;</span>
        </div>
      </div>
    </a>
```

**Step 2: Verify in browser**

```bash
python3 -m http.server 8000 --directory /Users/akshay/Development/ycomplex.com
```

Open `http://localhost:8000/software.html` — should show two cards stacked vertically.

**Step 3: Commit**

```bash
git add software.html
git commit -m "Add SpeedRead product card to software page"
```

---

### Task 3: Create SpeedRead detail page

**Files:**
- Create: `software/speedread.html` (based on `software/grokdown.html`)

**Step 1: Create the detail page**

Copy the structure of `software/grokdown.html` exactly, replacing content for SpeedRead. Key differences from GrokDown:

- Title: "SpeedRead — YComplex"
- Meta description: "SpeedRead — RSVP speed reading app for iOS and Android"
- Hero image: `../assets/speedread-screenshot.png` with alt text "SpeedRead — RSVP speed reading app"
- Hero name: "SpeedRead"
- Hero tagline: "Read anything, faster. One word at a time."
- Platform badges: "iOS" · "Android" · "React Native"
- Description: "SpeedRead uses RSVP (Rapid Serial Visual Presentation) to display text one word at a time with a highlighted focal letter, enabling rapid reading at up to 1,000 words per minute. Import EPUB, PDF, TXT, and Markdown files, or add web articles by URL — then read them at your own pace."
- Features (2x2 grid):
  1. "RSVP Speed Reading" / "Word-by-word display with a highlighted focal letter for rapid reading at up to 1,000 WPM. Hold to read, or tap to play and pause."
  2. "Multi-Format Support" / "Import and read EPUB, PDF, TXT, and Markdown files from your device, or add web articles by URL for distraction-free reading."
  3. "Customizable Reader" / "Choose from 9 monospace fonts, adjust reading speed from 50 to 1,000 WPM, pick your highlight color, and select your preferred play mode."
  4. "Smart Navigation" / "Chapter-by-chapter navigation for EPUBs with intelligent pausing at sentence and paragraph boundaries. Pick up where you left off."
- CTA section: Replace download button with "Coming Soon" text. No download link.

The CTA section replaces the `<a>` download button with a styled span:

```html
    <section class="cta">
      <span class="cta-button" style="cursor: default;">Coming Soon</span>
      <p class="cta-sub">iOS &amp; Android</p>
    </section>
```

- Mesh config: `initMesh({ nodeCount: 30, connectionDistance: 160 })` (same as GrokDown)

**Step 2: Verify in browser**

Open `http://localhost:8000/software/speedread.html` — should show full detail page with hero, features, and Coming Soon CTA. Verify:
- Nav links work (YComplex → homepage, Software → software.html)
- Screenshot displays correctly
- Feature grid is 2x2 on desktop, 1-column on mobile
- Coming Soon button has shimmer animation
- Mesh background animates

**Step 3: Commit**

```bash
git add software/speedread.html
git commit -m "Add SpeedRead product detail page"
```

---

### Task 4: Final verification and commit

**Step 1: Test all navigation paths**

Verify in browser:
- `software.html` → click SpeedRead card → `software/speedread.html`
- `software/speedread.html` → click "Software" nav → `software.html`
- `software/speedread.html` → click "YComplex" nav → `index.html`
- `software.html` → GrokDown card still works

**Step 2: Check responsive layout**

Resize browser to mobile width (~375px) and verify:
- Product cards stack correctly on software.html
- SpeedRead detail page feature grid collapses to 1 column
- Screenshot scales properly

**Step 3: Update CLAUDE.md if needed**

Add SpeedRead to the Structure and Pages sections in CLAUDE.md if it's missing.
