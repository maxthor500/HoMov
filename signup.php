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
        
        // Get the cookie data
        $firstName = $_POST['firstName'];
        $lastName = $_POST['lastName'];
        $email = $_POST['email-signup'];
        $password = $_POST['new-password'];
        $repeat_password = $_POST['repeat-password'];


        if ($repeat_password == $password) {
            // encrypt the password before saving in the database
            $password = md5($password);

            // Create SQL query
            $sql = "INSERT INTO users (firstName, lastName, email, password) 
                    VALUES('$firstName', '$lastName', '$email', '$password')";

            if(mysqli_query($db, $sql)){
                echo nl2br("<p style='font-size:2vw;'>Your registration is successfully recorded</p>");
            } else{
                echo "ERROR: Could not save data. " . mysqli_error($db);
            }
        }
        
        header("Refresh: 5; url=./index.html");
    
        // close database connection
        mysqli_close($db);
    }

?>
