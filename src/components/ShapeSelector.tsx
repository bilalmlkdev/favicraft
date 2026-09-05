import { ShapeStyle } from '../lib/rasterize'

const OPTIONS: { value: ShapeStyle; label: string }[] = [
  { value: 'none', label: 'none' },
  { value: 'square', label: 'square' },
  { value: 'rounded', label: 'rounded' },
  { value: 'circle', label: 'circle' },
]

export default function ShapeSelector({
  value,
  onChange,
}: {
  value: ShapeStyle
  onChange: (v: ShapeStyle) => void
}) {
  return (
    <div>
      <p className="mb-2 text-[12.5px] text-muted-dark">background shape</p>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[13px]">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={
              value === opt.value
                ? 'text-amber underline underline-offset-4'
                : 'text-muted-dark transition-colors hover:text-fg'
            }
          >
            [{value === opt.value ? 'x' : ' '}] {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
