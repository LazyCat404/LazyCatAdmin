import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@views': path.resolve(__dirname, 'src/views'),
    },
  },
  plugins: [
    vue()
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
