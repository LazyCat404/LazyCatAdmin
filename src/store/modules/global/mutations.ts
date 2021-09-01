import { stateType } from './state';

const mutations = {
  setUer:(state:stateType,payload:stateType):void =>{
    state.user = payload;
  }
};

export default mutations;
