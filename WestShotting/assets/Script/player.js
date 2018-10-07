cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let leftPos = -this.node.parent.width/2;
        this.node.runAction(cc.moveTo(2,cc.v2(leftPos,this.node.y)));
    },

    start () {

    },

    // update (dt) {},
});
