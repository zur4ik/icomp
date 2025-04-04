import type { IconInfo, ModifierKey } from "@shared/types"
import { create, type StateCreator } from "zustand"
import { devtools } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

const storeCreator = <T>(
  name: string,
  initializer: StateCreator<T, [["zustand/devtools", never], ["zustand/immer", never]], []>,
) => {
  return create<T>()(devtools(immer(initializer), { name }))
}

type State = {
  icons: IconInfo[]
  selectedIcons: Set<string>
  lastSelectedIcon: string | null
}

type Actions = {
  fetchIcons: () => Promise<IconInfo[]>
  setIcons: (icons: IconInfo[]) => void
  selectIcon: (iconName: string, modifier: ModifierKey) => void
  clearSelection: () => void
}

type IconStore = State & Actions

export const useIconStore = storeCreator<IconStore>("iconStore", (set) => ({
  icons: [],
  selectedIcons: new Set(),
  lastSelectedIcon: null,
  fetchIcons: async () => {
    const res = await fetch("/api/icons")
    const icons = await res.json()
    set({ icons }, false, "fetchIcons:Action")
    return icons
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
}))
