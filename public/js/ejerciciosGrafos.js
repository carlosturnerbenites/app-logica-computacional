var lienzo = document.getElementById("htmlSvgLienzo_js")
,htmlSvgLienzoGrafo = document.getElementById("htmlSvgLienzoGrafo_js")
,htmlSvgLienzoGrilla = document.getElementById("htmlSvgLienzoGrilla_js")
,htmlSvgLienzoGrafoVertices = document.getElementById("htmlSvgLienzoGrafoVertices_js")
,htmlSvgLienzoGrafoNombres = document.getElementById("htmlSvgLienzoGrafoNombres_js")
,htmlSvgLienzoGrafoAristas = document.getElementById("htmlSvgLienzoGrafoAristas_js")
,btnGuardarGrafo = document.getElementById("btnGuardarGrafo_js")

var btnLimpiarLienzo = document.getElementById("btnLimpiarLienzo_js")
,mensajeDeConfirmacionDeBorradoDeLienzo = "¿Desea Borrar Todos los Elementos?"
,mensajeDeConfirmacionDeBorradoDeElemento_s = "¿Desea Borrar el(los) elemento(s)?"
,nombreVertices = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
var conectorDireccionalDeVertices = " → "
,namespaceURI = "http://www.w3.org/2000/svg"
,nombreLineasGrilla
,grafo = new Array()

/*Variable que con tiene el valor del radio de los vertices(elementos "circle")*/
var radio = 20

var cxIniciales, cyIniciales
var cxFinales, cyFinales
var nombreVerticeInicial, nombreVerticeFinal

var cxElementEnMovimiento
,cyElementEnMovimiento
,posicionCirculo

var posicionAux = 0
/*Variable Auxiliar utilizada para bloquear el flujo de creacion de un elemento "line". Si al crear el elemento se confirma que este ya existe, entonces no se continuacion con la creacion; por el contrario se prosigue con la creacion e insercion del elemento.*/
var continuarAux = new Boolean()

//
var infoCircle
//


function dibujarCirculo(evento){

	if(evento.which == 1){


		var nombreVertice = nombreVertices[posicionAux]
		var htmlCircleVerticeDelGrafo = document.createElementNS(namespaceURI, "circle")
		var htmlTextNombreVerticeDelGrafo = document.createElementNS(namespaceURI,"text")

		htmlCircleVerticeDelGrafo.addEventListener("mousedown", circuloPresionado,true)
		htmlCircleVerticeDelGrafo.addEventListener("mouseup", circuloDesprecionado,true)

		if(evento.offsetX) {
			cxActuales = evento.offsetX;
			cyActuales = evento.offsetY;
		}
		else if(evento.layerX) {
			cxActuales = evento.layerX;
			cyActuales = evento.layerY;
		}
		/*
		var cxActuales = evento.offsetX
		var cyActuales = evento.offsetY
		*/
		console.log(cxActuales,cyActuales);

		htmlCircleVerticeDelGrafo.setAttribute("cx",cxActuales)
		htmlCircleVerticeDelGrafo.setAttribute("cy",cyActuales)
		htmlCircleVerticeDelGrafo.setAttribute("r",radio)
		htmlCircleVerticeDelGrafo.setAttribute("name",nombreVertice)
		/*htmlCircleVerticeDelGrafo.classList.add("agrandarEncoger")*/

		htmlTextNombreVerticeDelGrafo.setAttribute("x",cxActuales)
		htmlTextNombreVerticeDelGrafo.setAttribute("y",cyActuales)
		htmlTextNombreVerticeDelGrafo.classList.add("nombreCircle")
		htmlTextNombreVerticeDelGrafo.innerHTML = nombreVertice
		htmlTextNombreVerticeDelGrafo.id = nombreVertice

		posicionAux += 1

		htmlSvgLienzoGrafoVertices.appendChild(htmlCircleVerticeDelGrafo)
		htmlSvgLienzoGrafoNombres.appendChild(htmlTextNombreVerticeDelGrafo)

		elemento = {
			type:"circle",
			data : {
				cx:cxActuales,
				cy:cyActuales,
				r:radio,
				name:nombreVertice
			}
		}

		grafo.push(elemento)

	}
}


