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
    $query = "UPDATE users SET username = ?, password= ?, company=? WHERE id = ?";   // $query is a simple variable (string)
       // prepare statement
    $stmt = $conn->prepare($query);  // create a query statement 'controller' (variable name $stmt)
    //PARA EL PRIMER PARAMETRO MIRAR LA URL Mysqli-stmt_bind_params de los apuntes
    $stmt->bind_param('sssi',$idParam->username,$idParam->password,$idParam->company, $idParam->id);  // 'i': integer
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