import { post } from '@/plugins/axios';

const api = {
  // 菜单
  logout: (par:{ [propName: string]: unknown; }):Promise<unknown> => post('/user/menu', par),

};


export default api;