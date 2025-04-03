import { program } from "commander"
import path from "node:path"
import { ui, generate } from "./commands"

// Generate command
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

// Explorer command
program
  .command("ui")
  .requiredOption("-i, --input <path>", "Input folder with SVG files")
  .requiredOption("-o, --output <path>", "Output folder for React components")
  .option("-p, --port <path>", "Optional port for the explorer. Default: 5001")
  .action(async (options) => {
    await ui(path.resolve(options.input), path.resolve(options.output), parseInt(options.port))
  })

program.parse()
