import type { Component } from "react"

type Exported = {
  default: Component
}

const ROUTES = import.meta.glob<boolean, string, Exported>(
  "/src/pages/[a-z0-9[]*.tsx",
  { eager: true },
)

const routes = Object.keys(ROUTES).map((route) => {
  const path = route.replace(/\/src\/pages/g, "").replace(/\.tsx$/, "")

  return { path, component: ROUTES[route].default }
})

export default routes
