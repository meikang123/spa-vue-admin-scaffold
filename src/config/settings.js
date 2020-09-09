/**
 * @description 基础配置
 */
export default {

  title: '后台管理框架',
  /**
   * @description 开发联调环境
   *
   */

  loginUrl: '/login',

  defaultUrl: '/',

  development: {
    requestUrl: 'http://192.168.97.224:8687'
    // requestUrl: 'http://10.254.64.39:8686'
  },

  /**
   * @description 测试环境/内网环境
   *
   */
  st: {
    requestUrl: '//192.168.97.224:8777'
  },

  /**
   * @description 服务器人员本地测试
   *
   */
  local: {
    requestUrl: `http://${window.location.hostname}:8687`
  },

  /**
   * @description 生产环境
   *
   */
  production: {
    requestUrl: 'http://op.heyheytalk.com:9877'
  },

  /**
   * @description 辅助配置
   * */
  assistConfig: { }

};

export const abc = {};
