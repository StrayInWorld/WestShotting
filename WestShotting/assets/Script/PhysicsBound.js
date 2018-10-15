/**
 *  创建物理边界 
 *  @class PhysicsBound
 *  @constructor
 */


cc.Class({
    extends: cc.Component,

    properties: {
        size: cc.size(0, 0)
    },

    // use this for initialization
    onLoad: function () {
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;

        //是否绘制边界
        // physicsManager.debugDrawFlags =
        //     // 0;
        //     // cc.PhysicsManager.DrawBits.e_aabbBit |
        //     cc.PhysicsManager.DrawBits.e_jointBit |
        //     cc.PhysicsManager.DrawBits.e_shapeBit
        //     ;

        this.width = this.size.width || this.node.width;
        this.height = this.size.height || this.node.height;

        let node = new cc.Node();
        node.group = "wall";
        let body = node.addComponent(cc.RigidBody);
        body.type = cc.RigidBodyType.Static;

        this._addBound(node, 0, -this.height / 2, this.width, 20);   //下面
        this._addBound(node, 0, this.height / 2, this.width, 20);   //上面
        this._addBound(node, -this.width / 2, 0, 20, this.height);  //左边
        this._addBound(node, this.width / 2, 0, 20, this.height);   //右边

        let collider = node.getComponent(cc.Collider);
        collider.apply();
        node.parent = this.node;
    },

    _addBound(node, x, y, width, height) {
        let collider = node.addComponent(cc.PhysicsBoxCollider);
        collider.offset.x = x;
        collider.offset.y = y;
        collider.size.width = width;
        collider.size.height = height;
    },

    createOtherSideBound() {

    },
});