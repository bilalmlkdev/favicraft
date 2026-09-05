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
      <span className="mb-2 block text-[12.5px] text-muted-dark">{label}</span>
      <div className="flex items-center gap-2 border border-dashed border-line-dark px-2.5 py-2 transition-colors focus-within:border-solid focus-within:border-fg">
        <span className="relative h-4 w-4 shrink-0 overflow-hidden border border-line-dark">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute -left-1 -top-1 h-6 w-6 cursor-pointer border-0 p-0"
            aria-label={label}
          />
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-[13px] text-fg outline-none"
          spellCheck={false}
        />
      </div>
    </label>
  )
}
