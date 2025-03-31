// 错误提示
export default [
  {
    path: '/error',
    name: 'Error',
    component: (): unknown => import('@page/single/Error.vue')
  }
];
