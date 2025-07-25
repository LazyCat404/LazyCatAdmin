import path from "path";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
// elm 按需引入
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// 全局挂载
import AutoImport from "unplugin-auto-import/vite";
import { globalMount } from "./src/utils/globalMount";

export default (par: { mode: string; command: string }): unknown => {
  const config: any = {
    base: "./",
    resolve: {
      alias: {
        vue: "vue/dist/vue.esm-bundler.js", // 定义vue的别名，如果使用其他的插件，可能会用到别名
        "@": path.resolve(__dirname, "src"),
        "@api": path.resolve(__dirname, "src/api"),
        "@page": path.resolve(__dirname, "src/page"),
        "@types": path.resolve(__dirname, "src/@types"),
      },
    },
    build: {
      rollupOptions: {
        // 手动分包
        manualChunks(id) {
          if (id.includes("/components/auto")) {
            return "lazycat";
          } else if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
    plugins: [
      vue(),
      AutoImport({
        imports: globalMount,
        dts: false, // 禁止生成（更新）全局配置文件 auto-imports.d.ts
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        dts: false, // 禁止生成（更新）全局配置文件 components.d.ts
        dirs: [], // （设置）自动注册全局组件目录，默认值是'src/components'此处将其清空
        resolvers: [ElementPlusResolver()],
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/css/overall.scss";
          `,
        },
      },
    },
    server: {
      port: 4000,
      // host: '0.0.0.0',
      open: false,
      cors: true,
      proxy: null,
    },
  };
  // 开发模式开启代理
  if (par.mode === "development") {
    config.server.proxy = {
      "/api": {
        target: loadEnv(par.mode, process.cwd()).VITE_BSAE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    };
  }
  return defineConfig(config);
};
