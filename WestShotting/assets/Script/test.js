cc.Class({
    extends: cc.Component,
 
    properties: {
        root: cc.Node,
        moveSprite: cc.Sprite,
        trackLayout: cc.Layout,
    },
 
    // use this for initialization
    onLoad: function () {
        this.startPos = cc.p(0, 0);  //开始位置
        this.endPos = cc.p(0, 0);    //结束位置
        this.trackSprites = [];      //装轨迹点
        
        //轨迹不显示
        this.trackLayout.node.active = false;
        
        //触摸结束事件
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this, true);
    },
    
    onTouchEnd: function (event) {
        //停止移动，为了避免没移动结束，却改变了目标位置
        this.moveSprite.node.stopAllActions();
        this.removeTrackSprites();
        //获取开始的位置
        this.startPos = this.moveSprite.node.getPosition();
        //获取点击的位置
        this.endPos = cc.p(event.getLocation().x, event.getLocation().y);
        cc.log("getLocation = ", this.endPos.x, this.endPos.y, event.getLocation().x, event.getLocation().y);
        this.spriteMoveAction();
        this.drawTrack(event.getLocation());
    },
    
    spriteMoveAction: function () {
        //获得2点之间的距离
        let distance = cc.pDistance(this.startPos, this.endPos);
        
        //计算移动需要话费的时间，时间 = 距离 / 速度
        let moveTime = distance / 400;
        
        cc.log("move = ", this.endPos.x, this.endPos.y);
        //变速移动 
        let moveTo = cc.moveTo(moveTime, this.endPos).easing(cc.easeInOut(3));
        
        //回调函数
        let callfunc = cc.callFunc(function () {
            this.trackLayout.node.active = false;
        }, this);
        
        //让sprite移动
        this.moveSprite.node.runAction(cc.sequence(moveTo, callfunc));
    },
    
    //绘制轨迹路线
    drawTrack: function (end) {
        this.trackLayout.node.active = true;
        this.trackLayout.node.setPosition(this.startPos);
        let distance = cc.pDistance(this.startPos, this.endPos);
        
        //获得轨迹点
        this.trackSprite = this.trackLayout.node.getChildByName("trackSprite");
        
        //轨迹点数量
        let trackNum = Math.floor(distance / (this.trackSprite.width + this.trackLayout.spacingX));
        
        for (i = 1; i < trackNum; i++) {
            //克隆轨迹点
            let trackSpriteTemplate = cc.instantiate(this.trackSprite);
            this.trackLayout.node.addChild(trackSpriteTemplate);
            this.trackSprites.push(trackSpriteTemplate);
        }
        
        //向量差计算,结束点-开始点，向量的指向是朝着结束点
        var posSub = this.endPos.sub(this.startPos);
        //向量的角度计算，cc.pToAngle是获得弧度值，角度 = 弧度/PI*180
        var angle = cc.pToAngle(posSub) / Math.PI * 180;
        
        //rotation 是逆时针旋转的，在角度添加负号才正确
        this.trackLayout.node.rotation = -angle;
    },
    
    //移除轨迹点
    removeTrackSprites: function () {
        for (i = 0; i < this.trackSprites.length; i++ ) {
            let trackSprite = this.trackSprites[i];
            if (trackSprite) {
                trackSprite.removeFromParent();
            }
        }
    }
});