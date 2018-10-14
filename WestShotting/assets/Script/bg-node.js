/**
 * 背景图所挂载节点
 * @class bg-node
 * @constructor
 */

cc.Class({
    extends: cc.Component,

    properties: {
        backBgAry: [cc.Node],   //用于管理移动背景图片结点的数组
        backBgSpeed: 0.6,       //移动时控制速度的变量
        backBgErrorDistance: 10,//前景移动误差

        mountainBgAry: [cc.Node],
        mountainBgSpeed: 0.6,
        mountainBgErrorDistance: 10,

        frontBgAry: [cc.Node],
        frontBgSpeed: 0.6,
        frontBgErrorDistance: 10,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        let canvasNode = cc.find("Canvas");

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

        //翻转第二张背景的图
        let backGround1 = cc.find("backGroundNode/backGround1", this.node);
        let backGroundWidget = backGround1.getComponent(cc.Widget);
        backGroundWidget.updateAlignment();
        let backGround2 = cc.find("backGroundNode/backGround2", this.node);
        backGround2.setPosition(backGround1.width - canvasNode.width / 2, backGround1.position.y);
        backGround2.runAction(cc.flipX(true));

        //翻转第二张山的图
        let mountain1 = cc.find("mountainNode/mountain1", this.node);
        let mountainGroundWidget = mountain1.getComponent(cc.Widget);
        mountainGroundWidget.updateAlignment();
        let mountain2 = cc.find("mountainNode/mountain2", this.node);
        mountain2.setPosition(mountain1.width - canvasNode.width / 2, mountain1.position.y);
        mountain2.runAction(cc.flipX(true));

        //翻转第二张前景的图
        let frontGround1 = cc.find("frontGroundNode/frontGround1", this.node);
        let frontGroundWidget = frontGround1.getComponent(cc.Widget);
        frontGroundWidget.updateAlignment();
        let frontGround2 = cc.find("frontGroundNode/frontGround2", this.node);
        frontGround2.setPosition(frontGround1.width - canvasNode.width / 2, frontGround1.position.y);
        frontGround2.runAction(cc.flipX(true));

        this.backBgOriginX1 = this.backBgAry[0].x;
        this.backBgOriginX2 = this.backBgAry[1].x;

        this.frontBgOriginX1 = this.frontBgAry[0].x;
        this.frontBgOriginX2 = this.frontBgAry[1].x;

        this.mountainBgOriginX1 = this.mountainBgAry[0].x;
        this.mountainBgOriginX2 = this.mountainBgAry[1].x;
    },

    /**
     * @method 移动背景函数
     * @param {Array} bgList  要移动的背景节点数组
     * @param {Number} speed  移动的速度，值越大，移动越快
     * @param {Number} bgOriginX1  第一张背景图初始横坐标
     * @param {Number} bgOriginX2  第二张背景图初始横坐标
     */
    moveBg(bgList, speed, bgOriginX1, bgOriginX2, errorDistancae) {
        let originX1 = bgOriginX1;
        let originX2 = bgOriginX2;
        let resetPos = originX2;
        let bgLimit = originX1 - bgList[0].width;

        for (var index = 0; index < bgList.length; index++) {
            if (bgList[0].x <= bgLimit) {
                let errorPos = originX1 - bgList[1].x;
                bgList[0].x = resetPos - errorPos - errorDistancae;
            }

            if (bgList[1].x <= bgLimit) {
                bgList[1].x = resetPos;
                let errorPos = originX1 - bgList[0].x;
                bgList[1].x = resetPos - errorPos - errorDistancae;
            }
            bgList[index].x -= speed;
        }
    },
    update(dt) {
        this.moveBg(this.backBgAry, this.backBgSpeed, this.backBgOriginX1, this.backBgOriginX2, this.backBgErrorDistance);
        this.moveBg(this.frontBgAry, this.frontBgSpeed, this.frontBgOriginX1, this.frontBgOriginX2, this.frontBgErrorDistance);
        this.moveBg(this.mountainBgAry, this.mountainBgSpeed, this.mountainBgOriginX1, this.mountainBgOriginX2, this.mountainBgErrorDistance);
    },


    start() {

    }

});
