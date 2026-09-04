export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <div className="border-b border-line-dark bg-ink-soft">
      <div className="mx-auto max-w-[1200px] px-5 py-10 md:py-12">
        {eyebrow && (
          <p className="mb-2 text-[13px] font-medium text-amber">{eyebrow}</p>
        )}
        <h1 className="max-w-2xl font-display text-[32px] font-semibold leading-[1.15] tracking-tight text-[#F5F3EE] md:text-[38px]">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-dark">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
