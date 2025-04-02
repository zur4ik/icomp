import { createContext, type FC, type ReactNode, useContext, useEffect, useState } from "react"

export interface ConfigContextType {
  inputDir: string
  outputDir: string
}

const ConfigContext = createContext<ConfigContextType | null>(null)

// export hook
export const useConfig = (): ConfigContextType => {
  const ctx = useContext(ConfigContext)
  if (!ctx) throw new Error("useConfig must be used within ConfigProvider")
  return ctx
}

// export context provider
export const ConfigProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<ConfigContextType | null>(null)

  useEffect(() => {
    fetch("/config")
      .then((res) => res.json())
      .then(setConfig)
  }, [])

  if (!config) return null

  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
}
