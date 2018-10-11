let BulletConfig = require("BulletConfig");

cc.Class({
    extends: cc.Component,

    properties: {
        poolManager: null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.colliderNum = 5;
    },

    start() {
        // this.poolManager = null;
    },
    onBeginContact: function (contact, selfCollider, otherCollider) {
        this.colliderNum -= 1;
        if (this.colliderNum < 0) {
            return;
        }
        if (this.colliderNum === 0) {
            this.recoverItemToPool();
        }
        // if(otherCollider.group === BulletConfig.ColliderNum.Wall){

        // }
        // else if(otherCollider.group === BulletConfig.ColliderNum.Square){

        // }
        // else if(otherCollider.group === BulletConfig.ColliderNum.TriSquare){

        // }
        // else if(otherCollider.group === BulletConfig.ColliderNum.OtherObj){

        // }

    },

    onEndContact: function (contact, selfCollider, otherCollider) {

    },
    reuse(poolManager) {
        this.poolManager = poolManager;
        cc.log("reuse", this.poolManager);
    },
    recoverItemToPool(){
        cc.log("unuse:", this.poolManager.size());
        if (this.poolManager) {
            this.poolManager.put(this.node);
            cc.log("unuse:", this.poolManager.size());
        }
    },
    unuse() {
        cc.log("unuse");
    },


    update(dt) {

    },
});
