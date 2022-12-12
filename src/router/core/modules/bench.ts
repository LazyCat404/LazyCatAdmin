// 台架信息
export default [
  {
    path: '/bench',
    name: 'Bench',
    component: (): unknown => import('@views/core/bench/Index.vue'),
    redirect: '/bench/list',
    children: [
      {
        path: 'list',
        name: 'BenchList',
        component: (): unknown => import('@views/core/bench/view/List.vue'),
        meta: {
          requireAuth: true,
          breadcrumb: [
            { title: '台架信息', path: '', ico: 'icon-home' },
            { title: '台架管理', path: '' }
          ]
        }
      },
      {
        path: 'detail',
        name: 'BenchDetail',
        component: (): unknown => import('@views/core/bench/view/Detail.vue'),
        meta: {
          requireAuth: true,
          breadcrumb: [
            { title: '台架信息', path: '', ico: 'icon-home' },
            { title: '台架管理', path: '/bench/list' },
            { title: '台架详情', path: '' }
          ]
        }
      },
      {
        path: 'board',
        name: 'BenchBoard',
        component: (): unknown => import('@views/core/bench/view/Board.vue'),
        meta: {
          requireAuth: true,
          breadcrumb: [
            { title: '台架信息', path: '', ico: 'icon-home', textColor: '#fff' },
            { title: '台架看版', path: '', textColor: '#fff' }
          ]
        }
      },
      {
        path: 'board-config',
        name: 'BenchBoardConfig',
        component: (): unknown => import('@views/core/bench/view/BoardConfig.vue'),
        meta: {
          requireAuth: true,
          breadcrumb: [
            { title: '台架信息', path: '', ico: 'icon-home', textColor: '#fff' },
            { title: '台架看版', path: '', textColor: '#fff' }
          ]
        }
      },
      {
        path: 'monitor',
        name: 'MonitorScreen',
        component: (): unknown => import('@views/core/bench/view/Monitor.vue'),
        meta: {
          requireAuth: true,
          breadcrumb: [
            { title: '台架信息', path: '', ico: 'icon-home', textColor: '#fff' },
            { title: '监控大屏', path: '', textColor: '#fff' }
          ]
        }
      },
      {
        path: 'time-analysis',
        name: 'TimeAnalysis',
        component: (): unknown => import('@views/core/bench/view/TimeAnalysis.vue'),
        meta: {
          requireAuth: true,
          breadcrumb: [
            { title: '台架信息', path: '', ico: 'icon-home' },
            { title: '运行时间统计', path: '' }
          ]
        }
      },
      {
        path: 'oil-consumption',
        name: 'OilConsumption',
        component: (): unknown => import('@views/core/bench/view/OilConsumption.vue'),
        meta: {
          requireAuth: true,
          breadcrumb: [
            { title: '台架信息', path: '', ico: 'icon-home', textColor: '#fff' },
            { title: '油耗统计', path: '', textColor: '#fff' }
          ]
        }
      },
      {
        path: 'order-oil-consumption',
        name: 'OrderOilConsumption',
        component: (): unknown => import('@views/core/bench/view/OrderOilConsumption.vue'),
        meta: {
          requireAuth: true,
          breadcrumb: [
            { title: '台架信息', path: '', ico: 'icon-home', textColor: '#fff' },
            { title: '油耗统计', path: '', textColor: '#fff' }
          ]
        }
      }
    ]
  }
];
