export {};
declare global {
  // 接口返回
  interface res {
    msg: string;
    code: number;
    data: any;
  }
  // 分页回调参数
  interface pageData {
    pageNum: number;
    pageSize: number;
    operType: string;
  }
}
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    // 与auto-imports.d不同，可以在组件上引用
    $tool: typeof import('@/utils/tool')['default'];
  }
  export interface GlobalComponents {
    // 自定义全局组件
    LazyPage: typeof import('@/components/auto/LazyPage')['default'];
    LazyCopy: typeof import('@/components/auto/LazyCopy')['default'];
    LazyTable: typeof import('@/components/auto/LazyTable')['default'];
    LazySearch: typeof import('@/components/auto/LazySearch')['default'];
    LazySplitSelect: typeof import('@/components/auto/LazySplitSelect')['default'];
  }
}
