export {};
import { $tool } from '@/utils/tool';
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
    $tool: typeof $tool;
  }
}
