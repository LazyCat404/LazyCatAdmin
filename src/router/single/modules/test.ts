// 测试页
export default [
  {
    path: '/test',
    name: 'Test',
    redirect: '/test/lottie',
    component: (): unknown => import('@views/single/test/Index.vue'),
    children: [
      {
        path: 'table',
        name: 'TestTable',
        component: (): unknown => import('@views/single/test/views/Table.vue')
      },
      {
        path: 'other',
        name: 'TestOther',
        component: (): unknown => import('@views/single/test/views/Other.vue')
      }
    ]
  }
];
