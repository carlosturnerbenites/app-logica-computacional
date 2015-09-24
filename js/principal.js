
var contenedorPrincipal = document.getElementById("contenedorPrincipal_js")
var btnAyuda = document.getElementById("btnAyuda_js")
var seccionExplicacion = document.getElementById("seccionExplicacion_js")


function mostrarOcultarAyuda() {

	if (seccionExplicacion.classList.contains("ocultar")) {
		seccionExplicacion.classList.remove("ocultar")

	}else{

		seccionExplicacion.classList.add("ocultar")

	}
}

function limpiarLienzo() {

	while (lienzoGrafo.firstChild) {
		lienzoGrafo.removeChild(lienzoGrafo.firstChild);

	}
}

function teclapresionada(evento){

	var nombreTeclaPresionado = String.fromCharCode(evento.keyCode)
	var codigoTeclaPresionado = evento.keyCode

	if(evento.shiftKey && nombreTeclaPresionado.toLowerCase() == "a"){
		mostrarOcultarAyuda()
	}

	if(evento.shiftKey && nombreTeclaPresionado.toLowerCase() == "b"){
		limpiarLienzo()

	}
	console.log(evento.keyCode);
}


var musica = new Audio("../../media/audio/tlos.mp3")
var estadoActualAudio = document.getElementById("estadoActualAudio_js")
var btnAudio = document.getElementById("reproductorMusica_js")

function reproducirparaAudio(evento) {

	if (musica.paused){
		musica.play()
		estadoActualAudio.innerHTML = "Pausar"
	}else{
		musica.pause()
		estadoActualAudio.innerHTML = "Escuchar"

	}

	console.log(musica.paused);
}

btnAudio.addEventListener("click", reproducirparaAudio)
btnAyuda.addEventListener("click", mostrarOcultarAyuda)
document.body.addEventListener("keypress", teclapresionada)


/*
//Activar en produccion
window.onbeforeunload = confirmarCierreVentana

function confirmarCierreVentana(){
	return 'Si cierra se perdera todo el progreso.'
}
*/

