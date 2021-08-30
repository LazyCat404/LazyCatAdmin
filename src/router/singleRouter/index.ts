// 独立视图页面路由
export default [{
  path: '/login',
  name: 'Login',
  component: ():unknown => import(/* webpackChunkName: "login" */ '@views/login.vue'),
  meta: {
    title: '用户登录',
    authority: []
  }
}]