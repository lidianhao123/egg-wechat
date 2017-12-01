'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1512091179584_6027';

  // add your config here
  config.middleware = [];

  config.security = {
    csrf: {
      ignore: '/wechat', // 忽略微信推送 POST 消息的 csrf 验证
    },
  };

  // 请在 config.prod.js 中配置实际的值
  config.wechat = {
    token: '',
    appid: '',
    encodingAESKey: '',
  };

  return config;
};
