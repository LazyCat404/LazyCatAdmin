// 全局挂载
export const globalMount: any = [
  'vue-router',
  {
    axios: [
      ['default', '$axios'] // import { default as axios } from 'axios',
    ],
    '@/store': [
      ['default', '$store'], // 全局vuex
      ['stores', '$stores'] // 模块vuex
    ],
    '@/utils/tool': [['default', '$tool']]
  }
];
