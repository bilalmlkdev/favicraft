import { useCallback, useRef, useState } from 'react'

export default function Dropzone({
  onFile,
  accept,
  hint,
}: {
  onFile: (file: File) => void
  accept: string
  hint: string
}) {
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (files && files[0]) onFile(files[0])
    },
    [onFile],
  )

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault()
        setDragOver(true)
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragOver(false)
        handleFiles(e.dataTransfer.files)
      }}
      onClick={() => inputRef.current?.click()}
      className={`flex min-h-[160px] cursor-pointer flex-col items-center justify-center gap-2 border border-dashed px-6 py-10 text-center transition-colors ${
        dragOver ? 'border-amber text-amber' : 'border-line-dark text-muted-dark hover:border-fg hover:text-fg'
      }`}
    >
      <p className="text-[13.5px]">drop file here</p>
      <p className="text-[12.5px] text-muted-dark">or click to browse - {hint}</p>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  )
}
