import { useCallback, useEffect, useState } from "react"

const App = () => {
  const [icons, setIcons] = useState<string[]>([])

  const loadIcons = useCallback(async () => {
    // 1. get the components directory from the server
    const res = await fetch("/icons")
    const icons = await res.json()

    if (Array.isArray(icons)) {
      setIcons(icons)
    }
  }, [])

  useEffect(() => {
    loadIcons().then((_) => {})
  }, [])

  return (
    <div style={{ padding: "20px" }}>
      <h1>Icon Explorer</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
          gap: "32px",
        }}
      >
        {icons.map((name) => (
          <div
            key={`icon-${name}`}
            style={{ display: "flex", alignItems: "center", flexFlow: "column" }}
          >
            <img src={`/icons/${name}`} alt={name} width={48} height={48} />
            <p>{name.replace(".svg", "")}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
