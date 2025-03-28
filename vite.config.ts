import { defineConfig } from "vite"
import { resolve } from "path"

export default defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        cli: resolve(__dirname, "bin/cli.ts"),
      },
      output: {
        entryFileNames: "[name].js", // << THIS removes hash
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
      external: [
        "commander",
        "chokidar",
        "svgo",
        "express",
        "node:path",
        "node:fs",
        "@svgr/core",
        "@svgr/plugin-jsx",
        "@svgr/plugin-svgo",
      ],
    },
    target: "node16",
    emptyOutDir: true,
  },
})
