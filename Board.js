
function Board (rows, cols, width, height) {
    
    this.rows = rows;
    this.cols = cols;
    this.board;
    this.totalBricks;
    this.width = width;
    this.height = height;
    this.brickWidth;
    this.brickHeight;
    
    this.instantiate = instantiateBoard;
    this.draw = drawBoard;
    
    this.instantiate();
}

function instantiateBoard () {
    this.board = new Array(this.rows);
    this.totalBricks = this.rows*this.cols;
    this.brickWidth = this.width/this.cols;
    this.brickHeight = this.height/this.rows;
    
    for (var i=0; i<this.rows; i++) { // create 2d arrray
        this.board[i]=new Array(this.cols);
    }
    var y = 0;
    for (row=0; row<this.rows; row++) { // fill array with bricks
        var x = 0;
        for (col=0; col<this.cols; col++) {
            this.board[row][col] = new Brick (x, y, this.brickHeight, this.brickWidth);
            x += this.brickWidth;
        }
        y += this.brickHeight;
    }
}

function drawBoard (context) {
    for (row=0; row<this.board.length; row++) {
        for (col=0; col<this.board[0].length; col++) {
            this.board[row][col].draw(context);
        }    
    }
}