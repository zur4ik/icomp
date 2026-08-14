const links = [
  { label: "Features", href: "#features" },
  { label: "Modes", href: "#modes" },
  { label: "Quick start", href: "#quick-start" },
]

const Nav = () => (
  <header className="border-ink bg-paper/90 sticky top-0 z-20 border-b backdrop-blur-sm">
    <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
      <a href="#top" className="flex items-center gap-2">
        <span className="text-accent font-mono text-lg font-medium">{"</>"}</span>
        <span className="font-display text-lg font-semibold tracking-tight">icomp</span>
      </a>
      <nav className="hidden items-center gap-8 sm:flex">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="mono-tag text-muted hover:text-ink transition-colors"
          >
            {link.label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <a
          href="https://www.npmjs.com/package/icomp"
          target="_blank"
          rel="noreferrer"
          className="mono-tag text-muted hover:text-ink hidden transition-colors sm:inline"
        >
          npm
        </a>
        <a
          href="https://github.com/zur4ik/icomp"
          target="_blank"
          rel="noreferrer"
          className="mono-tag border-ink hover:bg-ink hover:text-paper border px-3 py-1.5 transition-colors"
        >
          GitHub ↗
        </a>
      </div>
    </div>
  </header>
)

export default Nav
