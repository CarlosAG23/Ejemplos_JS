var cajadatos, bd;
function iniciar(){
    cajadatos=document.getElementById("cajadatos");
    var boton = document.getElementById('grabar');
    boton.addEventListener('click', agregarobjeto);
    
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
    bd = evento.target.result; // bd: conector de la BDD
    mostrar();
} 

function mostrarerror(evento){
    alert('Error: ' + evento.code + " " + evento.message);
}

function agregarobjeto(){
    var clave = document.getElementById('clave').value;
    var titulo = document.getElementById('texto').value;
    var fecha = document.getElementById('fecha').value;
    var transaccion=bd.transaction(['peliculas'], "readwrite");
    var almacen=transaccion.objectStore('peliculas');
    transaccion.addEventListener('complete', mostrar);
    var solicitud = almacen.add({id: clave, nombre: titulo, fecha: fecha});

    document.getElementById('clave').value = "";
    document.getElementById('texto').value = "";
    document.getElementById("fecha").value = "";
}

function mostrar(){
    cajadatos.innerHTML= "";
    var transaccion = bd.transaction(["peliculas"]);
    var almacen = transaccion.objectStore("peliculas");
    var indice = almacen.index("BuscarFecha");
    var puntero = indice.openCursor(null,"prev");
    puntero.addEventListener("success", mostrarlista)
}

function mostrarlista(evento){
    var puntero = evento.target.result;
    if(puntero){
        cajadatos.innerHTML += "<div>"+puntero.value.id +" - " + puntero.value.nombre + " - " + puntero.value.fecha;
        cajadatos.innerHTML += '<input type="button" onclick="eliminarobjeto(\''+puntero.value.id+'\')" value="Eliminar"></div>';
        puntero.continue();
    }
}
function eliminarobjeto(clave){
    if(confirm("Estas seguro que deseas borrar?")){
        var transaccion = bd.transaction(["peliculas"], "readwrite");
        var almacen = transaccion.objectStore("peliculas");
        transaccion.addEventListener("complete", mostrar);
        var solicitud = almacen.delete(clave);
    }
}

window.addEventListener("load", iniciar);