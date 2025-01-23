<?php

$idParametros=json_decode($_POST['parametros']);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "2asir_test";

// Create connection
$conn = new mysqli($servername, $username, $password,$dbname);


// Check connection
if (!($conn->connect_error)) {
	$idbusq = $idParametros->id;
	$empbusq = $idParametros->empresa;
	$bolId = false;
	$bolEmp = false;
	// $query is a simple variable (string)
	//$query = "SELECT * FROM users WHERE id = ?";
    //$query = "SELECT * FROM users WHERE empresa = ?";
	//$query = "SELECT * FROM users WHERE id = ? AND empresa = ?";
	$query = "SELECT * FROM users WHERE";
	if($idbusq <> ''){
		$query = $query . " id = ?";
		$bolId = true;
	}
	if($empbusq <> ''){
		if($bolId){
			$query = $query . " AND ";
		}
		$bolEmp =  true;
		$query = $query . " company = ?";
	}
    // prepare statement
    $stmt = $conn->prepare($query);  // create a query statement 'controller' (variable name $stmt)
    //PARA EL PRIMER PARAMETRO MIRAR LA URL Mysqli-stmt_bind_params de los apuntes
	//*******************************************************************************
	if ($bolId && $bolEmp){
		$stmt->bind_param('is', $idParametros->id, $idParametros->empresa);  // 'i': integer
	}elseif($bolId){
		$stmt->bind_param('i', $idParametros->id);  // 'i': integer
	}else{
		$stmt->bind_param('s', $idParametros->empresa);  // 'i': integer
	}
    $result=$stmt->execute();

	//*****************BLOQUE DE CODIGO NO NECESARIO PARA INSERTS, UPDATES Y DELETES. ¿¿Por qué??
    $resultset = $stmt->get_result(); // get the mysqli resultset
    $jsonArray= array(); // create array to store the fetched data

    for ($i = 0; $i<$resultset->num_rows; $i++) {
       $row = $resultset->fetch_assoc(); // fetch each register (table row)
       array_push($jsonArray,$row);
    }
	/*********************************************************************************************/

     $stmt->close();  // close prepared statement
     $conn->close(); // close connection

    header('Content-Type: application/json; charset=utf-8');  // add dthe required header
	//MIRAR ESTA SENTENCIA PARA INSERTS, UPDATES Y DELETES
	//*******************************************************************************
	//$returnValue=['status'=>$result];
    echo json_encode($jsonArray); //  print the json enncoded data
  }
else{
  die("Connection failed: " . $conn->connect_error);
}