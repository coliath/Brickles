<?php
$con = mysqli_connect('localhost', 'root', 'root', 'brickles');
if (isset($_GET['player'])) {
    $sql = "INSERT INTO scores VALUES ('$_GET[player]','$_GET[score]')";
    mysqli_query($con, $sql);
}
?>
