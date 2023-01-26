import { Fragment } from "react"
import { Routes, Route } from "react-router-dom"
import EditorV9 from "pages/v9"
import routes from "./routes"

const App = () => (
  <Routes>
    <Route index element={<EditorV9 />} />
    {routes.map(({ path, component: Component = Fragment }) => (
      <Route key={path} path={path} element={<Component />} />
    ))}
  </Routes>
)

export default App
