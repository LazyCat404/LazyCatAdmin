import ezAxios from 'ez-axios';

// 全局配置项均为非必填，以上值为内置默认值。
ezAxios({
  baseURL: import.meta.env.MODE === 'production' ? import.meta.env.VITE_BSAE_URL : '',
  mark: import.meta.env.MODE === 'production' ? ['api'] : ''
});