function removerElementoLinea(evento) {

	evento.preventDefault()

	if (evento.which == 2) {
		if (confirm(mensajeDeConfirmacionDeBorradoDeElemento_s)) {
			var estadoActual = {
				msg : "La line se borro",
				clases : ["MSG", "MSGBien"],
				icono : "icon-correcto"
			}
			crearYMostrarMensaje(estadoActual)
			htmlSvgLienzoGrafoAristas.removeChild(this)
		}
	}
}

/*refactor nombre variable "name".*/
function dibujarLinea(x1,y1,x2,y2,contenedor,clase,name,origen,destino) {

	/*definicion de variable que contendra el nombre de la arista(elementos "line"), creado apartir del atributo "name" de la misma.*/
	var nombreAristaExistente

	continuar = true

	/*definicion de variable(tipo Array) que contiene las aristas(elementos "line") del grafo.*/
	var aristasExistentes = htmlSvgLienzoGrafoAristas.childNodes

	/*Este ciclo recorre los elementos "line" existentes*/
	for (var i = 0; i < aristasExistentes.length; i++) {

		/*captura del atributo name de elemento "line"*/
		nombreAristaExistente = aristasExistentes[i].getAttribute("name")

		/*Verificar que la linea a crear no exista, para ello se comprarn los nombres de las lineas*/
		if (name == nombreAristaExistente) {

			/*Objeto con la informacion para crear un Mensage*/
			var estadoActual = {
				msg : "Esta linea ya existe",
				clases : ["MSG", "MSGError"],
				icono : "icon-correcto"
			}

			continuar = false

			/*Se crea e inserta un mensaje en el DOM*/
			crearYMostrarMensaje(estadoActual)

		}

	}

	if (continuar) {

		/*Creacion del elemento "line"*/
		var htmlLineAristaDelGrafo = document.createElementNS(namespaceURI, "line")

		/*Enviao de Atributos al elemento "line"*/
		htmlLineAristaDelGrafo.setAttribute("x1",x1)
		htmlLineAristaDelGrafo.setAttribute("y1",y1)
		htmlLineAristaDelGrafo.setAttribute("x2",x2)
		htmlLineAristaDelGrafo.setAttribute("y2",y2)
		htmlLineAristaDelGrafo.setAttribute("name",name)
		htmlLineAristaDelGrafo.setAttribute("origen",origen)
		htmlLineAristaDelGrafo.setAttribute("destino",destino)

		/*Envio de clases CSS al elemento "line"*/
		htmlLineAristaDelGrafo.classList.add(clase)

		/*Mediante el atributo "name" se verifica que la linea no pertenezca a la grilla, pues si pertecene no se le deben añadir eventos*/
		htmlLineAristaDelGrafo.addEventListener("mousedown", removerElementoLinea)


		var elemento = {
			type:"line",
			data:{
				x1,x1,
				y1 : y1,
				x2 : x2,
				y2 : y2,
				name : name,
				origen : origen,
				destino : destino
			}
		}

		grafo.push(elemento)

		/*Agregar linea al Contenedor*/




		contenedor.appendChild(htmlLineAristaDelGrafo)

	}

}

/*Funcion encargada de limpiar el lienzo de dibujo*/
function limpiarLienzo() {

	/*pedir confirmacion para borar el lienzo*/
	if (confirm(mensajeDeConfirmacionDeBorradoDeLienzo)) {

		while (htmlSvgLienzoGrafoVertices.firstChild) {
			htmlSvgLienzoGrafoVertices.removeChild(htmlSvgLienzoGrafoVertices.firstChild);
		}

		while (htmlSvgLienzoGrafoAristas.firstChild) {
			htmlSvgLienzoGrafoAristas.removeChild(htmlSvgLienzoGrafoAristas.firstChild);
		}

		while (htmlSvgLienzoGrafoNombres.firstChild) {
			htmlSvgLienzoGrafoNombres.removeChild(htmlSvgLienzoGrafoNombres.firstChild);
		}
	}

}



