/*
 * @Author: LazyCat404
 * @Date: 2023-01-13 16:19:37
 * @LastEditTime: 2023-03-29 17:48:35
 * @LastEditors: LzayCat404
 * @Description：以views/layout为基础的分隔页路由，核心业务路由
 */

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
