import { DirectiveBinding, render } from 'vue';
let menuWrapper: HTMLElement | null;
// 右键点击
function rightClick(event: MouseEvent, binding: DirectiveBinding) {
  event.preventDefault(); // 阻止默认事件
  removeWrapper();
  // 菜单容器，用于定位
  menuWrapper = document.createElement('div');
  menuWrapper.setAttribute(
    'style',
    `position: fixed;
    left:${event.clientX}px;
    top:${event.clientY}px;
    `
  );
  contextMenuRender(binding);
  document.body.appendChild(menuWrapper);
}
function contextMenuRender(binding: DirectiveBinding): void {
  if (binding.value) {
    templateContextMenu(binding.value);
  } else {
    (menuWrapper as HTMLElement).innerHTML = defaultContextMenu();
  }
}
// 模板渲染
function templateContextMenu(contextmenuRef: any): void {
  render(contextmenuRef.render(), menuWrapper as any);
  /**
   * TODOing
   * 仅将dom渲染，不是真个单文件组件，因此不具备组件的能力
   */
}
// 默认渲染
function defaultContextMenu(): string {
  const defaultDom = `<div>哈哈</div>`;
  return defaultDom;
}
// 移除菜单
function removeWrapper() {
  if (menuWrapper) {
    document.body.removeChild(menuWrapper);
    menuWrapper = null;
  }
}
// 初始绑定
function bind(el: any, binding: DirectiveBinding): void {
  el._bindRightClick = (event: MouseEvent) => {
    rightClick(event, binding);
  };
  el.addEventListener('contextmenu', el._bindRightClick);
}

const contextmenu = {
  name: 'contextmenu',
  dir: {
    mounted: bind,
    beforeUnmount(el: any): void {
      removeWrapper();
      el.removeEventListener('contextmenu', el._bindRightClick);
    }
  }
};

export default contextmenu;

/**
 * 组件实例已经添加到组件内：
 * 1. 通过实例控制已添加的组件显隐
 * 2. 可能会造成闪现效果，要根据实际结果待定此方案是否推荐
 */

// if (binding.arg) {
//   // 自定义模板渲染实例
//   const contextmenuRef: any = isRef(binding.arg) ? binding.arg.value : binding.instance?.$refs[binding.arg as string];
//   if (contextmenuRef) {
//     contextMenuDom = templateContextMenu(contextmenuRef);
//   } else {
//     console.warn(`未找到实例：${binding.arg}，已为您展示默认渲染`);
//     contextMenuDom = defaultContextMenu();
//   }
// }