var lineasDelVertice = new Array()





/*se oprime sobre un nodo para empezar el evento drag*/
function preparandoDrag(evento) {

	if (evento.which == 3){

		cxElementEnMovimiento = this.getAttribute("cx")
		cyElementEnMovimiento = this.getAttribute("cy")
		posicionCirculo = cxElementEnMovimiento+","+cyElementEnMovimiento

		this.addEventListener("mousemove", drag)
	}

}

/*se inicia el drag*/
function drag(evento) {
	var lineaDelVertice = new Array()

	var aristasExistentes = htmlSvgLienzoGrafoAristas.childNodes

	if(evento.offsetX) {
		nuevaPosicionX = evento.offsetX;
		nuevaPosicionY = evento.offsetY;
	}
	else if(evento.layerX) {
		nuevaPosicionX = evento.layerX;
		nuevaPosicionY = evento.layerY;
	}


	var nombreCirculo = this.getAttribute("name")
	,letra =document.getElementById(nombreCirculo)

	/*mover lineas asociadas al nodo*/
	for (var j = 0; j < aristasExistentes.length; j++) {
		if (nombreCirculo == aristasExistentes[j].getAttribute("origen") || nombreCirculo == aristasExistentes[j].getAttribute("destino")){
			lineaDelVertice.push(aristasExistentes[j])
		}
	}

	for (var i = 0; i <= lineaDelVertice.length; i++) {
		if (lineaDelVertice[i] != undefined){
			if (nombreCirculo == lineaDelVertice[i].getAttribute("origen")){
				lineaDelVertice[i].setAttribute("x1", nuevaPosicionX)
				lineaDelVertice[i].setAttribute("y1", nuevaPosicionY)
			}else{
				lineaDelVertice[i].setAttribute("x2", nuevaPosicionX)
				lineaDelVertice[i].setAttribute("y2", nuevaPosicionY)

			}
		}
	}

	/*mover letra del nodo*/
	letra.setAttribute("x", nuevaPosicionX)
	letra.setAttribute("y", nuevaPosicionY)

	/*mover nodo*/
	this.setAttribute("cx", nuevaPosicionX)
	this.setAttribute("cy", nuevaPosicionY)
}

/*Terminar el evento drag*/
function terminarDrag(evento) {
	this.removeEventListener("mousemove", drag)
}

/*Funcion encargada de ecoger que accion ejecutar sobre un elemento segun el boton del mouse oprimido*/
function circuloPresionado(evento) {

	evento.preventDefault()

	var nombreLinea
	var nombreCirculo

	cxIniciales = this.getAttribute("cx")
	cyIniciales = this.getAttribute("cy")

	/*si se presiono el boton Izquierdo. se inicia el proceso para crear una arista(elemento "line") que conecta dos vertices(elemento "circles")*/
	if (evento.which == 1) {

		/*Se define el nombre del vertice inicial(del elemento de donde comienza la linea)*/
		nombreVerticeInicial = this.getAttribute("name")

	}
	/*Si se presiona el boton Derecho se inicia el proceso de arrastre y soltar*/
	else if(evento.which == 3){
		this.addEventListener("mousedown", preparandoDrag)
		this.addEventListener("mouseup", terminarDrag)

	}
	/*Si se presiona la rueda del raton, se inicia el proceso para eliminar un vertice(elemento "circle") y sus aristas asociadas(elemento "line")*/
	else if(evento.which == 2){
		/*Se pide confirmacion para borrar*/
		if (confirm(mensajeDeConfirmacionDeBorradoDeElemento_s)) {


			var aristasExistentes = convertirHTMLCollectionEnArray(htmlSvgLienzoGrafoAristas.childNodes)

			htmlSvgLienzoGrafoVertices.removeChild(this)
			htmlSvgLienzoGrafoNombres.removeChild(document.getElementById(this.getAttribute("name")))

			for (var i = 0; i <= aristasExistentes.length; i++) {
				if (aristasExistentes[i] != undefined) {
					nombreLinea = aristasExistentes[i].getAttribute("name")
					nombreCirculo = this.getAttribute("name")

					if (nombreLinea.indexOf(nombreCirculo) != -1) {
						htmlSvgLienzoGrafoAristas.removeChild(aristasExistentes[i])

					}
				}

			}
		}

	}

}

