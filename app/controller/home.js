'use strict';

const Controller = require('egg').Controller;

const defaultParam = {
  debug: false,
  jsApiList: [
    'checkJsApi',
    'onMenuShareTimeline',
    'onMenuShareAppMessage',
    'onMenuShareQQ',
    'onMenuShareWeibo',
    'onMenuShareQZone',
    'hideMenuItems',
    'showMenuItems',
    'hideAllNonBaseMenuItem',
    'showAllNonBaseMenuItem',
    'translateVoice',
    'startRecord',
    'stopRecord',
    'onVoiceRecordEnd',
    'playVoice',
    'onVoicePlayEnd',
    'pauseVoice',
    'stopVoice',
    'uploadVoice',
    'downloadVoice',
    'chooseImage',
    'previewImage',
    'uploadImage',
    'downloadImage',
    'getNetworkType',
    'openLocation',
    'getLocation',
    'hideOptionMenu',
    'showOptionMenu',
    'closeWindow',
    'scanQRCode',
    'chooseWXPay',
    'openProductSpecificView',
    'addCard',
    'chooseCard',
    'openCard',
  ],
  url: '', // 'http://public.dainli.com/nhj/index.html'
};

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }
  async test() {
    const { ctx } = this;
    const { app } = ctx;
    ctx.app.logger.info('code = %s', ctx.query.code);
    let user;
    if (ctx.session.user) {
      ctx.app.logger.info('session.user.openid = %s', ctx.session.user.openid);
      user = ctx.session.user;
    } else {
      user = await ctx.app.OAuth.getUserByCode(ctx.query.code);
      ctx.session.user = user;
    }
    app.logger.info('test ctx.href = %s', ctx.href);
    const param = Object.assign({}, defaultParam, {
      url: ctx.href, // 参考 http://blog.csdn.net/zhanjianshinian/article/details/43954783
    });
    const config = JSON.stringify(await app.wechatApi.getJsConfig(param));
    app.logger.info('before render');
    await ctx.render('test.ejs', { config, user });
  }
  async test2() {
    this.ctx.app.logger.info('test2 href= ', this.ctx.href);
    this.ctx.app.logger.info('test2 origin= ', this.ctx.origin);
    await this.ctx.render('test2.ejs');
  }
}

module.exports = HomeController;
