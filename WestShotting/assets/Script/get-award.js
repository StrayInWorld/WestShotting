
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        let light = cc.find("big_light", this.node);
        light.runAction(cc.repeatForever(cc.rotateBy(0.3, 30)));

        let bigCircle = cc.find("big_circle", this.node);
        let smallCircle = cc.find("small_circle", this.node);
        bigCircle.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(1, 0.8), cc.callFunc(function () { bigCircle.scale = 0 }, this))));
        smallCircle.runAction(cc.repeatForever(cc.sequence(cc.delayTime(0.5), cc.scaleTo(1, 0.8), cc.callFunc(function () { smallCircle.scale = 0 }, this))));
    },

    start() {

    },

    // update (dt) {},
});
