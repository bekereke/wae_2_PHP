<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "2asir_test";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    //$conn->close();
    //echo "Connected successfully<br>";
}

$query = "SELECT * FROM users";

$stmt = $conn->prepare($query);
$stmt->execute();
$resultset = $stmt->get_result();

$batura = 0;

for ($i=0; $i<$resultset->num_rows; $i++) {
    $row = $resultset->fetch_assoc();
    //01:
    //echo $row["username"]; //nahi dena inprimatu
    //echo "username: ".$row["username"]." -company: ".$row["company"]."<br>";
    //var_dump($row); //lerro osoa inprimatzen du
    $batura = $batura + $row["id"]; //$batura += $row["id"];
}
echo "Guztira: ".$batura;

$conn->close();

?>