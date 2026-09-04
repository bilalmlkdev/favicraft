import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="border-t border-line-dark">
      <div className="mx-auto max-w-[1200px] px-5 py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-3 max-w-sm text-[13.5px] leading-relaxed text-muted-dark">
              Generate a complete, standards-compliant favicon package from an image,
              text, an emoji, or an SVG — entirely in your browser.
            </p>
          </div>
          <div>
            <p className="mb-3 text-[12px] font-medium uppercase tracking-wide text-muted-dark">
              Tools
            </p>
            <ul className="space-y-2 text-[13.5px] text-[#cfccc4]">
              <li>Image converter</li>
              <li>Text generator</li>
              <li>Emoji favicons</li>
              <li>SVG converter</li>
              <li>Favicon checker</li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-[12px] font-medium uppercase tracking-wide text-muted-dark">
              Resources
            </p>
            <ul className="space-y-2 text-[13.5px] text-[#cfccc4]">
              <li>What is a favicon?</li>
              <li>Favicon sizes guide</li>
              <li>HTML install tags</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-line-dark pt-6 text-[12.5px] text-muted-dark md:flex-row md:items-center md:justify-between">
          <span>Copyright {new Date().getFullYear()} FaviCraft</span>
          <span>Built with React, TypeScript, and Tailwind CSS</span>
        </div>
      </div>
    </footer>
  )
}
