
function Game (Ball, Paddle, Board, canvasElement, scoreElement, livesElement, levelElement, bannerElement, startingLives) {
    
    this.ball = Ball;
    this.paddle = Paddle;
    this.board = Board;
    this.canvas = canvasElement;
    this.context = this.canvas.getContext("2d");
    this.livesRemaining = startingLives;
    this.mouseX;
    this.startHandle;
    this.score = 0;
    this.scoreElement = scoreElement;
    this.livesElement = livesElement;
    this.levelElement = levelElement;
    this.bannerElement = bannerElement;
    this.bricksRemaining = this.board.totalBricks;
    this.level = 1;
    
    this.checkLeftWall = checkLeftWall;
    this.checkTopWall = checkTopWall;
    this.checkRightWall = checkRightWall;
    this.checkBottomWall = checkBottomWall;
    this.checkBrick = checkBrick;
    this.checkBricks = checkBricks;
    this.checkPaddle = checkPaddle;
    this.checkCollisions = checkCollisions;
    
    this.play = play;
    this.drawBackground = drawBackground;
    this.start = start;
    this.stop = stop;
    this.updateScore = updateScore;
    this.updateLives = updateLives;
    this.updateLevel = updateLevel;
    this.resetBall = resetBall;
    this.loseLife = loseLife;
    this.loseBrick = loseBrick;
    this.gameOver = gameOver;
    this.levelOver = levelOver;
    this.displayBanner = displayBanner;
    
    this.bannerElement.style.display = 'none';
    this.updateScore();
    this.updateLives();
    this.updateLevel();
    
    //put this in a function or in paddle???
    var paddle = this.paddle;
    this.canvas.addEventListener("mousemove", function (e) {
            paddle.move(e);
    }, false);
    
    
}

function drawBackground (c, width, height) {
    c.fillStyle = "#3498DB";
    c.fillRect(0,0,width,height);
}

function checkLeftWall () {
    if (this.ball.left <= 0 && this.ball.xUnits <= 0) {
        this.ball.reverseHorizontal();
        this.ball.update();
    }
}

function checkTopWall () {
    if (this.ball.top <= 0 && this.ball.yUnits <= 0) {
        this.ball.reverseVertical();
        this.ball.update();
    }
}

function checkRightWall () {
    if (this.ball.right >= this.canvas.width && this.ball.xUnits >= 0) {
        this.ball.reverseHorizontal();
        this.ball.update();
    }
}

function checkBottomWall () {
    if (this.ball.top >= this.canvas.height + 10) {
        this.resetBall();
        this.loseLife();
    }
}

function checkPaddle () {
    if (this.ball.yUnits > 0) { // moving down
        if (this.ball.bottom >= this.paddle.y && this.ball.y < this.paddle.y) { // on top of paddle vertically
            if (this.ball.x >= this.paddle.x && this.ball.x <= this.paddle.right) { // within the paddle width
                if (this.ball.left <= this.paddle.x + this.paddle.width/3) { // on left side of paddle
                    if (this.ball.xUnits > 0) { //moving right
                        this.ball.reverseVertical(15);
                        this.ball.update();
                    }
                    else { //moving left
                        this.ball.reverseVertical(20);
                        this.ball.update();
                    }
                }
                else if (this.ball.right >= this.paddle.x + 2*this.paddle.width/3) { // on right side of paddle
                    if (this.ball.xUnits > 0) { //moving right
                        this.ball.reverseVertical(-20);
                        this.ball.update();
                    }
                    else { //moving left
                        this.ball.reverseVertical(-15);
                        this.ball.update();
                    }
                }
                else { //middle of paddle
                    this.ball.reverseVertical();
                    this.ball.update();
                }
            }
        }
    }
}

