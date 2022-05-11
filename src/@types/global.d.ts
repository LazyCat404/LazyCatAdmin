export {};

declare global {
  // 接口返回值类型
  interface res {
    msg: string;
    code: number;
    data: any;
  }
}
