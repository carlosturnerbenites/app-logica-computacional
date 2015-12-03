 //seccion prinicipal que tiene todas la paginas, esta se encarga de contenedor el ancho y todo el contenido, se captura para poder añadir elementos en el
 var contenedorPrincipal = document.getElementById("contenedorPrincipal_js")

//variable que verifica si un ejercicio ya comenzo
var ejecicioEnEjecucion = false
//Alto de px de la seccion contenedor principal de todas las paginas
var heightContenedorPrincipal = contenedorPrincipal.clientHeight

//separador  creado para dividir secciones visualmente
var htmlHrSeparadorContenido = document.createElement("hr")

//Texto que se muestra en los botones de los ejercicios, se utilizan para añadir un mismo texto a todo slo sbotones
var innerHTMLBtnVerificar = "Verificar"
,innerHTMLBtnVolver = "Volver"
,innerHTMLBtnRealizarEjercicio = "Realizar Ejercicio"

var iconoBtnVerificar = "icon-verificar"
,iconoBtnVolver = "icon-volver"
,iconoBtnRealizarEjercicio = "icon-realizarEjercicio"

var msgEjercicioCompletado = "Listo, el ejercicio es correcto."
,msgErrorEnEjercicio = "Algo anda mal con la solucion del ejercicio"
,msgErrorInterno = "Disculpa, ocurrio un error interno"
,msgCargaCompleta = "Cagado Correctamente"
,msgGrafoVacio = "Este grafo esta vacio, no vale la pena guardarlo."

//msg usado en conjuntos
,msgErrorSintaxis = "Hay un caracter no permitido o error de sintaxis."

//msg usado en calculo proposicional
,msgNoHaySeleccion = "No has escogido ningun Conector."
//msg usado en calculo proposicional
,msgConfirmacionAbandonarPestana = "Si cierra se perdera todo el progreso."

//msg usado en grafo
,msgLienzoNoHabilitado = "El lienzo no esta habilitado"
,msgProblemaConAristas = "Hay un problema con Las Aristas"
,msgProblmeaConVertices = "Hay un problema con los Vertices"
,msgElementoExistente = "Esta linea ya existe"


var btnVolver = createElementDOM("button")
.text(innerHTMLBtnVolver)
.addClass("centrarConMargin","btn" ,"btnConfirmar")
.setAttrs({"type" : "submit","id" : "btnReiniciarEjercicio_js"})

var HTMLSpanIconoBtn = createElementDOM("span")
.addClass(iconoBtnVolver,"marginIconos")

//Falta crear esta funcion
btnVolver.insertBefore(HTMLSpanIconoBtn, btnVolver.firstChild)


var btnValidar = createElementDOM("button")
.text(innerHTMLBtnVerificar)
.addClass("btn","btnConfirmar","centrarConMargin")
.setAttrs({"type" : "submit","id" : "btnValidargrafo"})

var HTMLSpanIconoBtn = createElementDOM("span")
.addClass(iconoBtnVerificar,"marginIconos")

//Falta crear esta funcion
btnValidar.insertBefore(HTMLSpanIconoBtn, btnValidar.firstChild)


var btnAyuda = document.getElementById("btnAyuda_js")
var btnMusica = document.getElementById("btnMusica_js")

//solo puede haer una seccion de explicacion pro pagina
var seccionExplicacion = document.getElementById("seccionExplicacion_js")

var htmlInputSubmitBtnrealizarEjercicio = document.getElementById("htmlInputSubmitBtnrealizarEjercicio_js")

htmlInputSubmitBtnrealizarEjercicio.innerHTML = innerHTMLBtnRealizarEjercicio
htmlInputSubmitBtnrealizarEjercicio.classList.add("btn","btnEnviar")

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

	if(evento.shiftKey && nombreTeclaPresionado == "?"){
		btnAyuda.click()
	}

	if(evento.shiftKey && nombreTeclaPresionado == "¡"){
		limpiarLienzo()

	}
}

btnAyuda.addEventListener("click", mostrarOcultarSeccion)
btnMusica.addEventListener("click", mostrarOcultarSeccion)
document.body.addEventListener("keypress", teclapresionada)



/*añadir evento de ventana de confirmacion al intentar abandonar una pestaña*/
window.onbeforeunload = confirmarCierreVentana

/*Comprueba la variable 'ejercicioEnEjecucion'(Recordar que esta es igual a true cuando se esta realizando un ejercicio) y dependiendo de ella, muestra o no la ventana de confirmacion para abandonar la pestaña*/
function confirmarCierreVentana(){
	if (ejecicioEnEjecucion) {
		return msgConfirmacionAbandonarPestana
	}
}
