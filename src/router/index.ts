import { createRouter, createWebHashHistory } from 'vue-router';
import single from './single';
import core from './core';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...single, ...core]
});

// 路由守卫
router.beforeEach((to, from, next) => {
  if (router.getRoutes().some(route => route.path === to.path)) {
    // 路由已配置
    if (to.meta.requireAuth) {
      // 需要登录
      if ($store.useUserStore().token) {
        // 已登录
        next();
      } else {
        // 未登录（前往登录页）
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        });
      }
    } else {
      // 不需要登录（直接进入页面）
      next();
    }
  } else {
    // 未配置路由（跳转error页）
    next({
      path: '/error'
    });
  }
});

export default router;
