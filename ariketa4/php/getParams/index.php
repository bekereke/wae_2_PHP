<?php

$params=json_decode($_POST['param']);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "2asir_test";

// Create connection
$conn = new mysqli($servername, $username, $password,$dbname);


// Check connection
if (!($conn->connect_error)) {

    $query = "INSERT INTO users VALUES (NULL,?,?,?)";  //AUTOINCREMENT DU id BALIOAK TAULAN
    $stmt = $conn->prepare($query);
    $stmt->bind_param('sss', $params->izena, $params->pasahitza, $params->enpresa);

    $result=$stmt->execute();

    $stmt->close();  // close prepared statement
    $conn->close(); // close connection

    header('Content-Type: application/json');  // add dthe required header
    //header('Content-Type: application/javascript');
	//MIRAR ESTA SENTENCIA PARA INSERTS, UPDATES Y DELETES
	//*******************************************************************************
    //$returnValue=['status'=>$result, 'id'=>$conn->insert_id];
    $returnValue=['status'=>$_POST['param']];
    echo json_encode($returnValue);
  }
else{
  die("Connection failed: " . $conn->connect_error);
}