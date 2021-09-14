import { post } from '@/plugins/axios';
import { myObject } from '@types';

const api = {
  // 菜单
  getMenu: (par?: myObject): Promise<unknown> => post('/api/user/menu', par),
  // 登录
  login: (par: myObject): Promise<unknown> => post('/api/user/login', par)
};

export default api;
