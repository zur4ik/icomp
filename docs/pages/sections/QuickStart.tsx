import CopyRow from "../CopyRow"

const installOptions = [
  { label: "global", command: "npm install -g icomp" },
  { label: "dev dep", command: "npm install --save-dev icomp" },
]

const QuickStart = () => (
  <section id="quick-start" className="mx-auto max-w-5xl px-6 py-20">
    <p className="mono-tag text-select mb-2">get started</p>
    <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Quick start</h2>
    <div className="mt-8 grid gap-6 sm:grid-cols-2">
      <div>
        <p className="mono-tag text-muted mb-3">install</p>
        <div className="flex flex-col gap-3">
          {installOptions.map((opt) => (
            <CopyRow key={opt.label} label={opt.label} command={opt.command} />
          ))}
        </div>
      </div>
      <div>
        <p className="mono-tag text-muted mb-3">run without installing</p>
        <CopyRow label="npx" command="npx icomp generate -i ./icons -o ./src/icons" />
      </div>
    </div>
  </section>
)

export default QuickStart
