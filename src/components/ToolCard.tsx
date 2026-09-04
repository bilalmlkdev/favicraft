import { Link } from 'react-router-dom'

export default function ToolCard({
  to,
  icon,
  title,
  description,
  accent,
}: {
  to: string
  icon: React.ReactNode
  title: string
  description: string
  accent?: string
}) {
  return (
    <Link
      to={to}
      className="group flex flex-col rounded-lg border border-line-dark bg-ink-soft p-5 transition-colors hover:border-[#3a3f46]"
    >
      <span
        className="mb-4 flex h-10 w-10 items-center justify-center rounded-md text-[18px]"
        style={{ backgroundColor: accent ? `${accent}1a` : '#22262c', color: accent ?? '#8B929C' }}
      >
        {icon}
      </span>
      <h3 className="font-display text-[16px] font-semibold text-[#F2F0EA]">{title}</h3>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-dark">{description}</p>
      <span className="mt-4 flex items-center gap-1 text-[13px] font-medium text-amber opacity-0 transition-opacity group-hover:opacity-100">
        Open tool
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  )
}
