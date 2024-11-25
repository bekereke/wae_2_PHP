document.addEventListener("DOMContentLoaded", function(event) {

        //load_data();
        document.getElementById('btnId').addEventListener("click",del_data);
    })
    //----------------------------------------------------------------------------------

function del_data() {
    var idIrakurritakoa=document.getElementById('inId').value;

    var idJson = { 'id':idIrakurritakoa};
    //console.log(id);

    $.ajax({
        url: "./php/",  //helbide erlatiboak lehenetsi!
        type: "POST",  //get eta post dira aukerak: get bidez helbidean datuak ikusi; post bidez, ezkutuan
        data: { param: JSON.stringify(idJson) },
        dataType: 'json',
        success: function(response) {
             alert (response.status);
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