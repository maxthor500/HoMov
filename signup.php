<?php
    $errors = []; 
    
    echo '<body style="background-color:#e0e0e0;">';
    
    if (empty ($errors))
    {
        // Create database connection
        $mysqli = require __DIR__ . "/database.php";
        
        // Get the cookie data
        $firstName = $_POST['firstName'];
        $lastName = $_POST['lastName'];
        $email = $_POST['email-signup'];
        $password = $_POST['new-password'];
        $repeat_password = $_POST['repeat-password'];


        if ($repeat_password == $password) {
            // encrypt the password before saving in the database
            $password_hash = password_hash($password, PASSWORD_DEFAULT);

            // Create SQL query
            $sql = "INSERT INTO users (firstName, lastName, email, password) 
                    VALUES('$firstName', '$lastName', '$email', '$password_hash')";

            $stmt = $mysqli->stmt_init();

            if ( ! $stmt->prepare($sql)) {
                die("SQL error: " . $mysqli->error);
            }
                            
            if ($stmt->execute()) {
                echo nl2br("<p style='font-size:2vw;'>Your registration is successfully recorded</p>");
                header("Refresh: 5; url=./listing.html?login");
                exit;
                
            } else {
                
                if ($mysqli->errno === 1062) {
                    die("email already taken");
                } else {
                    die($mysqli->error . " " . $mysqli->errno);
                }
            }
        }
    }

?>
