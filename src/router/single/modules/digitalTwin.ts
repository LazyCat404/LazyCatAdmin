// 数字孪生大屏
export default [
  {
    path: '/digital-twin',
    name: 'DigitalTwin',
    component: (): unknown => import('@page/single/digitalTwin/Index.vue'),
    children: [
      {
        path: 'map',
        name: 'DigitalTwinMap',
        component: (): unknown => import('@page/single/digitalTwin/views/Map.vue')
      },
      {
        path: 'factory',
        name: 'DigitalTwinFactory',
        component: (): unknown => import('@page/single/digitalTwin/views/Factory.vue')
      }
    ]
  }
];
