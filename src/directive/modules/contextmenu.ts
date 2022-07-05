import { createApp, DirectiveBinding, Component, Fragment, h } from 'vue';
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
    box-shadow: 0px 2px 20px 2px rgb(0 0 0 / 8%);
    border-radius: 10px;
    `
  );
  contextMenuRender(binding);
  document.body.appendChild(menuWrapper);
}
function contextMenuRender(binding: DirectiveBinding): void {
  if (binding.value) {
    customContextMenu(binding.value);
  } else {
    (menuWrapper as HTMLElement).innerHTML = defaultContextMenu();
  }
}
export interface contextMenuList {
  label: string;
  click?: object;
  disable?: boolean;
  ico?: string;
  sub?: string;
  children?: [
    {
      label: string;
      click?: object;
      disable?: boolean;
    }
  ];
}
/**
 * 自定义渲染
 * @param contextmenuRef 单文件组件实例、对象数组
 */
function customContextMenu(contextmenuRef: Component | Array<contextMenuList>): void {
  if (Object.prototype.toString.call(contextmenuRef) === '[object Array]') {
    customArrayMenu(contextmenuRef as Array<contextMenuList>);
  } else {
    createApp(contextmenuRef).mount(menuWrapper as any);
  }
  clickListener();
}
/**
 * 自定义数组菜单
 * @param contextmenuRef 对象数组
 */
function customArrayMenu(contextmenuRef: Array<contextMenuList>) {
  const renderList: Array<any> = [];
  contextmenuRef.forEach((item: contextMenuList) => {
    renderList.push(
      h(
        'div',
        {
          onclick: item.disable ? null : item.click,
          style: `cursor: ${item.disable ? 'no-drop' : 'pointer'};
            background:#fff;
            width:100px;
            padding:5px 20px;
            color: ${item.disable ? '#ddd' : '#333'}
          `
        },
        item.label
      )
    );
  });
  const App: object = {
    render() {
      return h(Fragment, renderList);
    }
  };
  createApp(App).mount(menuWrapper as any);
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
