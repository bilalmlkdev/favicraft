interface FileRow {
  size: string
  name: string
  desc: string
}

const FILES: FileRow[] = [
  { size: 'ICO', name: 'favicon.ico', desc: 'legacy fallback' },
  { size: '16', name: 'favicon-16x16.png', desc: 'browser tabs' },
  { size: '32', name: 'favicon-32x32.png', desc: 'hiDPI tabs' },
  { size: '180', name: 'apple-touch-icon.png', desc: 'iOS home screen' },
  { size: '192', name: 'android-chrome-192x192.png', desc: 'android home screen' },
  { size: '512', name: 'android-chrome-512x512.png', desc: 'PWA install' },
  { size: 'JSON', name: 'site.webmanifest', desc: 'install metadata' },
]

export default function PackageManifestCard() {
  return (
    <div className="font-mono">
      <p className="mb-3 text-[13px] text-fg">
        <span className="text-amber">#</span> package contents ({FILES.length} files)
      </p>
      <hr className="dotted-rule mb-3" />
      <ul className="space-y-2">
        {FILES.map((f) => (
          <li key={f.name} className="flex items-baseline gap-2 text-[12.5px]">
            <span className="w-8 shrink-0 text-muted-dark tabular">{f.size}</span>
            <span className="min-w-0 flex-1 truncate text-fg">{f.name}</span>
            <span className="shrink-0 text-muted-dark">{f.desc}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
