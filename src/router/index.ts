import { createRouter, createWebHashHistory } from 'vue-router';
import singleRouter from './singleRouter';
import mainRouter from './mainRouter';


const router = createRouter({
  history: createWebHashHistory(),
  routes:[...singleRouter, ...mainRouter]
});

// 路由守卫
router.beforeEach((to,from, next) => {
  console.log('路由守卫：',to,from);
})
export default router;