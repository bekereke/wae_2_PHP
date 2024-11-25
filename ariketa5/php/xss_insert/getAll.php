<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "2asir_test";

// Create connection
$conn = new mysqli($servername, $username, $password,$dbname);


// Check connection
if (!($conn->connect_error)) {
    $query = "SELECT * FROM users";   
   
    $result = mysqli_query($conn,$query);
    $jsonArray= array(); // create array to store the fetched data 
    
   while ($row = $result->fetch_array(MYSQLI_ASSOC)) { 
       array_push($jsonArray,$row);
    }
    mysqli_free_result($result);
    $conn->close(); // close connec
    
    header('Content-Type: application/json; charset=utf-8');  // add dthe required header
    echo json_encode($jsonArray); //  print the json enncoded data
  }
else{
  die("Connection failed: " . $conn->connect_error);
} 
