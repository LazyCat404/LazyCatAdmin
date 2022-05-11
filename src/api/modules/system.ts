import { get } from '@/plugins/axios';
const api = {
  // 角色列表
  getRoleList: (par?: any): Promise<res> => get('/api/system/getRoleList', par),
  // 获取角色权限
  getPowerList: (par?: any): Promise<res> => get('/api/system/getPowerList', par),
  // 用户列表
  getUserList: (par?: any): Promise<res> => get('/api/system/getUserList', par)
};

export default api;
