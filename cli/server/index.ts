import express from "express"
import { DEFAULT_HOST } from "@services/constants"
import getIcons from "./services/getIcons"
import type { IconMeta } from "@services/types"

export function startServer(inputPath: string, outputPath: string, port: number) {
  const app = express()

  // serve static files from the input path
  app.use("/icon", express.static(inputPath))

  // service to get the list of icons
  app.get("/api/icons", (req, res) => {
    const icons: IconMeta[] = getIcons(inputPath)
    res.json(icons)
  })

  app.listen(port, DEFAULT_HOST, () => {
    console.log(`🚀 icomp explorer started on http://localhost:${port}`)
  })
}

export default startServer
