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
      className={`flex min-h-[220px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed px-6 py-10 text-center transition-colors ${
        dragOver
          ? 'border-amber bg-amber/5'
          : 'border-line-dark bg-ink-elevated hover:border-[#3a3f46]'
      }`}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        className="mb-1 text-muted-dark"
      >
        <path
          d="M12 16V4m0 0L7 9m5-5l5 5M5 20h14"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="text-[14px] font-medium text-[#EDEBE5]">
        Drag and drop your file here
      </p>
      <p className="text-[13px] text-muted-dark">or click to browse — {hint}</p>
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
