import { createRouter, createWebHashHistory } from 'vue-router';
import singleRouter from './singleRouter';
import mainRouter from './mainRouter';


const router = createRouter({
  history: createWebHashHistory(),
  routes:[...singleRouter, ...mainRouter]
});


export default router;