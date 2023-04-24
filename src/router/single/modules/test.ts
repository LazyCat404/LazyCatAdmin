// 测试页
export default [
  {
    path: '/test',
    name: 'Test',
    redirect: '/test/other',
    component: (): unknown => import('@views/single/test/Index.vue'),
    children: [
      {
        path: 'other',
        name: 'TestOther',
        component: (): unknown => import('@views/single/test/views/Other.vue')
      },
      {
        path: 'table',
        name: 'TestTable',
        component: (): unknown => import('@views/single/test/views/Table.vue')
      }
    ]
  }
];
