import fs from "node:fs"
import path from "node:path"

export const getIconDate = (inputPath: string, file: string): string => {
  // get desc tag from svg file
  const filePath = path.join(inputPath, file)
  if (!fs.existsSync(filePath)) {
    return new Date().toISOString()
  } else {
    return fs.statSync(filePath).birthtime.toISOString()
  }
}
