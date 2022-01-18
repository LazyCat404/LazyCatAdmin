import { get } from '@/plugins/axios';
import { myObject, res } from '@types';
const api = {
  // 角色列表
  getRoleList: (par?: myObject): Promise<res> => get('/api/system/getRoleList', par),
  // 获取角色权限
  getPowerList: (par?: myObject): Promise<res> => get('/api/system/getPowerList', par),
  // 用户列表
  getUserList: (par?: myObject): Promise<res> => get('/api/system/getUserList', par)
};

export default api;
