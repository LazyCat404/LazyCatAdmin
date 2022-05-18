import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// 全局自定义安装
import customDirective from '@/directive';
import customComponents from '@/components/index';

const app = createApp(App);

// 自定义指令
customDirective.forEach(directive => {
  app.directive(`${directive.name}`, directive.dir);
});

app.use(router).use(customComponents).mount('#app');
