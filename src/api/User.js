import request from '@/utils/request';

export default {
  /*
   * 用户登录
   * */
  doLogin: data => request.post('/user/login', data),

  /*
   * 用户退出
   * */
  goLogout: () => request.post('/user/logout')
};
