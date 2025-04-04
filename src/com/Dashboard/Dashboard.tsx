import { type FC, useEffect, useState } from "react"
import type { IconInfo } from "@shared/types"
import { Icon } from "@com/Icon"
import fetchIcons from "@services/fetchIcons"

export const Dashboard: FC = () => {
  const [icons, setIcons] = useState<IconInfo[]>([])
  const size = 24

  // Fetch icons from the server
  useEffect(() => {
    fetchIcons().then((data) => setIcons(data))
  }, [])

  return (
    <div className={"flex grow"}>
      <main className={"grid-cols-auto-60 grid grow content-start gap-16 p-16"}>
        {icons.map((icon) => (
          <Icon icon={icon} size={size} key={icon.name} />
        ))}
      </main>
      <aside className={"w-300 border-l-1 border-l-gray-300"}>panel</aside>
    </div>
  )
}
