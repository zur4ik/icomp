import { useEffect, useState } from "react"
import type { IconInfo } from "@shared/types"
import { Icon } from "@com/Icon"
import fetchIcons from "@services/fetchIcons"

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
          <Icon icon={icon} size={size} key={icon.name} />
        ))}
      </div>
    </div>
  )
}

export default App
