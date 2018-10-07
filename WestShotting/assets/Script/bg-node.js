cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        let canvasNode = cc.find("Canvas");

        //翻转第二张背景的山的图
        let secondBgGround2 = cc.find("groundNode1/backGround", this.node);
        secondBgGround2.runAction(cc.flipX(true));

        //翻转第二张山的图
        let mountain2 = cc.find("groundNode1/mountain", this.node);
        mountain2.runAction(cc.flipX(true));

        //云动画
        let groundNodeCloud = cc.find("groundNode/cloudNode", this.node);
        let cloud2 = cc.find("groundNode/cloudNode/cloud2", this.node);
        let cloudOriginNodePos = groundNodeCloud.position;
        let cloudMoveX = cloud2.position.x;
        let cloudMoveTime = 10;
        groundNodeCloud.runAction(cc.repeatForever(
            cc.sequence(
                cc.moveBy(cloudMoveTime,cc.v2(-cloudMoveX,0)),
                cc.place(cloudOriginNodePos)
            )
        ));

        //前景动画
        let frontGround = cc.find("groundNode/frontGround",this.node);
        let secondFrontGround = cc.find("groundNode1/frontGround",this.node);
        let resetPos = secondFrontGround.position;
        let frontGroundMoveX = frontGround.width;
        let secondFrontGroundMoveX = frontGroundMoveX*2;
        let frontActionTime = 10;
        frontGround.runAction(cc.repeatForever(
            cc.sequence(
                cc.moveBy(cloudMoveTime,cc.v2(-frontGroundMoveX,0)),
                cc.place(resetPos)
            )
        ));





        let cloudAction = cc.sequence();
    },

    start() {

    },

    // update (dt) {},
});
