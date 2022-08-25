import { App, Component } from 'vue';

const componentsArr: Component[] = [];
const modulesFiles = import.meta.glob('./auto/*/index.ts', { eager: true });
for (const path in modulesFiles) {
  const dirInstance = modulesFiles[path] as any;
  if (dirInstance.default) {
    if (!dirInstance.default.name || dirInstance.default.name == 'Main') {
      // 兼容无 name 情况
      const reg = /(?<=.\/auto\/).+(?=\/index.ts)/;
      const matchResult = path.match(reg) as RegExpMatchArray;
      dirInstance.default.name = matchResult[0];
    }
    componentsArr.push(dirInstance.default);
  }
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
