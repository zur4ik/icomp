import { type ComponentType, useCallback, useEffect, useState } from "react"

interface ComponentEntry {
  name: string
  Component: ComponentType
}
const App = () => {
  const [icons, setIcons] = useState<ComponentEntry[]>([])

  const loadIcons = useCallback(async () => {
    // 1. get the components directory from the server
    const res = await fetch("/components")
    const { componentsDir } = await res.json()

    // 2. import CLI generated index from components dir
    const iconsModule = await import(/* @vite-ignore */ `${componentsDir}/index.ts`)

    // Step 3: turn module into an array
    const loaded: ComponentEntry[] = Object.entries(iconsModule).map(([name, Component]) => ({
      name,
      Component: Component as React.ComponentType,
    }))
    setIcons(loaded)

    console.log("iconsModule", loaded)
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
          gap: "10px",
        }}
      >
        {icons.map((icon) => (
          <div key={icon.name} style={{ textAlign: "center" }}>
            <icon.Component />
            <div style={{ fontSize: "12px" }}>{icon.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
