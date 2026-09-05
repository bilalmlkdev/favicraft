import { NavLink } from 'react-router-dom'
import Logo from './Logo'
import CommandPalette from './CommandPalette'
import ThemeToggle from './ThemeToggle'

const links = [
  { to: '/image', label: 'Image' },
  { to: '/text', label: 'Text' },
  { to: '/emoji', label: 'Emoji' },
  { to: '/svg', label: 'SVG' },
]

export default function NavBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-line-dark bg-ink/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1100px] items-center justify-between px-5 font-mono text-[13px]">
        <div className="flex items-center gap-5">
          <NavLink to="/">
            <Logo />
          </NavLink>
          <span className="hidden text-line-dark sm:inline">|</span>
          <nav className="hidden items-center gap-4 sm:flex">
            {links.map((l, i) => (
              <span key={l.to} className="flex items-center gap-4">
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    isActive
                      ? 'text-fg underline underline-offset-4'
                      : 'text-muted-dark transition-colors hover:text-fg'
                  }
                >
                  {l.label}
                </NavLink>
                {i < links.length - 1 && <span className="text-line-dark">|</span>}
              </span>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <span className="hidden text-line-dark sm:inline">|</span>
          <CommandPalette />
          <a
            href="https://github.com/bilalmlkdev/favicraft.git"
            target="_blank"
            rel="noreferrer"
            className="hidden text-muted-dark transition-colors hover:text-fg sm:inline"
          >
          GitHub
          </a>
        </div>
      </div>
    </header>
  )
}
