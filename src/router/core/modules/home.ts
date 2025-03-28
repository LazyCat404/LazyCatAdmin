/*
 * @Author: LazyCat404
 * @Date: 2025-03-28 16:15:04
 * @LastEditTime: 2025-03-28 16:17:21
 * @LastEditors: LzayCat404
 * @Description: 工作台路由
 */
/*
 * @Author: LazyCat404
 * @Date: 2023-04-07 10:38:55
 * @LastEditTime: 2023-04-07 11:32:02
 * @LastEditors: LzayCat404
 * @Description: 云桌面
 */

export default [
  {
    path: '/home',
    name: 'Home',
    component: (): unknown => import('@page/core/home/Index.vue'),
    meta: {
      requireAuth: true,
      breadcrumb: [{ title: '工作台', path: '', ico: 'icon-gongzuotai1' }]
    }
  }
];
