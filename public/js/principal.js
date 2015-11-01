var btnAyuda = document.getElementById("btnAyuda_js")

//solo puede haer una seccion de explicacion pro pagina
var seccionExplicacion = document.getElementById("seccionExplicacion_js")

var htmlInputSubmitBtnrealizarEjercicio = document.getElementById("htmlInputSubmitBtnrealizarEjercicio_js")

htmlInputSubmitBtnrealizarEjercicio.innerHTML = innerHTMLBtnRealizarEjercicio

var HTMLSpanIconoBtn = document.createElement("span")
HTMLSpanIconoBtn.classList.add(iconoBtnRealizarEjercicio,"marginIconos")
htmlInputSubmitBtnrealizarEjercicio.insertBefore(HTMLSpanIconoBtn, htmlInputSubmitBtnrealizarEjercicio.firstChild)

function mostrarOcultarSeccion() {

	var seccionAMostrar = this.nextElementSibling

	if (seccionAMostrar.classList.contains("ocultar")) {
		seccionAMostrar.classList.remove("ocultar")
	}else{
		seccionAMostrar.classList.add("ocultar")
	}
}

function limpiarContenedorHTML(contenedor) {
	while (contenedor.firstChild) {
		contenedor.removeChild(contenedor.firstChild);
	}
}

function teclapresionada(evento){

	var nombreTeclaPresionado = String.fromCharCode(evento.keyCode).toLowerCase()
	var codigoTeclaPresionado = evento.keyCode

	if(evento.shiftKey && nombreTeclaPresionado == "?"){
		btnAyuda.click()
	}

	if(evento.shiftKey && nombreTeclaPresionado == "¡"){
		limpiarLienzo()

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

