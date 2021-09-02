import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import styleImport from 'vite-plugin-style-import';

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@views': path.resolve(__dirname, 'src/views'),
    },
  },
  plugins: [
    vue(),
    styleImport({
      libs:[
        {
          libraryName:'element-plus',
          esModule:true,
          ensureStyleFile:true,
          resolveStyle:(name)=>{
            return `element-plus/theme-chalk/${name}.css`;
          },
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
    open: true, 
    cors: true, 
    proxy: {
      '/api': {
        target: process.env.VUE_APP_URL,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
});
