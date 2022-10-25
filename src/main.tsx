import React from "react"
import ReactDOM from "react-dom/client"
import Editor from "components/Editor"
import App from "./App"

ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
  <React.StrictMode>
    <Editor />
  </React.StrictMode>,
)
