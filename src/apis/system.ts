import { get } from '@/plugins/axios';
import { myObject } from '@types';
const api = {
  // 角色列表
  getRole: (par?: myObject): Promise<unknown> => get('/api/system/getRole', par),
  // 获取角色权限
  getPower: (par?: myObject): Promise<unknown> => get('/api/system/getPower', par)
};

export default api;
