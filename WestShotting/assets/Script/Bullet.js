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
        this.colliderNum = BulletConfig.ColliderNum.Bullet;
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
        let velocity = this.rigidBody.linearVelocity;
        let normalizeVelocity = velocity.normalize().mulSelf(BulletConfig.MulVelocityVal);
        this.onBeginVelocity = normalizeVelocity;

        if (otherCollider.node.group === "wall") {            //与墙碰撞

        }
        else if (otherCollider.node.group === "square") {     //方块

        }
        else if (otherCollider.node.group === "trisquare") {  //三角形

        }
        else if (otherCollider.node.group === "enemy") {      //敌人
            let enemyBody = null;
            let headNode = null;
            if (otherCollider.node.name === "headNode") {
                enemyBody = otherCollider.node.parent;
                headNode = otherCollider.node;
            }
            else if (otherCollider.node.parent.parent.name === "EnemyBody") {
                enemyBody = otherCollider.node.parent.parent;
                headNode = enemyBody.getChildByName("headNode");
            }
            //修改headNode刚体上的重力
            let headNodeRigid = otherCollider.getComponent(cc.RigidBody);
            headNodeRigid.gravityScale = 3;

            let head = headNode.getChildByName("head");
            if (head.active) {
                //变换脸部状态
                head.active = false;

                //修改其他节点本身的重力
                for (let i = 0; i < enemyBody.children.length; i++) {
                    let item = enemyBody.children[i];
                    if (item.name !== "headNode") {
                        for (let j = 0; j < item.children.length; j++) {
                            let itemChild = item.children[j];
                            let rigidBody = itemChild.getComponent(cc.RigidBody);
                            if (rigidBody) {
                                rigidBody.gravityScale = 3;
                            }
                        }
                    }
                }
                let colliderRigid = otherCollider.node.getComponent(cc.RigidBody);
                colliderRigid.gravityScale = 1;

                //播放血动画
                let bloodEffect = enemyBody.getChildByName("BloodEffect");
                bloodEffect.active = true;
                let animation = bloodEffect.getComponent(cc.Animation);
                animation.play();
            }
        }
        else if (otherCollider.node.group === "woodSquare") { //木箱

        }
        else if (otherCollider.node.group === "bomb") { //炸弹
            let bombNode = otherCollider.node.parent;
            let bombEffect = bombNode.getChildByName("BombEffect");

            //播放爆炸效果
            bombEffect.active = true;
            let bombAnimation = bombEffect.getComponent(cc.Animation);
            let animateState = bombAnimation.play();
            //隐藏炸弹
            otherCollider.node.active = false;

            //获取爆炸范围内刚体
            let bombEffectSize = bombEffect.getContentSize();
            let bombEffectWorldPos = bombNode.convertToWorldSpaceAR(bombEffect.position);
            cc.log("worldPos:", bombEffectWorldPos);
            let bombRect = cc.rect(bombEffectWorldPos.x, bombEffectWorldPos.y, bombEffectSize.width - 0, bombEffectSize.height - 0);
            cc.log("bombRect:", bombRect);

            let colliderList = cc.director.getPhysicsManager().testAABB(bombRect);
            for (let i = 0; i < colliderList.length; i++) {
                cc.log(colliderList[i].node.name);
                if (colliderList[i].node.name === 'bomb' && colliderList[i].node.active) {
                    cc.log("true:", colliderList[i].node);
                    this.dealWithBombEffect(colliderList[i].node.parent);
                }
            }
        }

        //回收子弹
        this.colliderNum -= 1;
        if (this.colliderNum <= 0) {
            this.recoverItemToPool();
            return;
        }
    },
    //处理爆炸效果
    dealWithBombEffect(bombNode) {
        let bombEffect = bombNode.getChildByName("BombEffect");

        //播放爆炸效果
        bombEffect.active = true;
        let bombAnimation = bombEffect.getComponent(cc.Animation);
        let animateState = bombAnimation.play();
        //隐藏炸弹
        let bomb = bombNode.getChildByName("bomb");
        bomb.active = false;

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
            let action = cc.rotateBy(0.0001, -rotation);
            selfCollider.node.runAction(action);
        }
    },
    reuse(poolManager) {
        this.node.rotation = 0;
        this.colliderNum = BulletConfig.ColliderNum.Bullet;
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



