const tool = {
  // 判断：是否为数组
  isArray: (value: any): boolean => {
    return Object.prototype.toString.call(value) === '[object Array]';
  }
};

export default tool;
