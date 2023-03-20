<?php
// add data to table
$serverName = "127.0.0.1:3307"; 
$username = "root"; 
$password = ""; 
$dbname = "test"; 

// Create database connection
$db = mysqli_connect($serverName, $username, $password, $dbname);
 
// Check connection
if($db === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
 
// Get the cookie data
$movie = $_COOKIE['movie_booked'];
$email = $_COOKIE['email_booked'];
$datetime = $_COOKIE['date_booked'];
 
// Create SQL query
$sql = "INSERT INTO movie_bookings (movie, email, datetime) VALUES ('$movie', '$email', '$datetime');";
if(mysqli_query($db, $sql)){
    echo "Form data successfully saved.";
} else{
    echo "ERROR: Could not save data. " . mysqli_error($db);
}
 
// close database connection
mysqli_close($db);
?>
<!-- $errors = ''; 

$movie = $_COOKIE['movie_booked']; 
$dataPicker = $_POST['data-picker']; 
$email = $_POST['email'];

echo '<body style="background-color:#e0e0e0;">';

if (empty ($errors))
{
	// add data to table
	$serverName = "127.0.0.1:3307"; 
	$username = "root"; 
	$password=""; 
	$dbname="test"; 
	
	// create connection 
	$conn = new mysqli ($serverName, $username, $password, $dbname); 
	//Check connection 
	if ($conn->connect_error) { 
	    die("Connection_failed:" . $conn->connect_error); 
	}
    $sql = "INSERT INTO movie_bookings (movie, datetime, email)
	VALUES ('$movie','$dataPicker','$email')"; 
	
	if($conn->query($sql) === TRUE) {
		echo nl2br("<p style='font-size:2vw;'>New record created successfully</p>"); 
	} else {
        echo "Error: ".$sql . "<br>" . $conn->error; 
    }
} -->


