document.addEventListener("DOMContentLoaded", function(event) {

		//alert("Entra en jsFunciones.js");
        load_data();
        //document.getElementById('btnBuscarId').addEventListener("click", funcBuscar);
		//document.getElementById('btnDeleteId').addEventListener("click", del_data);
		//document.getElementById('btnUpdate').addEventListener("click", update_data);
		document.getElementById('btnInsert').addEventListener("click", insert_data);
    })
    //----------------------------------------------------------------------------------

/*****************************************INSERT**************************************************/
function insert_data(){
    console.log("insert_data funtzioan sartuta");

    var enp= document.getElementById('inEnp').value;
	var ize= document.getElementById('inIze').value;
    var pas= document.getElementById('inPas').value;

    if((enp.trim().length != 0) && (ize.trim().length != 0) && (pas.trim().length != 0) ){
        //Se pueden pasar varios parametros. Deben ir separados por comas, siguiendo la misma estructura clave:valor
        var idJson = { 'izena': ize, 'pasahitza': pas, 'enpresa': enp };
        //  console.log(idJson);
        $.ajax({
            url: "./php/getParams/",
            type: "POST",
            data: { param: JSON.stringify(idJson) },
            dataType: 'json',
            success: function(response) {
                //console.log("Sartutako id berria:"+response.id);
                //console.log("Zuzen sartu da balioa.");
                alert("Zuzen sartu da balioa: "+response.status);
            },
            error: function(xhr) {
                alert("An AJAX error occured: " + xhr.status + " " + xhr.statusText);
            }
        });
    } else {
        alert("Ez dituzu eremu guztiak bete. Saiatu berriz");
    }
}



/********************************funtzioen bideratzailea******************************************/
    function funcBuscar(){
        texto_id = document.getElementById('inId').value;
        texto_emp = document.getElementById('inEmp').value;
        if((texto_id.trim().length == 0) && (texto_emp.trim().length == 0) ){
            load_data();
        } else {
            //sel_id();
            sel_param();
        }
    }

/*****************************SELECT POR DOS PARAMETROS*******************************************/
function sel_param() {
	console.log("Entra en la funcion sel_param");
	var numIdBuscar= document.getElementById('inId').value;
    var empresaBuscar= document.getElementById('inEmp').value;
	//Se pueden pasar varios parametros. Deben ir separados por comas, siguiendo la misma estructura clave:valor
    var idJson = { 'id': numIdBuscar, 'empresa': empresaBuscar };
    //  console.log(idJson);
    $.ajax({
		url: "./php/getParams/",
        type: "POST",
        data: { param: JSON.stringify(idJson) },
        dataType: 'json',
        success: function(response) {
            // alert (response.status);
			console.log(response);
			var myHtml = "";
			document.getElementById("divMain").innerHTML = myHtml;
            document.getElementById("divMensaje").innerHTML = myHtml;
			if(response.length==0){
				myHtml = "<p> El registro seleccionado no se encuentra registrado en la base de datos.</p>";
				document.getElementById("divMensaje").innerHTML = myHtml;
			}else{
                for (var i = 0; i < response.length; i++) {
                    myHtml = "<p>";
                    myHtml += response[i].id + "-";
                    myHtml += response[i].username + "-";
                    myHtml += response[i].password + "-";
                    myHtml += response[i].company + "</p>";
                    document.getElementById("divMain").innerHTML += myHtml;
                }
			}
        },
        error: function(xhr) {
            alert("An AJAX error occured: " + xhr.status + " " + xhr.statusText);  //eta exekuzioa gelditu
        }
    });

}


/******************************SELECT*************************************************/
function load_data() {
	console.log("Entra en la funcion load_data");
    $.ajax({
        url: "./php/getUsers/",
        dataType: 'json',
        success: function (response) {
			console.log(response);
			var myHtml = "";
			document.getElementById("divMain").innerHTML = myHtml;
            for (var i = 0; i < response.length; i++) {
                myHtml = "<p>";
                myHtml += response[i].id + "-";
                myHtml += response[i].username + "-";
				myHtml += response[i].password + "-";
				myHtml += response[i].company + "</p>";
                document.getElementById("divMain").innerHTML += myHtml;
            }

			/*document.getElementById('inUsername').value = response[0].username;
            document.getElementById('inPassword').value = response[0].password;
            document.getElementById('inCompany').value = response[0].company;*/

        },
        error: function (xhr) {
            alert("An AJAX error occured: " + xhr.status + " " + xhr.statusText);
        }
    });

}

/*****************************SELECT POR ID*******************************************/
function sel_id() {
	console.log("Entra en la funcion sel_id");
	var numIdBuscar= document.getElementById('inId').value;
	//Se pueden pasar varios parametros. Deben ir separados por comas, siguiendo la misma estructura clave:valor
    var idJson = { 'id': numIdBuscar };
    //  console.log(idJson);
    $.ajax({
		url: "./php/getId/",
        type: "POST",
        data: { param: JSON.stringify(idJson) },
        dataType: 'json',
        success: function(response) {
            // alert (response.status);
			console.log(response);
			var myHtml = "";
			document.getElementById("divMain").innerHTML = myHtml;
			if(response.length==0){
				myHtml = "<p> El registro seleccionado no se encuentra registrado en la base de datos.</p>";
				document.getElementById("divMensaje").innerHTML = myHtml;
			}else{
				//ES NECESARIO ESTE FOR??
				for (var i = 0; i < response.length; i++) {
					myHtml = "<p>";
					myHtml += response[i].id + "-";
					myHtml += response[i].username + "-";
					myHtml += response[i].password + "-";
					myHtml += response[i].company + "</p>";
					document.getElementById("divMain").innerHTML += myHtml;
				}
				//load_data();
			}
        },
        error: function(xhr) {
            alert("An AJAX error occured: " + xhr.status + " " + xhr.statusText);
        }
    });

}
