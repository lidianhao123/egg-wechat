'use strict';

const path = require('path');

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
    secret: '',
  };

  config.wechatApi = {
    appId: '',
    appSecret: '',
  };

  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: 'null',
      db: 0,
    },
  };

  // view ejs engine config
  config.view = {
    mapping: {
      '.ejs': 'ejs',
    },
  };

  config.ejs = {
    root: path.join(appInfo.baseDir, 'app/view'),
    cache: true,
    debug: false,
    compileDebug: true,
    delimiter: null,
    strict: false,
  };

  return config;
};
