import { useState } from "react"

const CopyLine = ({ command }: { command: string }) => {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <button
      onClick={copy}
      className="group border-ink bg-surface hover:bg-select-soft flex w-full items-center justify-between gap-4 border px-4 py-3 text-left transition-colors"
    >
      <span className="text-ink overflow-x-auto font-mono text-[13px] whitespace-nowrap">
        <span className="text-muted">$</span> {command}
      </span>
      <span className="mono-tag text-muted group-hover:text-select shrink-0">
        {copied ? "copied" : "copy"}
      </span>
    </button>
  )
}

export default CopyLine
