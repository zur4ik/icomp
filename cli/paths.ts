import path from "node:path"
import { fileURLToPath } from "node:url"

export const cliRoot = path.dirname(fileURLToPath(import.meta.url))
export const cachePath = path.resolve(cliRoot, ".cache")
