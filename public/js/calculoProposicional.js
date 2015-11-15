
var elementosArrastrables = document.querySelectorAll("[draggable]")
,dropzone = document.getElementById("dropzone_js")
,dragSrcEl = null

function eliminarElemento(){

	var nodoPadre = this.parentNode
	this.classList.add("eliminarElemento")

	var nodoActual = this

	dropzone.removeEventListener("drop",dropElementsDOM,false)
	setTimeout(function(){
		nodoPadre.removeChild(nodoActual)
		dropzone.addEventListener("drop",dropElementsDOM,false)

	}, 2000)
}

/*Eventos del DRAG AND DROP*/
function dragStartElementsDOM(evento) {
	dragSrcEl = this
	evento.dataTransfer.effectAllowed = 'move'
	evento.dataTransfer.setData('text/html',this.outerHTML)
}

function dragEnterElementsDOM(){
	this.classList.add("dragEnter")
}

function dragOverElementsDOM(evento){
	evento.preventDefault()
}

function dragLeaveElementsDOM(){
	this.classList.remove("dragEnter")

}

function dropElementsDOM(evento){

	evento.preventDefault()

	this.classList.remove("dragEnter")

	var hijosActuales = this.children

	if (dragSrcEl != this){
		this.innerHTML += evento.dataTransfer.getData('text/html')
	}


	hijosActuales = this.children

	for (var i = 0; i < hijosActuales.length; i++) {
		hijosActuales[i].addEventListener("click", eliminarElemento)
	}

	return false
}

for (var index = 0; index < elementosArrastrables.length; index++) {
	/*Agregar evento(Inicio de arrastre) a los elementos*/
	elementosArrastrables[index].addEventListener("dragstart",dragStartElementsDOM,false)
}

/*agregar evento(el elemento arrastrado es soltado en la zona de descarga) a la dropzone*/
dropzone.addEventListener("drop",dropElementsDOM,false)
/*agregar evento(el elemento arrastrado se mueve dentro de la zona de descarga) a la dropzone*/
dropzone.addEventListener("dragover",dragOverElementsDOM,false)
/*agregar evento(el elemento arrastrado entra a la zona de descargar) a la dropzone*/
dropzone.addEventListener("dragenter",dragEnterElementsDOM,false)
/*agregar evento(el elemento arrastrado sale de la zona de descarga) a la dropzone*/
dropzone.addEventListener("dragleave",dragLeaveElementsDOM,false)

//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------

var oraciones = [
{
	oracion : "vas a jugar si terminas a tiempo.",
	conector:[2]
},
{
	oracion : "sales y te diviertes o te quedas.",
	conector:[0,1]
},
{
	oracion : "Solo si juegas Uncharted sabras que es aventura",
	conector:[3]
},
{
	oracion : "la lluvia depende de las precipitaciones.",
	conector:[2]
},
{
	oracion : "El almacen ofrece descuentos para los usuarios con tarjeta platino pero su compra es mayor a $100.000.",
	conector:[2,0]
}
]
var btnValidarEjercicio = document.getElementById("htmlInputSubmitBtnrealizarEjercicio_js")
var oracion = document.getElementById("oracion_js")

var ejercicioPropuesto

function escogerOracion(){
	ejercicioPropuesto = oraciones[numeroAleatorio(oraciones.length,0)]
	oracion.innerText = ejercicioPropuesto.oracion
}

function reiniciarEjercicio () {

	escogerOracion()

	var btnVolver = document.getElementById("btnReiniciarEjercicio_js")

	limpiarContenedorHTML(dropzone)
	dropzone.addEventListener("drop",dropElementsDOM,false)
	dropzone.classList.remove("dragEnter")
	contenedorPrincipal.replaceChild(htmlInputSubmitBtnrealizarEjercicio,btnVolver)
	habilitarInhabilitarInput(htmlInputSubmitBtnrealizarEjercicio)

}

function verificarEjercicio(){
	var dropzone = document.getElementById("dropzone_js")
	if (!dropzone.hasChildNodes()){
		console.log("nada");
		var mensaje = {tipoMensaje : 1, mensaje : "Huu, no has escogido ningun conector"}

	}else{
		var respuestas = dropzone.children
		,conecotresRespuesta = new Array()
		for (var i = 0, respuesta; respuesta = respuestas[i]; i++) {
			conecotresRespuesta.push(respuesta.getAttribute("value"))
		}
		if (String(conecotresRespuesta.sort()) == String(ejercicioPropuesto.conector.sort())){
			var mensaje = {tipoMensaje : 0, mensaje : "Listo, todo bien"}

			dropzone.removeEventListener("drop",dropElementsDOM,false)
			dropzone.classList.add("dragEnter")
			habilitarInhabilitarInput(htmlInputSubmitBtnrealizarEjercicio)

			var btnVolver = document.createElement("button")
			btnVolver.id = "btnReiniciarEjercicio_js"
			btnVolver.classList.add("centrarConMargin","btn" ,"btnConfirmar")
			btnVolver.innerHTML = innerHTMLBtnVolver
			btnVolver.addEventListener("click", reiniciarEjercicio)

			var HTMLSpanIconoBtn = document.createElement("span")
			HTMLSpanIconoBtn.classList.add(iconoBtnVolver,"marginIconos")
			btnVolver.insertBefore(HTMLSpanIconoBtn, btnVolver.firstChild)

			contenedorPrincipal.replaceChild(btnVolver, htmlInputSubmitBtnrealizarEjercicio)

		}else{
			var mensaje = {tipoMensaje : 1, mensaje : "Algo esta mal en la solucion"}

		}

	}
	crearYMostrarMensaje(mensaje.tipoMensaje,mensaje.mensaje)

}


btnValidarEjercicio.addEventListener("click", verificarEjercicio)
escogerOracion()


var insertDocument = function(db, callback) {
	db.collection('restaurants').insertOne( {
		"estudiante" : {
			"nota" : 5,
		}
	}, function(err, result) {
		assert.equal(err, null);
		console.log("Inserted a document into the restaurants collection.");
		callback(result);
	})
}
