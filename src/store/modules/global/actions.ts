/**
 * 异步修改状态
 */
import { ActionContext } from 'vuex';
// import { mutations } from './mutations';

const actions = {
  login({ commit }: ActionContext<any, unknown>, payload: any): void {
    console.log(commit, payload);
    // async Promise<PromiseConstructor>
  }
};

export default actions;
