//INSERT INFO

document.addEventListener("DOMContentLoaded", function(event) {


    document.getElementById('btnInsertar').addEventListener("click", badinsert);
})


function badinsert(){

    var textoaddress1 = document.getElementById('Emailaddress').value;
    var textoaddress2 = document.getElementById('RepeatEmailaddress').value;
    var textousername = document.getElementById('Username').value;
    var textonumber = document.getElementById('Number').value;
    var textomessage = document.getElementById('Message').value;
    let sartu =true;

    if (textoaddress1.trim() !== textoaddress2.trim()) {
        alert("Helbideak ez dira berdinak");
        sartu = false;
    }
    if (textoaddress1.trim() == "") {
        alert("Bete lehenengo hutsunea.");
        sartu=false;
    }
    if (textoaddress2.trim() == "") {
        alert("Bete bigarren hutsunea.");
        sartu=false;
    }
    if (textousername.trim() == "") {
        alert("Bete hirugarren hutsunea.");
        sartu=false;
    }
    if (textonumber.trim() == "") {
        alert("Bete laugarren hutunea.");
        sartu=false;
    }
    if (textomessage.trim() == "") {
        alert("Bete bostgarren hutzunea.");
        sartu=false;
    }
    if (sartu) {
        insert();
    }
}
function insert(){
    console.log("Entra en la funcion insert");

    var address1 = document.getElementById('Emailaddress').value;
    var address2 = document.getElementById('RepeatEmailaddress').value;
    var username = document.getElementById('Username').value;
    var number = document.getElementById('Number').value;
    var message = document.getElementById('Message').value;

    var idDatos = {'Emailaddress':address1, 'RepeatEmailaddress':address2, 'Username':username, 'Number':number, 'Message':message};

        $.ajax({
            url: "./php/index.php",
            type: 'POST',
            data: { param :JSON.stringify(idDatos)},
            dataType: 'json',
            success: function (response) {
            },
            error: function (xhr) {
                alert('Error en la inserción: ' + xhr.status + ' ' + xhr.statusText);
            }
        });
    }
