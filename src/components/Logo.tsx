export default function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 font-mono ${className}`}>
      <span className="text-[15px] font-bold text-fg">favicraft</span>
      <span className="text-[13px] text-muted-dark">_</span>
    </div>
  )
}
