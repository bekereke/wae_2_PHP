<?php

//SQL INJECTION ERASO POSIBLEAK:
// 1 OR 1 = 1 #
// 1; SELECT table_name,NULL FROM information_schema.tables #

//$idParam=json_decode($_POST['param']);
//$idParam=json_decode($_GET['param']);
$idParam=$_GET['param'];

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "2asir_test";

// Create connection
$conn = new mysqli($servername, $username, $password,$dbname);

//SQL INJECTION ERASO BATZUK:
//SELECT * FROM information_schema.tables; #



// Check connection
if (!($conn->connect_error)) {
    //$query = "SELECT * FROM users WHERE id = $idParam->id;";   // $query is a simple variable (string)
    $query = "SELECT * FROM users WHERE id = $idParam AND username='aitor';";   // $query is a simple variable (string)

    if (mysqli_multi_query($conn, $query)) {
      $jsonArray = array(); // create array to store the fetched data
      do {
        /* almacenar primer juego de resultados */
        if ($result = mysqli_store_result($conn)) {
            while ($row = mysqli_fetch_row($result)) {
              array_push($jsonArray, $row);
            }
            mysqli_free_result($result);
        }
        if (mysqli_more_results($conn)) {
          array_push($jsonArray, "--------------------------");
        }
      } while (mysqli_next_result($conn));
    }

    $conn->close(); // close connec

    header('Content-Type: application/json; charset=utf-8');  // add dthe required header
	//MIRAR ESTA SENTENCIA PARA INSERTS, UPDATES Y DELETES
	//*******************************************************************************
	//$returnValue=['status'=>$result];
    echo json_encode($jsonArray); //  print the json enncoded data
  }
else{
  die("Connection failed: " . $conn->connect_error);
}
