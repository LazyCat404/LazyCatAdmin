// 教师模块列表
export default [
  {
    path: '/system',
    name: 'System',
    component: ():unknown => import('@views/splitview-main/system/Index.vue'),
    redirect: '/system/overall',
    children: [
      {
        path: 'overall',
        name: 'SystemOverall',
        component: ():unknown => import('@views/splitview-main/system/view/Overall.vue'),
        meta: {
          requireAuth:true,
          breadcrumb: [{ title: '系统设置', path: '' },{ title: '全局设置', path: '' }]
        }
      },
      {
        path: 'user',
        name: 'SystemUser',
        component: ():unknown => import('@views/splitview-main/system/view/User.vue'),
        meta: {
          requireAuth:true,
          breadcrumb: [{ title: '系统设置', path: '' },{ title: '用户管理', path: '' }]
        }
      },
      {
        path: 'role',
        name: 'SystemRole',
        component: ():unknown => import('@views/splitview-main/system/view/Role.vue'),
        meta: {
          requireAuth:true,
          breadcrumb: [{ title: '系统设置', path: '' },{ title: '角色管理', path: '' }]
        }
      },
      {
        path: 'journal',
        name: 'SystemJournal',
        component: ():unknown => import('@views/splitview-main/system/view/Journal.vue'),
        meta: {
          requireAuth:true,
          breadcrumb: [{ title: '系统设置', path: '' },{ title: '操作日志', path: '' }]
        }
      },
    ]
  }
];
