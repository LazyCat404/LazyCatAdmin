// 云桌面
export default [
  {
    path: '/desktop',
    name: 'Desktop',
    component: (): unknown => import('@views/core/desktop/Index.vue'),
    redirect: '/desktop/list',
    children: [
      {
        path: 'list',
        name: 'DesktopList',
        component: (): unknown => import('@views/core/desktop/views/List.vue'),
        meta: {
          requireAuth: true,
          breadcrumb: [
            { title: '云桌面', path: '', ico: 'icon-zhuanshu' },
            { title: '云桌面', path: '' }
          ]
        }
      }
    ]
  }
];
