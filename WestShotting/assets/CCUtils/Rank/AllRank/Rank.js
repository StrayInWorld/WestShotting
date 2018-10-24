
cc.Class({
    extends: cc.Component,

    properties: {
        display: cc.Node,
        userName: cc.Label,
        userIcon: cc.Sprite
    },

    start() {
        this.node.zIndex = 20;
    },
    closeRankView() {
        this.node.active = !this.node.active;
    },
    onRank() {
        this.closeRankView();
        if (CC_WECHATGAME) {
            // 发消息给子域
            wx.postMessage({
                messageType: 1,
                keyValue: "score"
            });
        } else {
            cc.log("please run in wechat: 获取好友排行");
        }
    },
    onRankGroup() {
        this.node.active = true;
        if (CC_WECHATGAME) {
            发消息给子域
            wx.postMessage({
                messageType: 3,
                keyValue: "score"
            });
        } else {
            cc.log("please run in group: 获取群排行榜数据。");
        }
    },

    shareGame() {
        //获取不到，使用默认值
        let shareConfig = {};
        let defaultShareTitle = "疯狂打鱼";
        let defaultShartImg = canvas.toTempFilePathSync({
            destWidth: 500,
            destHeight: 400
        });
        shareConfig.title = defaultShareTitle;
        shareConfig.image = defaultShartImg;

        wx.shareAppMessage({
            title: shareConfig.title,
            imageUrl: shareConfig.image,
            success: (res) => {
                console.log("share message success");
                if (res.shareTickets != undefined && res.shareTickets.length > 0) {
                    window.wx.postMessage({
                        messageType: 3,
                        keyValue: "score",
                        shareTicket: res.shareTickets[0]
                    });
                }
            },
            fail: function () {
                console.log("share message fail");
            }
        });
    },
    testPostMessage() {
        if (CC_WECHATGAME) {
            // 发消息给子域
            wx.postMessage({
                messageType: 1,
                keyValue: "score"
            });
        } else {
            cc.log("获取好友排行榜数据。x1");
        }
    },
    testPostMessageTow() {
        if (CC_WECHATGAME) {
            // 发消息给子域
            wx.postMessage({
                messageType: 2,
                keyValue: "score",
                score: 123123
            });
        } else {
            cc.log("提交数据");
        }
    },
    testCommitData(keyValue, scoreValue) {
        if (CC_WECHATGAME) {
            wx.setUserCloudStorage({
                KVDataList: [{ key: keyValue, value: "" + scoreValue }],
                success: function (res) {
                    console.log('setUserCloudStorage', 'success', res)
                },
                fail: function (res) {
                    console.log('setUserCloudStorage', 'fail')
                },
                complete: function (res) {
                    console.log('setUserCloudStorage', 'ok')
                }
            });
        }
        else {
            cc.log("请在微信运行");
        }
    }
});
