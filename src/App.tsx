import { Header } from "@com/Header"
import { Dashboard } from "@com/Dashboard"

const App = () => {
  return (
    <div className={"flex h-screen flex-col"}>
      <Header />
      <Dashboard />
    </div>
  )
}

export default App
