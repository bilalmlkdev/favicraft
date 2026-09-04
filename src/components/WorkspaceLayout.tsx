export default function WorkspaceLayout({
  controls,
  preview,
}: {
  controls: React.ReactNode
  preview: React.ReactNode
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="rounded-lg border border-line-dark bg-ink-soft p-6">{controls}</div>
      <div className="space-y-5">{preview}</div>
    </div>
  )
}
