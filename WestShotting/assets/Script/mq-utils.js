module.exports = {
    utLog: function (str) {
        if (CC_WECHATGAME) {
            console.log(str);
        }
        else {
            cc.log(str);
        }
    }
}