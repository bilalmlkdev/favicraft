import { useCallback, useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import WorkspaceLayout from '../components/WorkspaceLayout'
import Dropzone from '../components/Dropzone'
import Button from '../components/Button'
import ShapeSelector from '../components/ShapeSelector'
import HeroPreview from '../components/HeroPreview'
import PreviewGrid from '../components/PreviewGrid'
import BrowserTabPreview from '../components/BrowserTabPreview'
import InstallSteps from '../components/InstallSteps'
import { ShapeStyle, loadImage, renderImageIcon } from '../lib/rasterize'
import { buildFaviconZip } from '../lib/packageBuilder'

export default function ImageGenerator() {
  const [imgEl, setImgEl] = useState<HTMLImageElement | null>(null)
  const [fileName, setFileName] = useState('')
  const [shape, setShape] = useState<ShapeStyle>('none')
  const [bgColor, setBgColor] = useState('#1a1a1a')
  const [busy, setBusy] = useState(false)

  const onFile = useCallback(async (file: File) => {
    const url = URL.createObjectURL(file)
    const img = await loadImage(url)
    setImgEl(img)
    setFileName(file.name.replace(/\.[^/.]+$/, ''))
  }, [])

  const render = useMemo(() => {
    return async (size: number) => {
      if (!imgEl) {
        const c = document.createElement('canvas')
        c.width = size
        c.height = size
        return c
      }
      return renderImageIcon(size, imgEl, shape, bgColor)
    }
  }, [imgEl, shape, bgColor])

  const refreshKey = `${shape}-${bgColor}-${fileName}`

  async function handleDownload() {
    if (!imgEl) return
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
        eyebrow="01 - converter"
        title="image to favicon"
        description="Upload a logo or square image. Conversion happens entirely in your browser - nothing is uploaded anywhere."
      />

      <div className="mx-auto max-w-[1100px] space-y-14 px-5 pb-16 font-mono">
        <WorkspaceLayout
          controls={
            <div className="space-y-7">
              <Dropzone
                onFile={onFile}
                accept="image/png,image/jpeg,image/webp"
                hint="png, jpg, or webp"
              />

              {fileName && (
                <p className="text-[13px] text-muted-dark">
                  loaded <span className="text-fg">{fileName}</span>
                </p>
              )}

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

              <div className="flex items-center gap-4 pt-2">
                <Button variant="primary" onClick={handleDownload} disabled={!imgEl || busy}>
                  {busy ? 'building package...' : 'download package'}
                </Button>
                <span className="text-[12.5px] text-muted-dark">
                  bold, square logos work best at 16x16.
                </span>
              </div>
            </div>
          }
          preview={
            <div className="space-y-5">
              <HeroPreview render={render} refreshKey={refreshKey} />
              <div className="dashed-box p-5">
                <PreviewGrid render={render} refreshKey={refreshKey} />
              </div>
              <BrowserTabPreview render={render} refreshKey={refreshKey} pageTitle={fileName || 'my website'} />
            </div>
          }
        />

        <InstallSteps />
      </div>
    </div>
  )
}
