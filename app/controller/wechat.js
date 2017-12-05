'use strict';

const wechat = require('co-wechat');
const Controller = require('egg').Controller;
let wechatHandle = null;

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

class WechatController extends Controller {
  /**
   * 1. 服务器接口配置时响应微信发送的验证
   * 2. 公众号消息处理
   */
  async index() {
    const { ctx, app, logger } = this;

    if (!wechatHandle) {
      app.logger.info('wechatHandle is null new it');
      wechatHandle = wechat(app.config.wechat).middleware(async (message, ctx) => {
        // TODO
        /**
         * { ToUserName: 'gh_51e0484d7622',
         * FromUserName: 'o1R3q08yIS10rgWKYxYsMac6Mx8o',  // OpenID
         * CreateTime: '1512121750',
         * MsgType: 'text',
         * Content: '6',
         * MsgId: '6494513464291382253' }
         */
        logger.info('message = %o', message);
        /**
         * 相应请求并且不回复内容场景下进行如下二选一回复即可
         * 1、直接回复success（推荐方式）
         * 2、直接回复空串（指字节长度为0的空字符串，而不是XML结构体中content字段的内容为空）
         * 参考：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140543
         */
        return 'success';
      });
    }
    logger.info('after new instance');
    await wechatHandle(ctx);
  }

  async authorizeURL() {
    const { ctx, app } = this;
    const {
      redirect,
      state,
      scope, // 'snsapi_base' or 'snsapi_userinfo'
    } = ctx.query;
    const url = app.OAuth.getAuthorizeURL(redirect, state || '', scope || 'snsapi_base');
    ctx.body = {
      code: 200,
      data: url,
      msg: 'success',
    };
  }

  async jssdk() {
    const { ctx, app, logger } = this;
    const { query } = ctx;
    if (!query.url) {
      ctx.body = {
        code: 400,
        msg: 'please query url value',
      };
      return;
    }
    const param = Object.assign({}, defaultParam, {
      url: query.url || '',
      debug: query.debug || false,
    });
    let result;
    try {
      result = await app.wechatApi.getJsConfig(param);
    } catch (err) {
      logger.error(err);
      return;
    }
    if (query.callback) {
      ctx.body = query.callback + '(' + JSON.stringify(result) + ')';
    } else {
      ctx.body = {
        code: 200,
        data: result,
        msg: 'success',
      };
    }
  }
}

module.exports = WechatController;
