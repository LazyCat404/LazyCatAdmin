import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { tool } from './utils/tool';
// 扩展指令
import vueExtendDirectives from 'vue-extend-directives';
// 全局自定义安装
import customComponents from '@/components/index';
import '@/assets/iconfont/iconfont.css'; //  字体ico

const app = createApp(App);
app.use(router).use(vueExtendDirectives).use(customComponents).use(tool).mount('#app');
