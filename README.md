![Favicraft Preview](./preview.png)

<h1 align="center">Favicraft</h1>

<p align="center">
A modern browser-based favicon generator to create text favicons, upload images, or inspect any website's favicon. Generate every required favicon size, manifest, and framework installation snippet in seconds.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Complete-4F46E5?style=flat" />
  <img src="https://img.shields.io/badge/Built%20with-React%20%2B%20Vite-4F46E5?style=flat" />
  <img src="https://img.shields.io/badge/Styling-Tailwind%20CSS-4F46E5?style=flat" />
  <img src="https://img.shields.io/badge/Language-TypeScript-4F46E5?style=flat&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/State-React%20Hooks-4F46E5?style=flat" />
  <img src="https://img.shields.io/badge/License-MIT-4F46E5?style=flat" />
  <img src="https://img.shields.io/badge/Deployed%20on-Vercel-4F46E5?style=flat&logo=vercel&logoColor=white" />
  <img src="https://img.shields.io/badge/Icon%20Library-Lucide-4F46E5?style=flat" />
</p>

<p align="center">
  <a href="https://favicraft.vercel.app/"><strong>Live Demo</strong></a>
  •
  <a href="https://github.com/byllzz/favicraft/issues/new?labels=bug&template=bug-report---.md"><strong>Report Bug</strong></a>
  •
  <a href="https://github.com/byllzz/favicraft/issues/new?labels=enhancement&template=feature-request---.md"><strong>Request Feature</strong></a>
</p>

#  About Favicraft

<p align="left"> A modern, open-source favicon generator that lets you create, preview, inspect, and export production-ready favicons directly in your browser. **100% Client-side • No Account • No Uploads • No Server Processing**</p>



|  **Text Designer** | **Image Generator** |  **Favicon Checker** |
|:--------------------:|:----------------------:|:----------------------:|
| Fonts • Colors • Shapes • Gradients • Shadows • Borders • Live Preview | PNG • JPG • SVG • WebP → Generates every favicon size automatically | Preview favicon • Detect icon files • Metadata • Open Graph • Theme Color |


###  Export Package

| Included Assets |
|-----------------|
| `favicon.ico` • PNG Sizes • Apple Touch Icon • Android Icons • `site.webmanifest` • Framework Snippets |

# Why Favicraft?

| Feature | Highlights |
|----------|------------|
| **Text Mode** | Complete text customization with fonts, colors, shadows, gradients, borders, shapes, padding, and more. |
| **Image Mode** | Upload any supported image and automatically generate every favicon size. |
| **Favicon Checker** | Inspect website favicons and metadata instantly. |
| **Live Preview** | Preview favicons inside browser tabs, Google search results, bookmarks, and mobile home screens. |
| **Framework Snippets** | Copy installation code for popular frameworks. |
| **AI Install Prompt** | Generate an AI-ready prompt for automatic favicon integration. |
| **Responsive Design** | Works perfectly across desktop, tablet, and mobile devices. |
| **No Account Required** | Everything runs locally in your browser. |

---

# Features

## Complete Feature List

| # | Feature | Description |
|---|---------|-------------|
| 01 | **Text Mode** | Customize text, fonts, colors, shapes, size, spacing, rotation, gradients, shadows, strokes, borders, border radius, and padding with live updates. |
| 02 | **Image Mode** | Upload PNG, JPG, WebP, or SVG and generate all standard favicon sizes. |
| 03 | **Favicon Checker** | Inspect any domain and retrieve favicon assets together with metadata. |
| 04 | **Live Preview** | Browser tab, search result, bookmark, and mobile preview mockups. |
| 05 | **Individual Downloads** | Download any favicon size separately. |
| 06 | **Complete Package Export** | Export ZIP including favicon.ico, PNGs, Apple Touch Icon, Android Icons, and manifest. |
| 07 | **Framework Snippets** | Installation snippets for HTML, React, Next.js, Astro, Nuxt, SvelteKit, and WordPress. |
| 08 | **AI Prompt Generator** | Copy an AI prompt to automatically integrate favicons into your project. |
| 09 | **Context Preview** | Preview your favicon exactly where it will appear. |
| 10 | **Smooth Scrolling** | Powered by Lenis. |
| 11 | **Responsive UI** | Fully responsive across all screen sizes. |
| 12 | **Custom Select Components** | Accessible dropdowns with custom styling. |
| 13 | **Color Presets** | One-click font and background colors. |
| 14 | **Shadow & Stroke Controls** | Fine-grained styling controls. |
| 15 | **Gradient Backgrounds** | Two-color linear gradients with adjustable angles. |
| 16 | **Border Controls** | Width, style, and color customization. |
| 17 | **Border Radius & Padding** | Fine tune icon appearance. |
| 18 | **Production Metadata** | Ready-to-use exported favicon package. |

