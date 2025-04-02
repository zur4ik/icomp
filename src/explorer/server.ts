import express from "express"
import { createServer } from "vite"
import path from "node:path"
import { fileURLToPath } from "node:url"
import fs from "node:fs"

export const startExplorer = async (componentsDir: string, port: number) => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const resolvedComponentsDir = path.resolve(componentsDir)

  if (!fs.existsSync(resolvedComponentsDir)) {
    console.error("❌ Components directory not found:", resolvedComponentsDir)
    process.exit(1)
  }

  const app = express()

  app.get("/components", async (_, res) => {
    res.json({
      componentsDir: resolvedComponentsDir,
    })
  })

  if (process.env.NODE_ENV === "development") {
    const vite = await createServer({
      root: path.resolve(__dirname, "app"),
      server: {
        middlewareMode: true,
        fs: {
          allow: [resolvedComponentsDir, path.resolve(__dirname, "app")],
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
    console.log(`📦 Components directory: ${componentsDir}`)
  })
}
