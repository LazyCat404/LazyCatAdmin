import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import globalMount from './utils/globalMount';

import{ ElComponents, ElPlugins } from '@/plugins/element';
import 'element-plus/theme-chalk/base.css'; // elm 基础样式

const app = createApp(App);

// 按需引入ui 组件/插件
ElComponents.forEach((component) => {
  app.component(component.name, component);
});
ElPlugins.forEach((plugin) => {
  app.use(plugin);
});

app.use(router)
  .use(globalMount)
  .mount('#app');
