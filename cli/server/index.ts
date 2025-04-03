import express from "express"
import fs from "node:fs"

export function startServer(inputPath: string, port: number) {
  const app = express()

  // serve static files from the input path
  app.use("/icon", express.static(inputPath))

  // service to get the list of icons
  app.get("/api/icons", (req, res) => {
    const files = fs.readdirSync(inputPath).filter((file) => file.endsWith(".svg"))
    res.json(files)
  })

  app.listen(port, "localhost", () => {
    console.log(`🚀 icomp explorer started on http://localhost:${port}`)
  })
}

export default startServer
