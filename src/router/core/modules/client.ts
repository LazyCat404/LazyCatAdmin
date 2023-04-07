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
    redirect: '/client/vdi',
    children: [
      {
        path: 'vdi',
        name: 'ClientVdi',
        component: (): unknown => import('@views/core/client/views/VDI.vue'),
        meta: {
          requireAuth: true,
          breadcrumb: [
            { title: '客户机', path: '', ico: 'icon-kehuji-guanji' },
            { title: '客户机', path: '' }
          ]
        }
      },
      {
        path: 'voi',
        name: 'ClientVoi',
        component: (): unknown => import('@views/core/client/views/VOI.vue'),
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
