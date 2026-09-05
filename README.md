<div align="center">

  <a href="https://favicraft.vercel.app/">
    <img src="https://raw.githubusercontent.com/bilalmlkdev/favicraft/main/public/apple-touch-icon.png" alt="favicraft Logo" width="17%">
  </a>

# Favicraft

Generate favicon.ico, PNG icons, Apple touch icons, and web manifests <br> from an image, text, an emoji, or an SVG - entirely in your browser.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Site-black?style=for-the-badge)](https://favicraft.vercel.app)
[![GitHub Stars](https://img.shields.io/github/stars/bilalmlkdev/favicraft?style=for-the-badge&logo=github&color=yellow)](https://github.com/bilalmlkdev/favicraft.git)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)


[![favicraft Dashboard](https://raw.githubusercontent.com/bilalmlkdev/favicraft/main/public/preview.png)](https://favicraft.vercel.app/)

</div>


# Building FaviCraft

This is a record of how FaviCraft actually got built - the decisions, the
false starts, and why the app looks and works the way it does. Not a setup
guide. If you want to run it, `npm install && npm run dev` and you're in.

## The brief

The ask was simple on paper: a favicon generator web app. Upload something -
an image, some text, an emoji, an SVG - and get back a complete, working
favicon package: the legacy `.ico`, the PNG sizes browsers actually request,
an Apple touch icon, Android home-screen icons, and a web manifest tying it
all together. React, TypeScript, Tailwind. Reference screenshots came from an
existing favicon tool's UI, used as a layout starting point rather than
something to copy exactly.

The harder constraint was aesthetic: clean, minimal, premium - and explicitly
*not* generic AI output. No heavy drop shadows, no glow effects, no
default-Bootstrap card grids. That constraint ended up driving more of the
build than the feature list did.

## Getting the engine right first

Before any UI existed, the actual favicon-generation logic had to work,
because everything downstream depends on it being correct:

- **`lib/rasterize.ts`** - takes any source (an uploaded image, typed text, an
  emoji character, raw SVG markup) and draws it onto a canvas at whatever
  pixel size is requested, with an optional background shape (circle,
  rounded square, square, or none). This is the one function every generator
  page ultimately calls.
- **`lib/icoEncoder.ts`** - `.ico` isn't just "rename a PNG." It's a
  multi-image container format: a 6-byte header, then a directory entry per
  embedded image, then the raw PNG bytes back to back. There's no
  well-maintained zero-dependency library for this that fits a
  browser-only, no-backend build, so it's hand-rolled here - about 50 lines
  of `DataView` writes. Worth understanding once rather than trusting a black
  box for a file format this small.
- **`lib/packageBuilder.ts`** - orchestrates a full export: renders the
  source at every required size (16, 32, 48 for the ICO; 16, 32, 180, 192,
  512 for standalone PNGs), builds the `.ico`, writes `site.webmanifest`,
  generates the HTML `<link>` snippet, and zips everything with JSZip for a
  single download.

Getting this layer solid first meant every later UI decision was just
"how do we expose this," never "does this actually work."

## Four generators, one shared shape

Image, Text, Emoji, and SVG each get their own route, but they're built from
the same skeleton: a control panel on the left, a live preview on the right,
shared install instructions underneath. That consistency wasn't an accident -
once the Image generator's layout felt right, the other three were mostly
substitution (swap the input method, keep the shell).

The emoji picker needed its own small dataset (`lib/emojiData.ts`) - a
curated, categorized subset rather than the full Unicode emoji table, since
loading and searching every emoji in existence wasn't worth the payload for
what's meant to be a fast, focused tool.

## Round one: solid, but dated

The first full pass shipped a working white/black themed app: bordered cards
for every section, a top nav with pill links, icon-in-a-square tool cards on
the homepage. Functionally complete. It also read like a competent 2020
build - which, said out loud, was the exact feedback that kicked off the
redesign.

## Round two: what "modern" actually means here

Before changing anything, it was worth checking what current top-tier
products (Linear, Attio, Arc) are actually doing in 2026 rather than guessing
at "modern." The pattern that came back consistently: restraint over
decoration. Whitespace and type doing the work that borders and boxes used
to. Live product demos in hero sections instead of illustrations. Motion
that's tied to a real state change, not just there for flourish.

That led to:

- **Killing the card-soup.** Sections are now separated by whitespace and a
  single hairline divider where structure actually calls for one - not a
  border around every block.
- **A command palette.** `⌘K` opens a searchable jump-to-tool menu. Small to
  build, but it's the single fastest signal that a tool takes power users
  seriously.
- **A live hero preview.** The homepage briefly had a real interactive mini
  favicon-generator sitting in the hero - type initials, see it render live.
  That was closer to the Attio/Linear pattern of "show the product, don't
  illustrate around it" than the floating decorative icon chips it replaced
  from an even earlier pass.
- **Pill-shaped controls.** Buttons, shape selectors, and color fields moved
  from bordered rectangles to full-radius pills - a small change that shifts
  the whole feel from "form" to "product."
- **Real confirm states.** Copy and download buttons now show an actual
  checkmark pop-in on success instead of just a color change.

## Round three: bolder, and behind it - a living grid

Two things were still missing once the layout settled. First, the homepage
hero looked correct but empty - text on flat white with nothing anchoring it.
Second, the typography throughout was safe: readable, well-spaced, but never
loud anywhere, which undercut the "premium" brief as much as the old
bordered cards did.

The interactive hero demo came out. In its place: a full-bleed canvas grid
behind the hero copy, where every cell's brightness drifts on a slow sine-wave
loop - strictly grayscale, so it never fights the black/white palette, and it
respects `prefers-reduced-motion` by freezing on a single frame for anyone
who's asked for less motion. It's texture and life without becoming a
distraction from the headline sitting on top of it.

Typography went up a full step across the board - extrabold, tightly
tracked display type on the homepage headline and every page title, bold
weights on section headers that were previously medium. The goal wasn't just
"bigger," but "the type carries more of the visual weight the boxes used to
carry."

## Making it installable

The last piece was turning this into an actual PWA rather than just a page
that happens to work well: a real icon set (16, 32, 180, 192, 512px PNGs
plus a proper multi-size `.ico`) generated from the app's own "F" mark, a
web manifest declaring it standalone and installable, and a small service
worker that caches the app shell so it still opens once you've visited it
before, without needing a network round-trip every time.

The service worker is deliberately conservative: network-first for
navigation (so a live deploy is always preferred when there's a connection),
cache-first for static assets (so repeat visits don't re-fetch fonts and
bundles that haven't changed). It's an enhancement, not a requirement - if
registration fails for any reason, the app just runs like a normal page.

## Details that mattered more than expected

A few small things ended up carrying more weight than their line count
suggests:

- **The ICO directory entry's width/height byte.** The ICO spec uses `0` to
  mean "256 pixels" for any dimension that would otherwise overflow a single
  byte. Easy to miss, and the kind of bug that only shows up as a corrupted
  icon in one specific browser.
- **`cover`-fitting uploaded images.** Early versions stretched images to
  fill the square canvas, which distorted anything non-square. Switched to
  a `Math.max` scale-and-center approach so a rectangular logo crops instead
  of squashing.
- **Emoji rendering depends on the OS.** There's no way to guarantee pixel-
  identical emoji output across platforms without shipping an entire emoji
  font - Canvas `fillText` uses whatever emoji font the browser/OS provides.
  The UI says this plainly rather than pretending otherwise, and the ZIP's
  `about.txt` carries the same disclosure into the downloaded package.
- **`prefers-reduced-motion` on the live grid.** The animated background
  freezes to a static single frame rather than just running slower, since a
  slow animation still counts as motion for anyone who's opted out of it.

## What's deliberately not here

No backend, no analytics, no accounts - the whole point is that a favicon
generator shouldn't need any of that. No exhaustive emoji picker (the full
Unicode set is a few thousand entries; a curated, categorized subset covers
the common cases without the payload). No AI-generated icon art - every
output here is either a direct transform of what the user provided or drawn
programmatically from text/shape parameters, which keeps the tool fast,
predictable, and free of a whole separate category of licensing questions.

## Round four: a full aesthetic pivot to text-mode

The boldest editorial look wasn't the final stop. A reference screenshot of
a database company's marketing site made the case for something more
distinctive: a "terminal" aesthetic - pure monospace type, a black
background, `*` as the only list marker, dashed borders standing in for
cards, dotted horizontal rules instead of solid hairlines, and sky-blue as
the one accent color for links. No icons, no rounded pills, no drop
shadows anywhere.

That meant touching nearly every component: buttons became bracket-wrapped
text (`[ download package ]`), the shape selector became inline checkbox-
style toggles (`[x] rounded`), the footer became a literal dashed-border
column grid, and the homepage traded its bold display headline and
animated background for a left-bordered blockquote-style statement and a
`*`-bulleted feature list - much closer to reading a well-formatted README
than browsing a marketing page. The single font (JetBrains Mono) had to
carry every size and weight of hierarchy that two other typefaces used to
share, which meant leaning on underlines, brackets, and indentation for
structure instead of size contrast.

The generator engine and every piece of app logic - canvas rendering, the
ICO encoder, the ZIP packaging, the PWA setup - didn't change at all. This
pass was proof that the interaction layer and the visual language are
genuinely separable: the same four generators, the same command palette,
the same live preview, wrapped in a completely different skin.

## Where things landed

Every generator runs entirely client-side - nothing uploaded, nothing sent
anywhere, favicon.ico built by hand in the browser from a canvas. The UI
went through four real passes before landing somewhere that felt
intentional rather than assembled from defaults. None of the redesigns
changed what the tool does; each one changed how it feels to use.

# License (MIT)

This project is licensed under the **MIT License**.

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
