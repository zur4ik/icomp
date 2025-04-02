import express from "express"
import { createServer } from "vite"
import path from "node:path"
import { fileURLToPath } from "node:url"
import fs from "node:fs"

export const startExplorer = async (_inputDir: string, port: number) => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)

  // get absolute path of the input directory
  const inputDir = path.resolve(_inputDir)

  if (!fs.existsSync(inputDir)) {
    console.error("❌ Components directory not found:", inputDir)
    process.exit(1)
  }

  const app = express()

  app.get("/icons", async (_, res) => {
    const files = await fs.promises.readdir(inputDir)
    const svgs = files.filter((f) => f.endsWith(".svg"))
    res.json(svgs)
  })

  app.use("/icons", express.static(inputDir))

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
    console.log("env", process.env)
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
