<?php

  // The plain text password to be hashed
  $plaintext_password = "12345678";

  // The hash of the password that
  // can be stored in the database
  //$hash = password_hash($plaintext_password,PASSWORD_DEFAULT);
  $hash = password_hash($plaintext_password,PASSWORD_ARGON2I);  //gaur gaurkoz algoritmo onentsuena

  // Print the generated hash
  echo "<br>$plaintext_password generated hash: $hash";

  $verify = password_verify($plaintext_password, $hash );

  if ($verify==true) {
    echo '<br>Password Verified!';
    }
    else {
    echo '<br>Incorrect Password!';
    }

?>