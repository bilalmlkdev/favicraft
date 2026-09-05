import { useEffect, useRef } from 'react'

interface PreviewGridProps {
  render: (size: number) => Promise<HTMLCanvasElement> | HTMLCanvasElement
  refreshKey: string | number
}

const CONTEXTS = [
  { size: 32, label: 'Tab', display: 22 },
  { size: 24, label: 'Bookmark', display: 18 },
  { size: 16, label: 'Address bar', display: 14 },
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
    Promise.resolve(render(size * 3)).then((src) => {
      if (cancelled || !canvasRef.current) return
      const ctx = canvasRef.current.getContext('2d')
      if (!ctx) return
      canvasRef.current.width = size * 3
      canvasRef.current.height = size * 3
      ctx.clearRect(0, 0, size * 3, size * 3)
      ctx.drawImage(src, 0, 0)
    })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size, refreshKey])

  return (
    <div className="flex items-center gap-3">
      <span className="text-muted-dark">*</span>
      <canvas
        ref={canvasRef}
        style={{ width: display, height: display }}
        className="shrink-0"
      />
      <span className="text-[13px] text-muted-dark">{label}</span>
    </div>
  )
}

export default function PreviewGrid({ render, refreshKey }: PreviewGridProps) {
  return (
    <div className="flex flex-col gap-3">
      <hr className="dotted-rule" />
      {CONTEXTS.map((c) => (
        <PreviewCell key={c.label} {...c} render={render} refreshKey={refreshKey} />
      ))}
    </div>
  )
}
