import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "node:path"

const SERVER_URL = process.env.SERVER_URL || "http://localhost:5001"

export default defineConfig({
  plugins: [react()],
  root: "src",
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "shared"),
    },
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
