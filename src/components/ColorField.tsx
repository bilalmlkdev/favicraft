export default function ColorField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-muted-dark">{label}</span>
      <div className="flex items-center gap-2 rounded-md border border-line-dark bg-ink-elevated px-2.5 py-2">
        <span className="relative h-6 w-6 shrink-0 overflow-hidden rounded border border-line-dark">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute -left-1 -top-1 h-8 w-8 cursor-pointer border-0 p-0"
            aria-label={label}
          />
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent font-mono text-[13px] text-[#EDEBE5] outline-none"
          spellCheck={false}
        />
      </div>
    </label>
  )
}
