import { get } from 'ez-axios';
const api = {
  getDesktopList: (par?: any): Promise<res> => get('/api/desktop/list', par)
};

export default api;
