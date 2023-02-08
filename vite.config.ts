import { defineConfig, mergeConfig } from "vite"
import { defineConfig as defineTestConfig } from "vitest/config"
import tsconfigPaths from "vite-tsconfig-paths"
import { swcReactRefresh } from "vite-plugin-swc-react-refresh"
// https://vitejs.dev/config/

const viteConfig = defineConfig({
  plugins: [tsconfigPaths(), swcReactRefresh()],
  esbuild: { jsx: "automatic" },
})

const vitestConfig = defineTestConfig({
  test: {
    environment: "jsdom",
  },
})

export default mergeConfig(viteConfig, vitestConfig)
