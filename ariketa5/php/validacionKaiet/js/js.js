document.addEventListener("DOMContentLoaded", function(event) {
   document.getElementById("btnBidali").addEventListener("click",bidali);
})

function bidali()
{
   // inputak irakurri
    var zenbaki=document.getElementById("inZenbaki").value;
    var hitza=document.getElementById("inHitza").value;

    //   balidazioak egin
    var danaondo=true;
    if (isNaN(zenbaki)==true)
    {
        alert("Zenbakiak soilik sartu. ERROR");
        danaondo=false;
    }
    var plantilla="^[a-zA-Z]+$"; // plantilla soilik letrak
    if(hitza.match(plantilla)==null)
    {
        alert("Letrak soilik sartu. ERROR");
        danaondo=false;
    }
    if (danaondo==true)
    {
        // inputeko datuak enpaketatu
        var datuak = {
            'zenbaki': zenbaki,
            'hitza': hitza
        }
        //  enpaketatutako datuak bidali
        $.ajax({
            url: "./php/datuakGorde.php",
            type: "POST",
            data: { param: JSON.stringify(datuak) },
            dataType: 'json',
            success: function(response) {
                alert(response.erantzuna);
            },
            error: function(xhr) {
                alert("An AJAX error occured: " + xhr.status + " " + xhr.statusText);
            }
        });
    }
}