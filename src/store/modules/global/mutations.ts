/**
 * 同步修改状态
 */

import { myObject } from '@types';

const mutations = {
  setUer:(state:myObject,payload:myObject):void =>{
    state.user = payload;
  },
  setToken:(state:myObject,payload:myObject):void =>{
    state.token = payload;
  },
};

export default mutations;
