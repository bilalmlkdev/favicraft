import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import WorkspaceLayout from '../components/WorkspaceLayout'
import Button from '../components/Button'
import ShapeSelector from '../components/ShapeSelector'
import HeroPreview from '../components/HeroPreview'
import PreviewGrid from '../components/PreviewGrid'
import BrowserTabPreview from '../components/BrowserTabPreview'
import InstallSteps from '../components/InstallSteps'
import { ShapeStyle, renderEmojiIcon } from '../lib/rasterize'
import { buildFaviconZip } from '../lib/packageBuilder'
import { EMOJI_LIST, EMOJI_CATEGORIES } from '../lib/emojiData'

export default function EmojiGenerator() {
  const [selected, setSelected] = useState(EMOJI_LIST[0])
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [shape, setShape] = useState<ShapeStyle>('none')
  const [bgColor, setBgColor] = useState('#1a1a1a')
  const [busy, setBusy] = useState(false)
  const [copied, setCopied] = useState(false)

  const filtered = useMemo(() => {
    return EMOJI_LIST.filter((e) => {
      const matchesCategory = activeCategory === 'All' || e.category === activeCategory
      const matchesQuery = e.name.toLowerCase().includes(query.toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [query, activeCategory])

  const render = useMemo(() => {
    return (size: number) => renderEmojiIcon(size, selected.char, bgColor, shape)
  }, [selected, bgColor, shape])

  const refreshKey = `${selected.char}-${shape}-${bgColor}`

  async function handleDownload() {
    setBusy(true)
    try {
      const licenseNote =
        'Emoji graphics rendered using the system emoji font. Review your OS/browser emoji font license before redistribution.'
      await buildFaviconZip(
        { render, appName: selected.name, themeColor: bgColor, bgColor },
        { filenamePrefix: `favicon-${selected.name.toLowerCase().replace(/\s+/g, '-')}`, licenseNote },
      )
    } finally {
      setBusy(false)
    }
  }

  function copyEmoji() {
    navigator.clipboard.writeText(selected.char)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div>
      <PageHeader
        eyebrow="03 - generator"
        title={`${selected.char}  ${selected.name.toLowerCase()}`}
        description="Browse the emoji library, preview it in real browser tab sizes, and download a ready-to-install package."
      />

      <div className="mx-auto max-w-[1100px] space-y-14 px-5 pb-16 font-mono">
        <WorkspaceLayout
          controls={
            <div className="space-y-6">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="search emoji..."
                className="w-full max-w-[320px] border border-dashed border-line-dark px-3.5 py-2.5 text-[13.5px] text-fg outline-none transition-colors focus:border-solid focus:border-fg"
              />

              <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-[12.5px]">
                {['All', ...EMOJI_CATEGORIES].map((c, i, arr) => (
                  <span key={c} className="flex items-center gap-3">
                    <button
                      onClick={() => setActiveCategory(c)}
                      className={
                        activeCategory === c
                          ? 'text-amber underline underline-offset-4'
                          : 'text-muted-dark transition-colors hover:text-fg'
                      }
                    >
                      {c.toLowerCase()}
                    </button>
                    {i < arr.length - 1 && <span className="text-line-dark">|</span>}
                  </span>
                ))}
              </div>

              <div className="dashed-box grid max-h-[280px] grid-cols-8 gap-1 overflow-y-auto p-3">
                {filtered.map((e) => (
                  <button
                    key={e.char + e.name}
                    onClick={() => setSelected(e)}
                    title={e.name}
                    className={`flex aspect-square items-center justify-center text-[19px] transition-colors duration-150 ${
                      selected.char === e.char
                        ? 'bg-ink-elevated ring-1 ring-fg'
                        : 'hover:bg-ink-soft'
                    }`}
                  >
                    {e.char}
                  </button>
                ))}
                {filtered.length === 0 && (
                  <p className="col-span-8 py-6 text-center text-[13px] text-muted-dark">
                    no emoji match "{query}"
                  </p>
                )}
              </div>

              <ShapeSelector value={shape} onChange={setShape} />

              {shape !== 'none' && (
                <div className="max-w-[240px]">
                  <p className="mb-2 text-[12.5px] text-muted-dark">background color</p>
                  <div className="flex items-center gap-2.5 border border-dashed border-line-dark px-3 py-2">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="h-4 w-4 cursor-pointer border-0"
                    />
                    <span className="text-[13px] text-fg">{bgColor}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <Button variant="secondary" onClick={copyEmoji}>
                  {copied ? 'copied' : 'copy emoji'}
                </Button>
                <Button variant="primary" onClick={handleDownload} disabled={busy}>
                  {busy ? 'building...' : 'download package'}
                </Button>
              </div>
            </div>
          }
          preview={
            <div className="space-y-5">
              <HeroPreview render={render} refreshKey={refreshKey} />
              <div className="dashed-box p-5">
                <PreviewGrid render={render} refreshKey={refreshKey} />
              </div>
              <BrowserTabPreview render={render} refreshKey={refreshKey} pageTitle={selected.name.toLowerCase()} />
              <p className="text-[12.5px] leading-relaxed text-muted-dark">
                emoji glyphs render using your operating system's emoji font - downloaded
                PNGs reflect the font active on this machine at export time.
              </p>
            </div>
          }
        />

        <InstallSteps />
      </div>
    </div>
  )
}
