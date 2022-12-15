const ROUTES = import.meta.glob("/src/pages/[a-z0-9[]*.tsx", { eager: true })

const routes = Object.keys(ROUTES).map((route) => {
  const path = route.replace(/\/src\/pages/g, "").replace(/\.tsx$/, "")
  // @ts-ignore
  return { path, component: ROUTES[route].default }
})

export default routes
