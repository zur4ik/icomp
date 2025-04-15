import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  root: path.resolve(__dirname),
  plugins: [react()],
  base: "./",
  build: {
    outDir: "../../gh-pages",
    emptyOutDir: true,
  },
})
