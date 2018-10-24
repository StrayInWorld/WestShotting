/**
 * 游戏主逻辑
 * @ class game
 * @constructor
 */

cc.Class({
    extends: cc.Component,

    properties: {
        doubleChain: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
    },

    start() {

    },
    backBtnCB() {
        cc.director.loadScene("hall");
    }

    // update (dt) {},
});
