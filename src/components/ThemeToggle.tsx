import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  const stored = window.localStorage.getItem('favicraft-theme')
  if (stored === 'dark' || stored === 'light') return stored
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('favicraft-theme', theme)
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#fafaf8')
  }, [theme])

  function toggle() {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle color theme"
      className="flex items-center gap-1.5 text-muted-dark transition-colors hover:text-fg"
    >
      <span className={theme === 'dark' ? 'text-fg' : ''}>dark</span>
      <span className="text-line-dark">/</span>
      <span className={theme === 'light' ? 'text-fg' : ''}>light</span>
    </button>
  )
}
