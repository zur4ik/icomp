import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "node:path"
import pkg from "./package.json"
import { createHtmlPlugin } from "vite-plugin-html"
import tailwindcss from "@tailwindcss/vite"

const SERVER_URL = process.env.SERVER_URL || "http://localhost:5001"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    createHtmlPlugin({
      inject: {
        data: {
          version: pkg.version,
        },
      },
    }),
  ],
  root: "src",
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "shared"),
      "@css": path.resolve(__dirname, "src/assets/css"),
      "@com": path.resolve(__dirname, "src/com"),
      "@ui": path.resolve(__dirname, "src/ui"),
      "@services": path.resolve(__dirname, "src/services"),
      "@store": path.resolve(__dirname, "src/store"),
      "@root": path.resolve(__dirname, "."),
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  server: {
    proxy: {
      "/api": SERVER_URL,
      "/icon": SERVER_URL,
      "/component": SERVER_URL,
    },
  },
  build: {
    outDir: "../dist/web",
    emptyOutDir: true,
  },
})
