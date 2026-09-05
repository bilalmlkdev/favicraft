export default function WorkspaceLayout({
  controls,
  preview,
}: {
  controls: React.ReactNode
  preview: React.ReactNode
}) {
  return (
    <div className="grid gap-10 font-mono lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
      <div>{controls}</div>
      <div className="lg:sticky lg:top-20 lg:self-start">{preview}</div>
    </div>
  )
}
