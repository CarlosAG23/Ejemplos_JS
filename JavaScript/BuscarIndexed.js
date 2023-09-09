var cajadatos, bd;
function iniciar(){
    cajadatos = document.getElementById("cajadatos");
    var boton = document.getElementById("buscar");
    boton.addEventListener("click", buscar);

    var solicitud = indexedDB.open("basededatos");
    solicitud.addEventListener("error", mostrarerror);
    solicitud.addEventListener("success", comenzar);
    solicitud.addEventListener("upgradeneeded", creabd);
}

function creabd(evento){
    var basedatos = evento.target.result;
    var almacen =basedatos.createObjectStore('peliculas',{keyPath:'id'});
    almacen.createIndex('BuscarFecha', 'fecha',{unique: false}); 
}

function comenzar(evento) {
    bd = evento.target.result; 
} 

function mostrarerror(evento){
    alert('Error: ' + evento.code + " " + evento.message);
}

function buscar(){
    cajadatos.innerHTML = "";
    var buscar = document.getElementById("fecha").value;
    var buscar_dos = document.getElementById("fecha_dos").value;

    var transaccion = bd.transaction(["peliculas"]);
    var almacen = transaccion.objectStore("peliculas");
    var indice = almacen.index("BuscarFecha");
    var rango = IDBKeyRange.bound(buscar, buscar_dos, false, false);
    var puntero = indice.openCursor(rango);
    puntero.addEventListener("success", mostrardatos);
}

function mostrardatos(evento){
    var puntero = evento.target.result;
    if(puntero){
        cajadatos.innerHTML += "<div>" + puntero.value.id + " - " + puntero.value.nombre + " - " + puntero.value.fecha +"</div>";
        puntero.continue();

    }
}

window.addEventListener("load", iniciar);