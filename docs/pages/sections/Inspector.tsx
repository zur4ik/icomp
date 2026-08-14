const properties = [
  { label: "Output", value: "React functional components (.tsx)" },
  { label: "Naming", value: "PascalCase, collision-safe" },
  { label: "Props", value: "size, width, height, full SVGProps passthrough" },
  { label: "Color", value: "currentColor wired in automatically" },
  { label: "Index", value: "barrel file regenerated on every change" },
  { label: "Watch mode", value: "on — save a file, get a component" },
  { label: "Input", value: "drag & drop, paste SVG code, paste from Figma" },
  { label: "Search", value: "filter large icon sets instantly" },
]

const Inspector = () => (
  <section id="features" className="mx-auto max-w-5xl px-6 py-20">
    <p className="mono-tag text-select mb-2">properties</p>
    <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">What you get</h2>
    <div className="artboard mt-8">
      {properties.map((prop) => (
        <div key={prop.label} className="inspector-row px-5 py-3.5">
          <span className="mono-tag text-muted self-center">{prop.label}</span>
          <span className="self-center text-[15px]">{prop.value}</span>
        </div>
      ))}
    </div>
  </section>
)

export default Inspector