---

# Usage

| Feature | Description |
|---------|-------------|
| **Text Mode** | Customize every styling option while seeing instant live previews. |
| **Image Mode** | Upload an image and generate favicons automatically. |
| **Favicon Checker** | Enter a website URL and inspect its favicon assets and metadata. |
| **Download Individual Sizes** | Save any favicon size separately. |
| **Download Complete Package** | Export every required favicon in one ZIP archive. |
| **Framework Snippets** | Copy installation code for your framework. |
| **AI Prompt** | Copy an AI-ready prompt for favicon integration. |
| **Responsive Interface** | Works across desktop, tablet, and mobile devices. |

---

# Architecture

## Folder Structure

```text
favicraft/
├── public/
│
├── src/
│   ├── assets/
│   │   └── preview.png
│   │
│   ├── components/
│   │
│   ├── ui/
│   │   ├── Panel.tsx
│   │   ├── Label.tsx
│   │   ├── IconPreview.tsx
│   │   └── CustomSelect.tsx
│   │
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   │
│   ├── sections/
│   │   ├── FeaturesSection.tsx
│   │   ├── FaqSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   └── TestimonialsSection.tsx
│   │
│   ├── generator/
│   │   ├── GeneratorWorkspace.tsx
│   │   ├── TextModePanel/
│   │   ├── ImageModePanel/
│   │   ├── FaviconChecker/
│   │   ├── FaviconPreview.tsx
│   │   └── ExportPanel.tsx
│   │
│   ├── hooks/
│   │   ├── useTextMode.ts
│   │   ├── useImageMode.ts
│   │   └── useFaviconChecker.ts
│   │
│   ├── utils/
│   │   ├── canvas.ts
│   │   ├── export.ts
│   │   └── frameworkSnippets.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Project Structure

| Folder | Description |
|--------|-------------|
| `src/components/ui` | Reusable UI components |
| `src/components/layout` | Header and Footer |
| `src/components/sections` | Landing page sections |
| `src/components/generator` | Generator workspace and feature panels |
| `src/hooks` | Custom React hooks |
| `src/utils` | Canvas rendering, ZIP export, snippets |
| `src/types` | Shared TypeScript types |
| `src/App.tsx` | Application shell |
| `src/index.css` | Tailwind styles and theme |

# Built With

<details open>
<summary><strong>Technologies Used</strong></summary>

Favicraft is built using modern frontend technologies to provide a fast, responsive, and fully client-side experience.

| Technology | Purpose |
|------------|---------|
| **React** | User Interface Library |
| **TypeScript** | Type Safety |
| **Vite** | Development & Build Tool |
| **Tailwind CSS** | Utility-first CSS Framework |
| **React Hooks** | State Management |
| **Lenis** | Smooth Scrolling |
| **JSZip** | ZIP File Generation |
| **FileSaver.js** | File Downloads |
| **Lucide React** | Icon Library |

</details>

<p align="left">
  <img src="https://skillicons.dev/icons?i=react,vite,tailwind,ts,git" /><br>

  <img src="https://img.shields.io/badge/Lenis-Smooth%20Scrolling-111827?logoColor=white" />
  <img src="https://img.shields.io/badge/JSZip-ZIP%20Generator-2563EB" />
  <img src="https://img.shields.io/badge/FileSaver-Downloads-16A34A" />
  <img src="https://img.shields.io/badge/Lucide-Icons-F59E0B" />
</p>


---

# Getting Started

## Requirements

Before getting started, make sure you have:

- Node.js
- npm or Yarn
- A modern web browser (Chrome, Edge, Firefox, Safari)

---

## Installation

```bash
# Clone the repository
git clone https://github.com/byllzz/favicraft.git

# Navigate into the project
cd favicraft

# Install dependencies
npm install

