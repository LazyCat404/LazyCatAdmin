/**
 * axios封装
 */
import axios from 'axios';
import QS from 'qs';

// 线上环境基础地址
if (import.meta.env.MODE === 'production') {
  axios.defaults.baseURL = <string>import.meta.env.VITE_BSAE_URL;
}

/**
 * http request 请求拦截
 */
axios.interceptors.request.use(
  config => {
    // 线上环境接口处理
    if (import.meta.env.MODE === 'production' && config.url) {
      const interfaceUrl = <string>config.url;
      if (interfaceUrl.startsWith('/api')) {
        config.url = interfaceUrl.replace(/^\/api/, '');
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

/**
 * http response 响应拦截
 */
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          console.log('请求网络请求不存在');
          break;
        case 401:
          console.log('401');
          break;
        default:
          console.log('通用错误');
      }
      return Promise.reject(error.response);
    }
  }
);

/**
 * 基础地址 + 接口地址（通常用于获取静态资源）
 * @param {String} par [接口地址]
 * @param {String} fileUrl [文件地址]
 */
export function baseURL(par: string, fileUrl?: string): string {
  if (fileUrl) {
    return `${process.env.VUE_APP_URL + par + fileUrl}`;
  } else {
    return `${process.env.VUE_APP_URL + par}`;
  }
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url: string, params?: any): Promise<res> {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: params })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {String} type [参数类型，默认Query数据，可能为json或表单]
 */
export function post(url: string, params?: any, type?: string): Promise<res> {
  if (type) {
    let headers = { 'Content-Type': 'application/json;' };
    if (type == 'DATA' || type == 'data') {
      headers = { 'Content-Type': 'multipart/form-data;' };
    }
    return new Promise((resolve, reject) => {
      axios({
        headers,
        method: 'POST',
        url,
        data: params
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  } else {
    return new Promise((resolve, reject) => {
      axios
        .post(url, QS.stringify(params))
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data);
        });
    });
  }
}

/**
 * del方法，对应delete请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数，默认Query数据]
 * @param {String} type [参数类型，默认Query数据，可能为json或表单]
 */
export function del(url: string, params?: any, type?: string): Promise<res> {
  let par: any;
  if (type == 'JSON' || type == 'json') {
    par = { data: params };
  } else {
    par = { params };
  }
  return new Promise((resolve, reject) => {
    axios
      .delete(url, par)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}
