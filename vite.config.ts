import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import { swcReactRefresh } from "vite-plugin-swc-react-refresh"
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [tsconfigPaths(), swcReactRefresh()],
  esbuild: { jsx: "automatic" },
  server: {
    port: 3000,
    hmr: { overlay: false },
  },
})
