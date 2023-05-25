let store: any = {};

const modulesFiles = import.meta.glob('./modules/*.ts', { eager: true });
for (const path in modulesFiles) {
  const dirInstance = modulesFiles[path] as any;
  store = { ...store, ...dirInstance };
}

export default store; // 全部
