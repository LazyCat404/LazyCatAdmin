let api: any = {};

const modulesFiles = import.meta.glob('./modules/*.ts', { eager: true });
for (const path in modulesFiles) {
  const dirInstance = modulesFiles[path] as any;
  api = Object.assign(api, dirInstance.default);
}
export default api;
