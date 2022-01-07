import { get } from '@/plugins/axios';
import { myObject, res } from '@types';
const api = {
  // 角色列表
  getRole: (par?: myObject): Promise<res> => get('/api/system/getRole', par),
  // 获取角色权限
  getPower: (par?: myObject): Promise<res> => get('/api/system/getPower', par)
};

export default api;
