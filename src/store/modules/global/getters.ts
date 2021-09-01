import { stateType } from './state';

export const getters = {
  user: (state: stateType):unknown => state.user,
};

export default getters;
