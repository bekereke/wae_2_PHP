document.addEventListener("DOMContentLoaded", function(event) {

        document.getElementById('btnSave').addEventListener("click",save_data);
        document.getElementById('btnShow').addEventListener("click",show_data);
        show_data();
    })
    //----------------------------------------------------------------------------------

function save_data() {
      
    var param = {'username':document.getElementById('inUsername').value,
                'password':document.getElementById('inPassword').value,
                'company':document.getElementById('inCompany').value
                };
   // console.log(idJson);

    $.ajax({
        url: "./insert.php",
        type: "POST",
        data: { param: JSON.stringify(param) },
        // dataType: 'json', 
        success: function(response) {
            // alert (response.status);
        },
        error: function(xhr) {
            alert("An AJAX error occured: " + xhr.status + " " + xhr.statusText);
        }
    });
}

//---------------------------------------------------------------------------------

function show_data() {
      
    $.ajax({
        url: "./getAll.php",
        //type: "POST",
        //data: { param: JSON.stringify(param) },
        dataType: 'json', 
        success: function(response) {
            var myHtml="<ul>";
            for(i=0;i<response.length;i++)
            {
                myHtml+="<li>"+response[i].username+"</li>";
            }
            myHtml+="</ul>";
            document.getElementById("divMain").innerHTML+=myHtml;
        },
        error: function(xhr) {
            alert("An AJAX error occured: " + xhr.status + " " + xhr.statusText);
        }
    });

}






















function load_data() {
    $.ajax({
        url: 'http://localhost/2021-2022/ASIR-2/01_PHP_BASICO_DELETE/get',
        dataType: 'json', //specifying here the response type, there's no need to parse the response
        success: function(myJsonArray) {

            var myHtml = "";
            for (var i = 0; i < myJsonArray.length; i++) {
                myHtml = "<p>";
                myHtml += myJsonArray[i].id + " ";
                myHtml += myJsonArray[i].username + " ";
                document.getElementById("divMain").innerHTML += myHtml;
            }
        },
        error: function(xhr) {
            alert("An AJAX error occured: " + xhr.status + " " + xhr.statusText);
        }
    });

}
//----------------------------------------------------------------------------------
/* 
  function del_data()
  {
      var id=document.getElementById('inId').value;
      if (id!="")
      {
        var idJson={'id':id};
               
        $.ajax({
          url: "http://localhost/2021-2022/ASIR-2/01_PHP_BASICO_DELETE/del/",
          type: "POST",
          data: {idParam:JSON.stringify(idJson)},
         // dataType: 'json', 
          success: function (response) {
            alert (response.status);
          },
          error: function (xhr) {
            alert("An AJAX error occured: " + xhr.status + " " + xhr.statusText);
          }
        }); 
      }
      else{
          alert ("empty input");
      }
     
  }
   */