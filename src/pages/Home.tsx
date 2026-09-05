import ToolCard from '../components/ToolCard'
import { Link } from 'react-router-dom'

const TOOLS = [
  {
    to: '/image',
    index: '01',
    title: 'Image or logo',
    description: 'Upload PNG, JPG, or artwork and convert it into a complete favicon set.',
  },
  {
    to: '/text',
    index: '02',
    title: 'Text or initials',
    description: 'Pick letters, a typeface, and colors to generate a lettermark icon.',
  },
  {
    to: '/emoji',
    index: '03',
    title: 'Emoji',
    description: 'Browse a curated emoji library and download it as a ready favicon.',
  },
  {
    to: '/svg',
    index: '04',
    title: 'SVG file',
    description: 'Convert vector artwork into every standard favicon size and format.',
  },
]

const FEATURES = [
  'Runs entirely client-side - nothing uploaded, nothing sent anywhere.',
  'Hand-encoded multi-image favicon.ico, no external ICO library.',
  'Every standard PNG size: 16, 32, 180, 192, and 512px.',
  'A site.webmanifest generated alongside the icons, ready to install.',
  'Installable as a PWA - works offline once you\u2019ve visited it before.',
]

const FILES = [
  'favicon.ico',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'apple-touch-icon.png',
  'android-chrome-192x192.png',
  'android-chrome-512x512.png',
  'site.webmanifest',
]

export default function Home() {
  return (
    <div className="font-mono">
      <div className="mx-auto max-w-[1100px] px-5 pb-14 pt-16">
        <p className="animate-rise-in mb-4 text-[12.5px] text-muted-dark">
          favicon generator - built for the browser
        </p>
        <h1
          className="animate-rise-in w-full max-w-2xl border-l-2 border-amber pl-4 text-[22px] font-bold leading-snug text-fg sm:text-[26px]"
          style={{ animationDelay: '40ms', animationFillMode: 'backwards' }}
        >
          Every icon your site will ever need, generated, packaged, and
          ready to install.
        </h1>
        <p
          className="animate-rise-in mt-6 max-w-2xl text-[13.5px] leading-relaxed text-muted-dark"
          style={{ animationDelay: '90ms', animationFillMode: 'backwards' }}
        >
          FaviCraft turns an image, text, an emoji, or an SVG into a complete
          favicon package - favicon.ico, every PNG size browsers actually
          request, an Apple touch icon, Android icons, and a web manifest -
          built with Canvas, zipped with JSZip, no backend involved.
        </p>
        <div
          className="animate-rise-in mt-7 flex flex-wrap items-center gap-4 text-[13px]"
          style={{ animationDelay: '140ms', animationFillMode: 'backwards' }}
        >
          <Link to="/image" className="text-amber underline underline-offset-4">
            [ start generating ]
          </Link>
          <span className="text-muted-dark">no upload. runs in-browser.</span>
        </div>
      </div>

      <hr className="dotted-rule" />

      <div className="mx-auto max-w-[1100px] px-5 py-14">
        <p className="mb-5 text-[13px] font-bold text-fg underline decoration-line-dark underline-offset-4">
          Choose a starting point
        </p>
        <div>
          {TOOLS.map((t) => (
            <ToolCard key={t.to} {...t} />
          ))}
        </div>
      </div>

      <hr className="dotted-rule" />

      <div className="mx-auto max-w-[1100px] px-5 py-14">
        <p className="mb-5 text-[13px] font-bold text-fg underline decoration-line-dark underline-offset-4">
          What's included
        </p>
        <ul className="space-y-2.5">
          {FEATURES.map((f) => (
            <li key={f} className="flex gap-3 text-[13.5px] leading-relaxed text-fg">
              <span className="shrink-0 text-amber">*</span>
              {f}
            </li>
          ))}
        </ul>

        <blockquote className="mt-10 border-l-2 border-line-dark pl-4 text-[13.5px] italic leading-relaxed text-muted-dark">
          "One download for every favicon surface - the browser fallback icon,
          tab PNGs, mobile touch icons, Android icons, and manifest metadata,
          all packaged together so each device gets exactly the file it
          expects."
        </blockquote>
      </div>

      <hr className="dotted-rule" />

      <div className="mx-auto max-w-[1100px] px-5 py-14">
        <p className="mb-5 text-[13px] font-bold text-fg underline decoration-line-dark underline-offset-4">
          Package contents
        </p>
        <ul className="grid gap-2 text-[13px] text-muted-dark sm:grid-cols-2">
          {FILES.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <span className="text-amber">*</span>
              <span className="text-fg">{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
