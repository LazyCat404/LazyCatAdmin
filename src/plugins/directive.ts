let tipDom: HTMLElement | null = null;
function inDom(event: Event) {
  const contDom: HTMLElement = <HTMLElement>event.target;
  if (contDom.scrollWidth > contDom.offsetWidth) {
    tipDom = document.createElement('span');
    document.body.appendChild(tipDom);
    tipDom.innerHTML = `
      ${contDom.innerText}
      <div></div>
    `;
    tipDom.setAttribute(
      'style',
      `position: fixed;
      border-radius: 4px;
      padding: 10px;
      font-size: 12px;
      line-height: 14px;
      word-wrap: break-word;
      background: #303133;
      color: #FFF;`
    );
    /**
     * 指示三角
     */
    const indicateDom = tipDom.getElementsByTagName('div')[0];
    indicateDom.setAttribute(
      'style',
      `position: absolute;
      width: 10px;
      height: 10px;
      top:29px;
      left:${tipDom.offsetWidth / 2 - 5}px;
      background: #303133;
      transform:rotate(45deg);
      -ms-transform:rotate(45deg);
      -moz-transform:rotate(45deg);
      -webkit-transform:rotate(45deg);
      -o-transform:rotate(45deg);
      `
    );
    // 挂载dom 相关位置信息
    const contSize = contDom.getBoundingClientRect();
    /**
     * 提示框左偏移量
     */
    let tipLeftOffset = contSize.left + contDom.offsetWidth / 2 - tipDom.offsetWidth / 2;
    if (tipLeftOffset <= 0) {
      // 靠左
      tipLeftOffset = 10;
      indicateDom.style.left = `${contSize.left + contDom.offsetWidth / 2 - 15}px`;
    } else if (tipDom.offsetWidth + contSize.left >= window.innerWidth) {
      // 靠右
      tipLeftOffset = window.innerWidth - tipDom.offsetWidth - 10;
      indicateDom.style.left = `${contSize.left - tipLeftOffset + contDom.offsetWidth / 2 - 5}px`;
    }
    tipDom.style.left = `${tipLeftOffset}px`;
    /**
     * 提示框上偏移量
     */
    let tipTopOffset = contSize.top - 44;
    if (contSize.top <= 44) {
      // 靠上
      tipTopOffset = contSize.top - contDom.offsetHeight + 48;
      indicateDom.style.top = `-5px`;
    }
    tipDom.style.top = `${tipTopOffset}px`;
  }
}
function outDom() {
  if (tipDom && document.body.contains(tipDom)) {
    document.body.removeChild(tipDom);
  }
}

const customDirective = [
  {
    name: 'hide',
    dir: {
      mounted(el: HTMLElement): void {
        el.setAttribute('style', `overflow: hidden;white-space: nowrap;text-overflow: ellipsis;`);
        el.addEventListener('mouseenter', inDom);
        el.addEventListener('mouseleave', outDom);
      },
      beforeUnmount(el: HTMLElement): void {
        el.removeEventListener('mouseenter', inDom);
        el.removeEventListener('mouseleave', outDom);
      }
    }
  }
];
export { customDirective };
