import {
  IconBrowser,
  IconChrome,
  IconCoin,
  IconDoc,
  IconDownload,
  IconFilter,
  IconGearSolid,
  IconHeart,
  IconMoon,
  IconOptions,
  IconPin,
  IconStar,
  IconTime,
  IconWallet,
} from "./com/icons"

const App = () => {
  const size = 24
  return (
    <div style={{ padding: 20 }}>
      <h1>Icon Explorer UI</h1>
      <p style={{ color: "red" }}>
        <IconChrome size={size} />
        <IconDoc size={size} />
        <IconGearSolid size={size} />
        <IconPin size={size} />
        <IconStar size={size} />
        <IconHeart size={size} />
        <IconTime size={size} />
        <IconDownload size={size} />
        <IconBrowser size={size} />
        <IconCoin size={size} />
        <IconFilter size={size} />
        <IconMoon size={size} />
        <IconOptions size={size} />
        <IconWallet size={size} />
      </p>
    </div>
  )
}

export default App
