import { myObject } from '@types';

export const getters = {
  user: (state: myObject):unknown => state.user,
};

export default getters;
