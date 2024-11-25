<?php
$param=json_decode($_POST['param']); 

$danaondo=true;

//---  email  ---------------------
$param->email = filter_var($param->email, FILTER_SANITIZE_EMAIL);
if (filter_var($param->email, FILTER_VALIDATE_EMAIL) == false) {
    $danaondo=false;  
};
//---    username -----------------
$pattern="/^[0-9a-zA-Z]+$/";
if (preg_match($pattern,$param->username)!=1){
    $danaondo=false;
};
//---  number  -----------------------
if (filter_var($param->number, FILTER_VALIDATE_INT) == false) {
    $danaondo=false;
};
//---  message  ---------------------
$message=str_ireplace("#"," ",$param->message);
if (strlen($message)>40)
{
    $danaondo=false;
}
//---   insert  ---------------------
if ($danaondo==true)
{
    // Create connection
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "2asir_balidazioa";
    $conn = new mysqli($servername, $username, $password,$dbname);

    if (!($conn->connect_error)) {

        $query ="INSERT INTO messages (email, username, number, message) VALUES (?,?,?,?)";
        $stmt = $conn->prepare($query);  // create a query statement 'controller' (variable name $stmt)
        $stmt->bind_param('ssis', $param->email,$param->username,$param->number,$param->message);  // 'i': integer
        $result=$stmt->execute();
        $stmt->close();  // close prepared statement
        $conn->close(); // close connection
    
        $returnValue=['status'=>"Datuak ongi sartu dira"];
    }else{
        $returnValue=['status'=>"Konexio errorea"];
    }
}else{
    $returnValue=['status'=>"Datuak gaizki daude"];
}
header('Content-Type: application/json');  
echo json_encode($returnValue); 