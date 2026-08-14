import jprofilerBanner from "../../assets/sponsors/jprofiler_small.png"

const supporters = [
  {
    name: "JProfiler",
    href: "https://www.ej-technologies.com/jprofiler",
    banner: jprofilerBanner,
    bannerWidth: 92,
    bannerHeight: 26,
    blurb: "The Java profiler, provided free to open-source projects.",
  },
]

const Supporters = () => (
  <section id="supporters" className="mx-auto max-w-5xl px-6 py-20">
    <p className="mono-tag text-select mb-2">with thanks to</p>
    <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Supporters</h2>
    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      {supporters.map((s) => (
        <a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noreferrer"
          className="artboard hover:bg-select-soft flex items-center gap-4 p-5 transition-colors"
        >
          <img
            src={s.banner}
            alt={s.name}
            width={s.bannerWidth}
            height={s.bannerHeight}
            className="shrink-0"
          />
          <p className="text-muted text-sm">{s.blurb}</p>
        </a>
      ))}
    </div>
  </section>
)

export default Supporters
