

var maximo, video, reproducir, barra, progreso, silenciar, volumen, bucle;

function iniciar(){
    //maximo = 400;

    video = document.getElementById("video");
    reproducir = document.getElementById("reproducir");
    barra = document.getElementById("barra");
    progreso = document.getElementById("progreso");
    silenciar = document.getElementById("silenciar");
    volumen = document.getElementById("volumen");

    reproducir.addEventListener("click", presionar);
    silenciar.addEventListener("click", sonido);
    barra.addEventListener("click", mover);
    volumen.addEventListener("change", nivel);
    maximo = parseInt(window.getComputedStyle(barra).getPropertyValue('width'));
}

function presionar() {
    if (!video.paused && !video.ended) {
    video.pause();
    reproducir.value = ">";
    clearInterval(bucle);
    } else {
    video.play();
    reproducir.value = "||";
    bucle = setInterval(estado, 1000);
    }
}


// actualizar la barra de progreso
function estado() {
    if (!video.ended){
        var largo = parseInt(video.currentTime * maximo / video.duration);
        progreso.style.width = largo + "px";
    } else {
        progreso.style.width = "0px";
        reproducir.value = ">";
        clearInterval(bucle);
    }
}

function mover(event){
    if(!video.paused && !video.ended){
        var ratonX = event.offsetX -2;
        if(ratonX < 0){
            ratonX = 0;
        }else if(ratonX >maximo){
            ratonX = maximo;
        }
        var tiempo = ratonX * video.duration / maximo;
        video.currentTime = tiempo;
        progreso.style.width = ratonX + "px";
    }
}

function sonido(){
    if(silenciar.value == "Silenciar"){
        video.muted = true;
        volumen.value = 0;
        silenciar.value = "Sonido";

    }else{
        video.muted = false;
        volumen.value = 1;
        silenciar.value = "Silenciar";
    }
}

function nivel(){
    video.volume = volumen.value;
}
window.addEventListener("load", iniciar);