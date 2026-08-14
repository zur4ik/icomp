import CopyLine from "../CopyLine"
import { demoIcons } from "../demoIcons"

const Arrow = () => (
  <div className="flex flex-col items-center justify-center gap-2 px-2 py-4 sm:flex-1 sm:py-0">
    <span className="mono-tag text-muted">icomp generate</span>
    <svg
      viewBox="0 0 100 20"
      className="text-ink h-5 w-16 rotate-90 sm:w-full sm:rotate-0"
      preserveAspectRatio="none"
    >
      <line
        x1="0"
        y1="10"
        x2="88"
        y2="10"
        stroke="currentColor"
        strokeWidth="2"
        className="marching-ants"
      />
      <path d="M84 4 L96 10 L84 16 Z" fill="currentColor" />
    </svg>
  </div>
)

const ConversionStrip = () => {
  const Heart = demoIcons[0].Icon
  return (
    <div className="flex flex-col items-stretch gap-0 sm:flex-row sm:items-center">
      <div className="artboard fade-up flex-1 p-5" style={{ animationDelay: "0.05s" }}>
        <span className="tick-tl">0,0</span>
        <span className="tick-br">24,24</span>
        <p className="mono-tag text-muted mb-3">heart.svg</p>
        <div className="flex h-24 items-center justify-center">
          <Heart className="text-ink h-14 w-14" strokeWidth={1.25} />
        </div>
      </div>

      <Arrow />

      <div
        className="artboard fade-up border-accent flex-1 p-5"
        style={{ animationDelay: "0.15s" }}
      >
        <span className="tick-tl">0,0</span>
        <span className="tick-br">24,24</span>
        <p className="mono-tag text-accent mb-3">IconHeart.tsx</p>
        <div className="flex h-24 items-center justify-center">
          <Heart className="text-accent h-14 w-14" strokeWidth={1.25} />
        </div>
      </div>
    </div>
  )
}

const Hero = () => (
  <section id="top" className="mx-auto max-w-5xl px-6 pt-16 pb-20 sm:pt-24">
    <p className="mono-tag text-select mb-4">format: svg → react.tsx</p>
    <h1 className="font-display max-w-3xl text-4xl leading-[1.05] font-semibold tracking-tight sm:text-6xl">
      Give it at a folder of SVGs.
      <br />
      Walk away with React icons.
    </h1>
    <p className="text-muted mt-6 max-w-xl text-base sm:text-lg">
      icomp watches your icon folder and generates typed, named, indexed React components on save —
      with a CLI for pipelines and a UI for everyone else.
    </p>

    <div className="mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
      <div className="flex-1">
        <CopyLine command="npm install -g icomp" />
      </div>
      <a
        href="https://github.com/zur4ik/icomp"
        target="_blank"
        rel="noreferrer"
        className="mono-tag border-ink hover:bg-ink hover:text-paper flex items-center justify-center border px-4 py-3 transition-colors"
      >
        Star on GitHub
      </a>
    </div>

    <div className="mt-16">
      <ConversionStrip />
    </div>

    <div className="mt-10">
      <p className="mono-tag text-muted mb-4">
        + {demoIcons.length - 1} more, generated the same way
      </p>
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
        {demoIcons.slice(1).map(({ name, Icon }) => (
          <div
            key={name}
            className="icon-tile border-line flex flex-col items-center gap-2 border p-3"
          >
            <Icon className="text-ink h-6 w-6" strokeWidth={1.5} />
            <span className="icon-tile-name text-muted font-mono text-[10px]">{name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default Hero
