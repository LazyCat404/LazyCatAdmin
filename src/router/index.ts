import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store/index';
import singleRouter from './singleRouter';
import mainRouter from './mainRouter';


const router = createRouter({
  history: createWebHashHistory(),
  routes:[...singleRouter, ...mainRouter]
});

// 路由守卫
router.beforeEach((to,from, next) => {
  if (to.meta.requireAuth) { 
    if(store.state.token) { 
      next(); // 已登录
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath} 
      });
    }
  }else {
    next();
  }
});
export default router;