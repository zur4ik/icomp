import express from "express"
import { createServer } from "vite"
import path from "node:path"
import { fileURLToPath } from "node:url"
import fs from "node:fs"
import { generateIcons } from "../generate.ts"

export const startExplorer = async (_inputDir: string, _outputDir: string, port: number) => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)

  // Determine root folder
  const isDev = __dirname.includes("/src/")
  const jsComponentsDir = isDev
    ? path.resolve(__dirname, "../../dist/explorer/components")
    : path.resolve(__dirname, "explorer/components")

  // get absolute path of dirs
  const inputDir = path.resolve(_inputDir)
  const outputDir = path.resolve(_outputDir)

  // check input dir
  if (!fs.existsSync(inputDir)) {
    console.error("❌ Components directory not found:", inputDir)
    process.exit(1)
  }

  // check and create output dir if not exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  const app = express()

  // config endpoint
  app.get("/config", (_, res) => {
    res.json({
      inputDir,
      outputDir,
    })
  })

  // serve icons
  app.get("/icons", async (_, res) => {
    const files = await fs.promises.readdir(inputDir)
    const svgs = files.filter((f) => f.endsWith(".svg"))
    res.json(svgs)
  })

  // generate components
  app.post("/generate", async (_, res) => {
    await generateIcons(inputDir, outputDir)
    res.json({ success: true })
  })

  // serve svg files
  app.use("/icons", express.static(inputDir))

  // serve generated js components from cache
  app.use("/components", express.static(path.resolve(__dirname, jsComponentsDir)))

  if (process.env.NODE_ENV === "development") {
    console.log("🚀 Starting Vite in development mode...")
    const vite = await createServer({
      root: path.resolve(__dirname, "app"),
      server: {
        middlewareMode: true,
        fs: {
          allow: [inputDir, path.resolve(__dirname, "app")],
        },
      },
    })
    app.use(vite.middlewares)
  } else {
    app.use(express.static(path.resolve(__dirname, "./explorer")))
    app.get("*", (_, res) => {
      res.sendFile(path.resolve(__dirname, "./explorer/index.html"))
    })
  }

  app.listen(port, () => {
    console.log(`🔍 Explorer is running at http://localhost:${port}`)
    console.log(`📦 Components directory: ${_inputDir}`)
  })
}
