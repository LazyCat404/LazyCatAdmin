const menuJson = [
  {
    name: '工作台',
    path: '/visualization',
    icon: 'icon-shujujiashicang'
  },
  {
    name: '云桌面',
    icon: 'icon-taijiaxinxi',
    path: '/bench',
    children: [
      {
        name: '云桌面',
        path: '/bench/board'
      },
      {
        name: '模板机',
        path: '/bench/board'
      }
    ]
  },
  {
    name: '系统配置',
    icon: 'icon-xitongshezhi'
  }
];

export default menuJson;
