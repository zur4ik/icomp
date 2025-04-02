import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "node:path"

console.log("root:", path.resolve(__dirname, "src"))

export default defineConfig({
  plugins: [react()],
  root: "src",
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  build: {
    outDir: "dist/web",
    emptyOutDir: true,
  },
})
