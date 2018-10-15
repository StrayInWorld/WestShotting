/**
 * 子弹所挂在组件
 * @class Bullet
 * @constructor
 */

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
    start() { },
    init(poolManager) {
        if (this.poolManager === null) {
            this.poolManager = poolManager;
        }
    },
    onBeginContact: function (contact, selfCollider, otherCollider) {
        this.colliderNum -= 1;
        cc.log(this.colliderNum);
        if (this.colliderNum <= 0) {
            this.recoverItemToPool();
            return;
        }
    },
    onEndContact: function (contact, selfCollider, otherCollider) {

    },
    reuse(poolManager) {
        this.node.rotation = 0;
        this.colliderNum = 5;
        this.poolManager = poolManager;
    },
    recoverItemToPool() {
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

