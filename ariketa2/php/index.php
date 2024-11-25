
<?php


/*------------
// more info https://isabelcastillo.com/mysqli-delete
---*/



// read id via post and decode the json format
$param=json_decode($_POST['param']); 


// Create connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "2asir_test";
$conn = new mysqli($servername, $username, $password,$dbname);

// Check connection
if (!($conn->connect_error)) {
   
    $query = "DELETE FROM users WHERE id = ?";   // $query is a simple variable (string)
     // prepare statement
    $stmt = $conn->prepare($query);  // create a query statement 'controller' (variable name $stmt)
    
    $stmt->bind_param('i', $param->id);  // 'i': integer
    $result=$stmt->execute();
  
    $stmt->close();  // close prepared statement
    $conn->close(); // close connection
    
    header('Content-Type: application/json');  // add the required header
    $returnValue=['status'=>$_POST['param']];  // in our example is alway success :-)) 
    echo json_encode($returnValue); //  print the json enncoded data:success or error 
  }
else{
  die("Connection failed: " . $conn->connect_error);
} 