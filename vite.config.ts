import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "node:path"

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
      "/api": "http://localhost:5001",
      "/icon": "http://localhost:5001",
    },
  },
  build: {
    outDir: "../dist/web",
    emptyOutDir: true,
  },
})
