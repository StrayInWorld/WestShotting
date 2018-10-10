cc.Class({
    extends: cc.Component,

    properties: {
        BasicPoint: cc.Prefab,
        pointLayout: cc.Layout
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        let _self = this;
        let leftPos = -this.node.parent.width / 2;
        let parentNode = this.node.parent;
        this.arms = cc.find("arms", this.node);
        this.blankNode = cc.find("Canvas/player/arms/blankNode");
        this.armsOpen = cc.find("Canvas/player/arms/armsOpen");
        this.trackSprites = [];      //装轨迹点

        //添加瞄准线对象池
        // this.basicPointPool = new cc.NodePool();
        // for (let i = 0; i < 5; i++) {
        //     let basicPoint = cc.instantiate(this.BasicPoint);
        //     this.basicPointPool.put(basicPoint);
        // }

        //碰撞点位置
        this.colliderPoint = null;

        //是否开始创建瞄准线
        this.isCreateSignLine = false;

        //人物进入动画
        this.node.runAction(cc.moveTo(2, cc.v2(leftPos, this.node.y)));

        //入场抖动枪
        let armAction = cc.repeat(cc.sequence(cc.rotateBy(0.25, 3), cc.rotateBy(0.25, 0), cc.rotateBy(0.25, -3), cc.rotateBy(0.25, 0)), 2);
        let touchAction = cc.callFunc(function () {
            //添加界面监听
            parentNode.on("touchstart", function (event) {
                this.removeTrackSprites();
                this.touchStartMove(event);
            }, this);

            parentNode.on("touchmove", function (event) {
                this.removeTrackSprites();
                this.moveArms(event);
            }, this);

            parentNode.on("touchend", function (event) {
                this.isCreateSignLine = false;
            }, this);

        }, this);
        this.arms.runAction(cc.sequence(armAction, touchAction));

    },

    start() {

    },

    //对象池
    createFromPool() {
        let item = null;
        if (this.basicPointPool.size() > 0) {
            item = this.basicPointPool.get();
        } else {
            item = cc.instantiate(this.BasicPoint);
        }
        item.parent = this.armsOpen;
        return item;
    },
    recoverToPool(basicPoint) {
        this.basicPointPool.put(basicPoint);
    },

    //移动屏幕时移动枪
    moveArms(event) {
        let touch = event.touch;
        let startNodePos = this.arms.convertToNodeSpace(cc.v2(touch.getPreviousLocation()));
        let currentNodePos = this.arms.convertToNodeSpace(cc.v2(touch.getLocation()));
        let moveNodeRad = startNodePos.signAngle(currentNodePos);
        let moveNodeRotation = moveNodeRad * 180 / Math.PI;
        this.arms.rotation += -moveNodeRotation;

        //枪口位置
        let armsOpenPos = this.arms.convertToWorldSpace(this.armsOpen.position);
        //空白点的位置
        let blankNodePos = this.arms.convertToWorldSpace(this.blankNode.position);
        this.getRaysEndPos(armsOpenPos, blankNodePos);
    },

    //点击屏幕时移动枪
    touchStartMove(event) {
        this.isCreateSignLine = true;
        let currentNodePos = this.arms.convertToNodeSpace(event.getLocation());  //触摸点转换本地坐标
        let moveRad = currentNodePos.signAngle(this.armsOpen.position);
        let moveRotation = moveRad * 180 / Math.PI;
        this.arms.rotation += moveRotation;

        //枪口位置
        let armsOpenPos = this.arms.convertToWorldSpace(this.armsOpen.position);
        //空白点的位置
        let blankNodePos = this.arms.convertToWorldSpace(this.blankNode.position);
        this.getRaysEndPos(armsOpenPos, blankNodePos);
    },

    //获取射线终点坐标
    getRaysEndPos(startPos, endPos) {
        //射线检测
        var results = cc.director.getPhysicsManager().rayCast(startPos, endPos, cc.RayCastType.Closest);
        if (results.length > 0) {
            this.colliderPoint = this.arms.convertToNodeSpace(results[0].point);
        }

        if (!this.colliderPoint) {
            this.colliderPoint = this.blankNode.position;
        }
        this.drawTrack(this.armsOpen.position, this.colliderPoint);
    },

    //创建瞄准线
    // update(dt) {
    //     if (this.isCreateSignLine) {
    //         //枪口位置
    //         let armsOpenPos = this.arms.convertToWorldSpace(this.armsOpen.position);
    //         //空白点的位置
    //         let blankNodePos = this.arms.convertToWorldSpace(this.blankNode.position);
    //         this.getRaysEndPos(armsOpenPos, blankNodePos);

    //         if (!this.colliderPoint) {
    //             this.colliderPoint = this.blankNode.position;
    //         }
    //         let startPos = this.armsOpen.position;
    //         let endPos = this.colliderPoint;
    //         this.colliderPoint = null;

    //         // let basicPoint = this.createFromPool();
    //         // let endPosMag = endPos.mag();
    //         // let basicMag = 208;
    //         // let time = Math.floor(endPosMag / basicMag) * 0.2;
    //         // basicPoint.runAction(cc.sequence(
    //         //     cc.moveTo(time, endPos),
    //         //     cc.callFunc(function () {
    //         //         this.recoverToPool(basicPoint);
    //         //     }, this)
    //         // ));
    //     }
    // },

    //绘制轨迹路线
    drawTrack: function (startPos, endPos) {
        //装载虚线节点
        this.pointLayout.node.active = true;
        this.pointLayout.node.setPosition(startPos);
        let distance = startPos.sub(endPos).mag();

        //轨迹点数量
        let item = cc.instantiate(this.BasicPoint);
        let trackNum = Math.ceil(distance / (item.width + this.pointLayout.spacingX));

        for (let i = 1; i < trackNum; i++) {
            //克隆轨迹点
            let trackSpriteTemplate = cc.instantiate(this.BasicPoint);
            this.pointLayout.node.addChild(trackSpriteTemplate);
            this.trackSprites.push(trackSpriteTemplate);
        }

        //向量差计算,结束点-开始点，向量的指向是朝着结束点
        let radius = endPos.signAngle(startPos);
        //向量的角度计算，cc.pToAngle是获得弧度值，角度 = 弧度/PI*180
        var angle = radius / Math.PI * 180;

        //rotation 是逆时针旋转的，在角度添加负号才正确
        this.pointLayout.node.rotation = -angle;
    },

    //移除轨迹点
    removeTrackSprites: function () {
        for (let i = 0; i < this.trackSprites.length; i++) {
            let trackSprite = this.trackSprites[i];
            if (trackSprite) {
                trackSprite.removeFromParent();
            }
        }
    }
});


