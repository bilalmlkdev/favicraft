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
    <div className="mx-auto max-w-[1100px] px-5 pb-10 pt-14 font-mono">
      {eyebrow && (
        <p className="mb-3 text-[12.5px] text-muted-dark">{eyebrow}</p>
      )}
      <h1 className="animate-rise-in max-w-2xl text-[26px] font-bold leading-snug text-fg underline decoration-line-dark decoration-2 underline-offset-8">
        {title}
      </h1>
      {description && (
        <p
          className="animate-rise-in mt-5 max-w-xl text-[13.5px] leading-relaxed text-muted-dark"
          style={{ animationDelay: '50ms', animationFillMode: 'backwards' }}
        >
          {description}
        </p>
      )}
    </div>
  )
}
