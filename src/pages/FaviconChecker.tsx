import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import Button from '../components/Button'

interface CheckResult {
  path: string
  label: string
  status: 'found' | 'missing' | 'checking'
}

const TARGETS = [
  { path: '/favicon.ico', label: 'favicon.ico (legacy fallback)' },
  { path: '/favicon-32x32.png', label: 'favicon-32x32.png' },
  { path: '/favicon-16x16.png', label: 'favicon-16x16.png' },
  { path: '/apple-touch-icon.png', label: 'apple-touch-icon.png' },
  { path: '/site.webmanifest', label: 'site.webmanifest' },
]

function normalizeUrl(input: string) {
  let url = input.trim()
  if (!/^https?:\/\//i.test(url)) url = `https://${url}`
  return url
}

export default function FaviconChecker() {
  const [input, setInput] = useState('')
  const [results, setResults] = useState<CheckResult[] | null>(null)
  const [checking, setChecking] = useState(false)
  const [error, setError] = useState('')

  async function runCheck() {
    if (!input.trim()) return
    setError('')
    setChecking(true)
    const base = normalizeUrl(input)
    setResults(TARGETS.map((t) => ({ ...t, status: 'checking' })))

    const next: CheckResult[] = []
    for (const t of TARGETS) {
      try {
        const res = await fetch(new URL(t.path, base).toString(), { method: 'HEAD', mode: 'no-cors' })
        // no-cors gives an opaque response; treat completion without throw as reachable
        next.push({ ...t, status: res ? 'found' : 'missing' })
      } catch {
        next.push({ ...t, status: 'missing' })
      }
      setResults([...next, ...TARGETS.slice(next.length).map((r) => ({ ...r, status: 'checking' as const }))])
    }
    setChecking(false)

    if (next.every((r) => r.status === 'missing')) {
      setError(
        'Cross-origin browser requests cannot always confirm file presence due to CORS. For a fully reliable check, inspect the page source or server logs directly.',
      )
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Checker"
        title="Favicon checker"
        description="Enter any URL to preview and test favicon.ico, PNG icons, Apple touch icon, and web manifest setup."
      />

      <div className="mx-auto max-w-[720px] px-5 py-10">
        <div className="rounded-lg border border-line-dark bg-ink-soft p-6">
          <label className="block">
            <span className="mb-1.5 block text-[13px] font-medium text-muted-dark">
              Website URL
            </span>
            <div className="flex gap-2.5">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && runCheck()}
                placeholder="example.com"
                className="w-full rounded-md border border-line-dark bg-ink-elevated px-3.5 py-2.5 text-[13.5px] text-[#EDEBE5] outline-none focus:border-amber"
              />
              <Button variant="primary" onClick={runCheck} disabled={checking}>
                {checking ? 'Checking…' : 'Check'}
              </Button>
            </div>
          </label>

          {results && (
            <ul className="mt-6 divide-y divide-line-dark border-t border-line-dark">
              {results.map((r) => (
                <li key={r.path} className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-mono text-[13px] text-[#EDEBE5]">{r.path}</p>
                    <p className="text-[12.5px] text-muted-dark">{r.label}</p>
                  </div>
                  <StatusBadge status={r.status} />
                </li>
              ))}
            </ul>
          )}

          {error && (
            <p className="mt-4 rounded-md border border-line-dark bg-ink-elevated p-3 text-[12.5px] leading-relaxed text-muted-dark">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: CheckResult['status'] }) {
  if (status === 'checking') {
    return <span className="text-[12px] font-medium text-muted-dark">Checking…</span>
  }
  if (status === 'found') {
    return (
      <span className="rounded-full bg-signal/15 px-2.5 py-1 text-[11.5px] font-medium text-signal">
        Reachable
      </span>
    )
  }
  return (
    <span className="rounded-full bg-danger/15 px-2.5 py-1 text-[11.5px] font-medium text-danger">
      Not confirmed
    </span>
  )
}
