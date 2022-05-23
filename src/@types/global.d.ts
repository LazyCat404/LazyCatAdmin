export {};
import { $tool } from '@/utils/tool';
declare global {
  // 接口返回值类型
  interface res {
    msg: string;
    code: number;
    data: any;
  }
}
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $tool: typeof $tool;
  }
}
