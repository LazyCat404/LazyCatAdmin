import { post } from '@/plugins/axios';

const api = {
  // 菜单
  getMenu: (par?: any): Promise<res> => post('/api/user/menu', par),
  // 登录
  login: (par: any): Promise<res> => post('/api/user/login', par)
};

export default api;
