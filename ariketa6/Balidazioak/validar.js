document.addEventListener("DOMContentLoaded", function(event) {

    document.getElementById('btnBalidatu').addEventListener("click", validar);
    document.getElementById('btnBidali').addEventListener("click", validarEnviar);
    document.getElementById('btnBidaliKonprobatuGabe').addEventListener("click", enviarNoValidar);
})

//----------------------------------------------------------------------------------------------
function validar() {

    var arrInputs = document.getElementsByClassName('form-control');
    var arrResultados = []; // save the true/false validations

    //-------------------------EMAIL 1 ------------------------------------

    if (!val_email(arrInputs[0].value)) {
        document.getElementById('inEmail1').classList.remove('is-valid');
        document.getElementById('inEmail1').classList.add('is-invalid');
        arrResultados[0] = false;
    } else {
        document.getElementById('inEmail1').classList.remove('is-invalid');
        document.getElementById('inEmail1').classList.add('is-valid');
        arrResultados[0] = true;
    };
    //-------------------------EMAIL 2 ------------------------------------
    //---   firs validate email and then compare two emails
    if ((!val_email(arrInputs[1].value)) || (arrInputs[1].value) != (arrInputs[0].value)) {
        document.getElementById('inEmail2').classList.remove('is-valid');
        document.getElementById('inEmail2').classList.add('is-invalid');
        arrResultados[1] = false;
    } else {
        document.getElementById('inEmail2').classList.remove('is-invalid');
        document.getElementById('inEmail2').classList.add('is-valid');
        arrResultados[1] = true;
    };

    //------------------------- USERNAME ------------------------------------------
    if (!val_not_special(arrInputs[2].value)) {
        document.getElementById('inUsername').classList.remove('is-valid');
        document.getElementById('inUsername').classList.add('is-invalid');
        arrResultados[2] = false;
    } else {
        document.getElementById('inUsername').classList.remove('is-invalid');
        document.getElementById('inUsername').classList.add('is-valid');
        arrResultados[2] = true;
    };


    //----------------------   NUMBER ----------------------------------------

    if (!val_integer(arrInputs[3].value)) {
        document.getElementById('inNumber').classList.remove('is-valid');
        document.getElementById('inNumber').classList.add('is-invalid');
        alert("Error");
        arrResultados[3] = false;
    } else {
        document.getElementById('inNumber').classList.remove('is-invalid');
        document.getElementById('inNumber').classList.add('is-valid');
        alert("BIEN");
        arrResultados[3] = true;
    };

    //-----------------    MESSAGE-----------------------------------------------

    if (!val_message(arrInputs[4].value)) {
        document.getElementById('inMessage').classList.remove('is-valid');
        document.getElementById('inMessage').classList.add('is-invalid');
        arrResultados[4] = false;
    } else {

        document.getElementById('inMessage').classList.remove('is-invalid');
        document.getElementById('inMessage').classList.add('is-valid');
        //   now remove the # symbol
        arrResultados[4] = true;
        arrInputs[4].value = arrInputs[4].value.replace("#", "");
        document.getElementById('inMessage').value = arrInputs[4].value;

    };
   }
