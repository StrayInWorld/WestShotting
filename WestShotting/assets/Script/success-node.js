cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        if (CC_WECHATGAME) {
            // 发消息给子域  
            wx.postMessage({
                messageType: 4,
                keyValue: "score"
            });
        } else {
            cc.log("please run in wechat: 获取横向好友排行");
        }
    },

    start() {

    },

    // update (dt) {},
});
