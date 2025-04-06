import { useIconStore } from "@store/iconStore"
import { useCallback, useMemo, useState } from "react"
import LoaderCards from "@com/loaders/LoaderCards/LoaderCards"

const GenerateButton = () => {
  const selectedIcons = useIconStore((state) => state.selectedIcons)
  const generateIcons = useIconStore((state) => state.generateIcons)
  const icons = useIconStore((state) => state.icons)
  const [loading, setLoading] = useState(false)

  const iconsToGenerate = useMemo(() => {
    if (selectedIcons.size === 0) {
      return Array.from(icons).map((icon) => icon.name)
    } else {
      return Array.from(selectedIcons)
    }
  }, [icons, selectedIcons])

  const handleGenerate = useCallback(() => {
    setLoading(true)
    generateIcons(iconsToGenerate)
      .then(() => {
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error generating icons:", err)
        setLoading(false)
      })
  }, [iconsToGenerate, generateIcons])

  const buttonText = useMemo(() => {
    if (loading) {
      return "Generating..."
    }
    switch (selectedIcons.size) {
      case 0:
        return "Generate All"
      case 1:
        return "Generate"
      default:
        return `Generate - ${selectedIcons.size}`
    }
  }, [loading, selectedIcons.size])
  return (
    <div className={"border-t-1 border-t-gray-200 px-10 py-20"}>
      <button
        className="btn btn-primary btn-lg w-full gap-10"
        disabled={loading}
        onClick={handleGenerate}
      >
        <LoaderCards size={24} show={loading} />
        {buttonText}
      </button>
    </div>
  )
}
export default GenerateButton
