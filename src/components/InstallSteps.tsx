import { useState } from 'react'
import { buildHtmlSnippet } from '../lib/packageBuilder'
import PackageManifestCard from './PackageManifestCard'

const STEPS = [
  {
    title: 'Download the ZIP package',
    body: 'Use the download button above after your icon looks right.',
  },
  {
    title: 'Upload the files to your site root',
    body: 'Place every generated file beside your homepage HTML.',
  },
  {
    title: 'Paste the tags into your HTML head',
    body: 'Copy the snippet below and add it before </head>.',
  },
  {
    title: 'Test the live page',
    body: 'After deployment, run the checker against your public URL to confirm browsers can find every icon.',
  },
]

export default function InstallSteps() {
  const [copied, setCopied] = useState(false)
  const snippet = buildHtmlSnippet()

  async function copySnippet() {
    await navigator.clipboard.writeText(snippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="rounded-lg border border-line-dark bg-ink-soft p-6">
        <h2 className="mb-6 font-display text-[19px] font-semibold text-[#F2F0EA]">
          Install your favicon
        </h2>
        <ol className="space-y-5">
          {STEPS.map((s, i) => (
            <li key={s.title} className="flex gap-3.5">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber text-[12px] font-semibold text-ink">
                {i + 1}
              </span>
              <div>
                <p className="text-[14.5px] font-medium text-[#EDEBE5]">{s.title}</p>
                <p className="mt-0.5 text-[13.5px] leading-relaxed text-muted-dark">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-6 rounded-md border border-line-dark bg-ink">
          <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed text-[#c9c6bd]">
            {snippet}
          </pre>
        </div>
        <button
          onClick={copySnippet}
          className="mt-3 rounded-md border border-line-dark px-3.5 py-2 text-[13px] font-medium text-[#EDEBE5] transition-colors hover:border-[#3a3f46]"
        >
          {copied ? 'Copied' : 'Copy HTML tags'}
        </button>
      </div>

      <PackageManifestCard />
    </div>
  )
}
