function getGET(){
        // capturamos la url
        var loc = document.location.href;
        // si existe el interrogante
        if(loc.indexOf('?')>0)
        {
            // cogemos la parte de la url que hay despues del interrogante
            var getString = loc.split('?')[1];
            // obtenemos un array con cada clave=valor
            var GET = getString.split('&');
            var get = {};
            // recorremos todo el array de valores
            for(var i = 0, l = GET.length; i < l; i++){
                var tmp = GET[i].split('=');
                get[tmp[0]] = unescape(decodeURI(tmp[1]));
            }
            return get;
        }
    }

function listar(){

}
window.onload = function(){
        // Cogemos los valores pasa dos por get
    var valores=getGET();

    var numer = valores['var'];
    console.log(numer)

    var requestURL = 'url';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    function cargarDatos()
    {
        var DatosJson = request.response;
        document.getElementById("datosPersona").innerHTML=DatosJson;
    }

                // hacemos un bucle para pasar por cada indice del array de valores
}
