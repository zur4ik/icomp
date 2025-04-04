import {
  type ComponentType,
  type FC,
  memo,
  type SVGProps,
  useEffect,
  useRef,
  useState,
} from "react"
import type { IconInfo } from "@shared/types"
import { useIconStore } from "@store/iconStore"
import cx from "classnames"
import type { MouseEvent } from "react"

interface IconProps {
  icon: IconInfo
  size?: number
}
interface IconComponentProps extends SVGProps<SVGSVGElement> {
  size?: number
  width?: number
  height?: number
}

export const Icon: FC<IconProps> = memo(({ icon, size = 24 }) => {
  const [IconComponent, setIconComponent] = useState<ComponentType<IconComponentProps> | null>(null)
  const importedRef = useRef(false)
  const selectIcon = useIconStore((s) => s.selectIcon)
  const selected = useIconStore((s) => s.selectedIcons.has(icon.name))

  const importComponent = async () => {
    try {
      const mod = await import(/* @vite-ignore */ `/component/${icon.component}.js`)
      setIconComponent(() => mod.default)
    } catch (err) {
      console.warn("Component not found, fallback to svg:", err)
      // setIconComponent(null)
    }
  }

  const iconClickHandler = (ev: MouseEvent) => {
    // call select icon action with key modifier ctrl/shift/none
    const isMac = /Mac/.test(window.navigator.userAgent)
    const ctrlKey = isMac ? ev.metaKey : ev.ctrlKey
    const shiftKey = ev.shiftKey
    const modifier = ctrlKey ? "ctrl" : shiftKey ? "shift" : "none"

    selectIcon(icon.name, modifier)
  }

  useEffect(() => {
    if (!importedRef.current) {
      importedRef.current = true
      importComponent().then()
    }
  }, [])

  return (
    <div
      className={cx("icon", {
        selected: selected,
      })}
      onClick={iconClickHandler}
    >
      {IconComponent ? (
        <IconComponent size={size} />
      ) : (
        <img
          src={`/icon/${icon.file}`}
          alt={icon.name}
          width={size}
          height={size}
          style={{ display: "block", objectFit: "contain" }}
          loading="lazy"
          draggable={false}
        />
      )}
    </div>
  )
})

Icon.displayName = "Icon"
