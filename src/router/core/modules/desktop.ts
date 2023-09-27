/*
 * @Author: LazyCat404
 * @Date: 2023-04-07 10:38:55
 * @LastEditTime: 2023-04-07 11:32:02
 * @LastEditors: LzayCat404
 * @Description: 云桌面
 */

export default [
  {
    path: '/desktop',
    name: 'Desktop',
    redirect: '/desktop/desktop',
    component: (): unknown => import('@page/core/desktop/Index.vue'),
    children: [
      {
        path: 'desktop',
        name: 'DesktopDesktop',
        redirect: '/desktop/desktop/list',
        component: (): unknown => import('@page/core/desktop/views/desktop/Index.vue'),
        children: [
          {
            path: 'list',
            name: 'DesktopDesktopList',
            component: (): unknown => import('@page/core/desktop/views/desktop/views/List.vue'),
            meta: {
              requireAuth: true,
              breadcrumb: [
                { title: '云桌面', path: '', ico: 'icon-zhuanshu' },
                { title: '云桌面', path: '' }
              ]
            }
          }
        ]
      },
      {
        path: 'template',
        name: 'DesktopTemplate',
        redirect: '/desktop/template/list',
        component: (): unknown => import('@page/core/desktop/views/template/Index.vue'),
        children: [
          {
            path: 'list',
            name: 'DesktopTemplateList',
            component: (): unknown => import('@page/core/desktop/views/template/views/List.vue'),
            meta: {
              requireAuth: true,
              breadcrumb: [
                { title: '云桌面', path: '', ico: 'icon-zhuanshu' },
                { title: '模板机', path: '' }
              ]
            }
          }
        ]
      }
    ]
  }
];
