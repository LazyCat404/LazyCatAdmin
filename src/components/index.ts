import { App, Component } from 'vue';

const componentsArr: Component[] = [];
const modulesFiles = import.meta.globEager('./auto/*/index.ts');
for (const path in modulesFiles) {
  if (!modulesFiles[path].default.name) {
    // 兼容无 name 情况
    const reg = /(?<=.\/auto\/).+(?=\/index.ts)/;
    const matchResult = path.match(reg) as RegExpMatchArray;
    modulesFiles[path].default.name = matchResult[0];
  }
  componentsArr.push(modulesFiles[path].default);
}

// 组件注册
const customComponents = {
  install(app: App) {
    componentsArr.map((item: Component) => {
      app.component(item.name as string, item);
    });
  }
};

export default customComponents;
