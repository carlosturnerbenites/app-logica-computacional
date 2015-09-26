var contenedorPrincipal = document.getElementById("contenedorPrincipal_js")
var btnAyuda = document.getElementById("btnAyuda_js")
//solo puede haer una seccion de explicacion pro pagina
var seccionExplicacion = document.getElementById("seccionExplicacion_js")

function mostrarOcultarSeccion() {

	var seccionAMostrar = this.nextElementSibling

	if (seccionAMostrar.classList.contains("ocultar")) {
		seccionAMostrar.classList.remove("ocultar")
	}else{
		seccionAMostrar.classList.add("ocultar")
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
		btnAyuda.click()
	}

	if(evento.shiftKey && nombreTeclaPresionado.toLowerCase() == "b"){
		limpiarLienzo()

	}
}

function reproducirparaAudio(evento) {
	var barraDePorgresoAudio = document.getElementById("barraDePorgresoAudio_js")

	var duracionAudio = musica.duration
	var tiempoActual = 0

	if (musica.paused){
		musica.play()
		estadoActualAudio.innerHTML = "Pausar"

		tiempoActual = musica.currentTime

		barraDePorgresoAudio.setAttribute("max", duracionAudio)
		barraDePorgresoAudio.setAttribute("value", tiempoActual)

	}else{
		musica.pause()
		estadoActualAudio.innerHTML = "Escuchar"
	}
}

btnAyuda.addEventListener("click", mostrarOcultarSeccion)
document.body.addEventListener("keypress", teclapresionada)


/*
//Activar en produccion
window.onbeforeunload = confirmarCierreVentana

function confirmarCierreVentana(){
	return 'Si cierra se perdera todo el progreso.'
}
*/

