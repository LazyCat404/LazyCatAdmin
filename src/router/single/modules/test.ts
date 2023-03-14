// 测试页
export default [
  {
    path: '/test',
    name: 'Test',
    component: (): unknown => import('@views/single/test/Index.vue'),
    meta: {
      title: '测试',
      authority: []
    }
  }
];
