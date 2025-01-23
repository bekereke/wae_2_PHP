
<?php
 
// Program to illustrate base64_decode()
// function

$str = 'uni eibar ermua';
 
$encoded=base64_encode($str);
echo "<br>Encoded:$encoded";

echo "Decoded: ".base64_decode($encoded);
?>
