cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },
    noPlayAnima() {
        let animation = this.node.getComponent(cc.Animation);
        let animationState = animation.getAnimationState('BombEffectClip');
        if (!animationState.isPlaying) {
            this.node.parent.active = false;
        }
    }

    // update (dt) {},
});
