/**
 * 同步修改状态
 */

const mutations = {
  setNav: (state: any, payload: any): void => {
    state.nav = payload;
  }
};

export default mutations;
