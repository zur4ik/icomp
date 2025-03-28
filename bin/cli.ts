#!/usr/bin/env node

import { Command } from "commander"
import { generateIcons } from "../src/generate"
import path from "node:path"
import { startExplorer } from "../src/explorer/server"

const program = new Command()

program.name("icomp").description("Generate React components from SVG files or explore them")

program
  .command("generate")
  .requiredOption("-i, --input <path>", "Input folder with SVG files")
  .requiredOption("-o, --output <path>", "Output folder for React components")
  .option("-w, --watch", "Enable watch mode")
  .action(async (options) => {
    await generateIcons(
      path.resolve(options.input),
      path.resolve(options.output),
      options.watch ?? false,
    )
  })

program
  .command("explorer")
  .requiredOption("--icons <path>", "Input folder with SVG files")
  .option("--port <number>", "Port to run explorer on", "3000")
  .action((options) => {
    startExplorer(path.resolve(options.icons), Number(options.port))
  })

program.parse()
