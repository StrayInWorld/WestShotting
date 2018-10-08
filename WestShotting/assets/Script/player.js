cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let leftPos = -this.node.parent.width/2;
        this.node.runAction(cc.moveTo(2,cc.v2(leftPos,this.node.y)));

        //入场抖动枪
        let arms = cc.find("arms",this.node);
        arms.runAction(cc.repeat(cc.sequence(cc.rotateBy(0.5,2),cc.rotateBy(0.5,-4),cc.rotateBy(0.5,2)),2));

    },

    start () {

    },

    // update (dt) {},
});
