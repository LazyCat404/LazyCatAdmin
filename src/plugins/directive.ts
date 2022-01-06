// 自定义指令
const customDirective = [
  {
    name: 'xx',
    dir: {
      mounted(el: HTMLElement, binding: { value: unknown }): void {
        console.log(el, binding);
      }
    }
  }
];
export { customDirective };