//----------------------------------------------------------------------------------------------
function validarEnviar() {

    var arrInputs = document.getElementsByClassName('form-control');
    var arrResultados = []; // save the true/false validations

    //-------------------------EMAIL 1 ------------------------------------

    if (!val_email(arrInputs[0].value)) {
        document.getElementById('inEmail1').classList.remove('is-valid');
        document.getElementById('inEmail1').classList.add('is-invalid');
        arrResultados[0] = false;
    } else {
        document.getElementById('inEmail1').classList.remove('is-invalid');
        document.getElementById('inEmail1').classList.add('is-valid');
        arrResultados[0] = true;
    };
    //-------------------------EMAIL 2 ------------------------------------
    //---   firs validate email and then compare two emails
    if ((!val_email(arrInputs[1].value)) || (arrInputs[1].value) != (arrInputs[0].value)) {
        document.getElementById('inEmail2').classList.remove('is-valid');
        document.getElementById('inEmail2').classList.add('is-invalid');
        arrResultados[1] = false;
    } else {
        document.getElementById('inEmail2').classList.remove('is-invalid');
        document.getElementById('inEmail2').classList.add('is-valid');
        arrResultados[1] = true;
    };

    //------------------------- USERNAME ------------------------------------------
    if (!val_not_special(arrInputs[2].value)) {
        document.getElementById('inUsername').classList.remove('is-valid');
        document.getElementById('inUsername').classList.add('is-invalid');
        arrResultados[2] = false;
    } else {
        document.getElementById('inUsername').classList.remove('is-invalid');
        document.getElementById('inUsername').classList.add('is-valid');
        arrResultados[2] = true;
    };


    //----------------------   NUMBER ----------------------------------------

    if (!val_integer(arrInputs[3].value)) {
        document.getElementById('inNumber').classList.remove('is-valid');
        document.getElementById('inNumber').classList.add('is-invalid');
        alert("Error");
        arrResultados[3] = false;
    } else {
        document.getElementById('inNumber').classList.remove('is-invalid');
        document.getElementById('inNumber').classList.add('is-valid');
        alert("BIEN");
        arrResultados[3] = true;
    };

    //-----------------    MESSAGE-----------------------------------------------

    if (!val_message(arrInputs[4].value)) {
        document.getElementById('inMessage').classList.remove('is-valid');
        document.getElementById('inMessage').classList.add('is-invalid');
        arrResultados[4] = false;
    } else {

        document.getElementById('inMessage').classList.remove('is-invalid');
        document.getElementById('inMessage').classList.add('is-valid');
        //   now remove the # symbol
        arrResultados[4] = true;
        arrInputs[4].value = arrInputs[4].value.replace("#", "");
        document.getElementById('inMessage').value = arrInputs[4].value;

    };
    //------     send the information, if arrResultados only contains true values-----------/
    var noerrors=true;
    for (var i=0;i<arrResultados.length && noerrors==true;i++)
    {
        if (arrResultados[i]==false)
        {
            noerrors=false;
        }
    }
    if (noerrors==true)
    {
        var datuak = {'email':arrInputs[0].value,
        'username':arrInputs[2].value,
        'number':arrInputs[3].value,
        'message':arrInputs[4].value};

        $.ajax({
            url: "./insert.php",
            type: "POST",
            data: { param: JSON.stringify(datuak) },
            // dataType: 'json',
            success: function(response) {
                alert (response.status);

            },
            error: function(xhr) {
                alert("An AJAX error occured: " + xhr.status + " " + xhr.statusText);
            }
        });
    }
}

//----------------------------------------------------------------------------------------------
function enviarNoValidar() {

    var arrInputs = document.getElementsByClassName('form-control');
    var datuak = {'email':arrInputs[0].value,
        'username':arrInputs[2].value,
        'number':arrInputs[3].value,
        'message':arrInputs[4].value};

    $.ajax({
            url: "./balidatu_gabe_insert.php",
            type: "POST",
            data: { param: JSON.stringify(datuak) },
            dataType: 'json',
            success: function(response) {
                // alert (response.status);
                console.log(response);
            },
            error: function(xhr) {
                alert("An AJAX error occured: " + xhr.status + " " + xhr.statusText);
            }
    });



}
//*********************************************************************************** */


function val_email(value) {
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,3})+$/;
    var result;

    if (regex.test(value)) {
        result = true;
    } else {
        result = false;
    }
    return result;
}


//-----------------------  true if only numbers-------------------
function val_integer(value) {
    //Si no existe cadena (vacía) no será válida y obviamente la existencia de una letra o carácter especial,
    //tampoco dará como verdadero o válido.

    var valoresAceptados = /^[0-9]+$/;
    var result;

    if (value.match(valoresAceptados)) {
        result = true;
    } else {
        result = false;
    }
    return result;

}
//--------------------- true if only numbers and letters  ---------
function val_not_special(value) {

    var valoresAceptados = /^[0-9a-zA-Z]+$/;
    var result;

    if (value.match(valoresAceptados)) {
        result = true;
    } else {
        result = false;
    }
    return result;
}

//---------------------- true if <40char --------------

function val_message(value) {
    var result;

    if (value.length < 40) {
        result = true;
    } else {
        result = false;
    }
    return result;
}