/**
 * 按钮组件
 * @class msuci-node
 * @constructor
 */

cc.Class({
    extends: cc.Component,

    properties: {
        audioSource: {
            type: cc.AudioSource,
            default: null
        },
        musicOffSprite: cc.SpriteFrame,
        musicOnSprite: cc.SpriteFrame
    },
    onLoad() {
        this.nodeSprite = this.node.getComponent(cc.Sprite);
    },
    musicBtnCB() {
        if (this.audioSource.isPlaying) {
            this.pause();
        }
        else {
            this.play();
        }
    },
    play: function () {
        this.nodeSprite.spriteFrame = this.musicOnSprite;
        this.audioSource.play();
    },
    pause: function () {
        this.nodeSprite.spriteFrame = this.musicOffSprite;
        this.audioSource.pause();
    },

});
