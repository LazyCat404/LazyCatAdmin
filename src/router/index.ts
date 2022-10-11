import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store/index';
import single from './single';
import core from './core';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...single, ...core]
});

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.token) {
      next(); // 已登录
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
});
export default router;
