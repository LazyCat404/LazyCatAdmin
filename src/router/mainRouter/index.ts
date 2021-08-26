// 分隔视图页面路由

let modules = []

const modulesFiles = import.meta.globEager('./modules/*.ts')
for (const path in modulesFiles) {
  modules.push(...modulesFiles[path].default) 
}

export default [
  {
    path: '/',
    component: () =>
      import(
        /* webpackChunkName: "layout" */
        'views/splitview-main/Layout.vue'
      ),
    redirect: '/dashboard',
    children:[
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () =>
          import(
            /* webpackChunkName: "layout" */
            '@/views/splitview-main/dashboard/Index.vue'
          ),
        meta: {
          breadcrumb: [{ title: '首页', path: '' }],
          authority: []
        }
      },
      ...modules
    ]
  }
]