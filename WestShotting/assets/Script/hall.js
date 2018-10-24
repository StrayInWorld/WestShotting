/**
 * 大厅主逻辑
 * @class hall
 * @constructor
 */

cc.Class({
    extends: cc.Component,

    properties: {
        sign_node: cc.Node,
        choose_level_node: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
    },
    start() {

    },
    startBtnCB() {
        cc.director.loadScene("game");
    },
    signBtnCB() {
        this.sign_node.active = true;
    },
    chooseLevelBtnCB() {
        this.choose_level_node = true;
    }

    // update (dt) {},
});
