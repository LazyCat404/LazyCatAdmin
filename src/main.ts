import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { tool } from './utils/tool';
// 全局自定义安装
import customComponents from '@/components/index';

import vueExtendDirectives from 'vue-extend-directives';
const app = createApp(App);
app.use(router).use(vueExtendDirectives).use(customComponents).use(tool).mount('#app');
