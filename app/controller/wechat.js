'use strict';

const wechat = require('co-wechat');
const Controller = require('egg').Controller;
let wechatInstance = null;

class WechatController extends Controller {
  async index() {
    const {
      ctx,
    } = this;
    if (!wechatInstance) {
      ctx.app.logger.info('wechatInstance is null new it');
      wechatInstance = wechat(ctx.app.config.wechat).middleware(async (message, ctx) => {
        // TODO
        /**
         * { ToUserName: 'gh_51e0484d7622',
         * FromUserName: 'o1R3q08yIS10rgWKYxYsMac6Mx8o',  // OpenID
         * CreateTime: '1512121750',
         * MsgType: 'text',
         * Content: '6',
         * MsgId: '6494513464291382253' }
         */
        ctx.app.logger.info('message = %o', message);
        /**
         * 相应请求并且不回复内容场景下进行如下二选一回复即可
         * 1、直接回复success（推荐方式）
         * 2、直接回复空串（指字节长度为0的空字符串，而不是XML结构体中content字段的内容为空）
         * 参考：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140543
         */
        return 'success';
      });
    }
    ctx.app.logger.info('after new instance');
    await wechatInstance(ctx);
  }
}

module.exports = WechatController;
