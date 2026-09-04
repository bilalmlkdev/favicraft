import { useEffect, useRef } from 'react'

interface PreviewGridProps {
  render: (size: number) => Promise<HTMLCanvasElement> | HTMLCanvasElement
  refreshKey: string | number
}

const CONTEXTS = [
  { size: 64, label: 'Large', display: 48 },
  { size: 32, label: 'Tab', display: 28 },
  { size: 24, label: 'Bookmark', display: 20 },
  { size: 16, label: 'Address bar', display: 16 },
]

function PreviewCell({
  size,
  display,
  label,
  render,
  refreshKey,
}: PreviewGridProps & { size: number; display: number; label: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let cancelled = false
    Promise.resolve(render(size * 2)).then((src) => {
      if (cancelled || !canvasRef.current) return
      const ctx = canvasRef.current.getContext('2d')
      if (!ctx) return
      canvasRef.current.width = size * 2
      canvasRef.current.height = size * 2
      ctx.clearRect(0, 0, size * 2, size * 2)
      ctx.drawImage(src, 0, 0)
    })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size, refreshKey])

  return (
    <div className="flex flex-col items-center gap-2.5">
      <div
        className="flex items-center justify-center rounded-md border border-line-dark bg-ink-elevated"
        style={{ width: display + 24, height: display + 24 }}
      >
        <canvas
          ref={canvasRef}
          style={{ width: display, height: display }}
          className="rounded-sm"
        />
      </div>
      <span className="text-[12px] text-muted-dark">{label}</span>
    </div>
  )
}

export default function PreviewGrid({ render, refreshKey }: PreviewGridProps) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {CONTEXTS.map((c) => (
        <PreviewCell key={c.label} {...c} render={render} refreshKey={refreshKey} />
      ))}
    </div>
  )
}
