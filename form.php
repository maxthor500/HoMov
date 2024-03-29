<?php
$errors = ''; 

// server and db 
$serverName = $_SERVER['SERVER_PORT'] == 3306 ? "localhost" : "127.0.0.1:3307"; 
$username = "root"; 
$password = ""; 
$dbname = "test";

echo '<body style="background-color:#e0e0e0;">';

if (empty ($errors))
{
	// Create database connection
	$db = mysqli_connect($serverName, $username, $password, $dbname);
	
	// Check connection
	if($db === false){
		die("ERROR: Could not connect. " . mysqli_connect_error());
	}
	
	// Get the cookie data
	$movie = $_COOKIE['movie_booked'];
	$email = $_POST['email'];
	$datePicker = $_POST['date-picker'];
	$datetime = date("d/m/Y H:i:s", strtotime($datePicker));

	// Create SQL query
	$sql = "INSERT INTO movie_bookings (movie, datetime, email) VALUES ('$movie', '$datePicker', '$email');";
	if(mysqli_query($db, $sql)){
		echo nl2br("<p style='font-size:2vw;'>Your booking for " .  $datetime . " of the " .  $movie . " is successfully recorded</p>");
	} else{
		echo "ERROR: Could not save data. " . mysqli_error($db);
	}
	
	header("Refresh: 5; url=./index.html");

	// close database connection
	mysqli_close($db);
}
?>
