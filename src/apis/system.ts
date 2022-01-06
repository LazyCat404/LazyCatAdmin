import { get } from '@/plugins/axios';
import { myObject } from '@types';
const api = {
  // 角色列表
  getRole: (par: myObject): Promise<unknown> => get('/api/system/role', par)
};

export default api;
