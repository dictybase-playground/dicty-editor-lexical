import { Fragment } from "react"
import { Routes, Route } from "react-router-dom"
import routes from "./routes"
import Editor from "./components/Editor"

const App = () => (
  <Routes>
    <Route index element={<Editor />} />
    {routes.map(({ path, component: Component = Fragment }) => (
      <Route key={path} path={path} element={<Component />} />
    ))}
  </Routes>
)

export default App
