import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import WorkspaceLayout from '../components/WorkspaceLayout'
import Button from '../components/Button'
import ShapeSelector from '../components/ShapeSelector'
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
  const [bgColor, setBgColor] = useState('#F7F6F3')
  const [busy, setBusy] = useState(false)

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

  const refreshKey = `${selected.char}-${shape}-${bgColor}`

  return (
    <div>
      <PageHeader
        eyebrow="Generator"
        title={`${selected.char} ${selected.name} — copy or download`}
        description="Browse the emoji library, preview it in browser tab sizes, and download a ready-to-install favicon package."
      />

      <div className="mx-auto max-w-[1200px] space-y-10 px-5 py-10">
        <WorkspaceLayout
          controls={
            <div className="space-y-5">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search emoji…"
                className="w-full rounded-md border border-line-dark bg-ink-elevated px-3.5 py-2.5 text-[13.5px] text-[#EDEBE5] outline-none focus:border-amber"
              />

              <div className="flex flex-wrap gap-1.5">
                {['All', ...EMOJI_CATEGORIES].map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveCategory(c)}
                    className={`rounded-md border px-2.5 py-1.5 text-[12.5px] font-medium transition-colors ${
                      activeCategory === c
                        ? 'border-amber bg-amber/10 text-amber'
                        : 'border-line-dark bg-ink-elevated text-muted-dark hover:text-[#EDEBE5]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="grid max-h-[280px] grid-cols-8 gap-1.5 overflow-y-auto rounded-md border border-line-dark bg-ink-elevated p-2.5">
                {filtered.map((e) => (
                  <button
                    key={e.char + e.name}
                    onClick={() => setSelected(e)}
                    title={e.name}
                    className={`flex aspect-square items-center justify-center rounded-md text-[19px] transition-colors ${
                      selected.char === e.char
                        ? 'bg-amber/15 ring-1 ring-amber'
                        : 'hover:bg-ink-soft'
                    }`}
                  >
                    {e.char}
                  </button>
                ))}
                {filtered.length === 0 && (
                  <p className="col-span-8 py-6 text-center text-[13px] text-muted-dark">
                    No emoji match “{query}”
                  </p>
                )}
              </div>

              <ShapeSelector value={shape} onChange={setShape} />

              {shape !== 'none' && (
                <label className="block">
                  <span className="mb-1.5 block text-[13px] font-medium text-muted-dark">
                    Background color
                  </span>
                  <div className="flex items-center gap-2 rounded-md border border-line-dark bg-ink-elevated px-2.5 py-2">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="h-6 w-6 cursor-pointer rounded border-0"
                    />
                    <span className="font-mono text-[13px] text-[#EDEBE5]">{bgColor}</span>
                  </div>
                </label>
              )}

              <div className="flex gap-2.5">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => navigator.clipboard.writeText(selected.char)}
                >
                  Copy emoji
                </Button>
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={handleDownload}
                  disabled={busy}
                >
                  {busy ? 'Building…' : 'Download package'}
                </Button>
              </div>
            </div>
          }
          preview={
            <>
              <div className="rounded-lg border border-line-dark bg-ink-soft p-5">
                <p className="mb-4 text-[12px] font-medium uppercase tracking-wide text-muted-dark">
                  Preview
                </p>
                <PreviewGrid render={render} refreshKey={refreshKey} />
              </div>
              <BrowserTabPreview render={render} refreshKey={refreshKey} pageTitle={selected.name} />
              <div className="rounded-lg border border-line-dark bg-ink-soft p-4 text-[12.5px] leading-relaxed text-muted-dark">
                Emoji glyphs render using your operating system's emoji font. Downloaded
                PNGs reflect the font active on this machine at export time.
              </div>
            </>
          }
        />

        <InstallSteps />
      </div>
    </div>
  )
}
