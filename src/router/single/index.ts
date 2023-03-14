// 独立视图页面路由

const modules = [];

const modulesFiles = import.meta.glob('./modules/*.ts', { eager: true });
for (const path in modulesFiles) {
  const dirInstance = modulesFiles[path] as any;
  modules.push(...dirInstance.default);
}

export default [...modules];
