import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import WorkspaceLayout from '../components/WorkspaceLayout'
import Button from '../components/Button'
import ColorField from '../components/ColorField'
import ShapeSelector from '../components/ShapeSelector'
import HeroPreview from '../components/HeroPreview'
import PreviewGrid from '../components/PreviewGrid'
import BrowserTabPreview from '../components/BrowserTabPreview'
import InstallSteps from '../components/InstallSteps'
import { ShapeStyle, renderTextIcon } from '../lib/rasterize'
import { buildFaviconZip } from '../lib/packageBuilder'

const FONTS = ['JetBrains Mono', 'Space Grotesk', 'Inter', 'Georgia', 'Arial Black']
const WEIGHTS = [
  { label: 'regular', value: 400 },
  { label: 'medium', value: 500 },
  { label: 'semibold', value: 600 },
  { label: 'bold', value: 700 },
]

export default function TextGenerator() {
  const [text, setText] = useState('AB')
  const [fontFamily, setFontFamily] = useState(FONTS[0])
  const [fontWeight, setFontWeight] = useState(700)
  const [textColor, setTextColor] = useState('#e5e5e2')
  const [bgColor, setBgColor] = useState('#1a1a1a')
  const [shape, setShape] = useState<ShapeStyle>('rounded')
  const [busy, setBusy] = useState(false)

  const render = useMemo(() => {
    return (size: number) =>
      renderTextIcon(size, { text: text || 'A', fontFamily, fontWeight, textColor, bgColor, shape })
  }, [text, fontFamily, fontWeight, textColor, bgColor, shape])

  const refreshKey = `${text}-${fontFamily}-${fontWeight}-${textColor}-${bgColor}-${shape}`

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

  return (
    <div>
      <PageHeader
        eyebrow="02 - generator"
        title="text favicon"
        description="Turn letters or initials into a lettermark icon. Choose a typeface, weight, colors, and shape."
      />

      <div className="mx-auto max-w-[1100px] space-y-14 px-5 pb-16 font-mono">
        <WorkspaceLayout
          controls={
            <div className="space-y-7">
              <div className="max-w-[220px]">
                <p className="mb-2 text-[12.5px] text-muted-dark">text or initials</p>
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value.slice(0, 3))}
                  maxLength={3}
                  className="w-full border border-dashed border-line-dark px-3.5 py-2.5 text-[15px] text-fg outline-none transition-colors focus:border-solid focus:border-fg"
                  placeholder="AB"
                />
                <p className="mt-1.5 text-[12px] text-muted-dark">
                  up to 3 characters renders cleanly at small sizes.
                </p>
              </div>

              <div className="max-w-[260px]">
                <p className="mb-2 text-[12.5px] text-muted-dark">typeface</p>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="w-full border border-dashed border-line-dark px-3.5 py-2.5 text-[13.5px] text-fg outline-none transition-colors focus:border-solid focus:border-fg"
                >
                  {FONTS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p className="mb-2 text-[12.5px] text-muted-dark">weight</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[13px]">
                  {WEIGHTS.map((w) => (
                    <button
                      key={w.value}
                      onClick={() => setFontWeight(w.value)}
                      className={
                        fontWeight === w.value
                          ? 'text-amber underline underline-offset-4'
                          : 'text-muted-dark transition-colors hover:text-fg'
                      }
                    >
                      [{fontWeight === w.value ? 'x' : ' '}] {w.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-6">
                <div className="w-[200px]">
                  <ColorField label="text color" value={textColor} onChange={setTextColor} />
                </div>
                <div className="w-[200px]">
                  <ColorField label="background" value={bgColor} onChange={setBgColor} />
                </div>
              </div>

              <ShapeSelector value={shape} onChange={setShape} />

              <div className="pt-2">
                <Button variant="primary" onClick={handleDownload} disabled={busy}>
                  {busy ? 'building package...' : 'download package'}
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
              <BrowserTabPreview render={render} refreshKey={refreshKey} pageTitle={text || 'my website'} />
            </div>
          }
        />

        <InstallSteps />
      </div>
    </div>
  )
}
