import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "@css/main.css"

import { enableMapSet } from "immer"

// Enable immer to use Map and Set
enableMapSet()

// Global React.createElement to render dynamic loaded components
window.React ??= React

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
