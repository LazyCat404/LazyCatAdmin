import { get } from '@/plugins/axios';
const api = {
  // 角色列表
  getDesktopList: (par?: any): Promise<res> => get('/api/desktop/list', par)
};

export default api;
