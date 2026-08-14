import { useState } from "react"

const CopyRow = ({ label, command }: { label: string; command: string }) => {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <button
      onClick={copy}
      className="group border-ink bg-surface hover:bg-select-soft grid w-full grid-cols-[92px_1fr] items-center gap-4 border px-4 py-3 text-left transition-colors"
    >
      <span className="mono-tag text-muted">{label}</span>
      <span className="flex items-center justify-between gap-3 overflow-x-auto">
        <span className="text-ink font-mono text-[13px] whitespace-nowrap">
          <span className="text-muted">$</span> {command}
        </span>
        <span className="mono-tag text-muted group-hover:text-select shrink-0">
          {copied ? "copied" : "copy"}
        </span>
      </span>
    </button>
  )
}

export default CopyRow
