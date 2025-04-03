import type { IconInfo } from "../../shared/types"

const fetchIcons: () => Promise<IconInfo[]> = async () => {
  const res = await fetch("/api/icons")
  return await res.json()
}

export default fetchIcons
