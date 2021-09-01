import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import globalMount from './utils/globalMount';

createApp(App)
  .use(router)
  .use(globalMount)
  .mount('#app');
