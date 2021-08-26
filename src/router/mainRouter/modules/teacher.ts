// 教师模块列表
export default [
  {
    path: '/teacher',
    name: 'Teacher',
    component: () =>
      import(
        /* webpackChunkName: "teacher" */
        '@views/splitview-main/teacher/Index.vue'
      ),
    redirect: '/teacher/list',
    meta: {
      title: '教师管理',
      authority: [],
      breadcrumb: [{ title: '教师管理', path: '' }]
    },
    children: [
      {
        path: '/teacher/list',
        name: 'MyTeacherList',
        component: () =>
          import(
            /* webpackChunkName: "course" */
            '@views/splitview-main/teacher/view/TeacherList.vue'
          ),
        meta: {
          title: '教师管理',
          authority: [],
          breadcrumb: [{ title: '教师管理', path: '' }]
        }
      },
    ]
  }
]
