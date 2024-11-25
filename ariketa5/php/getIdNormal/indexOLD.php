<?php
//  Injección: http://localhost/2021-2022/ASIR-2/SEGUR/getIdNormal/?param=2%20or%201=1
// 2 OR 1=1; DROP TABLE users

//$idParam=$_GET['param']; //get edo post eran bidali denaren arabera
$idParam=json_decode($_POST['param']);


$servername = "localhost";
$username = "root";
$password = "";
$dbname = "2asir_test";

// Create connection
$conn = new mysqli($servername, $username, $password,$dbname);


// Check connection
if (!($conn->connect_error)) {
    $query = "SELECT * FROM users WHERE id = $idParam";

    $result = mysqli_query($conn,$query);
    $jsonArray= array(); // create array to store the fetched data

   while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
       array_push($jsonArray,$row[0]);
    }
    mysqli_free_result($result);
    $conn->close(); // close connec

    header('Content-Type: application/json; charset=utf-8');  // add dthe required header
    echo json_encode($jsonArray); //  print the json enncoded data
  }
else{
  die("Connection failed: " . $conn->connect_error);
}

