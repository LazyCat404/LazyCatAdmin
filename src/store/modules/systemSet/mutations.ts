/**
 * 同步修改状态
 */

import { myObject } from '@types';

const mutations = {
  setNav:(state:myObject,payload:myObject):void =>{
    state.nav = payload;
  },
};

export default mutations;
