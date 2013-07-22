
function Paddle (x, y, width, height) {
    
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.right = this.x + this.width;
    this.middle = this.x + this.width/2;
    
    this.draw = drawPaddle;
    this.move = moveWithMouse;
}

function drawPaddle (context) {
    context.fillStyle = "#000000";
    context.fillRect(this.x, this.y, this.width, this.height);
}

function moveWithMouse (e) {
    //get position
    mouseX = e.layerX;
    //move pad
    this.x = mouseX - this.width/2;
    this.right = this.x + this.width;
    this.middle = this.x + this.width/2;
}