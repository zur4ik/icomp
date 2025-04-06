import type { MouseEvent } from "react"
import {
  type ComponentType,
  type FC,
  memo,
  type SVGProps,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import type { IconInfo } from "@shared/types"
import { useIconStore } from "@store/iconStore"
import cx from "classnames"
import { IconAlertTriangleSolid } from "@com/icons"
import { Tooltip } from "react-tooltip"

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
  const selectIcon = useIconStore((st) => st.selectIcon)
  const isSelected = useIconStore((st) => st.selectedIcons.has(icon.name))

  const importComponent = useCallback(async () => {
    try {
      const mod = await import(/* @vite-ignore */ `/component/${icon.component}.js`)
      setIconComponent(() => mod.default)
    } catch {}
  }, [icon.component])

  const iconClickHandler = (ev: MouseEvent) => {
    const isMac = /Mac/.test(window.navigator.userAgent)
    const ctrlKey = isMac ? ev.metaKey : ev.ctrlKey
    const shiftKey = ev.shiftKey
    const modifier = ctrlKey ? "ctrl" : shiftKey ? "shift" : "none"

    // call action
    selectIcon(icon.name, modifier)
  }

  useEffect(() => {
    if (!importedRef.current) {
      importedRef.current = true
      importComponent().then()
    }
  }, [importComponent])

  return (
    <div
      className={cx("icon", {
        selected: isSelected,
        warning: !icon.generated,
      })}
      onClick={iconClickHandler}
    >
      {!icon.generated && (
        <Tooltip id={icon.name} hidden={false} className={"bg-red-500"}>
          Not generated
        </Tooltip>
      )}
      {IconComponent ? (
        <IconComponent size={size} />
      ) : (
        <img
          src={`/icon/${icon.file}`}
          alt={icon.name}
          width={size}
          height={size}
          className={"block object-contain"}
          loading="lazy"
          draggable={false}
        />
      )}

      {!icon.generated && (
        <IconAlertTriangleSolid
          size={12}
          className={"warning"}
          tabIndex={-1}
          data-tooltip-id={icon.name}
        />
      )}
    </div>
  )
})

Icon.displayName = "Icon"
