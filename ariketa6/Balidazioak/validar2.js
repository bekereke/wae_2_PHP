document.addEventListener("DOMContentLoaded", function(event) {

    document.getElementById('btnSave').addEventListener("click", validar);
})

function validar() {
    //-------- validar nombre de usuario
    var dato = document.getElementById('inUsername').value;
    if (nombre_valido(dato) === true) {
        alert("Nombre válido");
    } else {
        alert("Nombre no válido");
    }
    //-------- validar el numero entero
    dato = document.getElementById('inNumber').value;
    if (es_entero(dato) === true) {
        alert("Number válido");
    } else {
        alert("Number no válido");
    }
    //-------   validar mensaje
    dato = document.getElementById('inMessage').value;
    if (mensaje_valido(dato) === true) {
        alert("mensaje válido");
    } else {
        alert("mensaje no válido");
    }
    //-------   validar email
    dato=document.getElementById('inEmail1').value;
    if (email_valido(dato) === true) {
        alert("Email OK");
    } else {
        alert("emaila gaizki dago");
    }

}


function es_entero(dato) {
    //Si no existe cadena (vacía) no será válida y obviamente la existencia de una letra o carácter especial, 
    //tampoco dará como verdadero o válido.

    var valoresAceptados = /^[0-9]+$/;
    var result;

    if (dato.match(valoresAceptados)) {
        result = true;
    } else {
        result = false;
    }
    return result;
}


function nombre_valido(dato) {
    //Si no existe cadena (vacía) no será válida y obviamente la existencia de una letra o carácter especial, 
    //tampoco dará como verdadero o válido.

    var valoresAceptados = /^[0-9a-zA-Z]+$/;
    var result;

    if (dato.match(valoresAceptados)) {
        result = true;
    } else {
        result = false;
    }
    return result;
}

function mensaje_valido(dato) {
    var result;

    if (dato.length < 41) {
        result = true;
        document.getElementById('inMessage').value = dato.replace(/\#/g, "");
    } else {
        result = false;
    }
    return result;
}

function email_valido(dato)
{
    var pattern =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    if (pattern.test(dato))
    {
         result = true;
    }
    else{
        result = false;
    }
    return result;

}