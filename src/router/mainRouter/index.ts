// 分隔视图页面路由

const modules = [];

const modulesFiles = import.meta.glob('./modules/*.ts', { eager: true });
for (const path in modulesFiles) {
  const dirInstance = modulesFiles[path] as any;
  modules.push(...dirInstance.default);
}

export default [
  {
    path: '/',
    component: (): unknown => import('@views/splitview-main/Layout.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: (): unknown => import('@views/splitview-main/dashboard/Index.vue')
      },
      ...modules
    ],
    meta: {
      requireAuth: true
    }
  }
];
