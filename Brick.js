
function Brick (x, y, height, width) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.visible = true;
    
    this.leftBottom = {x:this.x, y:this.y-this.height};
    this.rightBottom = {x:this.x+this.width, y:this.y};
    
    this.draw = drawBrick;
    this.disappear = disappear;
    this.toString = brickToString;
}

function drawBrick (context) {
    if (this.visible) {
        context.fillRect(this.x, this.y, this.width, this.height);
        context.strokeStyle = "white";
        context.lineWidth = 1;
        context.strokeRect(this.x, this.y, this.width, this.height);
    }
}

function disappear () {
    this.visible = false;
}

function brickToString () {
    return 'x: '+this.x+', y:'+this.y+', height: '+this.height+', width: '+this.width;
}

