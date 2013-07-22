
window.addEventListener("load", eventWindowLoaded, false);

function eventWindowLoaded () {
    newGame();
    document.getElementById("newGame").onclick = newGame;
}

function newGame () {
    if (typeof window.game !== "undefined") {
        window.game.stop();
        delete window.game;
    }
    var canvas = document.getElementById("canvas1");
    var scoreElement = document.getElementById("score");
    var livesElement = document.getElementById("lives");
    var levelElement = document.getElementById("level");
    var bannerElement = document.getElementById("banner");
    var paddle = new Paddle(canvas.width/2-50, canvas.height-25, 260, 5); //set up paddle to start in the middle of the canvas at the bottom
    var ball = new Ball(canvas.width/2-5, paddle.y-paddle.height, 10, .6, 270);
    var board = new Board(2, 2, canvas.width, canvas.height/2);
    window.game = new Game(ball, paddle, board, canvas, scoreElement, livesElement, levelElement, bannerElement, 1);
    window.game.start();
}

