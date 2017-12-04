'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.all('/wechat', controller.wechat.index);
  router.get('/authorizeURL', controller.wechat.authorizeURL);
  router.get('/jssdk', controller.wechat.jssdk);
  router.get('/test', controller.home.test);
  router.get('/test2', controller.home.test2);
};
