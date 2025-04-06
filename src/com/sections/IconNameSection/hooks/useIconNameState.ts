import { useIconStore } from "@store/iconStore"
import { useCallback, useEffect, useMemo, useState } from "react"
import { cleanKeywords, getIconName } from "@root/shared"

interface IconNameState {
  name: string
  initName: string
  keywords: string
  initKeywords: string
  placeholder: string
  disabled: boolean
}

export const useIconNameState = () => {
  const selectedIcons = useIconStore((st) => st.selectedIcons)
  const renameIcon = useIconStore((st) => st.renameIcon)
  const icons = useIconStore((st) => st.icons)

  const [state, setState] = useState<IconNameState>({
    name: "",
    initName: "",
    keywords: "",
    initKeywords: "",
    placeholder: "Select icon to edit",
    disabled: true,
  })

  useEffect(() => {
    const size = selectedIcons.size

    // case when selected multiple or no icons
    if (size !== 1) {
      setState({
        name: "",
        initName: "",
        keywords: "",
        initKeywords: "",
        placeholder: size > 1 ? "Multiple icons selected" : "Select icon to edit",
        disabled: true,
      })
      return
    }

    // case when selected one icon
    const iconName = Array.from(selectedIcons)[0]
    const icon = useIconStore.getState().getIcon(iconName)

    if (!icon) return

    const name = icon.file.replace(/\.svg$/, "")
    const keywords = icon.keywords || ""

    setState((prev) => ({
      ...prev,
      name: name,
      keywords: keywords,
      initName: name,
      initKeywords: keywords,
      placeholder: "Enter icon name",
      disabled: false,
    }))
  }, [selectedIcons])

  const changed = useMemo(() => {
    return (
      selectedIcons.size === 1 &&
      (state.name !== state.initName || cleanKeywords(state.keywords) !== state.initKeywords)
    )
  }, [selectedIcons, state])

  const wrongName = useMemo(() => {
    const fileName = state.name + ".svg"
    const iconName = getIconName(state.name)

    return (
      state.name !== state.initName &&
      icons.some((icon) => icon.file === fileName || icon.name === iconName)
    )
  }, [state.name, state.initName, icons])

  const saveDisabled = useMemo(() => {
    return !changed || !state.name || wrongName
  }, [changed, state.name, wrongName])

  const handleSave = useCallback(() => {
    renameIcon(state.initName, state.name, state.keywords).catch(console.error)
  }, [renameIcon, state])

  const handleReset = useCallback(() => {
    setState((prev) => ({
      ...prev,
      name: prev.initName,
      keywords: prev.initKeywords,
    }))
  }, [])

  return {
    state,
    setState,
    changed,
    wrongName,
    saveDisabled,
    handleSave,
    handleReset,
  }
}