function circuloDesprecionado(evento) {

	evento.preventDefault()

	nombreVerticeFinal = this.getAttribute("name")

	if (evento.which == 1) {

		cxFinales = this.getAttribute("cx")
		cyFinales = this.getAttribute("cy")

		var nombreNuevaArista = nombreVerticeInicial + conectorDireccionalDeVertices + nombreVerticeFinal
		,origen = nombreVerticeInicial
		,destino = nombreVerticeFinal

		dibujarLinea(cxIniciales,cyIniciales,cxFinales,cyFinales,htmlSvgLienzoGrafoAristas,"lineGrafo",nombreNuevaArista,origen,destino)

	}

}

/*Funcion encargada de dibujar la grilla de refencia en el lienzo.*/
function dibujarGrilla() {

	/*Se capturan los valores de alto y ancho del lienzo de dibujo.*/
	var lienzoHeight = lienzo.clientHeight
	var lienzoWidth = lienzo.clientWidth

	/*Se define el nombre de las lineas de la grilla(elementos "line").*/
	var nombreLineasGrilla = "lineasGrilla"
	,origen = "/"
	,destino = "/"

	/*Se crean la lineas Verticales de la grilla.*/
	for (var j = 0; j <= lienzoHeight; j+=20) {
		dibujarLineaGrilla(0,j,lienzoWidth,j,htmlSvgLienzoGrilla,"lineGilla")
	}

	/*Se crean la lineas Horizontales de la grilla.*/
	for (var i = 0; i <= lienzoWidth; i+=20) {
		dibujarLineaGrilla(i,0,i,lienzoHeight,htmlSvgLienzoGrilla,"lineGilla")
	}

}


function dibujarLineaGrilla(x1,y1,x2,y2,contenedor,clase) {

	var htmlLineAristaDelGrafo = document.createElementNS(namespaceURI, "line")

	htmlLineAristaDelGrafo.setAttribute("x1",x1)
	htmlLineAristaDelGrafo.setAttribute("y1",y1)
	htmlLineAristaDelGrafo.setAttribute("x2",x2)
	htmlLineAristaDelGrafo.setAttribute("y2",y2)

	htmlLineAristaDelGrafo.classList.add(clase)

	contenedor.appendChild(htmlLineAristaDelGrafo)

}



function inhabilitarRezise() {
	limpiarContenedorHTML(htmlSvgLienzoGrilla)
	dibujarGrilla()
}



