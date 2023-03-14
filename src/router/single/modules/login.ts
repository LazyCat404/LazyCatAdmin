// 登录
export default [
  {
    path: '/login',
    name: 'Login',
    component: (): unknown => import('@views/single/Login.vue'),
    meta: {
      title: '用户登录',
      authority: []
    }
  }
];
