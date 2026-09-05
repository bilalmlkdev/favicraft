import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Command {
  id: string
  label: string
  hint: string
  to: string
  group: string
}

const COMMANDS: Command[] = [
  { id: 'home', label: 'Overview', hint: 'Home and tool index', to: '/', group: 'Navigate' },
  { id: 'image', label: 'Image to favicon', hint: 'Convert a logo or photo', to: '/image', group: 'Generate' },
  { id: 'text', label: 'Text to favicon', hint: 'Letters and initials', to: '/text', group: 'Generate' },
  { id: 'emoji', label: 'Emoji to favicon', hint: 'Browse the emoji library', to: '/emoji', group: 'Generate' },
  { id: 'svg', label: 'SVG to favicon', hint: 'Convert vector artwork', to: '/svg', group: 'Generate' },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const filtered = COMMANDS.filter(
    (c) =>
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      c.hint.toLowerCase().includes(query.toLowerCase()),
  )

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIndex(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  function select(cmd: Command) {
    navigate(cmd.to)
    setOpen(false)
  }

  function onListKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filtered[activeIndex]) select(filtered[activeIndex])
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 text-muted-dark transition-colors hover:text-fg"
      >
        <span className="hidden sm:inline">search</span>
        <span className="kbd">^K</span>
      </button>
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[14vh]"
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-palette-in dashed-box w-full max-w-lg bg-ink-soft font-mono"
      >
        <div className="flex items-center gap-2.5 border-b border-dashed border-line-dark px-4 py-3">
          <span className="text-muted-dark">&gt;</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onListKeyDown}
            placeholder="jump to a tool..."
            className="w-full bg-transparent text-[14px] text-fg outline-none placeholder:text-muted-dark"
          />
          <span className="kbd">esc</span>
        </div>

        <div className="max-h-[320px] overflow-y-auto p-2">
          {filtered.length === 0 && (
            <p className="px-3 py-8 text-center text-[13px] text-muted-dark">
              no matches for "{query}"
            </p>
          )}
          {['Navigate', 'Generate'].map((group) => {
            const items = filtered.filter((c) => c.group === group)
            if (items.length === 0) return null
            return (
              <div key={group} className="mb-1">
                <p className="px-3 py-1.5 text-[11px] uppercase tracking-wide text-muted-dark">
                  {group}
                </p>
                {items.map((c) => {
                  const idx = filtered.indexOf(c)
                  return (
                    <button
                      key={c.id}
                      onClick={() => select(c)}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={`flex w-full items-center justify-between px-3 py-2.5 text-left transition-colors ${
                        activeIndex === idx ? 'bg-ink-elevated' : ''
                      }`}
                    >
                      <div>
                        <p className="text-[13.5px] text-fg">
                          <span className="text-amber">*</span> {c.label}
                        </p>
                        <p className="pl-3 text-[12px] text-muted-dark">{c.hint}</p>
                      </div>
                      {activeIndex === idx && <span className="kbd">&#8629;</span>}
                    </button>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
