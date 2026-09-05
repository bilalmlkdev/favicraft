import { useEffect, useRef, useState } from 'react'

export default function HeroPreview({
  render,
  refreshKey,
}: {
  render: (size: number) => Promise<HTMLCanvasElement> | HTMLCanvasElement
  refreshKey: string | number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [pulsing, setPulsing] = useState(false)

  useEffect(() => {
    let cancelled = false
    setPulsing(true)
    Promise.resolve(render(512)).then((src) => {
      if (cancelled || !canvasRef.current) return
      const ctx = canvasRef.current.getContext('2d')
      if (!ctx) return
      ctx.clearRect(0, 0, 240, 240)
      ctx.drawImage(src, 0, 0, 240, 240)
      setPulsing(false)
    })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey])

  return (
    <div className="dashed-box flex flex-col items-center bg-ink-soft px-10 py-12">
      <div
        key={refreshKey}
        className={`animate-rise-in relative flex h-[140px] w-[140px] items-center justify-center overflow-hidden ${
          pulsing ? 'opacity-60' : ''
        }`}
      >
        <canvas ref={canvasRef} width={240} height={240} className="h-full w-full" />
      </div>
      <p className="mt-6 text-[12px] text-muted-dark">// live preview</p>
    </div>
  )
}
