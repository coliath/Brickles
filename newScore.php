<?php
$con = mysqli_connect('localhost', 'root', 'root', 'brickles');
if (isset($_GET['player'])) {
    $sql = "INSERT INTO scores VALUES ('".mysqli_escape_string($_GET['player'])."','".mysqli_escape_string($_GET['score'])."')";
    mysqli_query($con, $sql);
}
?>
