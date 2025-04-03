import { useEffect, useState } from "react"
import type { IconInfo } from "../shared/types"
import fetchIcons from "./services/fetchIcons"

const App = () => {
  const size = 24
  const [icons, setIcons] = useState<IconInfo[]>([])

  useEffect(() => {
    fetchIcons().then((data) => setIcons(data))
  }, [])

  return (
    <div style={{ padding: "20px" }}>
      <h1>Icon Explorer</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 80px)", gap: "10px" }}>
        {icons.map((icon) => (
          <div
            key={icon.name}
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <img src={`/icon/${icon.file}`} alt={icon.name} width={size} height={size} />
            <small>{icon.name}</small>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
