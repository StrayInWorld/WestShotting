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
    },
    onMusicButtonClick() {
        this.isMusic = !this.isMusic;
        if (this.isMusic) {
            this.sprite.spriteFrame = this.sprites[0];
            cc.audioEngine.resumeAll();
        } else {
            this.sprite.spriteFrame = this.sprites[1];
            cc.audioEngine.pauseAll();
        }
    },
    signBtnCB() {
        console.log("signBtnCB");
    },
    rankBtnCB() {
        console.log("rankBtnCB");
    },
    chooseLevelBtnCB() {
        console.log("chooseLevelBtnCB");
    }

    // update (dt) {},
});
