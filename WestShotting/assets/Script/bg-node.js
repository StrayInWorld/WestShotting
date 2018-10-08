cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        let canvasNode = cc.find("Canvas");

        //翻转第二张背景的山的图
        let secondBgGround2 = cc.find("backGroundNode/backGround2", this.node);
        secondBgGround2.runAction(cc.flipX(true));

        //翻转第二张山的图
        let mountain2 = cc.find("mountainNode/mountain2", this.node);
        mountain2.runAction(cc.flipX(true));

        //翻转第二张前景的图
        let frontGround2 = cc.find("frontGroundNode/frontGround2", this.node);
        frontGround2.runAction(cc.flipX(true));

        //云动画
        let groundNodeCloud = cc.find("cloudNode", this.node);
        let cloud2 = cc.find("cloudNode/cloud2", this.node);
        let cloudOriginNodePos = groundNodeCloud.position;
        let cloudMoveX = cloud2.position.x;
        let cloudMoveTime = 120;
        groundNodeCloud.runAction(cc.repeatForever(
            cc.sequence(
                cc.moveBy(cloudMoveTime, cc.v2(-cloudMoveX, 0)),
                cc.place(cloudOriginNodePos)
            )
        ));

        //前景动画（包括太阳）
        let frontGroundNode = cc.find("frontGroundNode", this.node);
        let frontGround = cc.find("frontGroundNode/frontGround1", this.node);
        let secondFrontGround = cc.find("frontGroundNode/frontGround2", this.node);
        let resetPos = cc.v2(canvasNode.width,frontGround.y);
        let firstMoveX = frontGround.width - canvasNode.width;  //长度-屏幕宽度
        let secondMoveX = canvasNode.width; //屏幕宽度
        let firstActionTime = 300;
        let secondActionTime = 280;
        let thirdActionTime = 250;

        frontGround.runAction(cc.repeatForever(
            cc.sequence(
                cc.moveBy(firstActionTime, cc.v2(-firstMoveX, 0)),
                cc.spawn(
                    cc.callFunc(function () {
                        cc.log("1");
                        secondFrontGround.runAction(
                            cc.sequence(
                                cc.moveBy(secondActionTime, cc.v2(-secondMoveX, 0)),
                                cc.moveBy(firstActionTime, cc.v2(-firstMoveX, 0)),
                                cc.moveBy(thirdActionTime, cc.v2(-secondMoveX, 0)),
                                cc.place(resetPos),
                                cc.callFunc(function(){
                                    cc.log("2")
                                })
                            )
                        )
                    }),
                    cc.moveBy(secondActionTime, cc.v2(-secondMoveX, 0)),    
                ),
                cc.place(resetPos),
                cc.delayTime(thirdActionTime)
            )
        ));

        //背景动画

        //山动画
        let mountain = cc.find("mountainNode/mountain1", this.node);
        let secondMountain = cc.find("mountainNode/mountain2", this.node);
        let mountaisMovsX = mountain.width;
        let mountainActionTime = 420;
        mountain.runAction(cc.repeatForever(
            cc.sequence(
                cc.moveBy(mountainActionTime,cc.v2(-mountaisMovsX,0)),
                cc.callFunc(function () {
                    cc.log("1");
                    secondMountain.runAction(
                        cc.sequence(
                            cc.moveBy(mountainActionTime, cc.v2(-mountaisMovsX, 0)),
                            cc.callFunc(function () {
                                cc.log("2");
                            }),
                            cc.place(resetPos)
                        )
                    )
                }),
                cc.place(resetPos)
            )
        ));
    },

    start() {

    },

    update (dt) {},
});
