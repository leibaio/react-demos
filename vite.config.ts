import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from "path"

export default defineConfig(({ mode }) => {
  // 加载当前环境对应的环境变量配置
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [react()], resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    // 配置跨域
    server: {
      port: 8888,
      host: "localhost",
      proxy: {
        "/api": {
          target: env.VITE_TARGET,  // 会自动判断当前环境，对应上述三个文件中的target
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  }
})
