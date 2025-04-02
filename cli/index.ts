import { program } from "commander"
import path from "node:path"
import { generate } from "./commands"

program
  .command("generate")
  .requiredOption("-i, --input <path>", "Input folder with SVG files")
  .requiredOption("-o, --output <path>", "Output folder for React components")
  .option("-w, --watch", "Enable watch mode")
  .action(async (options) => {
    await generate(
      path.resolve(options.input),
      path.resolve(options.output),
      options.watch ?? false,
    )
  })

program.parse()
