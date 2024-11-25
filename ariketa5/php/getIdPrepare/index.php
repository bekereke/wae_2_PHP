<?php

$idParam=$_GET['param'];  //get edo post eran bidali denaren arabera
//$idParam=json_decode($_POST['param']);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "2asir_test";

// Create connection
$conn = new mysqli($servername, $username, $password,$dbname);


// Check connection
if (!($conn->connect_error)) {
    $query = "SELECT * FROM users WHERE id = ?";   // $query is a simple variable (string)
       // prepare statement
    $stmt = $conn->prepare($query);  // create a query statement 'controller' (variable name $stmt)

    $stmt->bind_param('i', $idParam);  // 'i': integer
    $result=$stmt->execute();

    $resultset = $stmt->get_result(); // get the mysqli resultset
    $jsonArray= array(); // create array to store the fetched data

    for ($i = 0; $i<$resultset->num_rows; $i++) {
       $row = $resultset->fetch_assoc(); // fetch each register (table row)
       array_push($jsonArray,$row);
    }
     $stmt->close();  // close prepared statement
     $conn->close(); // close connection

    header('Content-Type: application/json; charset=utf-8');  // add dthe required header
    echo json_encode($jsonArray); //  print the json enncoded data
  }
else{
  die("Connection failed: " . $conn->connect_error);
}