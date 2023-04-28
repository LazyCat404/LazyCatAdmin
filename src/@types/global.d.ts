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
  export interface GlobalComponents {
    LazyTable: typeof import('@/components/auto/LazyTable')['default'];
    LazyPage: typeof import('@/components/auto/LazyPage')['default'];
    CopyText: typeof import('@/components/auto/CopyText')['default'];
  }
}
