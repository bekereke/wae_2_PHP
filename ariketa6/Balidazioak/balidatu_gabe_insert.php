<?php
$param=json_decode($_POST['param']);

    // Create connection
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "2asir_balidazioa";
    $conn = new mysqli($servername, $username, $password,$dbname);

    if (!($conn->connect_error)) {

        $query ="INSERT INTO data (Email, Username, Number, Message) VALUES (?,?,?,?)";
        $stmt = $conn->prepare($query);  // create a query statement 'controller' (variable name $stmt)
        $stmt->bind_param('ssis', $param->email,$param->username,$param->number,$param->message);  // 'i': integer
        $result=$stmt->execute();
        $stmt->close();  // close prepared statement
        $conn->close(); // close connection

        $returnValue=['status'=>"Datuak ongi sartu dira"];
    }else{
        $returnValue=['status'=>"Konexio errorea"];
    }

header('Content-Type: application/json');
echo json_encode($returnValue);