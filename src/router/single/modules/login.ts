// 登录
export default [
  {
    path: '/login',
    name: 'Login',
    component: (): unknown => import('@page/single/login/Index.vue')
  }
];