# Start the development server
npm run dev
```

By default the application runs at:

```text
http://localhost:5173
```

---

## Environment Variables

Favicraft does **not** require any environment variables.

Everything runs completely client-side.

---

# Available Scripts

```bash
# Start Development Server
npm run dev

# Build Production Version
npm run build

# Preview Production Build
npm run preview

# Run ESLint
npm run lint
```

---

# Architecture Notes

<details open>

<summary><strong>Click to expand implementation details</strong></summary>

## State Management

Each generator mode manages its own state through custom React hooks.

- `useTextMode`
- `useImageMode`
- `useFaviconChecker`

The `GeneratorWorkspace` composes these hooks and passes the required data to each panel.

No external state management library is used.

---

## Canvas Generation

Favicons are rendered using the HTML Canvas API.

Canvas utilities include:

- Text Rendering
- Image Rendering
- Shadows
- Strokes
- Gradients
- Borders
- Multiple Export Sizes

---

## ZIP Export

Generated assets are bundled using **JSZip**.

The ZIP includes:

- favicon.ico
- PNG Favicons
- Apple Touch Icon
- Android Icons
- site.webmanifest

Downloads are handled using **FileSaver.js**.

---

## Framework Snippets

Favicraft generates installation snippets for:

- HTML
- React
- Vite
- Next.js (App Router)
- Next.js (Pages Router)
- Astro
- Nuxt
- SvelteKit
- WordPress

---

## Favicon Checker

The favicon checker:

- Uses Google's Favicon Service for previews
- Detects common favicon files
- Retrieves metadata through Microlink API
- Displays title, description, Open Graph image, and theme color

---

## Responsive Design

Tailwind CSS responsive utilities ensure the application works across:

- Desktop
- Tablet
- Mobile

---

## Accessibility

Favicraft includes:

- Keyboard-accessible controls
- ARIA-friendly custom selects
- Accessible color inputs
- Semantic HTML structure

</details>

---

# Known Limitations

Current limitations include:

- Text mode supports a maximum of **4 characters**.
- Emoji rendering is intentionally unsupported.
- Image uploads are recommended to stay below **5 MB**.
- Metadata fetching depends on Microlink's free API limits.
- No user authentication or cloud storage.
- Website availability is not verified by the Favicon Checker.

---

# Roadmap

Planned improvements:

- [ ] AI-powered favicon design suggestions
- [ ] SVG export support
- [ ] Optional dark mode
- [ ] Better metadata fallback providers
- [ ] More framework integrations
- [ ] Additional favicon preview templates
- [ ] Export customization options

---

# Show Your Support

If you enjoy using **Favicraft**, consider supporting the project by:

- Starring the repository
- Forking the project
- Reporting bugs
- Suggesting new features
- Contributing improvements

Every contribution helps make Favicraft better.

---

# Contributors

A huge thank you to everyone who has contributed to Favicraft!

<a href="https://github.com/byllzz/fa/graphs/contributors">
  <img
    src="https://contrib.rocks/image?repo=byllzz/favicraft"
    alt="Project Contributors"
  />
</a>

## Author

<img src="https://github.com/byllzz.png" width="80" height="80" alt="Bilal Malik Profile" />

### Bilal Malik (byllzz)
<p align="left">

[![GitHub](https://img.shields.io/badge/GitHub-byllzz-9B72FF?style=flat&logo=github&logoColor=white)](https://github.com/byllzz)
[![X](https://img.shields.io/badge/Tweet-@bilalmlkdev-9B72FF?style=flat&logo=x&logoColor=white)](https://x.com/bilalmlkdev)
[![Portfolio](https://img.shields.io/badge/Portfolio-bilalmlkdev.vercel.app-9B72FF?style=flat&logo=vercel&logoColor=white)](https://bilalmlkdev.vercel.app)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Bilal%20Malik-9B72FF?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/bilalmlkdev/)
[![Email](https://img.shields.io/badge/Email-bilalmlkdev@gmail.com-9B72FF?style=flat&logo=gmail&logoColor=white)](mailto:bilalmlkdev@gmail.com)

</p>

---

# License

Distributed under the **MIT License**.

```text
MIT License

Copyright (c) 2026 Bilal Malik

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software.

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---


<p align="left">
© 2026 Favicraft • Licensed under the MIT License
</p>
