<?php
// js-k bidalitakoa irakurri
$datuak=json_decode($_POST["param"]);

// filtratu
$danaondo=true;
if (filter_var($datuak->zenbaki, FILTER_VALIDATE_INT) == false) {
    $danaondo=false;
}
$patroia="/^[a-zA-Z\s]+$/";
if (!preg_match($patroia, $datuak->hitza)) {
    $danaondo=false;
}
// dena ondo badago orduan datuak sartu
if ($danaondo==true)
{
    // datubaseko datuak sartu
    $servername = 'localhost';
    $username = 'root';
    $password = '';
    $dbname = '2asir_balidazioa';

    /*
CREATE DATABASE 2asir_balidazioa;

USE 2asir_balidazioa;

CREATE TABLE taula (
    zenbaki INT,
    hitza VARCHAR(100) NOT NULL,
    Number INT
);
*/
    // Create connection
    $conn = new mysqli( $servername, $username, $password, $dbname);

    if (!($conn->connect_error)) {
        $query ="INSERT INTO taula (zenbaki, hitza) VALUES (?,?)";
        $stmt = $conn->prepare($query);  // create a query statement 'controller' (variable name $stmt)
        $stmt->bind_param('is', $datuak->zenbaki,$datuak->hitza);  // 'i': integer
        $result=$stmt->execute();
        $stmt->close();  // close prepared statement
        $conn->close(); // close connection
        $returnValue=['erantzuna'=>"Datuak ongi sartu dira"]; // js-ri bidaliko diogun erantzuna prestatu
    }else{
        $returnValue=['erantzuna'=>"Konexio errorea"];// js-ri bidaliko diogun erantzuna prestatu
    }
}else{
    $returnValue=['erantzuna'=>"Datu txarrak jaso dira."];
}

header('Content-Type: application/json');
echo json_encode($returnValue); // js-ri erantzun bat bidali