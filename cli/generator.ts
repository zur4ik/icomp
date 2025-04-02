import fs from "node:fs"
import path from "node:path"

export function generateIcons() {
  const inputDir = path.resolve("icons")
  const outputDir = path.resolve("generated")

  if (!fs.existsSync(inputDir)) {
    console.error(`Input directory "${inputDir}" not found.`)
    process.exit(1)
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir)
  }

  const files = fs.readdirSync(inputDir).filter((f) => f.endsWith(".svg"))

  for (const file of files) {
    const src = fs.readFileSync(path.join(inputDir, file), "utf8")
    const out = path.join(outputDir, file.replace(".svg", ".txt"))
    fs.writeFileSync(out, `// processed icon\n${src}`)
    console.log(`Generated: ${out}`)
  }

  console.log("✅ Icons generated")
}
