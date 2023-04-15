<?php

session_start();

$mysqli = require __DIR__ . "/database.php";

if (isset($_SESSION["user_id"])) {
    
    $sql = "SELECT * FROM users
            WHERE id = {$_SESSION["user_id"]}";
            
    $result = $mysqli->query($sql);
    
    $user = $result->fetch_assoc();
}

$email = "SELECT email FROM users WHERE id = {$_SESSION["user_id"]}";

$query = "SELECT movie, email, datetime FROM movie_bookings WHERE email = '$email'";

$table_result = mysqli_query($mysqli, $query);

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- CDN Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" 
        rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" 
        crossorigin="anonymous">
    <!-- FONT AWESOME EMBED CODE FOR ICON -->
    <script src="https://kit.fontawesome.com/a59dc0b4f5.js" crossorigin="anonymous"></script>
    <!-- custom CSS -->
    <link rel="stylesheet" href="assets/css/style.css">
    <title>HOMOV</title>
</head>
<body>
    <header>
        <!-- Bootstrap Navbar -->
        <nav id="navbar" class="navbar navbar-expand-lg bg-custom">
          <div class="container-fluid">
            <!-- Logo -->
            <a class="navbar-brand" href="#">
              <img src="assets/images/logo_homov.png" alt="logo HoMov" height="50rem" width="45rem" />
            </a>
            <!-- navbar toggler to collapse the navbar on mobile -->
            <button class="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <!-- navbar contents -->
            <div class="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
              <!-- empty div to center the list using and toggler at the end justify-content-between -->
              <div></div>
              <ul id="navbar-menu" class="navbar-nav mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link" aria-current="page" href="index.html">Home</a>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Movies
                  </a>
                  <ul id="dropdown-menu" class="dropdown-menu bg-custom">

                  </ul>
                <li class="nav-item">
                  <a class="nav-link" href="listing.html?booking" onclick="setMovieIdCookie()">Book</a>
                </li>
                <li class="nav-item">
                    <?php if (isset($user)): ?>
                        <a class="nav-link" href="logout.php">Logout</a>
                    <?php else: ?>
                        <a class="nav-link" href="listing.html?login">Login</a>
                    <?php endif; ?>
                </li>
              </ul>
              <!-- Dark/Light mode toggler -->
              <button id="toggle-btn" class="btn bg-custom">
                <i class="fa-solid fa-circle-half-stroke"></i>
              </button>
            </div>
          </div>
        </nav>
    </header>
    <main>
        <section class="container-fluid justify-content-center p-2">
            <h2 class="heading col text-center m-3">Hello <?= htmlspecialchars($user["firstName"]) ?></h2>
            <table id="table-booked" class="table table-bordered">
                <thead>
                    <tr>
                    <th scope="col">Movie</th>
                    <th scope="col">Email</th>
                    <th scope="col">Date/Time</th>
                    </tr>
                </thead>
                <tbody id="table-booked">
                    <?php if ($table_result): ?>
                        <?php while($row = mysqli_fetch_array($table_result)) {
                            ?>
                            <tr>
                                <td><?php $row['movie'] ?></td>
                                <td><?php $row['email'] ?></td>
                                <td><?php $row['date'] ?></td>
                            </tr>
                    <?php } ?>
                    <?php else: ?>
                        <div id='no-found' class='container'>No Results Found</div>
                    <?php endif; ?>
                </tbody>
            </table>
        </section>
    </main>
    <!-- my footer with github link and copyright that will update automatically in base to the current year -->
    <footer id="footer" class="bg-custom">
      <small>
          Copyright ©
          <span id="current-year">
            <script>
              document.getElementById("current-year").textContent = new Date().getFullYear()
            </script>
          </span>  
          Carmine P.
      </small>
      <a id="github-link" href="https://github.com/maxthor500" target="_blank">
          <i class="fa-brands fa-square-github"></i>
      </a>
    </footer>
    
    <!-- CDN Bootstrap Popper and JS -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" 
        integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js" 
        integrity="sha384-mQ93GR66B00ZXjt0YO5KlohRA5SY2XofN4zfuZxLkoj1gXtW8ANNCe9d5Y3eG5eD" crossorigin="anonymous"></script>
    <!-- JQuery CDN -->
    <script src="https://code.jquery.com/jquery-3.6.4.min.js" integrity="sha256-oP6HI9z1XaZNBrJURtCoUT5SUnxFr8s3BzRl+cbzUq8=" crossorigin="anonymous"></script>
    <!-- my scripts -->
    <script src="assets/js/scripts.js" type="text/javascript"></script>
</body>
</html>