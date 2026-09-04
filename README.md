# FaviCraft

A favicon generator web app — build a complete favicon package (ICO, PNG sizes,
Apple touch icon, Android icons, web manifest) from an image, text/initials, an
emoji, or an SVG file. Everything runs client-side in the browser (Canvas API);
nothing is uploaded to a server.

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS v4 (`@tailwindcss/vite`)
- React Router v6
- JSZip + FileSaver for packaging

## Setup

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Structure

```
src/
  components/   shared UI (nav, cards, form controls, previews)
  pages/        route-level pages (Home, ImageGenerator, TextGenerator,
                EmojiGenerator, SvgGenerator, FaviconChecker)
  lib/          rasterize.ts (canvas rendering), icoEncoder.ts (multi-image
                ICO container), packageBuilder.ts (ZIP assembly), emojiData.ts
```

## Notes

- ICO files are hand-encoded (16/32/48px multi-image container) — no external
  ICO library dependency.
- Emoji rendering uses the OS/browser's installed emoji font via Canvas
  `fillText`; output will vary slightly by platform.
- The favicon checker uses `no-cors` HEAD requests, which can't always
  definitively confirm file presence cross-origin due to browser CORS
  restrictions — this is disclosed in the UI.
