/*
 * @Author: LazyCat404
 * @Date: 2023-04-07 10:55:20
 * @LastEditTime: 2023-04-07 11:04:09
 * @LastEditors: LzayCat404
 * @Description: 客户机
 */
/**
 * @description:
 * @return {*}
 */
export default [
  {
    path: '/client',
    name: 'Client',
    component: (): unknown => import('@views/core/client/Index.vue'),
    redirect: '/client/list',
    children: [
      {
        path: 'list',
        name: 'ClientList',
        component: (): unknown => import('@views/core/client/views/List.vue'),
        meta: {
          requireAuth: true,
          breadcrumb: [
            { title: '客户机', path: '', ico: 'icon-kehuji-guanji' },
            { title: '客户机', path: '' }
          ]
        }
      }
    ]
  }
];
