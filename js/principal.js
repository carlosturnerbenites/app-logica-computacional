
var contenedorPrincipal = document.getElementById("contenedorPrincipal_js")


var btnAyuda = document.getElementById("btnAyuda_js")
var seccionExplicacion = document.getElementById("seccionExplicacion_js")

function mostrarOcultarAyuda(evento) {
	if (seccionExplicacion.classList.contains("ocultar")) {
		seccionExplicacion.classList.remove("ocultar")
	}else{
		seccionExplicacion.classList.add("ocultar")
	}
}

function teclaAyudapresionada(evento){
	var teclaPresionado = String.fromCharCode(evento.keyCode)
	if(evento.shiftKey && teclaPresionado.toLowerCase() == "a"){
		mostrarOcultarAyuda()

	}
}

btnAyuda.addEventListener("click", mostrarOcultarAyuda)
document.body.addEventListener("keypress", teclaAyudapresionada)


//Activar en produccion
/*
window.onbeforeunload = confirmarCierreVentana

function confirmarCierreVentana(){
	return 'Si cierra se perdera todo el progreso.'
}
*/

