import fs from "node:fs"
import { getComponentName, getIconName } from "@shared"
import { cliRoot } from "../../paths"
import path from "node:path"
import type { IconInfo } from "@shared/types"

const getIcons = (inputPath: string): IconInfo[] => {
  const files = fs.readdirSync(inputPath).filter((file) => file.endsWith(".svg"))

  return files.map((file) => {
    const name = getIconName(file)
    const component = getComponentName(file)
    const generated = fs.existsSync(path.join(cliRoot, ".cache", component + ".js"))
    const date = fs.statSync(path.join(inputPath, file)).birthtime.toISOString()

    return {
      name,
      component,
      file,
      generated,
      date,
    }
  })
}

export default getIcons
