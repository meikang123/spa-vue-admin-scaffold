import axios from 'axios';
import store from '@/store/index';
import { Message } from 'element-ui';
import { Settings } from '@/config';


const BASE_URL = Settings[APP_ENV].requestUrl;
const service = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Cache-Control': 'no-cache'
  },
  timeout: 10000
});

/*
 * 请求拦截
 * */
service.interceptors.request.use(config => config, error => {
  console.log(error);
  return Promise.reject(error);
});

/*
 * 返回拦截
 * */
service.interceptors.response.use(response => {
  const res = response.data;

  if (res.code !== 0) {
    Message({
      showClose: true,
      message: res.msg || 'Error',
      type: 'error',
      duration: 5 * 1000
    });

    if (res.code === 5000000) {
      // ...需要重新登陆--成功location.reload()
    }

    return Promise.reject(new Error(res.msg || 'Error'));
  }
  return res;
}, error => {
  const { status, statusText } = error.response || {};
  if (status === 404 && process.env.NODE_ENV === 'development') {
    const { method, url } = error.response.config;
    if (!url.startsWith('/mock')) {
      const mockServer = axios.create({ baseURL: '/', timeout: 10000 });
      return mockServer[method](`mock${url}`).then(res => res.data);
    }
  }

  if (status === 401 && statusText === 'Unauthorized') {
    store.dispatch('user/resetToken').then(() => {
      window.location.reload();
    });
  }
  Message({
    showClose: true,
    message: '服务器异常',
    type: 'error',
    duration: 5 * 1000
  });
  return Promise.reject(error);
});

export default service;
