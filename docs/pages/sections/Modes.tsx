import { useState } from "react"
import uiScreen from "../../assets/ui-screen.png"
import CopyLine from "../CopyLine"

const tabs = [
  { key: "ui", label: "UI mode" },
  { key: "cli", label: "CLI mode" },
] as const

const Modes = () => {
  const [tab, setTab] = useState<"cli" | "ui">("ui")

  return (
    <section id="modes" className="mx-auto max-w-5xl px-6 py-20">
      <p className="mono-tag text-select mb-2">two ways to work</p>
      <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        Automate it, or drive it by hxand
      </h2>

      <div className="border-ink mt-8 flex border-b">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`mono-tag px-4 py-3 transition-colors ${
              tab === t.key ? "border-accent text-ink border-b-2" : "text-muted hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "cli" ? (
        <div className="fade-up mt-8">
          <p className="text-muted mb-4 max-w-lg">
            Wire it into a script and forget about it. Point at an input folder, an output folder,
            and let watch mode keep them in sync.
          </p>
          <div className="flex flex-col gap-3">
            <CopyLine command="icomp generate -i ./icons -o ./src/components/icons" />
            <CopyLine command="icomp generate -i ./icons -o ./src/components/icons --watch" />
          </div>
        </div>
      ) : (
        <div className="fade-up mt-8">
          <p className="text-muted mb-4 max-w-lg">
            Prefer to see what you're generating? Start the UI and manage icons visually — rename,
            drag in new files, search, and regenerate on the spot.
          </p>
          <CopyLine command="icomp ui -i ./icons -o ./src/components/icons" />
          <div className="artboard mt-6 overflow-hidden">
            <span className="tick-tl">localhost:5001</span>
            <img
              src={uiScreen}
              alt="icomp UI mode: a grid of icons with search, drag-and-drop, and generation controls"
              className="w-full"
            />
          </div>
        </div>
      )}
    </section>
  )
}

export default Modes
