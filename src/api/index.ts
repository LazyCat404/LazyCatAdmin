const api: any = {};

const modulesFiles = import.meta.glob('./modules/*.ts', { eager: true });
for (const path in modulesFiles) {
  const dirInstance = modulesFiles[path] as any;
  const key = (path.match(/.\/modules\/(\S*).ts/) as Array<string>)[1];
  api[key] = dirInstance.default;
}
export default api;
