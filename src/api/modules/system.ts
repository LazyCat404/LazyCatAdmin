import { get } from 'ez-axios';
const api = {
  // 角色列表
  getRoleList: (par?: any): Promise<res> => get('/api/system/getRoleList', par),
  // 获取角色功能权限
  getPowerList: (par?: any): Promise<res> => get('/api/system/getPowerList', par),
  // 获取菜单权限
  getMenuList: (par?: any): Promise<res> => get('/api/system/getMenuList', par),
  // 用户列表
  getUserList: (par?: any): Promise<res> => get('/api/system/getUserList', par)
};

export default api;
