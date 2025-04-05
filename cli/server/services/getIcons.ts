import fs from "node:fs"
import { getComponentName, getIconName } from "@shared"
import { CLI_ROOT } from "../../paths"
import path from "node:path"
import type { IconInfo } from "@shared/types"
import { getIconKeywords } from "./getIconKeywords"

const getIcons = (inputPath: string): IconInfo[] => {
  const files = fs.readdirSync(inputPath).filter((file) => file.endsWith(".svg"))

  return files.map((file) => {
    const name = getIconName(file)
    const keywords = getIconKeywords(inputPath, file)
    const component = getComponentName(file)
    const generated = fs.existsSync(path.join(CLI_ROOT, ".cache", component + ".js"))
    const date = fs.statSync(path.join(inputPath, file)).birthtime.toISOString()

    return {
      name,
      keywords,
      component,
      file,
      generated,
      date,
    }
  })
}

export default getIcons
