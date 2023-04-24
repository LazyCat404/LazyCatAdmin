import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// 扩展指令
import vueExtendDirectives from 'vue-extend-directives';
// 全局自定义组件安装
import customComponents from '@/components/index';
//  字体ico
import '@/assets/iconfont/iconfont.css';

const app = createApp(App);
app.use(router).use(vueExtendDirectives).use(customComponents).mount('#app');
