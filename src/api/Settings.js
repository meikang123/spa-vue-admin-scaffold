import request from '@/utils/request';

export default {
  
  /**
   * @description 获取配置
   * @param {*} data
   */
  detail(data) {
    return request.get('/common/settings', data);
  }
};
