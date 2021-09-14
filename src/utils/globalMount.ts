// 全局挂载
import axios from 'axios';
import store from '../store';

export default {
  install: (app: {
    config: { globalProperties: { [x: string]: unknown } };
  }): void => {
    app.config.globalProperties['$axios'] = axios;
    app.config.globalProperties['$store'] = store;
    app.config.globalProperties['$stores'] =
      store._modules.root._rawModule.modules;
  }
};
