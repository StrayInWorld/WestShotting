cc.Class({
    extends: cc.Component,

    properties: {
        audioSource: {
            type: cc.AudioSource,
            default: null
        },
    },
    musicBtnCB(){
        if(this.audioSource.isPlaying){
            this.pause();
        }
        else{
            this.play();
        }
    },
    play: function () {
        this.audioSource.play();
    },
    pause: function () {
        this.audioSource.pause();
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log(this.audioSource);
    },

    start () {

    },

    // update (dt) {},
});
