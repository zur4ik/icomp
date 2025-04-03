import path from "node:path"
import { fileURLToPath } from "node:url"

export const CLI_ROOT = path.dirname(fileURLToPath(import.meta.url))
export const WEB_DIR = path.resolve(CLI_ROOT, "dist/web")
export const WEB_INDEX = path.resolve(WEB_DIR, "index.html")
export const CACHE_PATH = path.resolve(CLI_ROOT, ".cache")
