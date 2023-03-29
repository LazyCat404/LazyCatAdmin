/*
 * @Author: LazyCat404
 * @Date: 2023-01-13 16:19:37
 * @LastEditTime: 2023-03-29 17:49:42
 * @LastEditors: LzayCat404
 * @Description: 独立页面路由，没有固定布局，单独成页
 */

// 独立视图页面路由

const modules = [];

const modulesFiles = import.meta.glob('./modules/*.ts', { eager: true });
for (const path in modulesFiles) {
  const dirInstance = modulesFiles[path] as any;
  modules.push(...dirInstance.default);
}

export default [...modules];
