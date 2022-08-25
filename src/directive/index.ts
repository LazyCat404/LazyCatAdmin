interface dir {
  name: string; // 指令名
  dir: any; // 指令方法
}
const customDirective: dir[] = [];

const modulesFiles = import.meta.glob('./modules/*.ts', { eager: true });
for (const path in modulesFiles) {
  const dirInstance = modulesFiles[path] as any;
  customDirective.push(dirInstance.default);
}

export default customDirective;
