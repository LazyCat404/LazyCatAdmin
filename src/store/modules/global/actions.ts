/**
 * 异步修改状态
 */

import { myObject } from '@types';
import { ActionContext } from 'vuex';
// import { mutations } from './mutations';

const actions = {
  login({ commit }: ActionContext<myObject, unknown>, payload: myObject): void {
    console.log(commit, payload);
    // async Promise<PromiseConstructor>
  }
};

export default actions;
