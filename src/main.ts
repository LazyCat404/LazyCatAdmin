import { createApp } from 'vue';
import { createPinia } from 'pinia';
import persist from 'pinia-plugin-persist'; // pinia 持久化插件
import App from './App.vue';
import router from './router';

// 扩展指令
import vueExtendDirectives from 'vue-extend-directives';
// 全局自定义组件安装
import customComponents from '@/components/index';
// 字体ico
import '@/assets/iconfont/iconfont.css';
import '@/assets/iconfont/iconfont.js';

const app = createApp(App);
const pinia = createPinia();
pinia.use(persist);
app.use(router).use(pinia).use(vueExtendDirectives).use(customComponents).mount('#app');
