// 错误提示
export default [
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
