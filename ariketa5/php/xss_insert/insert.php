<?php

// Create connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "2asir_test";
$conn = new mysqli($servername, $username, $password,$dbname);

// Check connection
if (!($conn->connect_error)) {

    //read parameter
    $param=json_decode($_POST['param']); 
    $query = "INSERT INTO users(username,password,company) VALUES ('$param->username','$param->password','$param->company')";   // $query is a simple variable (string)
     
    // execute the query without prepared statements
    mysqli_query($conn,$query);
    $conn->close(); // close connection
  }
else{
  die("Connection failed: " . $conn->connect_error);
} 