import type { IconInfo, ImportFileInfo, ModifierKey } from "@shared/types"
import { cleanKeywords, getIconName } from "@root/shared"
import { storeCreator } from "@store/utils"

type State = {
  icons: IconInfo[]
  selectedIcons: Set<string>
  lastSelectedIcon: string | null
}

type Actions = {
  fetchIcons: () => Promise<IconInfo[]>
  getIcon: (iconName: string) => IconInfo | null
  setIcons: (icons: IconInfo[]) => void
  selectIcon: (iconName: string, modifier: ModifierKey) => void
  clearSelection: () => void
  renameIcon: (fileName: string, newFileName: string, keywords: string) => Promise<IconInfo>
  generateIcons: (icons: string[]) => Promise<void>
  importIcons: (files: ImportFileInfo[]) => Promise<void>
  removeIcons: (icons: string[]) => Promise<void>
}

type IconStore = State & Actions

export const useIconStore = storeCreator<IconStore>("iconStore", (set) => ({
  icons: [],
  selectedIcons: new Set(),
  lastSelectedIcon: null,
  fetchIcons: async () => {
    const res = await fetch("/api/icons")
    const icons = await res.json()
    useIconStore.getState().setIcons(icons)
    return icons
  },
  getIcon: (iconName): IconInfo | null => {
    const icons: IconInfo[] = useIconStore.getState().icons
    const icon = icons.find((icon) => icon.name === iconName)
    return icon || null
  },
  setIcons: (icons) =>
    set(
      (state) => {
        state.icons = icons
        state.selectedIcons.clear()
        state.lastSelectedIcon = null
      },
      false,
      "setIcons:Action",
    ),
  selectIcon: (iconName, modifier) =>
    set(
      (state) => {
        const iconIndex = state.icons.findIndex((icon) => icon.name === iconName)
        const isSelected = state.selectedIcons.has(iconName)
        const lastSelectedIcon = state.lastSelectedIcon

        switch (modifier) {
          case "ctrl":
            if (isSelected) {
              state.selectedIcons.delete(iconName)
            } else {
              state.selectedIcons.add(iconName)
            }
            state.lastSelectedIcon = iconName
            break
          case "shift":
            if (lastSelectedIcon && iconIndex !== -1) {
              const lastSelectedIndex = state.icons.findIndex(
                (icon) => icon.name === lastSelectedIcon,
              )
              const start = Math.min(lastSelectedIndex, iconIndex)
              const end = Math.max(lastSelectedIndex, iconIndex)

              for (let i = start; i <= end; i++) {
                state.selectedIcons.add(state.icons[i].name)
              }
            }
            state.lastSelectedIcon = iconName
            break
          case "none":
          default:
            state.selectedIcons.clear()
            state.selectedIcons.add(iconName)
            state.lastSelectedIcon = iconName
            break
        }
        if (modifier === "none") {
          state.selectedIcons.clear()
          state.selectedIcons.add(iconName)
          state.lastSelectedIcon = iconName
        }
      },
      false,
      "selectIcon:Action",
    ),
  clearSelection: () =>
    set(
      (state) => {
        state.selectedIcons.clear()
        state.lastSelectedIcon = null
      },
      false,
      "clearSelection:Action",
    ),
  renameIcon: async (fileName: string, newFileName: string, keywords: string) => {
    const res = await fetch("/api/rename", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileName, newFileName, keywords: cleanKeywords(keywords) }),
    })

    if (res.ok) {
      const iconInfo: IconInfo = await res.json()

      // replace old icon with new in store
      set(
        (state) => {
          const oldIconName = getIconName(fileName)
          const newIconName = getIconName(newFileName)
          const iconIndex = state.icons.findIndex((icon) => icon.name === oldIconName)
          if (iconIndex !== -1) {
            state.icons[iconIndex] = iconInfo
          }

          // replace in selected icons
          if (state.selectedIcons.has(oldIconName)) {
            state.selectedIcons.delete(oldIconName)
            state.selectedIcons.add(newIconName)
          }
        },
        false,
        "renameIcon:Action",
      )

      return iconInfo
    } else {
      const error = await res.json()
      throw new Error(`Failed to rename icon: ${error.errorDetails}`)
    }
  },
  generateIcons: async (icons: string[]) => {
    // get icon file names
    const files = icons.map((icon) => {
      const iconInfo = useIconStore.getState().getIcon(icon)
      if (!iconInfo) {
        throw new Error(`Icon not found: ${icon}`)
      }
      return iconInfo.file
    })

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ files }),
    })

    if (res.ok) {
      await useIconStore.getState().fetchIcons()
      set((state) => {
        state.selectedIcons = new Set(icons)
      })
      return
    } else {
      const error = await res.json()
      throw new Error(`Failed to generate icons: ${error.errorDetails}`)
    }
  },
  importIcons: async (files: ImportFileInfo[]) => {
    const res = await fetch("/api/import", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ files }),
    })

    if (res.ok) {
      await useIconStore.getState().fetchIcons()
      const iconNames = files.map((file) => getIconName(file.name))
      set((state) => {
        iconNames.forEach((iconName) => {
          state.selectedIcons.add(iconName)
        })
      })
      return
    } else {
      const error = await res.json()
      throw new Error(`Failed to import icons: ${error.errorDetails}`)
    }
  },
  removeIcons: async (icons: string[]) => {
    // get icon file names
    const files = icons.map((icon) => {
      const iconInfo = useIconStore.getState().getIcon(icon)
      if (!iconInfo) {
        throw new Error(`Icon not found: ${icon}`)
      }
      return iconInfo.file
    })

    const res = await fetch("/api/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ files }),
    })

    if (res.ok) {
      await useIconStore.getState().fetchIcons()
      return
    } else {
      const error = await res.json()
      throw new Error(`Failed to remove icons: ${error.errorDetails}`)
    }
  },
}))
