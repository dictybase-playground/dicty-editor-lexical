import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"
import { swcReactRefresh } from "vite-plugin-swc-react-refresh"
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [tsconfigPaths(), swcReactRefresh(), react()],
  esbuild: { jsx: "automatic" },
  server: {
    port: 3000,
  },
})
