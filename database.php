<?php

// server and db 
$serverName = $_SERVER['SERVER_PORT'] == 3306 ? "localhost" : "127.0.0.1:3307"; 
$username = "root"; 
$password = ""; 
$dbname = "test";

$mysqli = new mysqli(hostname: $serverName,
                     username: $username,
                     password: $password,
                     database: $dbname);
                     
if ($mysqli->connect_errno) {
    die("Connection error: " . $mysqli->connect_error);
}

return $mysqli;

?>