function checkBrick (brick) {
    var b = this.ball;
    if (brick.visible) { 
       if (!withinWidth(b.left, brick) && withinHeight(b.y, brick) && withinWidth(b.right, brick) && b.xUnits > 0) { // left side collision
           b.reverseHorizontal();
           b.update();
           brick.disappear();
           this.loseBrick();
       }
       else if (!withinWidth(b.right, brick) && withinHeight(b.y, brick) && withinWidth(b.left, brick) && b.xUnits < 0) { // right side collision
           b.reverseHorizontal();
           b.update();
           brick.disappear();
           this.loseBrick();
       }
       else if (withinWidth(b.x, brick) && withinHeight(b.top, brick) && !withinHeight(b.bottom, brick) && b.yUnits < 0) { // bottom collsion
           b.reverseVertical();
           b.update();
           brick.disappear();
           this.loseBrick();
       }
       else if (withinWidth(b.x, brick) && withinHeight(b.bottom, brick) && !withinHeight(b.top, brick) && b.yUnits > 0) { // top collision
           b.reverseVertical();
           b.update();
           brick.disappear();
           this.loseBrick();
       }
       else if (withinWidth(b.x, brick) && withinHeight(b.y, brick)) {
           console.log(b.toString());
           console.log(brick.toString());
       }
    }
}

function withinWidth(ballX, brick) {
    if (ballX >= brick.x && ballX <= brick.x + brick.width) {
        return true;
    }
    else {
        return false;
    }    
}

function withinHeight(ballY, brick) {
    if (ballY >= brick.y && ballY <= brick.y + brick.height) {
        return true;
    }
    else {
        return false;
    }   
}

function checkBricks () {
    for (var r=0; r<this.board.board.length; r++) {
        for (var c=0; c<this.board.board[0].length; c++) {
            this.checkBrick(this.board.board[r][c]);
        }
    }
}

function checkCollisions () {
    this.checkLeftWall();
    this.checkTopWall();
    this.checkRightWall();
    this.checkBottomWall();
    this.checkPaddle();
    this.checkBricks();
} 

function play (c) {
    this.drawBackground(c, this.canvas.width, this.canvas.height);
    this.paddle.draw(c);
    this.checkCollisions();
    this.ball.move();
    this.board.draw(c);
    this.ball.draw(c);
}

function start () {
    var context = this.context;
    var self = this;
    this.gameHandle = setInterval(function() {self.play(context);}, 2); 
}

function stop () {
    clearInterval(this.gameHandle);
}

function updateScore() {
    this.scoreElement.innerHTML = this.score.toString();
}

function updateLives () {
    this.livesElement.innerHTML = this.livesRemaining.toString();
}

function updateLevel () {
    this.levelElement.innerHTML = this.level.toString();
}

function resetBall () {
    this.ball.x = this.paddle.middle;
    this.ball.y = this.paddle.y - this.paddle.height;
    this.ball.setRandAngle();
    this.ball.update();
}

function loseLife () {
    if (this.livesRemaining > 0) {
        this.livesRemaining--;
        this.updateLives();
    }
    else {
        this.gameOver();
    }
}

function loseBrick () {
    this.score += this.level;
    this.updateScore();
    this.bricksRemaining--;
    if (this.bricksRemaining === 0) {
        this.levelOver();
    }    
}

function gameOver() {
    this.stop();
    this.displayBanner();
    var player = window.prompt("Final Score of "+this.score+"! Enter Your Name For Top Scores!","Anonymous");
    if (player !== null && player !== "") {
        var score = this.score.toString();
        xhr = new XMLHttpRequest();
        xhr.open("get", "newScore.php?player="+player+"&score="+score, false);
        xhr.send(null);
        document.location.reload(true);
    }
}

function levelOver() {
    this.level++;
    this.updateLevel();
    if (this.level%2 === 0) {
        this.board.rows += this.level-1;
    }
    else {
        this.board.cols += this.level-1;
    }
    this.board.instantiate();
    this.bricksRemaining = this.board.totalBricks;
    if (this.paddle.width > 35) {
        this.paddle.width -= 30;
    }
    if (this.ball.r > 2) {
        this.ball.r -= 2;
    }
    this.ball.speed += .3;
    this.resetBall();
    this.livesRemaining++;
    this.updateLives();
}

function displayBanner(message) {
    //this.bannerElement.innerHTML = message;
    this.bannerElement.style.display = 'block';
}
