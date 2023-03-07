const menuJson = [
  {
    name: '工作台',
    path: '/visualization',
    icon: 'icon-gongzuotai1'
  },
  {
    name: '云桌面',
    icon: 'icon-zhuanshu',
    path: '/desktop',
    children: [
      {
        name: '云桌面',
        path: '/desktop/list'
      },
      {
        name: '模板机',
        path: '/desktop/template'
      }
    ]
  },
  {
    name: '客户机',
    icon: 'icon-kehuji-guanji'
  },
  {
    name: '系统配置',
    icon: 'icon-xitongshezhi'
  }
];

export default menuJson;
