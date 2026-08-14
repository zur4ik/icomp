const Footer = () => (
  <footer className="border-ink border-t">
    <div className="text-muted mx-auto flex max-w-5xl flex-col gap-4 px-6 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="font-mono">icomp v1.9.0 · MIT License · built by Zura Jijavadze</p>
      <div className="flex gap-6">
        <a
          href="https://github.com/zur4ik/icomp"
          target="_blank"
          rel="noreferrer"
          className="hover:text-ink transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://www.npmjs.com/package/icomp"
          target="_blank"
          rel="noreferrer"
          className="hover:text-ink transition-colors"
        >
          npm
        </a>
        <a
          href="https://github.com/zur4ik/icomp/blob/main/CHANGELOG.md"
          target="_blank"
          rel="noreferrer"
          className="hover:text-ink transition-colors"
        >
          Changelog
        </a>
      </div>
    </div>
  </footer>
)

export default Footer
