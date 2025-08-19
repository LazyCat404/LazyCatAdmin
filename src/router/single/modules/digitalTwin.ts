// 数字孪生大屏
export default [
  {
    path: '/digital-twin',
    name: 'DigitalTwin',
    redirect: '/digital-twin/factory',
    component: (): unknown => import('@page/single/digitalTwin/Index.vue'),
    children: [
      {
        path: 'factory',
        name: 'DigitalTwinFactory',
        component: (): unknown => import('@page/single/digitalTwin/views/Factory.vue')
      },
      {
        path: 'map',
        name: 'DigitalTwinMap',
        component: (): unknown => import('@page/single/digitalTwin/views/Map.vue')
      }
    ]
  }
];
