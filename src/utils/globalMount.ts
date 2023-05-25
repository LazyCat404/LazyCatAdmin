// 全局挂载
export const globalMount: any = [
  'vue-router',
  {
    axios: [
      ['default', '$axios'] // import { default as axios } from 'axios',
    ],
    '@/store': [['default', '$store']], // 全局状态
    '@/utils/tool': [['default', '$tool']]
  }
];
