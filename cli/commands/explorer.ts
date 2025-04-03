import { startServer } from "../server"
import { findPort } from "@services/portChecker"

export const explorer = async (inputPath: string, outputPath: string, port: number | undefined) => {
  const staticPort = typeof port === "number" && !isNaN(port) && port > 1024

  const defaultPort = 5001
  port = port || defaultPort

  const availablePort = await findPort(port)

  // check if port requested and is busy
  if (staticPort && port !== availablePort) {
    console.error(`❌️ Port ${port} is busy. Try different port.`)
    process.exit(1)
  }
  port = availablePort

  // start server with available port
  startServer(inputPath, port)
}
