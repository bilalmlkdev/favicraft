import ToolCard from '../components/ToolCard'
import PackageManifestCard from '../components/PackageManifestCard'
import { Link } from 'react-router-dom'

const TOOLS = [
  {
    to: '/image',
    title: 'Image or logo',
    description: 'Upload PNG, JPG, or artwork and convert it into a complete favicon set.',
    accent: '#4F9D69',
    icon: '⬚',
  },
  {
    to: '/text',
    title: 'Text or initials',
    description: 'Pick letters, a typeface, and colors to generate a lettermark icon.',
    accent: '#F5A524',
    icon: 'A',
  },
  {
    to: '/emoji',
    title: 'Emoji',
    description: 'Browse a curated emoji library and download it as a ready favicon.',
    accent: '#4F8DF5',
    icon: '☺',
  },
  {
    to: '/svg',
    title: 'SVG file',
    description: 'Convert vector artwork into every standard favicon size and format.',
    accent: '#B25FE0',
    icon: '◇',
  },
  {
    to: '/checker',
    title: 'Existing website',
    description: 'Enter a URL to inspect and validate the favicons already installed.',
    accent: '#D1573F',
    icon: '⌕',
  },
]

export default function Home() {
  return (
    <div>
      <div className="border-b border-line-dark bg-ink-soft">
        <div className="mx-auto max-w-[1200px] px-5 py-14 md:py-20">
          <p className="mb-3 text-[13px] font-medium text-amber">Favicon generator</p>
          <h1 className="max-w-2xl font-display text-[38px] font-semibold leading-[1.12] tracking-tight text-[#F5F3EE] md:text-[46px]">
            Build a favicon package from anything you already have.
          </h1>
          <p className="mt-4 max-w-lg text-[15.5px] leading-relaxed text-muted-dark">
            Generate favicon.ico, PNG icons, Apple touch icons, Android icons, and a web
            manifest — from an image, text, an emoji, or an SVG file.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/image"
              className="rounded-md bg-amber px-5 py-2.5 text-[13.5px] font-medium text-ink transition-colors hover:bg-[#f7b246]"
            >
              Start from an image
            </Link>
            <Link
              to="/checker"
              className="rounded-md border border-line-dark px-5 py-2.5 text-[13.5px] font-medium text-[#EDEBE5] transition-colors hover:border-[#3a3f46]"
            >
              Check a live site
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-5 py-14">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="font-display text-[22px] font-semibold text-[#F2F0EA]">
              Choose the right tool
            </h2>
            <p className="mt-1.5 text-[13.5px] text-muted-dark">
              Every path outputs the same complete package.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((t) => (
            <ToolCard key={t.to} {...t} />
          ))}
        </div>
      </div>

      <div className="border-t border-line-dark bg-ink-soft">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-14 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="mb-2 text-[13px] font-medium uppercase tracking-wide text-muted-dark">
              Complete favicon package
            </p>
            <h2 className="font-display text-[26px] font-semibold leading-tight text-[#F2F0EA]">
              One download for every favicon surface.
            </h2>
            <p className="mt-3 max-w-lg text-[14.5px] leading-relaxed text-muted-dark">
              Every generator produces the browser fallback icon, tab PNGs, mobile touch
              icons, Android icons, and manifest metadata together — so each device gets
              the file it expects.
            </p>
          </div>
          <PackageManifestCard />
        </div>
      </div>
    </div>
  )
}
