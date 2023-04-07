/*
 * @Author: LazyCat404
 * @Date: 2023-04-07 10:38:55
 * @LastEditTime: 2023-04-07 10:58:12
 * @LastEditors: LzayCat404
 * @Description: 系统设置
 */
export default [
  {
    path: '/system',
    name: 'System',
    component: (): unknown => import('@views/core/system/Index.vue'),
    redirect: '/system/overall',
    children: [
      {
        path: 'overall',
        name: 'SystemOverall',
        component: (): unknown => import('@views/core/system/view/Overall.vue'),
        meta: {
          requireAuth: true,
          breadcrumb: [
            { title: '系统设置', path: '' },
            { title: '全局设置', path: '' }
          ]
        }
      },
      {
        path: 'user',
        name: 'SystemUser',
        component: (): unknown => import('@views/core/system/view/User.vue'),
        meta: {
          requireAuth: true,
          breadcrumb: [
            { title: '系统设置', path: '' },
            { title: '用户管理', path: '' }
          ]
        }
      },
      {
        path: 'role',
        name: 'SystemRole',
        component: (): unknown => import('@views/core/system/view/Role.vue'),
        meta: {
          requireAuth: true,
          breadcrumb: [
            { title: '系统设置', path: '' },
            { title: '角色管理', path: '' }
          ]
        }
      },
      {
        path: 'journal',
        name: 'SystemJournal',
        component: (): unknown => import('@views/core/system/view/Journal.vue'),
        meta: {
          requireAuth: true,
          breadcrumb: [
            { title: '系统设置', path: '' },
            { title: '操作日志', path: '' }
          ]
        }
      }
    ]
  }
];
