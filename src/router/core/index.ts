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
    component: (): unknown => import('@views/layout/Index.vue'),
    redirect: '/bench',
    children: [
      {
        path: '/bench',
        name: 'Bench',
        component: (): unknown => import('@views/core/bench/Index.vue')
      },
      ...modules
    ],
    meta: {
      requireAuth: true
    }
  }
];
