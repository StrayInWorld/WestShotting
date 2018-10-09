cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:
    start() {

    },

    onLoad() {
        let _self = this;
        let leftPos = -this.node.parent.width / 2;
        this.arms = cc.find("arms", this.node);
        let parentNode = this.node.parent;
        this.blankNode = cc.find("Canvas/blankNode");

        this.head = cc.find("Canvas/head");

        //是否开始创建瞄准线
        this.isCreateSignLine = false;

        //人物进入动画
        this.node.runAction(cc.moveTo(2, cc.v2(leftPos, this.node.y)));

        //枪口坐标
        let armsMuzzlePos = null;

        //入场抖动枪
        let armAction = cc.repeat(cc.sequence(cc.rotateBy(0.25, 3), cc.rotateBy(0.25, 0), cc.rotateBy(0.25, -3), cc.rotateBy(0.25, 0)), 2);
        let touchAction = cc.callFunc(function () {
            //枪口坐标
            armsMuzzlePos = _self.node.convertToWorldSpaceAR(this.arms.position).add(cc.v2(this.arms.width, 0));
            cc.log("armsMuzzlePos:", armsMuzzlePos);

            //添加界面监听
            parentNode.on("touchstart", function (event) {
                // this.moveBlank(armsMuzzlePos,event.getDelta());
                this.touchStartMove(event);
            }, this);

            parentNode.on("touchmove", function (event) {
                this.moveBlank(armsMuzzlePos,event.getDelta());
                this.moveArms(event);
            }, this);

        }, this);
        this.arms.runAction(cc.sequence(armAction, touchAction));
    },

    //移动空白节点
    moveBlank(startPos,deltaPos) {
        let blankPos = this.blankNode.position;
        let newPos = blankPos.add(deltaPos);
        this.blankNode.position = newPos;

        var results = cc.director.getPhysicsManager().rayCast(startPos, newPos, cc.RayCastType.Any);

        for (var i = 0; i < results.length; i++) {
            var result = results[i];
            var collider = result.collider;
            var point = result.point;
            var normal = result.normal;
            var fraction = result.fraction;
        }        
    },

    //移动屏幕时移动枪
    moveArms(event){
        let touch = event.touch;
        let startNodePos = this.arms.convertToNodeSpace(cc.v2(touch.getPreviousLocation()));
        let currentNodePos = this.arms.convertToNodeSpace(cc.v2(touch.getLocation()));

        let moveNodeRad = startNodePos.signAngle(currentNodePos);
        let moveNodeRotation = moveNodeRad * 180/ Math.PI;
        this.arms.rotation += -moveNodeRotation;
    },

    //点击屏幕时移动枪
    touchStartMove(event){
        let currentPos = cc.v2(event.getLocation());
        let currentNodePos = this.arms.convertToNodeSpace(currentPos);
        let armsPos = this.arms.position;
        let moveRad = currentNodePos.signAngle(armsPos);
        let moveRotation = moveRad * 180 / Math.PI;
        this.arms.rotation += moveRotation;
    },

    //创建瞄准线
    update(dt) {
        if (this.isCreateSignLine) {
            cc.log("create sign line");
        }
    },
});
