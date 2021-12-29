import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import styleImport from 'vite-plugin-style-import';

export default (par: { mode: string; command: string }): unknown => {
  const config = {
    base: './',
    resolve: {
      alias: {
        vue: 'vue/dist/vue.esm-bundler.js', // 定义vue的别名，如果使用其他的插件，可能会用到别名
        '@': path.resolve(__dirname, 'src'),
        '@views': path.resolve(__dirname, 'src/views'),
        '@types': path.resolve(__dirname, 'src/@types')
      }
    },
    plugins: [
      vue(),
      styleImport({
        libs: [
          {
            libraryName: 'element-plus',
            esModule: true,
            ensureStyleFile: true,
            resolveStyle: name => {
              return `element-plus/theme-chalk/${name}.css`;
            }
          }
        ]
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
