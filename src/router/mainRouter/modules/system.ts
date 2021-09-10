// 教师模块列表
export default [
  {
    path: '/system',
    name: 'System',
    component: ():unknown =>
      import(
        /* webpackChunkName: "system" */
        '@views/splitview-main/system/Index.vue'
      ),
  }
];
