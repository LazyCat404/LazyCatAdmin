import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import styleImport from 'vite-plugin-style-import';

export default ({ mode }) => {
  const config = {
    base: './',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@views': path.resolve(__dirname, 'src/views'),
        '@types': path.resolve(__dirname, 'src/@types'),
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
      open: false, 
      cors: true, 
      proxy: null
    },
  }
  // 开发模式开启代理
  if(mode === 'development'){
    config.server.proxy = {
      '/api': {
        target: loadEnv(mode, process.cwd()).VITE_BSAE_URL,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
  return defineConfig(config)
}
