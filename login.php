<?php 
$errors = []; 

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
        
        if(isset($_POST['email-login']) && isset($_POST['current-password'])){
            $email = $_POST['email-login'];
            $password = $_POST['current-password'];
          
            $sql = "SELECT * FROM users WHERE email='$email' AND password='$password'";
            $result = mysqli_query($db, $sql);
            $row = mysqli_fetch_assoc($result);
            if($row){
                echo nl2br("<p style='font-size:2vw;'>User is present in the database and email and password match</p>");
            }
            else{
                echo nl2br("<p style='font-size:2vw;'>User is not present in the database and email and password match</p>");
                header("Refresh: 5; url=./listing.html?login");
            }
        }
    
        // close database connection
        mysqli_close($db);
    }

?>
