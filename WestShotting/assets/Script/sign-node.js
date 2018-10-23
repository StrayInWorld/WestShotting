cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.log("sign node");
    },

    start() {
        cc.log("sign node  1231");

    },
    homeBtnCB() {
        this.node.active = false;
    },
    getAwardBtnCB() {
        cc.log("get award CB");
    },

    // update (dt) {},
});
