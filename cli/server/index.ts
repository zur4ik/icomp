import express from "express"
import { DEFAULT_HOST } from "@services/constants"
import getIcons from "./services/getIcons"
import type { IconInfo } from "@shared/types"
import { CACHE_PATH, WEB_DIR, WEB_INDEX } from "../paths"

export function startServer(inputPath: string, outputPath: string, port: number) {
  const app = express()

  // serve static files from the input path
  app.use("/icon", express.static(inputPath))

  // serve generated js components from cache
  app.use("/component", express.static(CACHE_PATH))

  // service to get the list of icons
  app.get("/api/icons", (req, res) => {
    const icons: IconInfo[] = getIcons(inputPath)
    res.json(icons)
  })

  // serve web app static files
  app.use(express.static(WEB_DIR))

  // fallback to index.html
  app.get("*", (req, res) => {
    res.sendFile(WEB_INDEX)
  })

  app.listen(port, DEFAULT_HOST, () => {
    console.log(`🚀 icomp [ui mode] started on http://localhost:${port}`)
  })
}

export default startServer
