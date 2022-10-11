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
    path: '/visualization',
    name: 'Visualization',
    component: (): unknown => import('@views/single/visualization/Index.vue'),
    meta: {
      title: '用户登录',
      authority: []
    }
  }
];
