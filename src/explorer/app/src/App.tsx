import { useCallback, useEffect, useState } from "react"
import Icon from "./com/Icon.tsx"
import "./assets/css/main.css"

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
    loadIcons().finally()
  }, [])

  return (
    <div style={{ padding: "20px" }}>
      <h1>{"{iComp}"} Icon Explorer</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
          gap: "32px",
        }}
      >
        {icons.map((name) => (
          <Icon name={name} />
        ))}
      </div>
      <button onClick={() => fetch("/generate", { method: "POST" })}>
        Generate React Components
      </button>
    </div>
  )
}

export default App
