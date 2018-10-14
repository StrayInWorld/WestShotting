/**
 * 背景图所挂载节点
 * @class bg-node
 * @constructor
 */

cc.Class({
    extends: cc.Component,

    properties: {
        frontBgAry: [cc.Node],   //用于管理背景图片结点的数组
        frontBgSpeed: 0.6,       //移动时控制速度的变量
        frontBgErrorDistance: 10,//前景移动误差
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        let canvasNode = cc.find("Canvas");

        //翻转第二张背景的山的图
        let secondBgGround = cc.find("backGroundNode/backGround2", this.node);
        secondBgGround.runAction(cc.flipX(true));

        //翻转第二张山的图
        let mountain2 = cc.find("mountainNode/mountain2", this.node);
        mountain2.runAction(cc.flipX(true));

        //翻转第二张前景的图
        // let frontGround2 = cc.find("frontGroundNode/frontGround2", this.node);
        // frontGround2.runAction(cc.flipX(true));

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
        let firstFrontGround = cc.find("frontGroundNode/frontGround1", this.node);
        let resetPos = cc.v2(canvasNode.width, firstFrontGround.y);
        let firstMoveX = firstFrontGround.width - canvasNode.width;  //长度-屏幕宽度

        //山动画
        let mountain = cc.find("mountainNode/mountain1", this.node);
        let secondMountain = cc.find("mountainNode/mountain2", this.node);
        let mountaisMovsX = mountain.width;
        let mountainActionTime = 60 * 7;
        mountain.runAction(cc.repeatForever(
            cc.sequence(
                cc.moveBy(mountainActionTime, cc.v2(-mountaisMovsX, 0)),
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


        //背景动画
        let backGround = cc.find("backGroundNode/backGround1", this.node);
        let backGroundActionTime = 60 * 9;
        let backGroundFristTime = 60 * 7;
        let backGroundSecondTime = 60 * 5;
        backGround.runAction(cc.repeatForever(
            cc.sequence(
                cc.moveBy(backGroundActionTime, cc.v2(-firstMoveX, 0)),
                cc.callFunc(function () {
                    cc.log("1");
                    secondBgGround.runAction(
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

        this.frontBgOriginX1 = this.frontBgAry[0].x;
        this.frontBgOriginX2 = this.frontBgAry[1].x;
    },
    update(dt) {
        this.moveFrontBg(this.frontBgAry, this.frontBgSpeed);
    },
    moveFrontBg: function (bgList, speed) {
        let originX1 = this.frontBgOriginX1;
        let originX2 = this.frontBgOriginX2;
        let resetPos = originX2;

        let frontBgLimit = originX1 - bgList[0].width;

        //二张图片一起滚动
        for (var index = 0; index < bgList.length; index++) {
            //根据误差修改位置
            if (bgList[0].x <= frontBgLimit) {
                let errorPos = originX1 - bgList[1].x;
                bgList[0].x = resetPos - errorPos - this.frontBgErrorDistance;
            }

            if (bgList[1].x <= frontBgLimit) {
                bgList[1].x = resetPos;
                let errorPos = originX1 - bgList[0].x;
                bgList[1].x = resetPos - errorPos - this.frontBgErrorDistance;
            }
            bgList[index].x -= speed;

            // cc.log("bgList[0].x:", bgList[0].x);
            // cc.log("bgList[1]:", bgList[1].x);
            // cc.log("frontBgLimit:", frontBgLimit);
        }




    },
    start() {

    }

});
