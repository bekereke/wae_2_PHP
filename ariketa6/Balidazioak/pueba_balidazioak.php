<?php

//$param=json_decode($_POST['param']); 
//$param->numero;
// ---   check filter emails
$email = "john.doe@example.com";

// Remove all illegal characters from email
$email = filter_var($email, FILTER_SANITIZE_EMAIL);

// Validate e-mail
if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    $danaondo=false;
    echo("<p>$email is not a valid email address</p>");  
} else {
    echo("<p>$email is a valid email address</p>");  
};

// ---   check filter integer
$int = 02;

if (filter_var($int, FILTER_VALIDATE_INT) === false) {
    echo("<p>$int Integer is not valid</p>");
} else {
    echo("<p>$int Integer is valid</p>");
};


// ---   check filter only letters and numbers

$pattern="/^[0-9a-zA-Z]+$/";

$data="23rd@@qqq";

if (preg_match($pattern,$data)==1){
    echo("<p>$data Only contains letters and numbers</p>");
} else {
    echo("<p>$data contains illegal symbols</p>");
};



$str="Is Peter <smart>## & funny?";

var_dump(filter_var($str,FILTER_SANITIZE_SPECIAL_CHARS));
?>