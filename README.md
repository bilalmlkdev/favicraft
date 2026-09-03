<div align="center">
  <a href="https://favicraft.vercel.app">
    <img src="https://raw.githubusercontent.com/bilalmlkdev/favicraft/main/public/favicon.svg" alt="Favicraft Logo" width="100%" height="120">
  </a>

  # Favicraft
  A modern browser-based favicon generator to create text favicons, upload <br> images, or inspect any website's favicon with zero server friction.

  [![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Site-black?style=for-the-badge)](https://favicraft.vercel.app)
[![GitHub Stars](https://img.shields.io/github/stars/bilalmlkdev/favicraft?style=for-the-badge&logo=github&color=yellow)](https://github.com/bilalmlkdev/favicraft.git)
</div>

<p align="center">
  <i>Created by <a href="https://bilalmlkdev.vercel.app" target="_blank">Bilal Malik</a></i><br>
  <i>Follow on Github <a href="https://github.com/bilalmlkdev" target="_blank">bilalmlkdev</a></i>
</p>

[![Favicraft Dashboard](https://raw.githubusercontent.com/bilalmlkdev/favicraft/main/public/preview.png)](https://favicraft.vercel.app/)

## About Favicraft
A modern, open-source favicon generator that lets you create, preview, inspect, and export production-ready favicons directly in your browser. **100% Client-side • No Account • No Uploads • No Server Processing**

### Core Modes & Tools
- **Text Designer:** Fonts, Colors, Shapes, Gradients, Shadows, Borders, and Live Previews.
- **Image Generator:** Drag and drop PNG, JPG, SVG, or WebP to automatically generate every standard favicon size.
- **Favicon Checker:** Preview favicons, detect icon files, metadata, Open Graph tags, and theme colors from any URL.

### Included Export Assets
`favicon.ico` • Multiple PNG Sizes • Apple Touch Icon • Android Icons • `site.webmanifest` • Ready-to-use Framework Installation Snippets

## Why Favicraft?
- **Text Mode:** Complete text customization with fonts, colors, shadows, gradients, borders, shapes, and padding.
- **Image Mode:** Upload any supported image and automatically generate every favicon size.
- **Favicon Checker:** Inspect website favicons and metadata instantly from any live link.
- **Live Preview:** Preview favicons inside browser tabs, Google search results, bookmarks, and mobile home screens.
- **Framework Snippets:** Copy instant installation code for popular frameworks.
- **AI Install Prompt:** Generate an AI-ready prompt for automatic favicon integration.
- **Responsive Design:** Works seamlessly across desktop, tablet, and mobile devices.
- **100% Client-Side:** Everything runs locally in your browser with zero server uploads.

## Complete Feature List

- **01. Text Mode:** Customize text, fonts, colors, shapes, size, spacing, rotation, gradients, shadows, strokes, borders, border radius, and padding with live updates.
- **02. Image Mode:** Upload PNG, JPG, WebP, or SVG and generate all standard favicon sizes.
- **03. Favicon Checker:** Inspect any domain and retrieve favicon assets together with metadata.
- **04. Live Preview:** Browser tab, search result, bookmark, and mobile preview mockups.
- **05. Individual Downloads:** Download any favicon size separately.
- **06. Complete Package Export:** Export ZIP including `favicon.ico`, PNGs, Apple Touch Icon, Android Icons, and manifest.
- **07. Framework Snippets:** Installation snippets for HTML, React, Next.js, Astro, Nuxt, SvelteKit, and WordPress.
- **08. AI Prompt Generator:** Copy an AI prompt to automatically integrate favicons into your project.
- **09. Context Preview:** Preview your favicon exactly where it will appear.
- **10. Smooth Scrolling:** Powered by Lenis for buttery-smooth performance.
- **11. Responsive UI:** Fully adaptive design across all screen sizes.
- **12. Custom Select Components:** Accessible dropdowns with custom styling.
- **13. Color Presets:** One-click font and background color choices.
- **14. Shadow & Stroke Controls:** Fine-grained styling options.
- **15. Gradient Backgrounds:** Two-color linear gradients with adjustable angles.
- **16. Border Controls:** Width, style, and color customization.
- **17. Border Radius & Padding:** Fine-tune icon appearance precisely.
- **18. Production Metadata:** Ready-to-use exported favicon packages.

# How to Use Favicraft
1. **Just Open the Website:** Head over to **[favicraft.vercel.app](https://vercel.app)**. No installation, signup, or login is required; everything runs instantly inside your client browser.
2. **Design or Upload:** Use **Text Mode** to craft your custom text-based icon or switch to **Image Mode** to upload an image logo.
3. **Inspect & Preview:** Check live mockups of how your favicon will look in browser tabs, search results, bookmarks, and mobile home screens. You can also use the **Favicon Checker** tool to inspect other websites' icons.
4. **Export & Save for Later:** Download individual icon sizes or grab the full production ZIP package (including manifests and framework integration snippets) to use in your projects right away or save for later development.

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

### Module Breakdown
- **`src/components/ui`**: Reusable user interface components.
- **`src/components/layout`**: Main Header and Footer elements.
- **`src/components/sections`**: Modular landing page sections.
- **`src/components/generator`**: Main generator workspace and feature control panels.
- **`src/hooks`**: Custom React hooks handling state and logic.
- **`src/utils`**: Canvas rendering engine, ZIP export logic, and snippet text generators.
- **`src/types`**: Shared TypeScript definitions.
- **`src/App.tsx`**: Central application shell.
- **`src/index.css`**: Tailwind styles and custom theme setup.


# Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make to **Favicraft** are greatly appreciated!

### Ways to Contribute
* **Report Bugs:** Open an issue if you encounter layout bugs, download glitches, or canvas rendering issues.
* **Suggest Features:** Have an idea for a new shape, filter, export format, or framework snippet? Feel free to open a feature request!
* **Submit Pull Requests:** If you want to jump into the code and add improvements yourself, code contributions are welcome.

### Contribution Process
1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request against the main branch.

# License (MIT)

This project is licensed under the **MIT License**.

```text
MIT License
Copyright (c) 2026 Bilal Malik

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

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
