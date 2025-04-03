import { type ComponentType, type FC, type SVGProps, useEffect, useRef, useState } from "react"
import type { IconInfo } from "../../../shared/types"

interface IconProps {
  icon: IconInfo
  size?: number
}
interface IconComponentProps extends SVGProps<SVGSVGElement> {
  size?: number
  width?: number
  height?: number
}

export const Icon: FC<IconProps> = ({ icon, size = 24 }) => {
  const [IconComponent, setIconComponent] = useState<ComponentType<IconComponentProps> | null>(null)
  const importedRef = useRef(false)

  const importComponent = async () => {
    try {
      const mod = await import(/* @vite-ignore */ `/component/${icon.component}.js`)
      setIconComponent(() => mod.default)
    } catch (err) {
      console.warn("Component not found, fallback to svg:", err)
      // setIconComponent(null)
    }
  }

  useEffect(() => {
    if (!importedRef.current) {
      importedRef.current = true
      importComponent().then()
    }
  }, [])

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
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

        <span>{icon.name}</span>
      </div>
    </div>
  )
}