function guardarGrafo(){

	var oReq = new XMLHttpRequest();

	oReq.onreadystatechange = function() {
		if (oReq.readyState == 4) {
			crearYMostrarMensaje(JSON.parse(oReq.responseText));
		}
	}

	oReq.open("POST", "/guardarGrafo");
	oReq.setRequestHeader('Content-Type', 'application/json')
	oReq.send(JSON.stringify(grafo))

}
function crearGrafo(elementos){

	for(var elemento of elementos){

		if (elemento.type == "line"){

			var htmlLineAristaDelGrafo = document.createElementNS(namespaceURI, "line")

			/*Enviao de Atributos al elemento "line"*/
			htmlLineAristaDelGrafo.setAttribute("x1",elemento.data.x1)
			htmlLineAristaDelGrafo.setAttribute("y1",elemento.data.y1)
			htmlLineAristaDelGrafo.setAttribute("x2",elemento.data.x2)
			htmlLineAristaDelGrafo.setAttribute("y2",elemento.data.y2)
			htmlLineAristaDelGrafo.setAttribute("name",elemento.data.name)
			htmlLineAristaDelGrafo.setAttribute("origen",elemento.data.origen)
			htmlLineAristaDelGrafo.setAttribute("destino",elemento.data.destino)

			/*Envio de clases CSS al elemento "line"*/
			htmlLineAristaDelGrafo.classList.add("lineGrafo")

			/*Mediante el atributo "name" se verifica que la linea no pertenezca a la grilla, pues si pertecene no se le deben añadir eventos*/
			htmlLineAristaDelGrafo.addEventListener("mousedown", removerElementoLinea)

			htmlSvgLienzoGrafoAristas.appendChild(htmlLineAristaDelGrafo)

		}
		if (elemento.type == "circle"){

			var htmlCircleVerticeDelGrafo = document.createElementNS(namespaceURI, "circle")
			var htmlTextNombreVerticeDelGrafo = document.createElementNS(namespaceURI,"text")

			htmlCircleVerticeDelGrafo.addEventListener("mousedown", circuloPresionado,true)
			htmlCircleVerticeDelGrafo.addEventListener("mouseup", circuloDesprecionado,true)


			htmlCircleVerticeDelGrafo.setAttribute("cx",elemento.data.cx)
			htmlCircleVerticeDelGrafo.setAttribute("cy",elemento.data.cy)
			htmlCircleVerticeDelGrafo.setAttribute("r",elemento.data.r)
			htmlCircleVerticeDelGrafo.setAttribute("name",elemento.data.name)
			/*htmlCircleVerticeDelGrafo.classList.add("agrandarEncoger")*/

			htmlTextNombreVerticeDelGrafo.setAttribute("x",elemento.data.cx)
			htmlTextNombreVerticeDelGrafo.setAttribute("y",elemento.data.cy)
			htmlTextNombreVerticeDelGrafo.innerHTML = elemento.data.name
			htmlTextNombreVerticeDelGrafo.id = elemento.data.name

			htmlTextNombreVerticeDelGrafo.classList.add("nombreCircle")

			htmlSvgLienzoGrafoVertices.appendChild(htmlCircleVerticeDelGrafo)
			htmlSvgLienzoGrafoNombres.appendChild(htmlTextNombreVerticeDelGrafo)
		}
	}
}


/*Se agregar el evento "click" al boton de limpiar lienzo, para que al suceder el todos los elementos(Vertices, Aristas y Nombre) se borren del lienzo. No se borra la grilla*/
btnLimpiarLienzo.addEventListener("click", limpiarLienzo)

btnGuardarGrafo.addEventListener("click", guardarGrafo)

var file = document.getElementById("cargarGrafo_js")
file.addEventListener("change", archivoSelecionado)

function archivoSelecionado(evento) {

	file = evento.target.files[0]
	console.log(file);

	var reader = new FileReader();

	reader.onload = function() {

		var grafoACargar = JSON.parse(this.result);

		limpiarLienzo()

		crearGrafo(grafoACargar)

		var estadoActual = {
			msg : "Cagado Correctamente",
			clases : ["MSG", "MSGBien"],
			icono : "icon-correcto"
		}
		console.log('estadoActual');
		crearYMostrarMensaje(estadoActual)

	}
	reader.readAsText(file)
}

window.addEventListener("resize", inhabilitarRezise)

/*Se desactiva el menu contextual del elemento html "svg"*/
lienzo.addEventListener("contextmenu", function(evento){
	evento.preventDefault()
})

/*Se ejecuta la funcion para dibujar la grilla.*/


dibujarGrilla()
