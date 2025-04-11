export interface IconInfo {
  name: string
  keywords: string
  component: string
  file: string
  generated: boolean
  date: string
}

export type ModifierKey = "ctrl" | "shift" | "none"

export interface ImportFileInfo {
  name: string
  keywords: string
  content: string
}
