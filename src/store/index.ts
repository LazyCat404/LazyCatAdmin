import { createStore,createLogger } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import global from './modules/global';


const plugins = [];
plugins.push(createPersistedState({ storage: window.sessionStorage }));
if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger());
}

export const store = createStore({
  state: global.state,
  getters: global.getters,
  mutations: global.mutations,
  actions: global.actions,
  modules: {
    
    
  },
  plugins,
});

export default store;