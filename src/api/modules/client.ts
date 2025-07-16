import { get } from 'ez-axios';
const api = {
  getVDIList: (par?: any): Promise<res> => get('/api/vdi/list', par),
  getVOIList: (par?: any): Promise<res> => get('/api/voi/list', par)
};

export default api;
