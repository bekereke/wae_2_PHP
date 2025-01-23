<?php

$datua = json_decode($_POST["param"]);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "2asir_balidazioa";

/*
CREATE DATABASE 2asir_balidazioa;

USE 2asir_balidazioa;

CREATE TABLE data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Email VARCHAR(255) NOT NULL,
    Username VARCHAR(100) NOT NULL,
    Number INT,
    Message TEXT
);
*/

$conn = new mysqli($servername, $username, $password, $dbname);

if (!($conn->connect_error)) {

    $query= "INSERT INTO data(Email, Username, Number, Message) VALUES (?, ?, ?, ?);";

    $stmt = $conn->prepare($query);
    //$hash=password_hash($datua->Message, PASSWORD_DEFAULT);
    $stmt->bind_param('sssis', $datua->Emailaddress, $datua->RepeatEmailaddress, $datua->Username, $datua->Number, $datua->Message);

    $result=$stmt->execute();

    $stmt->close();
    $conn->close();

    header('Content-Type: application/json');
    $returnValue=['status'=>$_POST['param']];
    echo json_encode($returnValue);
}
else{
  die("Connection failed: " . $conn->connect_error);
}