document.addEventListener("DOMContentLoaded", function(event) {
    /*
     Nada más cargar la página,se pregunta al servidor si existe alguna sesión abierta, 
     en caso de no existir sesión, carga el formulario de login con 'loadLoginForm'
     en caso de existir, carga la bienvenida con 'loadHomePage'.
      */
    checkSession();
})

function checkSession() {
    $.ajax({
        url: "./php/checkSession.php",
        type: "POST",
        dataType: 'json',
        success: function(response) {

            if (response.exists === false) { // si no existe sesión abierta
                loadLoginForm(); // carga el formulario 
            } else { // si existe sesión abierta
                loadHomePage(response); // carga página principal
            }
        },
        error: function(xhr) {
            alert("An AJAX error occured: " + xhr.status + " " + xhr.statusText);
        }
    });
}
//-----------------------------------------------------------
function loadLoginForm() {
    // Crea un formulario de login y lo pone en la página index.html

    //crear código HTML necesario
    var myHtml = "<div class='container-sm mt-5'>";
    myHtml += "<form>";
    myHtml += " <h2>Login page </h2>";
    myHtml += "<div class='form-group col-5'><label> Username </label>";
    myHtml += "<input type='email' id='inUsername' class='form-control' required>";
    myHtml += "</div>";
    myHtml += "<div class='form-group col-5'><label>Password</label>";
    myHtml += " <input type='password' id='inPassword' class='form-control' required>";
    myHtml += " </div>";
    myHtml += "<div class='form-group mt-2'> <button type='button' id='btnLogin' class='btn btn-info'>Login</button>";
    myHtml += "</div>";
    myHtml += "</form>";
    myHtml += "</div>";
    // poner este código en la web
    document.getElementById('divMain').innerHTML = myHtml;
    // agregar los ventlistener para el botón

    document.getElementById('btnLogin').addEventListener("click", validar);

}
//---------------------------------------------------
function loadHomePage(session) {
    /* Esta función monta la página principal si estamos logueados, lo  que hace es pedir una lista de usuarios
       al servidor por ajax y mostrarla en una tabla con estilo stripped de bootstrap.
       También crea una especie de cabecero con un botón para finalizar la sesión
    */

    var myHtml = "<div>";
    myHtml += "<div><img src='./img/" + session.username + ".png' width='50' height='50'><h5>Hello, " + session.username + "</h5></div>";
    myHtml += "<div><button type='button' id='btnLogout' class='btn btn-secondary'>Logout</button></div>";
    myHtml += "</div>";
    // poner este código en la web
    document.getElementById('divMain').innerHTML = myHtml;
    // --- ahora se cargará la lista de usuarios de la bbdd. Podríamos añadir cualquier cosa 
    $.ajax({
        url: "./php/getUsers.php",
        type: "POST",
        dataType: 'json',
        success: function(response) {
            var myHtml = "<div><table>";
            myHtml += "<tr><th>Username</th><th>Company</th>";
            for (var i = 0; i < response.length; i++) {
                myHtml += "<tr><td>" + response[i].username + "</td><td>" + response[i].company + "</td></tr>";
            }
            myHtml += "</table></div>";
            document.getElementById('divMain').innerHTML += myHtml;
            // ahora le damos funcionalidad al botón de logout
            document.getElementById('btnLogout').addEventListener('click', logout);
        },
        error: function(xhr) {
            alert("An AJAX error occured: " + xhr.status + " " + xhr.statusText);
        }
    });

}
//--------------------------------------------------
function logout() {
    $.ajax({
        url: "./php/logout.php",
        success: function() {
            checkSession(); // se ejecuta el chequeo de sesión, 
            // como /logout.php habrá eliminado la variable de sesión,se cargará el formulario de login.
        },
        error: function(xhr) {
            alert("An AJAX error occured: " + xhr.status + " " + xhr.statusText);
        }
    });
}
//-------------------------------------------------
function validar() {

    var loginData = {
        'username': document.getElementById('inUsername').value,
        'password': document.getElementById('inPassword').value
    }


    $.ajax({
        url: "./php/login.php",
        type: "POST",
        data: { param: JSON.stringify(loginData) },
        dataType: 'json',
        success: function(response) {
            if (response.error === true) {
                alert(response.errorType);
            } else {
                checkSession();
            }
        },
        error: function(xhr) {
            alert("An AJAX error occured: " + xhr.status + " " + xhr.statusText);
        }
    });


}