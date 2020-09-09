import Mock from 'mockjs';

Mock.XHR.prototype.withCredentials = true; // 设置MOCK拦截cookie

const contextFiles = require.context('.', false, /\.js$/);

contextFiles.keys().forEach(key => {
  if (key === './index.js') {
    return;
  }
  const apiData = contextFiles(key).default;
  Object.keys(apiData).forEach(item => {
    const [methods, url] = item.split(' ');
    Mock.mock(new RegExp(`/mock${url}`), methods.toLocaleLowerCase(), () => {
      const data = typeof apiData[item] === 'function' ? apiData[item]() : apiData[item];
      return { code: 0, data, msg: 'suc' };
    });
  });
});
