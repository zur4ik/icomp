import express from "express"
import { DEFAULT_HOST } from "@services/constants"
import getIcons from "./services/getIcons"
import type { IconInfo } from "@shared/types"
import { cliRoot } from "../paths"
import path from "node:path"

export function startServer(inputPath: string, outputPath: string, port: number) {
  const app = express()

  // serve static files from the input path
  app.use("/icon", express.static(inputPath))

  // serve generated js components from cache
  app.use("/component", express.static(path.join(cliRoot, ".cache")))

  // service to get the list of icons
  app.get("/api/icons", (req, res) => {
    const icons: IconInfo[] = getIcons(inputPath)
    res.json(icons)
  })

  app.listen(port, DEFAULT_HOST, () => {
    console.log(`🚀 icomp explorer started on http://localhost:${port}`)
  })
}

export default startServer
