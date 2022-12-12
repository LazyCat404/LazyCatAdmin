import { get } from '@/plugins/axios.js';

const api = {
  // 台架列表
  getBenchList: (par: any): Promise<res> => get('/api/bench/list', par),
  // 台架详情
  getBenchDetail: (par: any): Promise<res> => get('/api/bench/detail', par),
  // 工作日志
  getWorkLog: (par: any): Promise<res> => get('/api/bench/work/log', par),
  // 运行时间占比
  getRunRatio: (par: any): Promise<res> => get('/api/bench/run/ratio', par),
  // 运行时间统计
  getTimeCensus: (par: any): Promise<res> => get('/api/bench/time/census', par),
  // 台架看板
  getBoard: (par: any): Promise<res> => get('/api/bench/board', par),
  // 台架看板详情
  getBoardDetail: (par: any): Promise<res> => get('/api/bench/board/detail', par),
  // 根据看板获取台架列表
  getBoardBenchList: (par: any): Promise<res> => get('/api/bench/board/list', par),
  // 台架状态占比
  getStatusRatio: (par: any): Promise<res> => get('/api/bench/status/ratio', par),
  // 获取看板配置列表
  getConfigList: (par: any): Promise<res> => get('/api/board/config/list', par),
  // 获取监控列表
  getMonitorList: (par: any): Promise<res> => get('/api/board/monitor/list', par),
  // 根据台架获取监控信息
  getBenchMonitor: (par: any): Promise<res> => get('/api/bench/monitor/detail', par),
  // 运行时间统计-数据列表
  getRunTimeCensus: (par: any): Promise<res> => get('/api/bench/run/time/census', par),
  //停机原因时长及占比
  getDownCause: (par: any): Promise<res> => get('/api/bench/down/cause', par),
  //停机/运行时长占比
  getDownRunRatio: (par: any): Promise<res> => get('/api/bench/down/run/ratio', par),
  // 台架油耗统计
  getBenchOilConsumption: (par: any): Promise<res> => get('/api/bench/oil/consumption', par),
  // 台架油耗筛选
  getOilFilter: (par: any): Promise<res> => get('/api/bench/oil/filter', par),
  // 订单油耗
  getOrderOilFilter: (par: any): Promise<res> => get('/api/order/oil/filter', par)
};

export default api;
