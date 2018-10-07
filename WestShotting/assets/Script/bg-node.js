cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //翻转第二张背景的图
        let secondBgGround2 = cc.find("groundNode1/backGround",this.node);
        secondBgGround2.runAction(cc.flipX(true));
    },

    start () {

    },

    // update (dt) {},
});
