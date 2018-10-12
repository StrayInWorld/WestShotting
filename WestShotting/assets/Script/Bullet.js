let BulletConfig = require("BulletConfig");

cc.Class({
    extends: cc.Component,

    properties: {
        poolManager: null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.colliderNum = 5;
        this.rigidBody = this.node.getComponent(cc.RigidBody);
    },

    start() {
        // this.poolManager = null;
    },
    onBeginContact: function (contact, selfCollider, otherCollider) {
        // let newLinearVelocity = this.rigidBody.linearVelocity;
        // this.rigidBody.linearVelocity = cc.v2(-newLinearVelocity.x,-newLinearVelocity.y);
        // cc.log(this.rigidBody.linearVelocity);

        this.colliderNum -= 1;
        // cc.log(this.colliderNum);
        if (this.colliderNum < 0) {
            return;
        }
        if (this.colliderNum === 0) {
            this.recoverItemToPool();
        }


    },

    onEndContact: function (contact, selfCollider, otherCollider) {

    },
    reuse(poolManager) {
        this.node.rotation = 0;
        this.poolManager = poolManager;
    },
    recoverItemToPool(){
        if (this.poolManager) {
            this.poolManager.put(this.node);
        }
    },
    unuse() {
    },


    update(dt) {

    },
});

        // if(otherCollider.group === BulletConfig.ColliderNum.Wall){

        // }
        // else if(otherCollider.group === BulletConfig.ColliderNum.Square){

        // }
        // else if(otherCollider.group === BulletConfig.ColliderNum.TriSquare){

        // }
        // else if(otherCollider.group === BulletConfig.ColliderNum.OtherObj){

        // }

