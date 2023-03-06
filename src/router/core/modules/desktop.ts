// 云桌面
export default [
  {
    path: '/desktop',
    name: 'Desktop',
    component: (): unknown => import('@views/core/desktop/Index.vue')
  }
];
