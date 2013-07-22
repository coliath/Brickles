<?php
$con = mysqli_connect('localhost', '*********', '*************', 'brickles');
if (mysqli_connect_errno($con))
{
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
$sql = 'SELECT * FROM scores ORDER BY score desc';
$result = mysqli_query($con, $sql);
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Brickles!</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script src="Paddle.js"></script>
        <script src="Ball.js"></script>
        <script src="Brick.js"></script>
        <script src="Board.js"></script>
        <script src="Game.js"></script>
        <script src="brickles.js"></script>
        <link rel="stylesheet" type="text/css" href="style.css">
    </head>
    <body>
        
            <div id="gameContainer">
                
                <h1 id="title">~ Canvas Brickles! ~</h1>             
                <canvas id="canvas1" width="500" height="300">No Support For Canvas.</canvas>
                
                <div id="banner">
                    <div id="bannerBack"></div>
                    <div id="bannerText">~ GAME OVER ~</div>
                </div>
                
                <div id="gameInfo">
                    <p>Level: <span id="level"></span></p>
                    <p>Score: <span id="score"></span></p>
                    <p>Lives: <span id="lives"></span></p>
                </div>
                
                <div id="leaderBoard">
                    
                    <span>Top Scores</span>
                    <div id='scoreList'>
                        <?php
                            $count = 1;
                            while ($row = mysqli_fetch_object($result)) 
                            {
                                echo '<p class="player">'.$count.'. ';
                                echo $row->player;
                                echo '</p>';
                                echo '<p class="playerScore">~ ';
                                echo $row->score;
                                echo ' ~</p>';  
                                $count++;
                            }
                        ?>
                    </div>
                    
                </div> 
                
            </div>
        
        <div class="btn" id='newGame'>~ New Game ~</div>
        
    </body>
</html>
