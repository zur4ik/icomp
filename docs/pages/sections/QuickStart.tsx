import CopyLine from "../CopyLine"

const options = [
  { label: "Global", command: "npm install -g icomp" },
  { label: "One-off", command: "npx icomp generate -i ./icons -o ./src/icons" },
  { label: "Dev dependency", command: "npm install --save-dev icomp" },
]

const QuickStart = () => (
  <section id="quick-start" className="mx-auto max-w-5xl px-6 py-20">
    <p className="mono-tag text-select mb-2">install</p>
    <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Quick start</h2>
    <div className="mt-8 grid gap-3 sm:grid-cols-3">
      {options.map((opt) => (
        <div key={opt.label}>
          <p className="mono-tag text-muted mb-2">{opt.label}</p>
          <CopyLine command={opt.command} />
        </div>
      ))}
    </div>
  </section>
)

export default QuickStart
