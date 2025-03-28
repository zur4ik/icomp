# icomp

A CLI tool to generate React components from SVG icons.  
Simplify the workflow of converting your SVGs into ready-to-use React components.

---

## ✨ Features

- Convert SVG files to React functional components
- Auto-generate index files
- Lightweight and developer-friendly

---

## 📦 Installation

Install globally:

```bash
npm install -g icomp
```

Or use via npx:

```bash
npx icomp [command]
```

Or as a dev dependency:

```bash
npm install --save-dev icomp
```

---

## 🚀 Usage

### Generate React Components from SVGs

```bash
icomp generate --input ./path/to/svg/folder --output ./path/to/output/folder
```

### Example

```bash
icomp generate --input ./icons --output ./src/components/icons
```

### Watch for Changes

```bash
icomp generate --input ./icons --output ./src/components/icons --watch
```

---

### Options

| Option          | Description                                                      |
|-----------------|------------------------------------------------------------------|
| `-i` `--input`  | Path to the folder containing SVG files.                         |
| `-o` `--output` | Path to the folder where the React components will be generated. |
| `-w` `--watch`  | Watch input dir for changes and auto-generate components.        |

---

### Add script to package.json

```json
{
  "scripts": {
    "gen:icons": "icomp generate -i ./icons -o ./src/components/icons -w"
  }
}
```
