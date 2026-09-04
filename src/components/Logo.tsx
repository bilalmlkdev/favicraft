export default function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="6" fill="#F5A524" />
        <path
          d="M8 16V8h7"
          stroke="#0F1216"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M8 12h5" stroke="#0F1216" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
      <span className="font-display font-semibold text-[17px] tracking-tight text-[#F2F0EA]">
        FaviCraft
      </span>
    </div>
  )
}
