<?php
$ldapHost="iker.net";  //$ldapHost="192.168.100.1"; se puede poner la IP o el dominio

//--  credenciales del usuario, habrá que tomarlas de un formulario, esto es sólo un ejemplo
$username="uni";  
$password="12345678";


//--  conectar con el controlador de AD
$ldap=ldap_connect($ldapHost) or die ("Could not connect to $ldapHost");
$ldaprdn='iker'.'\\'.$username;  // se le  añade al nombre de usuario el dominio
                                // el resultado sería algo así: sería iker\uni (iker es mi dominio)


//--- opciones de configuración, no tocar
ldap_set_option($ldap, LDAP_OPT_PROTOCOL_VERSION, 3);
ldap_set_option($ldap, LDAP_OPT_REFERRALS, 0);


// se comprueba el nombre de usuario u la contraseña. En caso de funcionar $bind valdtá true
$bind=@ldap_bind($ldap,$ldaprdn,$password) or die ("Could not bind to AD");
/*if ($bind)
{
    // iniciar sesion
    session_start();
    $_SESSION['usuario'] =$usuario;
    $_SESSION['rol'] =$rol;
}*/

var_dump ($bind);  // con esto imprimo el  contenido de $bind, para ver lo que contiene
?>
