'use strict';

const OAuth = require('co-wechat-oauth');

module.exports = app => {
  try {
    app.OAuth = new OAuth(app.config.wechat.appid, app.config.wechat.secret);
  } catch (e) {
    app.logger.error('new OAuth error ', e);
  }
};
