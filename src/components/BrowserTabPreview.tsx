import { useEffect, useRef } from 'react'

export default function BrowserTabPreview({
  render,
  refreshKey,
  pageTitle,
}: {
  render: (size: number) => Promise<HTMLCanvasElement> | HTMLCanvasElement
  refreshKey: string | number
  pageTitle: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let cancelled = false
    Promise.resolve(render(32)).then((src) => {
      if (cancelled || !canvasRef.current) return
      const ctx = canvasRef.current.getContext('2d')
      if (!ctx) return
      ctx.clearRect(0, 0, 32, 32)
      ctx.drawImage(src, 0, 0)
    })
    return () => {
      cancelled = true
    }
  }, [render, refreshKey])

  return (
    <div className="dashed-box bg-ink-soft font-mono">
      <div className="border-b border-dashed border-line-dark px-3 py-2 text-[11px] text-muted-dark">
        browser tab
      </div>
      <div className="flex items-center gap-2 px-3 py-2.5">
        <div className="flex items-center gap-2 border border-line-dark bg-ink px-2.5 py-1.5">
          <canvas ref={canvasRef} width={16} height={16} className="shrink-0" />
          <span className="max-w-[160px] truncate text-[12px] text-fg">
            {pageTitle || 'untitled page'}
          </span>
        </div>
      </div>
    </div>
  )
}
