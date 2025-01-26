<?php

$param = json_decode( $_POST[ 'param' ] );

$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = '2asir_test';

// Create connection
$conn = new mysqli( $servername, $username, $password, $dbname );

$query = 'SELECT * FROM users WHERE username = ? AND password=?';
//  buscamos en la bbdd ese usuario con su password
$stmt = $conn->prepare( $query );
$stmt->bind_param( 'ss', $param->username, $param->password );
$result = $stmt->execute();
$resultset = $stmt->get_result();

if ( $resultset->num_rows == 1 ) // erregistro bat existitzen bada datubasean
 {
    $response[ 'error' ] = false;

    session_start();
    // sesioak erabili ahal izateko ezinbesteko agindua da hau.
    $_SESSION[ 'username' ] =  $param->username;

} else // si no obtengo registro de respuesta, es que  hemos fallado con el nombre o contraseña
 {

    $response[ 'error' ] = true;
    $response[ 'errorType' ] = 'invalid username/password';

}

$stmt->close();
$conn->close();
header( 'Content-Type: application/json; charset=utf-8' );
// add dthe required header
echo json_encode( $response );
