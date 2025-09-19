import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode, command }) => {
  // 加载当前环境对应的环境变量配置
  const env = loadEnv(mode, process.cwd(), "");
  const isProduction = command === "build";

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    // 开发服务器配置
    server: {
      port: 8888,
      host: "0.0.0.0",
      open: true,
      proxy: {
        "/api": {
          target: env.VITE_TARGET,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    // 构建配置
    build: {
      target: "es2015",
      outDir: "dist",
      assetsDir: "assets",
      sourcemap: !isProduction,
      minify: isProduction ? "esbuild" : false,
      rollupOptions: {
        output: {
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
          manualChunks: {
            vendor: ["react", "react-dom"],
            router: ["react-router-dom"],
            ui: ["antd"],
            utils: ["axios"],
          },
        },
      },
      // 构建时移除 console 和 debugger
      esbuild: isProduction
        ? {
            drop: ["console", "debugger"],
          }
        : {},
    },
    // 预览服务器配置
    preview: {
      port: 4173,
      host: "0.0.0.0",
    },
    // 环境变量前缀
    envPrefix: "VITE_",
  };
});
