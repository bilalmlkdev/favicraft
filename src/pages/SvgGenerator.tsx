import { useCallback, useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import WorkspaceLayout from '../components/WorkspaceLayout'
import Dropzone from '../components/Dropzone'
import Button from '../components/Button'
import ShapeSelector from '../components/ShapeSelector'
import PreviewGrid from '../components/PreviewGrid'
import BrowserTabPreview from '../components/BrowserTabPreview'
import InstallSteps from '../components/InstallSteps'
import { ShapeStyle, renderSvgIcon } from '../lib/rasterize'
import { buildFaviconZip } from '../lib/packageBuilder'

export default function SvgGenerator() {
  const [svgMarkup, setSvgMarkup] = useState<string>('')
  const [fileName, setFileName] = useState('')
  const [shape, setShape] = useState<ShapeStyle>('none')
  const [bgColor, setBgColor] = useState('#F7F6F3')
  const [busy, setBusy] = useState(false)

  const onFile = useCallback(async (file: File) => {
    const text = await file.text()
    setSvgMarkup(text)
    setFileName(file.name.replace(/\.[^/.]+$/, ''))
  }, [])

  const render = useMemo(() => {
    return async (size: number) => {
      if (!svgMarkup) {
        const c = document.createElement('canvas')
        c.width = size
        c.height = size
        return c
      }
      return renderSvgIcon(size, svgMarkup, bgColor, shape)
    }
  }, [svgMarkup, shape, bgColor])

  async function handleDownload() {
    if (!svgMarkup) return
    setBusy(true)
    try {
      await buildFaviconZip(
        { render, appName: fileName || 'My App', themeColor: bgColor, bgColor },
        { filenamePrefix: fileName || 'favicon-package' },
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Converter"
        title="SVG to favicon"
        description="Convert vector artwork into favicon.ico, PNG icons, Apple touch icon, Android icons, and a web manifest."
      />

      <div className="mx-auto max-w-[1200px] space-y-10 px-5 py-10">
        <WorkspaceLayout
          controls={
            <div className="space-y-6">
              <div>
                <h2 className="mb-1 font-display text-[18px] font-semibold text-[#F2F0EA]">
                  Convert an SVG to a favicon
                </h2>
                <p className="text-[13.5px] leading-relaxed text-muted-dark">
                  Upload an .svg file. Vector artwork is rasterized in your browser at
                  every required output size for maximum sharpness.
                </p>
              </div>

              <Dropzone onFile={onFile} accept="image/svg+xml,.svg" hint="SVG only" />

              {fileName && (
                <p className="text-[13px] text-muted-dark">
                  Loaded <span className="text-[#EDEBE5]">{fileName}.svg</span>
                </p>
              )}

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

              <Button
                variant="primary"
                onClick={handleDownload}
                disabled={!svgMarkup || busy}
                className="w-full"
              >
                {busy ? 'Building package…' : 'Download favicon package'}
              </Button>
              <p className="text-[12px] text-muted-dark">
                Tip: simplify paths and remove embedded fonts before uploading for the
                cleanest small-size output.
              </p>
            </div>
          }
          preview={
            <>
              <div className="rounded-lg border border-line-dark bg-ink-soft p-5">
                <p className="mb-4 text-[12px] font-medium uppercase tracking-wide text-muted-dark">
                  Preview
                </p>
                <PreviewGrid render={render} refreshKey={`${shape}-${bgColor}-${fileName}`} />
              </div>
              <BrowserTabPreview
                render={render}
                refreshKey={`${shape}-${bgColor}-${fileName}`}
                pageTitle={fileName || 'My Website'}
              />
            </>
          }
        />

        <InstallSteps />
      </div>
    </div>
  )
}
