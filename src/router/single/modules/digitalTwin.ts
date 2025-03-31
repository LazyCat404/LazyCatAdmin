// 数字孪生大屏
export default [
  {
    path: '/digital-twin',
    name: 'DigitalTwin',
    component: (): unknown => import('@page/single/digitalTwin/Index.vue'),
    meta: {
      requireAuth: true,
    }
  }
];
