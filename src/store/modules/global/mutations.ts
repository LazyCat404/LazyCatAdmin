/**
 * 同步修改状态
 */
const mutations = {
  setUser: (state: any, payload: any): void => {
    state.user = payload;
  },
  setToken: (state: any, payload: any): void => {
    state.token = payload;
  }
};

export default mutations;
