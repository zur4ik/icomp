import { defineConfig } from "vite"
import { resolve } from "path"
import path from "node:path"
import react from "@vitejs/plugin-react"

export default defineConfig(({ mode }) => {
  const isExplorer = mode === "explorer"

  return {
    root: isExplorer ? path.resolve(__dirname, "src/explorer/app") : __dirname,
    plugins: isExplorer ? [react()] : [],
    build: {
      outDir: isExplorer
        ? path.resolve(__dirname, "dist/explorer")
        : path.resolve(__dirname, "dist"),
      emptyOutDir: true,
      target: isExplorer ? undefined : "node18",
      rollupOptions: isExplorer
        ? {}
        : {
            input: {
              cli: resolve(__dirname, "bin/cli.ts"),
            },
            output: {
              entryFileNames: "[name].js",
              chunkFileNames: "[name].js",
              assetFileNames: "[name].[ext]",
            },
            treeshake: {
              moduleSideEffects: (id) => {
                return !id.includes("src/explorer")
              },
            },
            external: [
              /^node:/,
              /^vite$/,
              /^@svgr\//,
              /^eslint/,
              "commander",
              "chokidar",
              "svgo",
              "express",
              "vite",
              "prettier",
            ],
          },
    },
    resolve: {
      alias: {
        "@exp": path.resolve(__dirname, "src/explorer/app/src"),
      },
    },
  }
})
