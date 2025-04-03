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
  return (
    <div style={{ padding: 20 }}>
      <h1>Icon Explorer UI</h1>
      <p style={{ color: "red" }}>
        <IconChrome />
        <IconDoc />
        <IconGearSolid />
        <IconPin />
        <IconStar />
        <IconHeart />
        <IconTime />
        <IconDownload />
        <IconBrowser />
        <IconCoin />
        <IconFilter />
        <IconMoon />
        <IconOptions />
        <IconWallet />
      </p>
    </div>
  )
}

export default App
