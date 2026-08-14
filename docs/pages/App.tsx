import Nav from "./sections/Nav"
import Hero from "./sections/Hero"
import Inspector from "./sections/Inspector"
import Modes from "./sections/Modes"
import HowItWorks from "./sections/HowItWorks"
import QuickStart from "./sections/QuickStart"
import Footer from "./sections/Footer"

const App = () => (
  <div className="min-h-screen">
    <Nav />
    <main>
      <Hero />
      <Inspector />
      <Modes />
      <HowItWorks />
      <QuickStart />
    </main>
    <Footer />
  </div>
)

export default App
