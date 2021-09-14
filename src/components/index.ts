import { myObject } from '@types';

const MyComponents:Array<myObject> = [];
const modulesFiles = import.meta.globEager('./auto/**/*.ts');
for (const path in modulesFiles) {
  if(!modulesFiles[path].default.name){
    // 兼容无 name 情况
    const reg = /(?<=.\/auto\/).+(?=\/index.ts)/;
    const matchResult = path.match(reg) as RegExpMatchArray;
    modulesFiles[path].default.name = matchResult[0];
  }
  MyComponents.push(modulesFiles[path].default);
}
export { MyComponents };