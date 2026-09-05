import { Link } from 'react-router-dom'

export default function ToolCard({
  to,
  index,
  title,
  description,
}: {
  to: string
  index: string
  title: string
  description: string
}) {
  return (
    <Link
      to={to}
      className="group flex items-start justify-between gap-6 border-t border-dashed border-line-dark py-6 font-mono transition-colors first:border-t-0 hover:bg-ink-soft"
    >
      <div className="flex items-start gap-4">
        <span className="pt-0.5 text-[12.5px] text-muted-dark tabular">{index}</span>
        <div>
          <h3 className="text-[16px] font-bold text-fg transition-transform duration-200 group-hover:translate-x-1">
            <span className="text-amber">*</span> {title}
          </h3>
          <p className="mt-1.5 max-w-md pl-3 text-[13px] leading-relaxed text-muted-dark">
            {description}
          </p>
        </div>
      </div>
      <span className="pt-0.5 text-muted-dark transition-transform duration-200 group-hover:translate-x-1 group-hover:text-fg">
        &rarr;
      </span>
    </Link>
  )
}
