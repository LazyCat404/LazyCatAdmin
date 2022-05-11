let api: any = {};

const modulesFiles = import.meta.globEager('./modules/*.ts');
for (const path in modulesFiles) {
  api = Object.assign(api, modulesFiles[path].default);
}
export default api;
