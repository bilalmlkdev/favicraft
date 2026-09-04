import { ShapeStyle } from '../lib/rasterize'

const OPTIONS: { value: ShapeStyle; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'square', label: 'Square' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'circle', label: 'Circle' },
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
      <span className="mb-1.5 block text-[13px] font-medium text-muted-dark">
        Background shape
      </span>
      <div className="grid grid-cols-4 gap-1.5">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`rounded-md border px-2 py-2 text-[12.5px] font-medium transition-colors ${
              value === opt.value
                ? 'border-amber bg-amber/10 text-amber'
                : 'border-line-dark bg-ink-elevated text-muted-dark hover:text-[#EDEBE5]'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
