export const $tool = {
  /**
   * @description 判断指定值是否为数组
   * @param { * } value 待判断值
   * @returns 真假
   */
  isArray: (value: unknown): boolean => {
    return Array.isArray(value);
  },
  /**
   * @description 将指定值转换成 css 可用值
   * @param { Number | String } value 任意指定数值
   * @returns css 可用值
   */
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
   * @description 返回指定日期、时间
   * @param { Boolean } type 是否返回时间，默认不返回
   * @param { Date } date 指定日期，默认当前日期
   * @param { String | null } mark  日期连接符，默认‘-’；null：纯数字
   * @returns 日期时间
   */
  initDate: (type?: boolean, date?: Date, mark?: string | null) => {
    const useDate = date ? date : new Date();
    const year = useDate.getFullYear();
    const month = `${useDate.getMonth() + 1 > 9 ? useDate.getMonth() + 1 : '0' + (useDate.getMonth() + 1)}`;
    const day = `${useDate.getDate() > 9 ? useDate.getDate() : '0' + useDate.getDate()}`;
    if (type) {
      const time = useDate.toLocaleTimeString();
      if (mark === null) {
        return `${year}${month}${day}${time.replaceAll(':', '')}`;
      } else {
        return `${year}${mark ? mark : '-'}${month}${mark ? mark : '-'}${day} ${time}`;
      }
    } else {
      if (mark === null) {
        return `${year}${month}${day}`;
      } else {
        return `${year}${mark ? mark : '-'}${month}${mark ? mark : '-'}${day}`;
      }
    }
  },
  /**
   * @description 获取指定日期前/后 n 天的日期
   * @param { Number } n  多少天
   * @param { Boolean } type  真：前；假：后(默认)
   * @param { String | Date } day  指定的日，默认为当前日期，非必须
   * @param { String } mark  连接符
   * @return 结果日期
   */
  getDate(n: number, type?: boolean, day?: string | Date, mark?: string) {
    // 指定的某个日期
    let markDate = null;
    if (typeof day === 'string') {
      markDate = new Date(day);
    } else if (day instanceof Date) {
      markDate = day;
    } else {
      markDate = new Date();
    }
    // 计算前后 n 天的日期
    let resdate = new Date(markDate.getTime() + n * 24 * 60 * 60 * 1000);
    if (type) {
      resdate = new Date(markDate.getTime() - n * 24 * 60 * 60 * 1000);
    }
    return this.initDate(false, resdate, mark);
  },
  /**
   * @description 下载 blob
   * @param { Blob } res blob 字符流
   * @param { String } name 下载文件名
   */
  dowmLoadBlob(res: Blob, name: string) {
    if (res instanceof Blob) {
      const blobRes = res;
      const aLink = document.createElement('a');
      document.body.appendChild(aLink);
      aLink.style.display = 'none';
      const blobUrl = window.URL.createObjectURL(blobRes);
      aLink.download = name;
      aLink.href = blobUrl;
      aLink.click();
      document.body.removeChild(aLink);
    } else {
      console.error('请确认下载类型');
    }
  },
  /**
   * @description 获取指定数组的一个随机子数组
   * @param { Array} arr 数组
   * @param { Number } size 子集长度
   * @returns 随机子数组
   */
  getRandomSubarray(arr: Array<any>, size: number) {
    const copyArr = arr.slice(0); // 深度复制数组，避免影响原数组
    let i: number = arr.length;
    let temp: Array<any>;
    let index = 0;
    while (i--) {
      index = Math.floor((i + 1) * Math.random());
      temp = copyArr[index];
      copyArr[index] = copyArr[i];
      copyArr[i] = temp;
    }
    return copyArr.slice(0, size);
  },
  /**
   * @description 获取指定范围的随机数
   * @param { Number } min 最小值
   * @param { Number } max 最大值
   * @param { Number } fixed 保留小数位，默认：0
   * @returns 包含指定范围的随机数
   */
  getRandom(min: number, max: number, fixed?: number) {
    const useFixed = fixed || 0;
    let num: string;
    if (max < min) {
      console.warn('根据获得的参数，最大值 < 最小值，已为您自动翻转');
      num = (Math.random() * (min - max + 1) + max).toFixed(useFixed);
    } else if (min == max) {
      num = min.toFixed(useFixed);
    } else {
      num = (Math.random() * (max - min + 1) + min).toFixed(useFixed);
    }
    return +num;
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
