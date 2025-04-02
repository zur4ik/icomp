import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import terser from "@rollup/plugin-terser"
import json from "@rollup/plugin-json"
import del from "rollup-plugin-delete"

export default {
  input: "cli/index.ts",
  output: {
    file: "dist/cli/cli.js",
    format: "cjs",
    sourcemap: false,
    banner: "#!/usr/bin/env node",
  },
  treeshake: true,
  external: ["commander"],
  plugins: [
    json(),
    del({ targets: "dist/cli/*", runOnce: true }),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.cli.json",
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
