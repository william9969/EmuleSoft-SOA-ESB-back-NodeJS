function transferir (){
    
    
    //console.log(select.value);
    var http = new XMLHttpRequest();
    var url = "http://localhost:8091/bancos";
    http.open("POST", url, true);
    http.setRequestHeader("Content-Type", "application/json");
    var banco_emisor = document.getElementById("bancoEmi").value;
    var banco_receptor = document.getElementById("bancoRec").value;
    var cuenta_emisor = document.getElementById('cuenRemitente').value;
    var cuenta_receptor = document.getElementById('cuenDestinatario').value;

    var monto = document.getElementById('monto').value;
   // var sendJSON = '{"remitente":'+remitente+', "destinatario": '+destinatario+',"cuenta_remitente":'+cuenta_remitente+',"cuenta_destinatario":'+cuenta_destinatario+',"monto":'+monto+'}';
    const nuevo={
        "bancoE": parseInt(banco_emisor),
        "cuentaE": cuenta_emisor,
        "bancoR": parseInt(banco_receptor),
        "cuentaR": cuenta_receptor,
        "monto": parseFloat(monto)
    };
    const newJSON=JSON.stringify(nuevo);
    http.onreadystatechange = function () {
        if (http.readyState === 4) {
           console.log(http.status);
           console.log(http.responseText);
           
        }};
    http.send(newJSON);
    alert(http.responseText);
}