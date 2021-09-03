import { post } from '@/plugins/axios';

const api = {
  // 菜单
  getMenu: (par:{ [propName: string]: unknown; }):Promise<unknown> => post('/user/menu', par),
  // 登录
  login: (par:{ [propName: string]: unknown; }):Promise<unknown> => post('/user/login', par),
};


export default api;