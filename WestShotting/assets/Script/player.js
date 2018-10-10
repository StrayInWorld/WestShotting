cc.Class({
    extends: cc.Component,

    properties: {
        BasicPoint: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:
    start() {

    },

    onLoad() {
        let _self = this;
        let leftPos = -this.node.parent.width / 2;
        let parentNode = this.node.parent;
        this.arms = cc.find("arms", this.node);
        this.blankNode = cc.find("Canvas/player/arms/blankNode");
        this.armsOpen = cc.find("Canvas/player/arms/armsOpen");

        //瞄准线预制
        this.basicPoint = cc.instantiate(this.BasicPoint);
        this.basicPoint.parent = this.arms;
        this.basicPoint.active = false;

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
                this.touchStartMove(event);
            }, this);

            parentNode.on("touchmove", function (event) {
                this.moveArms(event);
            }, this);

            parentNode.on("touchend", function (event) {
                this.isCreateSignLine = false;
                this.basicPoint.runAction(cc.place(this.armsOpen.position));
                this.basicPoint.active = false;
            }, this);

        }, this);
        this.arms.runAction(cc.sequence(armAction, touchAction));
    },

    //移动屏幕时移动枪
    moveArms(event) {
        let touch = event.touch;
        let startNodePos = this.arms.convertToNodeSpace(cc.v2(touch.getPreviousLocation()));
        let currentNodePos = this.arms.convertToNodeSpace(cc.v2(touch.getLocation()));

        let moveNodeRad = startNodePos.signAngle(currentNodePos);
        let moveNodeRotation = moveNodeRad * 180 / Math.PI;
        this.arms.rotation += -moveNodeRotation;
    },

    //点击屏幕时移动枪
    touchStartMove(event) {
        this.isCreateSignLine = true;
        this.basicPoint.active = true;

        let currentPos = cc.v2(event.getLocation());
        let currentNodePos = this.arms.convertToNodeSpace(currentPos);  //触摸点转换本地坐标
        let armsOpenPos1 = this.armsOpen.position;
        let moveRad = currentNodePos.signAngle(armsOpenPos1);
        let moveRotation = moveRad * 180 / Math.PI;
        this.arms.rotation += moveRotation;
    },

    //获取射线终点坐标
    getRaysEndPos(startPos, endPos) {
        //射线检测
        var results = cc.director.getPhysicsManager().rayCast(startPos, endPos, cc.RayCastType.Closest);
        if (results.length > 0) {
            this.colliderPoint = this.arms.convertToNodeSpace(results[0].point);
        }
    },

    //创建瞄准线
    update(dt) {
        if (this.isCreateSignLine) {
            //枪口位置
            let armsOpenPos = this.arms.convertToWorldSpace(this.armsOpen.position);
            //空白点的位置
            let blankNodePos = this.arms.convertToWorldSpace(this.blankNode.position);
            this.getRaysEndPos(armsOpenPos, blankNodePos);

            if (!this.colliderPoint) {
                this.colliderPoint = this.blankNode.position;
            }
            let startPos = this.armsOpen.position;
            let endPos = this.colliderPoint;
            if (this.basicPoint.getNumberOfRunningActions() === 0) {
                let endPosMag = endPos.mag();
                let basicMag = 208;
                let time  = Math.floor(endPosMag/basicMag)*0.2;
                this.basicPoint.runAction(cc.sequence(cc.moveTo(1, endPos), cc.place(startPos)));
            }
        }
    },
});
