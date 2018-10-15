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
        this.mulVelocityValue = 100;
        this.onBeginVelocity = cc.v2(0, 0);
        this.onEndVelocity = cc.v2(0, 0);
    },
    start() { },
    init(poolManager) {
        if (this.poolManager === null) {
            this.poolManager = poolManager;
        }
    },
    onBeginContact: function (contact, selfCollider, otherCollider) {
        this.colliderNum -= 1;
        if (this.colliderNum <= 0) {
            this.recoverItemToPool();
            return;
        }

        let velocity = this.rigidBody.linearVelocity;
        let normalizeVelocity = velocity.normalize().mulSelf(BulletConfig.MulVelocityVal);
        this.onBeginVelocity = normalizeVelocity;
        // cc.log("this.onBeginVelocity:", this.onBeginVelocity);

        if (otherCollider.node.group === BulletConfig.ColliderNum.Wall) {         //与墙碰撞

        }
        else if (otherCollider.node.group === BulletConfig.ColliderNum.Square) {  //方块

        }
        else if (otherCollider.node.group === BulletConfig.ColliderNum.TriSquare) {//三角形

        }
        else if (otherCollider.node.group === BulletConfig.ColliderNum.OtherObj) { //其他物体

        }

    },
    onEndContact: function (contact, selfCollider, otherCollider) {
        let Velocity = this.rigidBody.linearVelocity;
        let normalizeVelocity = Velocity.normalize().mulSelf(BulletConfig.MulVelocityVal);
        this.onEndVelocity = normalizeVelocity;

        let radius = this.onBeginVelocity.signAngle(this.onEndVelocity);
        let rotation = radius * 180 / Math.PI;

        // cc.log("this.onBeginVelocity", this.onBeginVelocity);
        // cc.log("this.onEndVelocity", this.onEndVelocity);
        // cc.log("radius:", radius);
        // cc.log("rotation:", rotation);
        if (selfCollider.node.getNumberOfRunningActions() === 0) {
            let action = cc.rotateBy(0.001, -rotation);
            selfCollider.node.runAction(action);
        }

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



