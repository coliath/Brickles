
function Ball (x, y, r, speed, angle) {
    
    this.x = x;
    this.y = y;
    this.r = r;
    this.speed = speed;
    this.angle = angle;
    this.xUnits = 0;
    this.yUnits = 0;
    this.left = this.x - this.r;
    this.top = this.y - this.r;
    this.right = this.x + this.r;
    this.bottom = this.y + this.r;
    
    this.draw = drawBall;
    this.update = updateBall;
    this.move = moveBall;
    this.setPositions = setPositions;
    this.reverseVertical = reverseVertical;
    this.reverseHorizontal = reverseHorizontal;
    this.setRandAngle = setRandAngle;
    this.toString = ballToString;
    
    this.setRandAngle();
    this.update();
    
}

function setPositions () {
    this.left = this.x - this.r;
    this.top = this.y - this.r;
    this.right = this.x + this.r;
    this.bottom = this.y + this.r;
}

function drawBall (context) {
    context.strokeStyle = 'white';
    context.fillStyle = 'white';
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
    context.stroke();
    context.closePath();
    context.fill();
}

function angleToRadians (angle) {
    var radians = angle * Math.PI / 180;
    return radians;
}

function updateBall () {
    if (this.angle > 340) { // no horizontal movement
        this.angle = 340;
    }
    if (this.angle < 200 && this.angle > 180) {
        this.angle === 200;
    } 
    var radians = angleToRadians(this.angle);
    this.xUnits = Math.cos(radians) * this.speed;
    this.yUnits = Math.sin(radians) * this.speed;
    this.setPositions();
}

function moveBall() {
    this.x += this.xUnits;
    this.y += this.yUnits;
    this.setPositions();   
}

function reverseVertical (modification) {
    modification = typeof modification !== 'undefined' ? modification : 0; // increase or decrease angle
    this.angle = 360 - modification - this.angle;
    if (this.angle < 0) {
        this.angle += 360;
    }
}

function reverseHorizontal (modification) {
    modification = typeof modification !== 'undefined' ? modification : 0;
    this.angle = 180 - modification - this.angle;
    if (this.angle < 0) {
        this.angle += 360;
    }
}

function setRandAngle () {
    this.angle = randFrom(200, 340);
    this.update();
}

function randFrom (lowerBound, upperBound) {
    var choices = upperBound - lowerBound + 1;
    return Math.floor(Math.random() * choices + lowerBound);
}

function ballToString () {
    return 'x: '+this.x+', y:'+this.y+', r: '+this.r+', xunits: '+this.xUnits+', yunits: '+this.yUnits;
}