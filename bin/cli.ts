#!/usr/bin/env node
import { program } from 'commander';
import { startExplorer } from '../cli/server';
import { generateIcons } from '../cli/generator';

program
  .command('explorer')
  .description('Start the explorer')
  .option('-p, --port <port>', 'Port', '3000')
  .action((options) => {
    startExplorer(Number(options.port));
  });

program
  .command('generate')
  .description('Generate icons from ./icons/*.svg')
  .action(() => {
    generateIcons();
  });

program.parse();