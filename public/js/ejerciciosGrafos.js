var lienzo = document.getElementById("htmlSvgLienzo_js")

var htmlSvgLienzoGrafo = document.getElementById("htmlSvgLienzoGrafo_js")

var htmlSvgLienzoGrilla = document.getElementById("htmlSvgLienzoGrilla_js")

var htmlSvgLienzoGrafoVertices = document.getElementById("htmlSvgLienzoGrafoVertices_js")
var htmlSvgLienzoGrafoNombres = document.getElementById("htmlSvgLienzoGrafoNombres_js")
var htmlSvgLienzoGrafoAristas = document.getElementById("htmlSvgLienzoGrafoAristas_js")

var btnLimpiarLienzo = document.getElementById("btnLimpiarLienzo_js")
var mensajeDeConfirmacionDeBorradoDeLienzo = "¿Desea Borrar Todos los Elementos?"
var mensajeDeConfirmacionDeBorradoDeElemento_s = "¿Desea Borrar el(los) elemento(s)?"
var nombreVertices = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
var conectorDireccionalDeVertices = " → "
var namespaceURI = "http://www.w3.org/2000/svg"
var nombreLineasGrilla

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

function dibujarCirculo(evento){

	if(evento.which == 1){

		var nombreVertice = nombreVertices[posicionAux]
		var htmlCircleVerticeDelGrafo = document.createElementNS(namespaceURI, "circle")
		var htmlTextNombreVerticeDelGrafo = document.createElementNS(namespaceURI,"text")

		htmlCircleVerticeDelGrafo.addEventListener("mousedown", circuloPresionado,true)
		htmlCircleVerticeDelGrafo.addEventListener("mouseup", circuloDesprecionado,true)


		var cxActuales = evento.clientX
		var cyActuales = evento.clientY

		htmlCircleVerticeDelGrafo.setAttribute("cx",cxActuales)
		htmlCircleVerticeDelGrafo.setAttribute("cy",cyActuales)
		htmlTextNombreVerticeDelGrafo.setAttribute("x",cxActuales)
		htmlTextNombreVerticeDelGrafo.setAttribute("y",cyActuales)
		htmlTextNombreVerticeDelGrafo.classList.add("nombreCircle")
		htmlTextNombreVerticeDelGrafo.innerHTML = nombreVertice
		htmlTextNombreVerticeDelGrafo.id = nombreVertice
		htmlCircleVerticeDelGrafo.setAttribute("r",radio)
		htmlCircleVerticeDelGrafo.setAttribute("name",nombreVertice)
		htmlCircleVerticeDelGrafo.setAttribute("draggable","true")
		/*htmlCircleVerticeDelGrafo.classList.add("agrandarEncoger")*/
		posicionAux += 1

		htmlSvgLienzoGrafoVertices.appendChild(htmlCircleVerticeDelGrafo)
		htmlSvgLienzoGrafoNombres.appendChild(htmlTextNombreVerticeDelGrafo)
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

	/*Este clico recorre los elementos "line" existentes*/
	for (var i = 0; i < aristasExistentes.length; i++) {

		/*captura del atributo name de elemento "lien"*/
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
		if (name != nombreLineasGrilla) {
			htmlLineAristaDelGrafo.addEventListener("mousedown", removerElementoLinea)
		}

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





/*se oprime sobre un nod para empezar el evento drag*/
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

	var nuevaPosicionX = evento.clientX
	,nuevaPosicionY = evento.clientY
	,nombreCirculo = this.getAttribute("name")
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
		dibujarLinea(0,j,lienzoWidth,j,htmlSvgLienzoGrilla,"lineGilla",nombreLineasGrilla,origen,destino)
	}

	/*Se crean la lineas Horizontales de la grilla.*/
	for (var i = 0; i <= lienzoWidth; i+=20) {
		dibujarLinea(i,0,i,lienzoHeight,htmlSvgLienzoGrilla,"lineGilla",nombreLineasGrilla,origen,destino)
	}

}

function inhabilitarRezise() {
	limpiarContenedorHTML(htmlSvgLienzoGrilla)
	dibujarGrilla()
}


/*Se agregar el evento "click" al boton de limpiar lienzo, para que al suceder el todos los elementos(Vertices, Aristas y Nombre) se borren del lienzo. No se borra la grilla*/
btnLimpiarLienzo.addEventListener("click", limpiarLienzo)

window.addEventListener("resize", inhabilitarRezise)

/*Se desactiva el menu contextual del elemento html "svg"*/
lienzo.addEventListener("contextmenu", function(evento){
	evento.preventDefault()
})

/*Se ejecuta la funcion para dibujar la grilla.*/
dibujarGrilla()
