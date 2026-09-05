import { useState } from 'react'
import { buildHtmlSnippet } from '../lib/packageBuilder'
import PackageManifestCard from './PackageManifestCard'
import Button from './Button'

const STEPS = [
  {
    title: 'Download the ZIP package',
    body: 'Use the download button above once your icon looks right.',
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
    body: 'After deployment, confirm the icon shows up correctly in a real browser tab.',
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
    <div className="grid gap-12 pt-2 font-mono lg:grid-cols-[1fr_260px]">
      <hr className="dotted-rule col-span-full" />
      <div>
        <h2 className="mb-6 text-[15px] font-bold text-fg underline decoration-line-dark underline-offset-4">
          Install your favicon
        </h2>
        <ol className="space-y-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="flex gap-3">
              <span className="pt-0.5 text-[13px] text-muted-dark tabular">{i + 1}.</span>
              <div>
                <p className="text-[13.5px] text-fg">{s.title}</p>
                <p className="mt-0.5 max-w-md text-[12.5px] leading-relaxed text-muted-dark">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-6 border border-dashed border-line-dark">
          <pre className="overflow-x-auto p-4 text-[12px] leading-relaxed text-fg">
            {snippet}
          </pre>
        </div>
        <div className="mt-3">
          <Button variant="secondary" onClick={copySnippet}>
            {copied ? (
              <>
                <svg
                  key="check"
                  className="animate-pop-check"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                copied
              </>
            ) : (
              'copy html tags'
            )}
          </Button>
        </div>
      </div>

      <PackageManifestCard />
    </div>
  )
}
