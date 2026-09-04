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
    <div className="overflow-hidden rounded-lg border border-line-dark">
      <div className="flex items-center gap-2 border-b border-line-dark bg-[#22262c] px-3 py-2">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#3a3f46]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#3a3f46]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#3a3f46]" />
        </div>
      </div>
      <div className="flex items-center gap-2 bg-ink-elevated px-3 py-2.5">
        <div className="flex items-center gap-2 rounded-md border border-line-dark bg-ink-soft px-2.5 py-1.5">
          <canvas ref={canvasRef} width={16} height={16} className="shrink-0" />
          <span className="max-w-[160px] truncate text-[12.5px] text-[#cfccc4]">
            {pageTitle || 'Untitled page'}
          </span>
        </div>
      </div>
    </div>
  )
}
