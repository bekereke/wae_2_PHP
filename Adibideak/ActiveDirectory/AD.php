<?php
$ldapHost="ldap.forumsys.com";  //$ldapHost="192.168.100.1"; se puede poner la IP o el dominio

//--  credenciales del usuario, habrá que tomarlas de un formulario, esto es sólo un ejemplo
//$username="uni";

//--  conectar con el controlador de AD
$ldap_con = ldap_connect ($ldapHost, 389) or die ("Ez da lortu konexiorik $ldapHost domeinuarekin");
//$ldap_dn='iker'.'\\'.$username;  // se le  añade al nombre de usuario el dominio
                                // el resultado sería algo así: sería iker\uni (iker es mi dominio)
$ldap_dn = "cn=read-only-admin,dc=example,dc=com";
$ldap_password = "password";


//--- opciones de configuración, no tocar
ldap_set_option($ldap_con, LDAP_OPT_PROTOCOL_VERSION, 3);
ldap_set_option($ldap_con, LDAP_OPT_REFERRALS, 0);


// se comprueba el nombre de usuario u la contraseña. En caso de funcionar $bind valdtá true
$bind=@ldap_bind($ldap_con,$ldap_dn,$ldap_password) or die ("Ezin sartu AD bidez");
if ($bind) {
    print "Ldap sarbide arrakastatsua: ";

    // @ datuak jaso

    $filter = ("uid=newton");

    $results = ldap_search($ldap_con, "dc=example,dc=com", $filter);

    $search_result = ldap_get_entries($ldap_con, $results);

    var_dump($search_result);

    // @ bukatu datuak jasotzen
    /*
    // iniciar sesion
    session_start();
    $_SESSION['usuario'] =$usuario;
    $_SESSION['rol'] =$rol;
     */
}

//var_dump ($bind);  // con esto imprimo el  contenido de $bind, para ver lo que contiene
?>
