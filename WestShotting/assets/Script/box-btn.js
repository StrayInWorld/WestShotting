/**
大厅盒子按钮回调
@class box-btn 
@constructor
*/

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.runAction(cc.repeatForever(cc.sequence(
            cc.rotateBy(0.5, 10),
            cc.rotateBy(1, -20),
            cc.rotateBy(1, 10)).easing(cc.easeBackIn(0.5)))

        );
    },

    start() {

    },

    // update (dt) {},
});
