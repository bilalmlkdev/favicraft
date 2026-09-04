import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import WorkspaceLayout from '../components/WorkspaceLayout'
import Button from '../components/Button'
import ColorField from '../components/ColorField'
import ShapeSelector from '../components/ShapeSelector'
import PreviewGrid from '../components/PreviewGrid'
import BrowserTabPreview from '../components/BrowserTabPreview'
import InstallSteps from '../components/InstallSteps'
import { ShapeStyle, renderTextIcon } from '../lib/rasterize'
import { buildFaviconZip } from '../lib/packageBuilder'

const FONTS = ['Space Grotesk', 'Inter', 'JetBrains Mono', 'Georgia', 'Arial Black']
const WEIGHTS = [
  { label: 'Regular', value: 400 },
  { label: 'Medium', value: 500 },
  { label: 'Semibold', value: 600 },
  { label: 'Bold', value: 700 },
]

export default function TextGenerator() {
  const [text, setText] = useState('AB')
  const [fontFamily, setFontFamily] = useState(FONTS[0])
  const [fontWeight, setFontWeight] = useState(700)
  const [textColor, setTextColor] = useState('#F7F6F3')
  const [bgColor, setBgColor] = useState('#0F1216')
  const [shape, setShape] = useState<ShapeStyle>('rounded')
  const [busy, setBusy] = useState(false)

  const render = useMemo(() => {
    return (size: number) =>
      renderTextIcon(size, { text: text || 'A', fontFamily, fontWeight, textColor, bgColor, shape })
  }, [text, fontFamily, fontWeight, textColor, bgColor, shape])

  async function handleDownload() {
    setBusy(true)
    try {
      await buildFaviconZip(
        { render, appName: text || 'My App', themeColor: bgColor, bgColor },
        { filenamePrefix: `favicon-${(text || 'text').toLowerCase()}` },
      )
    } finally {
      setBusy(false)
    }
  }

  const refreshKey = `${text}-${fontFamily}-${fontWeight}-${textColor}-${bgColor}-${shape}`

  return (
    <div>
      <PageHeader
        eyebrow="Generator"
        title="Text favicon generator"
        description="Create a favicon from letters or initials. Choose a typeface, weight, colors, and shape before downloading every required file."
      />

      <div className="mx-auto max-w-[1200px] space-y-10 px-5 py-10">
        <WorkspaceLayout
          controls={
            <div className="space-y-6">
              <label className="block">
                <span className="mb-1.5 block text-[13px] font-medium text-muted-dark">
                  Text or initials
                </span>
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value.slice(0, 3))}
                  maxLength={3}
                  className="w-full rounded-md border border-line-dark bg-ink-elevated px-3.5 py-2.5 font-display text-[15px] text-[#EDEBE5] outline-none focus:border-amber"
                  placeholder="AB"
                />
                <span className="mt-1 block text-[12px] text-muted-dark">
                  Up to 3 characters render cleanly at small sizes.
                </span>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[13px] font-medium text-muted-dark">
                  Typeface
                </span>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="w-full rounded-md border border-line-dark bg-ink-elevated px-3.5 py-2.5 text-[13.5px] text-[#EDEBE5] outline-none focus:border-amber"
                >
                  {FONTS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </label>

              <div>
                <span className="mb-1.5 block text-[13px] font-medium text-muted-dark">
                  Weight
                </span>
                <div className="grid grid-cols-4 gap-1.5">
                  {WEIGHTS.map((w) => (
                    <button
                      key={w.value}
                      onClick={() => setFontWeight(w.value)}
                      className={`rounded-md border px-2 py-2 text-[12.5px] font-medium transition-colors ${
                        fontWeight === w.value
                          ? 'border-amber bg-amber/10 text-amber'
                          : 'border-line-dark bg-ink-elevated text-muted-dark hover:text-[#EDEBE5]'
                      }`}
                    >
                      {w.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <ColorField label="Text color" value={textColor} onChange={setTextColor} />
                <ColorField label="Background" value={bgColor} onChange={setBgColor} />
              </div>

              <ShapeSelector value={shape} onChange={setShape} />

              <Button variant="primary" onClick={handleDownload} disabled={busy} className="w-full">
                {busy ? 'Building package…' : 'Download favicon package'}
              </Button>
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
              <BrowserTabPreview render={render} refreshKey={refreshKey} pageTitle={text || 'My Website'} />
            </>
          }
        />

        <InstallSteps />
      </div>
    </div>
  )
}
