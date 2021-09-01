import { ActionContext } from 'vuex';
import { stateType } from './state';
// import { mutations } from './mutations';

const actions = {
  login({ commit }: ActionContext<stateType,unknown>, payload:stateType):void{
    console.log(commit,payload);
    // async Promise<PromiseConstructor>
  },
};

export default actions;
