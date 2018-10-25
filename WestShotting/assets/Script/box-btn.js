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
        this.box = this.node.getChildByName("box");
        this.box.runAction(cc.repeatForever(cc.sequence(
            cc.rotateBy(0.5, 8),
            cc.rotateBy(0.5, -16),
            cc.rotateBy(0.5, 8)).easing(cc.easeBackIn(0.5)))

        );

        this.light = this.node.getChildByName("light");
        this.light.runAction(cc.repeatForever(cc.rotateBy(0.3, 30)));

        this.boxLabel = cc.find("click_label_bg/click_label", this.node).getComponent(cc.Label);
        //根据倒计时，设置内容

    },

    start() {

    },
    openBoxCB() {
        this.light.stopAllActions();
        this.light.active = false;
        this.box.stopAllActions();
        this.box.getComponent(cc.Button).interactable = false;

        //开始倒计时
        this.boxLabel.string = "05:00:00";

        //显示获奖界面
        let getAwardView = cc.find("Canvas/get_award_node");
        getAwardView.active = true;
    }

    // update (dt) {},
});
