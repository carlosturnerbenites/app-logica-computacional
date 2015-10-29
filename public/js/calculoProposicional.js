
var elementosArrastrables = document.querySelectorAll("[draggable]")
,dropzone = document.getElementById("dropzone_js")
,dragSrcEl = null

function eliminarArtefacto(){
	var nodoPadre = this.parentNode
	this.classList.add("eliminarArtefacto")

	var nodoActual = this

	setTimeout(function(){
		nodoPadre.removeChild(nodoActual)
	}, 2000)
}

/*Eventos del DRAG AND DROP*/
function dragStartElementsDOM(evento) {
	dragSrcEl = this
	evento.dataTransfer.effectAllowed = 'move'
	evento.dataTransfer.setData('text/html',this.outerHTML)
}

function dragEnterElementsDOM(){
	this.classList.toggle("dragEnter")
}

function dragOverElementsDOM(evento){
	evento.preventDefault()
	this.classList.toggle("dragEnter")
}

function dragLeaveElementsDOM(){
	this.classList.toggle("dragEnter")

}

function dropElementsDOM(evento){

	evento.stopPropagation()

	this.classList.toggle("descargaEnZona")

	var hijosActuales = this.children

	if (dragSrcEl != this){
		this.innerHTML += evento.dataTransfer.getData('text/html')
	}


	hijosActuales = this.children

	for (var i = 0; i < hijosActuales.length; i++) {
		hijosActuales[i].addEventListener("click", eliminarArtefacto)
	}

	return false
}

/*Agregar eventos*/

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
	oracion : "ipsum cum ut quis cupiditate molestias quibusdam similique!",
	conector:[0,1]
},
{
	oracion : "corporis earum necessitatibus voluptatem enim corrupti nihil rerum pariatur.",
	conector:[1,2]
},
{
	oracion : "placeat labore asperiores voluptatibus eius assumenda quasi pariatur molestiae officiis.",
	conector:[2,3]
},
{
	oracion : "facere totam recusandae architecto. Totam eius eos necessitatibus facere?",
	conector:[0,3]
}
]
var btnValidarEjercicio = document.getElementById("btnValidarEjercicio_js")
var oracion = document.getElementById("oracion_js")

var ejercicioPropuesto = oraciones[0]
//var ejercicioPropuesto = oraciones[numeroAleatorio(oraciones.length,0)]
oracion.innerText = ejercicioPropuesto.oracion
function verificarEjercicio(){
	var dropzone = document.getElementById("dropzone_js")
	if (!dropzone.hasChildNodes()){
		console.log("nada");
		var estadoActual = {
			msg : "Huu, no has escogido ningun conector",
			clases : ["MSG" ,"MSGError"],
			icono : "icon-equivocado"
		}
	}else{
		var respuestas = dropzone.children
		,conecotresRespuesta = new Array()
		for (var i = 0, respuesta; respuesta = respuestas[i]; i++) {
			conecotresRespuesta.push(respuesta.getAttribute("value"))
		}
		if (String(conecotresRespuesta.sort()) == String(ejercicioPropuesto.conector.sort())){
			var estadoActual = {
				msg : "Listo, todo bien",
				clases : ["MSG" ,"MSGBien"],
				icono : "icon-correcto"
			}
		}else{
			var estadoActual = {
				msg : "Algo esta mal en la solucion",
				clases : ["MSG" ,"MSGError"],
				icono : "icon-equivocado"
			}
		}
		console.log(conecotresRespuesta)
	}
	crearYMostrarMensaje(estadoActual)

}


btnValidarEjercicio.addEventListener("click", verificarEjercicio)



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
