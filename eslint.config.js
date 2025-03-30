import prettier from "eslint-plugin-prettier"
import tsParser from "@typescript-eslint/parser"
import tseslint from "@typescript-eslint/eslint-plugin"
import react from "eslint-plugin-react"
import path from "node:path"

// 🟣 Shared Rules
const commonRules = {
  "prettier/prettier": "error",
  "@typescript-eslint/no-explicit-any": "warn",
}

// 🟣 Shared Plugins
const commonPlugins = {
  prettier,
  "@typescript-eslint": tseslint,
}

// 🟣 Base Language Options
const baseLanguageOptions = {
  ecmaVersion: "latest",
  sourceType: "module",
  parser: tsParser,
}

export default [
  {
    files: ["src/explorer/app/src/**/*.{ts,tsx}"],
    languageOptions: {
      ...baseLanguageOptions,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: path.resolve("src/explorer/app/tsconfig.json"),
      },
      globals: { browser: true, node: true },
    },
    plugins: {
      ...commonPlugins,
      react,
    },
    rules: {
      ...commonRules,
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: { version: "detect" },
    },
  },
  {
    files: ["bin/**/*.ts"],
    languageOptions: {
      ...baseLanguageOptions,
      parserOptions: {
        project: path.resolve("./tsconfig.node.json"),
      },
      globals: { node: true },
    },
    plugins: { ...commonPlugins },
    rules: {
      ...commonRules,
    },
  },
]
