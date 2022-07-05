import { createApp, DirectiveBinding } from 'vue';
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
/**
 * 自定义模板渲染
 * @param contextmenuRef 单文件组件实例
 */
function templateContextMenu(contextmenuRef: any): void {
  createApp(contextmenuRef).mount(menuWrapper as any);
  clickListener();
}
/**
 * 默认渲染
 * @returns 模板字符串
 */
function defaultContextMenu(): string {
  const defaultDom = `
    <div>默认右键菜单</div>
  `;
  return defaultDom;
}

function clickListener() {
  window.addEventListener('click', removeWrapper);
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
      window.removeEventListener('click', removeWrapper);
    }
  }
};

export default contextmenu;
