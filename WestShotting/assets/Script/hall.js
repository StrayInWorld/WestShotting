/**
 * 大厅主逻辑
 * @class hall
 * @constructor
 */

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
    },

    start() {

    },
    startBtnCB() {
        cc.director.loadScene("game");
    }


    // update (dt) {},
});
