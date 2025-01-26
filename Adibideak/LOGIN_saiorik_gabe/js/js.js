document.addEventListener("DOMContentLoaded", function(event) {
  loadLoginForm();

})

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

    document.getElementById('btnLogin').addEventListener("click", validate);

}
//---------------------------------------------------
function loadHomePage(username) {

    var myHtml = "<div>";
    myHtml+="<h1>HELLO "+username+"</h1>";
    myHtml += "</div>";
    document.getElementById('divMain').innerHTML = myHtml;
    
}

//-------------------------------------------------
function validate() {

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
               loadHomePage(response.username);
            }
        },
        error: function(xhr) {
            alert("An AJAX error occured: " + xhr.status + " " + xhr.statusText);
        }
    });


}