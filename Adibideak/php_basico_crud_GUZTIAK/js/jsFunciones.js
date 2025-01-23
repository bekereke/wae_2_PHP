document.addEventListener("DOMContentLoaded", function(event) {

		//alert("Entra en jsFunciones.js");
        load_data();
		//document.getElementById('btnBuscarId2param').addEventListener("click", fncBuscar);
		//document.getElementById('btnBuscarId').addEventListener("click", fncBuscar);
        //document.getElementById('btnBuscarId').addEventListener("click", sel_id);
		document.getElementById('btnDeleteId').addEventListener("click", del_data);
		//document.getElementById('btnUpdate').addEventListener("click", update_data);
		//document.getElementById('btnInsert').addEventListener("click", insert_data);
    })
    //----------------------------------------------------------------------------------

/*****************fncBuscar*************************************************************/
function fncBuscar(){
	console.log("Entra en la funcion fncBuscar");
	if((document.getElementById('inId').value.trim().length==0) && (document.getElementById('inEmpresa').value.trim().length==0) ){
		load_data();////Los dos campos estan vacios por lo que se lanza una busqueda general
	}else{
		//algun criterio esta informado, lanzamos la busqueda con filtro
		//sel_id();
		sel_2param();
	}
}
/***************************************************************************************/


/******************************SELECT**************************************************/
function load_data() {
	console.log("Entra en la funcion load_data");
    $.ajax({
        url: "./get/getUsers/",
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

/*****************************SELECT POR 2 PARAM*******************************************/
function sel_2param() {
	console.log("Entra en la funcion sel_2param");
	//Se pueden pasar varios parametros. Deben ir separados por comas, siguiendo la misma estructura clave:valor
    var idJson = { 'id': document.getElementById('inId').value
	, 'empresa': document.getElementById('inEmpresa').value };
      console.log(idJson);
    $.ajax({
		url: "./get/get2params/",
        type: "POST",
        data: { parametros: JSON.stringify(idJson) },
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

/*****************************SELECT POR ID*******************************************/
function sel_id() {
	console.log("Entra en la funcion sel_id");
	var numIdBuscar= document.getElementById('inId').value;
	//Se pueden pasar varios parametros. Deben ir separados por comas, siguiendo la misma estructura clave:valor
    var idJson = { 'id': numIdBuscar };
    //  console.log(idJson);
    $.ajax({
		url: "./get/getId/",
        type: "POST",
        //data: { param: numIdBuscar },
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
					myHtml = myHtml + response[i].id + "-";
					myHtml = myHtml + response[i].username + "-";
					myHtml = myHtml + response[i].password + "-";
					myHtml = myHtml + response[i].company + "</p>";
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


/*****************************DELETE*******************************************/
function del_data() {
	console.log("Entra en la funcion del_data");
	var numIdBorrar= document.getElementById('inId').value;
    var idJson = { 'id': numIdBorrar };
    //  console.log(idJson);
    $.ajax({
		url: "./del/",
        type: "POST",
        data: { idParam: JSON.stringify(idJson) },
        dataType: 'json',
        success: function(response) {
            // alert (response.status);
			var myHtml = "";
			/*
			***************************************************************************
			REVISAR: Y QUE PASA SI LE DECIMOS QUE BORRE UN CODIGO QUE NO EXISTE??
			***************************************************************************
			*/
			myHtml = "<p> Registro " + response.status + " eliminado correctamente </p>";
			document.getElementById("divMensaje").innerHTML = myHtml;
			load_data();
        },
        error: function(xhr) {
            alert("An AJAX error occured: " + xhr.status + " " + xhr.statusText);
        }
    });

}

/***************************UPDATE******************************************************/
function update_data() {
	console.log("Entra en la funcion update_data");
	var numIdUpdate= document.getElementById('inId').value;
    var idJson = { 'id': document.getElementById('inId').value,
    'username': document.getElementById('inUsername').value,
    'password': document.getElementById('inPassword').value,
    'company': document.getElementById('inCompany').value };
    //  console.log(idJson);

    $.ajax({
        url: "./update/",
        type: "POST",
        data: { param: JSON.stringify(idJson) },
        dataType: 'json',
        success: function (response) {
            console.log(response);
			var myHtml = "";
			/*
			***************************************************************************
			REVISAR: Y QUE PASA SI LE DECIMOS QUE MODIFIQUE UN CODIGO QUE NO EXISTE??
			***************************************************************************
			*/
			myHtml = "<p> Registro " + numIdUpdate + " modificado correctamente </p>";
			document.getElementById("divMensaje").innerHTML = myHtml;
           /* document.getElementById('inUsername').value = response[0].username;
            document.getElementById('inPassword').value = response[0].password;
            document.getElementById('inCompany').value = response[0].company; */
        },
        error: function (xhr) {
            alert("An AJAX error occured: " + xhr.status + " " + xhr.statusText);
        }
    });
}

/***************************INSERT******************************************************/
function insert_data() {
	console.log("Entra en la funcion insert_data");
	var idJson = { 'username': document.getElementById('inUsername').value,
    'password': document.getElementById('inPassword').value,
    'company': document.getElementById('inCompany').value };
    //  console.log(idJson);

    $.ajax({
        url: "./insert/",
        type: "POST",
        data: { param: JSON.stringify(idJson) },
        dataType: 'json',
        success: function (response) {
            console.log(response);
			var myHtml = "";
			myHtml = "<p> Registro añadido correctamente. </p>";
			document.getElementById("divMensaje").innerHTML = myHtml;
			load_data();
        },
        error: function (xhr) {
            alert("An AJAX error occured: " + xhr.status + " " + xhr.statusText);
        }
    });
}