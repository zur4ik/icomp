import express from "express"
import { DEFAULT_HOST } from "@services/constants"
import getIcons from "./services/getIcons"
import type { IconInfo } from "@shared/types"
import { CACHE_PATH, WEB_DIR, WEB_INDEX } from "../paths"
import { renameIcon } from "./services/renameIcon"
import { getIconInfo } from "./services/getIconInfo"
import generateIcons from "./services/generateIcons"

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

  // service to rename an icon
  app.post("/api/rename", express.json(), (req, res) => {
    const { fileName, newFileName, keywords } = req.body

    if (!fileName || !newFileName) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    try {
      renameIcon(inputPath, outputPath, fileName, newFileName, keywords)
    } catch (error) {
      console.error("Error renaming icon:", error)
      return res.status(500).json({ error: "Failed to rename icon", errorDetails: error })
    }

    // After renaming, return new icon info
    const iconInfo: IconInfo = getIconInfo(inputPath, newFileName + ".svg")

    res.json(iconInfo)
  })

  // generate icons
  app.post("/api/generate", express.json(), async (req, res) => {
    const { files } = req.body

    if (!files || !Array.isArray(files)) {
      return res.status(400).json({ error: "Invalid parameters" })
    }

    try {
      // Call the function to generate icons
      await generateIcons(inputPath, outputPath, files)
      res.status(200).json({ message: "Icons generated successfully" })
    } catch (error) {
      console.error("Error generating icons:", error)
      res.status(500).json({ error: "Failed to generate icons", errorDetails: error })
    }
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
