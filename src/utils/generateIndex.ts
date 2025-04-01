import fs from "node:fs"
import path from "node:path"

export const generateIndex = (outputPath: string) => {
  const files = fs
    .readdirSync(outputPath)
    .filter((file) => file.endsWith(".tsx") && file !== "index.ts")

  const exports = files.map((file) => {
    const name = path.basename(file, ".tsx")
    return `export { default as ${name} } from "./${name}"`
  })

  fs.writeFileSync(path.join(outputPath, "index.ts"), exports.join("\n") + "\n")
  console.log(`♻️ index generated with ${files.length} exports`)
}
