import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "path"

export default defineConfig({
  root: path.resolve(__dirname),
  plugins: [react(), tailwindcss()],
  base: "./",
  build: {
    outDir: "../../gh-pages",
    emptyOutDir: true,
  },
})
