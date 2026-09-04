import { NavLink } from 'react-router-dom'
import Logo from './Logo'

const links = [
  { to: '/', label: 'Overview', end: true },
  { to: '/image', label: 'Image' },
  { to: '/text', label: 'Text' },
  { to: '/emoji', label: 'Emoji' },
  { to: '/svg', label: 'SVG' },
  { to: '/checker', label: 'Checker' },
]

export default function NavBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-line-dark bg-ink/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-5">
        <NavLink to="/">
          <Logo />
        </NavLink>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `rounded-md px-3 py-1.5 text-[13.5px] font-medium transition-colors ${
                  isActive
                    ? 'bg-ink-elevated text-[#F2F0EA]'
                    : 'text-muted-dark hover:text-[#F2F0EA]'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="rounded-md border border-line-dark px-3 py-1.5 text-[13px] font-medium text-muted-dark transition-colors hover:border-[#33393f] hover:text-[#F2F0EA]"
        >
          Source
        </a>
      </div>
    </header>
  )
}
