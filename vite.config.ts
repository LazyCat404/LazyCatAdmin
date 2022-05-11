import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default (par: { mode: string; command: string }): unknown => {
  const config = {
    base: './',
    resolve: {
      alias: {
        vue: 'vue/dist/vue.esm-bundler.js', // 定义vue的别名，如果使用其他的插件，可能会用到别名
        '@': path.resolve(__dirname, 'src'),
        '@api': path.resolve(__dirname, 'src/api'),
        '@views': path.resolve(__dirname, 'src/views'),
        '@types': path.resolve(__dirname, 'src/@types')
      }
    },
    plugins: [
      vue(),
      AutoImport({
        dts: false, // 禁止生成全局配置文件 auto-imports.d.ts
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        dts: false, // 禁止生成全局配置文件 components.d.ts
        resolvers: [ElementPlusResolver()]
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/css/overall.scss";'
        }
      }
    },
    server: {
      port: 4000,
      // host: '0.0.0.0',
      open: false,
      cors: true,
      proxy: null
    }
  };
  // 开发模式开启代理
  if (par.mode === 'development') {
    config.server.proxy = {
      '/api': {
        target: loadEnv(par.mode, process.cwd()).VITE_BSAE_URL,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    };
  }
  return defineConfig(config);
};
