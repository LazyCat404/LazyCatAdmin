export const $tool = {
  // 判断：是否为数组
  isArray: (value: any): boolean => {
    return Object.prototype.toString.call(value) === '[object Array]';
  },
  // 转换：将输入的值转换成 css 可用值
  targetCss: (value: number | string): string => {
    const resValue = value.toString();
    const isCalc = resValue.search('calc');
    if (isCalc === -1) {
      const isUtil = /px|vh|vw|pt|pc|ex|em|%/;
      if (isUtil.test(resValue)) {
        return resValue;
      } else {
        return resValue + 'px';
      }
    } else {
      return resValue;
    }
  }
};

// 用于全局挂载
export const tool = {
  install(app: any) {
    app.config.globalProperties.$tool = $tool;
  }
};

// 解决ts检查
export default $tool;
