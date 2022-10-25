import React from "react"
import ReactDOM from "react-dom/client"
import Editor from "components/Editor"
import "./styles.css"

ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
  <React.StrictMode>
    <Editor />
  </React.StrictMode>,
)
