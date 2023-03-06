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
    redirect: '/desktop',
    children: [...modules],
    meta: {
      requireAuth: true
    }
  }
];
