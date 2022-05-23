import { createStore, createLogger } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import global from './modules/global';

const plugins = <any>[];
plugins.push(createPersistedState({ storage: window.sessionStorage }));
if (import.meta.env.MODE === 'development') {
  plugins.push(createLogger());
}

const modules: any = {};
const modulesFiles = import.meta.glob('./modules/*/index.ts');
for (const path in modulesFiles) {
  if (path.includes('global') === false) {
    modulesFiles[path]().then((res: any): void => {
      modules[path.replace(/(\.\/modules\/|\/index.ts)/g, '')] = res.default;
    });
  }
}

const store: any = createStore({
  state: global.state,
  getters: global.getters,
  mutations: global.mutations,
  actions: global.actions,
  modules,
  plugins
});
export const stores = store._modules.root._rawModule.modules; // 模块
export default store; // 全部
