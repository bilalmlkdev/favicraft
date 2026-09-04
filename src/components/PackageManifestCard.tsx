interface FileRow {
  tag: string
  name: string
  desc: string
}

const FILES: FileRow[] = [
  { tag: 'ICO', name: 'favicon.ico', desc: 'Legacy browser fallback' },
  { tag: '16', name: 'favicon-16x16.png', desc: 'Browser tabs' },
  { tag: '32', name: 'favicon-32x32.png', desc: 'HiDPI tabs' },
  { tag: '180', name: 'apple-touch-icon.png', desc: 'iPhone and iPad home screens' },
  { tag: '192', name: 'android-chrome-192x192.png', desc: 'Android home screens' },
  { tag: '512', name: 'android-chrome-512x512.png', desc: 'PWA install icon' },
  { tag: 'JSON', name: 'site.webmanifest', desc: 'Install metadata' },
]

export default function PackageManifestCard() {
  return (
    <div className="rounded-lg border border-line-dark bg-ink-soft">
      <div className="flex items-center justify-between border-b border-line-dark px-4 py-3">
        <span className="text-[12px] font-medium uppercase tracking-wide text-muted-dark">
          Complete favicon package
        </span>
        <span className="text-[12px] text-muted-dark">{FILES.length} files</span>
      </div>
      <ul className="divide-y divide-line-dark">
        {FILES.map((f) => (
          <li key={f.name} className="flex items-center gap-3 px-4 py-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-ink-elevated text-[10px] font-semibold tabular text-muted-dark">
              {f.tag}
            </span>
            <div className="min-w-0">
              <p className="truncate font-mono text-[13px] text-[#EDEBE5]">{f.name}</p>
              <p className="truncate text-[12.5px] text-muted-dark">{f.desc}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="border-t border-line-dark px-4 py-3 text-[12px] leading-relaxed text-muted-dark">
        Everything downloads in one ZIP with the filenames used in the install steps.
      </p>
    </div>
  )
}
