const steps = [
  {
    n: "01",
    title: "Point",
    body: "Tell icomp where your SVGs live and where components should land.",
    code: "icomp generate -i ./icons -o ./src/icons",
  },
  {
    n: "02",
    title: "Generate",
    body: "Each SVG becomes a typed component. The index is rebuilt to match.",
    code: "IconHeart.tsx  IconStar.tsx  index.ts",
  },
  {
    n: "03",
    title: "Import",
    body: "No manual exports, no renaming — just import and render.",
    code: 'import { IconHeart } from "./icons"',
  },
]

const HowItWorks = () => (
  <section className="mx-auto max-w-5xl px-6 py-20">
    <p className="mono-tag text-select mb-2">pipeline</p>
    <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">How it works</h2>

    <div className="border-line mt-8 grid gap-px border sm:grid-cols-3">
      {steps.map((step) => (
        <div key={step.n} className="bg-surface p-6">
          <p className="text-accent font-mono text-sm">{step.n}</p>
          <h3 className="font-display mt-2 text-xl font-semibold">{step.title}</h3>
          <p className="text-muted mt-2 text-sm">{step.body}</p>
          <p className="text-muted mt-4 font-mono text-xs">{step.code}</p>
        </div>
      ))}
    </div>
  </section>
)

export default HowItWorks
