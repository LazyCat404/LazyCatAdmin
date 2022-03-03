import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import globalMount from './utils/globalMount';

import { MyComponents } from '@/components/index';

import { ElComponents, ElPlugins } from '@/plugins/element';
import { customDirective } from '@/directive';
import 'element-plus/theme-chalk/base.css'; // elm 基础样式
import '@/assets/css/custom.scss';

const app = createApp(App);

// 按需引入ui 组件/插件
ElComponents.forEach(component => {
  app.component(component.name, component);
});
ElPlugins.forEach(plugin => {
  app.use(plugin);
});
// 自定义指令
customDirective.forEach(directive => {
  app.directive(`${directive.name}`, directive.dir);
});
// 自定义全局组件
MyComponents.forEach(component => {
  app.component(component.name, component);
});

app.use(router).use(globalMount).mount('#app');
