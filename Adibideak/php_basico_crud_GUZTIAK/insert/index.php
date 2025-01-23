<?php

$idParam=json_decode($_POST['param']);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "2asir_test";

// Create connection
$conn = new mysqli($servername, $username, $password,$dbname);

// Check connection
if (!($conn->connect_error)) {
    $query = "INSERT INTO users (username, password, company) VALUES(?,?,?)";   // $query is a simple variable (string)
    $stmt = $conn->prepare($query);  // prepare statement
	//PARA EL PRIMER PARAMETRO MIRAR LA URL Mysqli-stmt_bind_params de los apuntes
    $stmt->bind_param('sss', $idParam->username, $idParam->password, $idParam->company);  // create a query statement 'controller' (variable name $stmt)
    $result=$stmt->execute();
    $stmt->close();  // close prepared statement
    $conn->close(); // close connection

	header('Content-Type: application/json');  // add the required header
    $returnValue=['status'=>$result];  // in our example is alway success :-))
    echo json_encode($returnValue); //  print the json enncoded data:success or error */

  }
else{
  die("Connection failed: " . $conn->connect_error);
}

?>