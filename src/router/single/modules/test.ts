// 测试页
export default [
  {
    path: '/test',
    name: 'Test',
    redirect: '/test/table',
    component: (): unknown => import('@views/single/test/Index.vue'),
    children: [
      {
        path: 'table',
        name: 'TestTable',
        component: (): unknown => import('@views/single/test/views/Table.vue')
      }
    ]
  }
];
