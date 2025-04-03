import net from "node:net"
import { DEFAULT_HOST } from "@services/constants"

export const findPort = (startingPort: number): Promise<number> => {
  return new Promise((resolve) => {
    const server = net.createServer()

    // if the port is already in use, try the next one
    server.once("error", () => {
      resolve(findPort(Number(startingPort) + 1))
    })

    // if the port is available, resolve the promise
    server.once("listening", () => {
      server.close(() => resolve(startingPort))
    })

    // initial listen
    server.listen(startingPort, DEFAULT_HOST)
  })
}
