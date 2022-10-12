// 独立视图页面路由
export default [
  {
    path: '/login',
    name: 'Login',
    component: (): unknown => import('@views/single/Login.vue'),
    meta: {
      title: '用户登录',
      authority: []
    }
  },
  {
    path: '/error',
    name: 'Error',
    component: (): unknown => import('@views/single/Error.vue'),
    meta: {
      title: '404',
      authority: []
    }
  }
];
