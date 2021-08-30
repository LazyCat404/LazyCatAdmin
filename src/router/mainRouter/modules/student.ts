// 学生模块路由
export default [
  {
    path: '/student',
    name: 'Student',
    component: ():unknown =>
      import(
        /* webpackChunkName: "student" */
        '@views/splitview-main/student/Index.vue'
      ),
    redirect: '/student/list',
    meta: {
      title: '学生管理',
      authority: [],
      breadcrumb: [{ title: '学生管理', path: '' }]
    },
    children: [
      {
        path: '/student/list',
        name: 'MyStudentList',
        component: ():unknown =>
          import(
            /* webpackChunkName: "course" */
            '@views/splitview-main/student/view/StudentList.vue'
          ),
        meta: {
          title: '学生管理',
          authority: [],
          breadcrumb: [{ title: '学生管理', path: '' }]
        }
      },
    ]
  }
];
