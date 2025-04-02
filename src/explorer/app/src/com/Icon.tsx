import { type ComponentType, type SVGProps, useEffect, useState } from "react"
import { getComponentName } from "../../../../shared"

interface IconProps {
  name: string
}
interface IconComponentProps extends SVGProps<SVGSVGElement> {
  size?: number
  width?: number
  height?: number
}

const Icon = ({ name }: IconProps) => {
  const componentName = getComponentName(name)
  const [IconComponent, setIconComponent] = useState<ComponentType<IconComponentProps> | null>(null)
  const size = 24
  const svgName = name.replace(".svg", "")

  const importComponent = async () => {
    try {
      const mod = await import(/* @vite-ignore */ `/components/${componentName}.js`)
      setIconComponent(() => mod.default)
    } catch (err) {
      console.warn("Component not found, fallback to svg:", err)
      // setIconComponent(null)
    }
  }

  useEffect(() => {
    importComponent().then()
  }, [])

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        {IconComponent ? (
          <IconComponent size={size} />
        ) : (
          <img
            src={`/icons/${name}`}
            alt={name}
            width={size}
            height={size}
            style={{ objectFit: "contain" }}
          />
        )}

        <span>{svgName}</span>
      </div>
    </div>
  )
}
export default Icon
