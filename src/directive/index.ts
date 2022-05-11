interface dir {
  name: string; // 指令名
  dir: any; // 指令方法
}
const customDirective: dir[] = [];

const modulesFiles = import.meta.globEager('./modules/*.ts');
for (const path in modulesFiles) {
  customDirective.push(modulesFiles[path].default);
}

export default customDirective;
