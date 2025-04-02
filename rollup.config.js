import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import terser from "@rollup/plugin-terser"
import json from "@rollup/plugin-json"
import del from "rollup-plugin-delete"
import path from "node:path"

const __dirname = path.dirname(new URL(import.meta.url).pathname)

export default {
  input: "cli/index.ts",
  output: {
    file: "dist/cli/cli.cjs",
    format: "cjs",
    sourcemap: false,
    banner: "#!/usr/bin/env node",
  },
  treeshake: true,
  external: [/^@svgr\//, "commander", "prettier", "esbuild", "svgo"],
  plugins: [
    json(),
    del({ targets: "dist/cli/*", runOnce: true }),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: path.resolve(__dirname, "tsconfig.cli.json"),
    }),
    terser(),
    {
      name: "log-output-size",
      generateBundle(_, bundle) {
        for (const [fileName, asset] of Object.entries(bundle)) {
          const size = (asset.code?.length || 0) / 1024
          console.log(`📦 ${fileName}: ${size.toFixed(2)}kb`)
        }
      },
    },
  ],
}
