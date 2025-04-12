import fs from "fs"

const target = process.env.PUBLISH_TARGET || "npm"
const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"))

if (target === "github") {
  pkg.name = "@zur4ik/icomp"
  pkg.publishConfig = {
    access: "public",
    registry: "https://npm.pkg.github.com/",
    name: "@zur4ik/icomp",
  }
} else {
  pkg.name = "icomp"
  if ("publishConfig" in pkg) {
    delete pkg.publishConfig
  }
}

fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2))
console.log(`package.json set for: ${target}`)
