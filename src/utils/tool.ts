import { myObject } from '@types';

const tool = {
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
  },
  /**
   * 接收blob字符流，并下载文件
   * @param {String} url 请求地址
   * @param {Object} parameter 请求参数json
   * @param {String} fileName  文件名.扩展名
   * @param {String} method    请求类型：post（默认）/get
   * @param {unknown} type      参数类型，默认（空值）json，有值时传表单，get 请求时无意义
   */
  blobDownload(url: string, parameter: myObject, fileName: string, method?: string, type?: unknown): void {
    const xhr = new XMLHttpRequest();
    let baseURL = <string>import.meta.env.VITE_BSAE_URL;
    if (process.env.NODE_ENV === 'production') {
      //   线上环境
      baseURL = <string>import.meta.env.VITE_BSAE_URL;
    }
    //   get 请求 参数拼接
    if (method == 'get' || method == 'GET') {
      let i = 0;
      for (const item in parameter) {
        if (i == 0) {
          url = `${url}?${item}=${parameter[item]}`;
        } else {
          url = `${url}&${item}=${parameter[item]}`;
        }
        i++;
      }
    }
    url = baseURL + url;
    xhr.open(method ? method : 'post', url, true);
    if (!type && (!method || method == 'post' || method == 'POST')) {
      // POST请求，如果type 无值，就传json
      xhr.setRequestHeader('Content-Type', 'application/json;'); // 参数格式json
    }
    // token
    xhr.setRequestHeader('Authorization', JSON.parse(sessionStorage.vuex).token);
    xhr.responseType = 'blob';
    xhr.onload = function () {
      const data = xhr.response;
      const aLink = document.createElement('a');
      document.body.appendChild(aLink);
      aLink.style.display = 'none';
      const blob = new Blob([data]);
      const blobUrl = window.URL.createObjectURL(blob);
      aLink.download = fileName;
      aLink.href = blobUrl;
      aLink.click();
      document.body.removeChild(aLink);
    };
    if (type) {
      // type 有值，传表单
      const formData = new FormData();
      for (const key in parameter) {
        formData.append(key, parameter[key]);
      }
      xhr.send(formData);
    } else {
      xhr.send(JSON.stringify(parameter));
    }
  }
};

export default tool;
