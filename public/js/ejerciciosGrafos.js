var lienzo = document.getElementById("htmlSvgLienzo_js")
,htmlSvgLienzoGrafo = document.getElementById("htmlSvgLienzoGrafo_js")
,htmlSvgLienzoGrilla = document.getElementById("htmlSvgLienzoGrilla_js")
,htmlSvgLienzoGrafoVertices = document.getElementById("htmlSvgLienzoGrafoVertices_js")
,htmlSvgLienzoGrafoNombres = document.getElementById("htmlSvgLienzoGrafoNombres_js")
,htmlSvgLienzoGrafoAristas = document.getElementById("htmlSvgLienzoGrafoAristas_js")
,btnLimpiarLienzo = document.getElementById("btnLimpiarLienzo_js")
,btnGuardarGrafo = document.getElementById("btnGuardarGrafo_js")

var mensajeDeConfirmacionDeBorradoDeLienzo = "¿Desea Borrar Todos los Elementos?"
,mensajeDeConfirmacionDeBorradoDeElemento_s = "¿Desea Borrar el(los) elemento(s)?"
,nombreVertices = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
,conectorDireccionalDeVertices = " → "
,namespaceURI = "http://www.w3.org/2000/svg"
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



function dibujarCirculo(evento){

	if(evento.which == 1){

		var nombreVertice = nombreVertices[posicionAux]
		var html_vertice = document.createElementNS(namespaceURI, "circle")
		var html_nameVertice = document.createElementNS(namespaceURI,"text")

		html_vertice.addEventListener("mousedown", circuloPresionado,true)
		html_vertice.addEventListener("mouseup", circuloDesprecionado,true)

		if(evento.offsetX) {
			cxActuales = evento.offsetX;
			cyActuales = evento.offsetY;
		}
		else if(evento.layerX) {
			cxActuales = evento.layerX;
			cyActuales = evento.layerY;
		}


		setAtributes(html_vertice,{cx:cxActuales,cy:cyActuales,r:radio,name:nombreVertice})
		/*html_vertice.classList.add("agrandarEncoger")*/

		setAtributes(html_nameVertice,{x:cxActuales,y:cyActuales})
		html_nameVertice.classList.add("nombreCircle")
		html_nameVertice.innerHTML = nombreVertice
		html_nameVertice.id = nombreVertice

		posicionAux += 1

		htmlSvgLienzoGrafoVertices.appendChild(html_vertice)
		htmlSvgLienzoGrafoNombres.appendChild(html_nameVertice)


	}
}


function removerElementoLinea(evento) {
	linea = this
	evento.preventDefault()

	if (evento.which == 2) {
		if (confirm(mensajeDeConfirmacionDeBorradoDeElemento_s)) {
			var estadoActual = {
				msg : "La line se borro",
				clases : ["MSG", "MSGBien"],
				icono : "icon-correcto"
			}
			crearYMostrarMensaje(estadoActual)
			htmlSvgLienzoGrafoAristas.removeChild(linea)
		}
	}
}

/*refactor nombre variable "name".*/
function dibujarLinea(x1,y1,x2,y2,name,origen,destino) {

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
		setAtributes(htmlLineAristaDelGrafo,{x1:x1,y1:y1,x2:x2,y2:y2,name:name,origen:origen,destino:destino})


		/*Mediante el atributo "name" se verifica que la linea no pertenezca a la grilla, pues si pertecene no se le deben añadir eventos*/
		htmlLineAristaDelGrafo.addEventListener("mousedown", removerElementoLinea)

		/*Agregar linea al Contenedor*/
		htmlSvgLienzoGrafoAristas.appendChild(htmlLineAristaDelGrafo)

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
				setAtributes(lineaDelVertice[i],{x1: nuevaPosicionX,y1: nuevaPosicionY})
			}else{
				setAtributes(lineaDelVertice[i],{x2: nuevaPosicionX,y2: nuevaPosicionY})

			}
		}
	}

	/*mover letra del nodo*/
	setAtributes(letra,{x: nuevaPosicionX,y: nuevaPosicionY})

	/*mover nodo*/
	setAtributes(this,{cx: nuevaPosicionX,cy: nuevaPosicionY})
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

		dibujarLinea(cxIniciales,cyIniciales,cxFinales,cyFinales,nombreNuevaArista,origen,destino)

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

	setAtributes(htmlLineAristaDelGrafo,{x1:x1,y1:y1,x2:x2,y2:y2})

	htmlLineAristaDelGrafo.classList.add(clase)

	contenedor.appendChild(htmlLineAristaDelGrafo)

}



function capturarGrafo(){
	var vertices = htmlSvgLienzoGrafoVertices.children
	var aristas = htmlSvgLienzoGrafoAristas.children
	var grafo = new Array()

	if (vertices.length != 0 && aristas.length != 0){
		for (var i = 0, vertice; vertice = vertices[i]; i++) {
			var elemento = {
				type:"circle",
				data:{
					cx : vertice.getAttribute("cx"),
					cy : vertice.getAttribute("cy"),
					r : vertice.getAttribute("r"),
					name : vertice.getAttribute("name")
				}
			}
			grafo.push(elemento)
		}

		for (var i = 0, arista; arista = aristas[i] ;i++) {
			var elemento = {
				type:"line",
				data:{
					x1 : arista.getAttribute("x1"),
					y1 : arista.getAttribute("y1"),
					x2 : arista.getAttribute("x2"),
					y2 : arista.getAttribute("y2"),
					name : arista.getAttribute("name"),
					origen : arista.getAttribute("origen"),
					destino : arista.getAttribute("destino")
				}
			}
			grafo.push(elemento)
		}

		return grafo
	}else{
		crearYMostrarMensaje({msg : "Este grafo esta vacio, no vale la pena guardarlo.",clases : ["MSG", "MSGBien"],icono : "icon-correcto"})
		return
	}


}


function guardarGrafo(){

	var grafo = capturarGrafo()

	if (typeof grafo != "undefined"){

		var oReq = new XMLHttpRequest();
		oReq.onreadystatechange = function() {
			if (oReq.readyState == 4) {
				crearYMostrarMensaje(JSON.parse(oReq.responseText));
			}
		}

		oReq.open("POST", "/guardarGrafo");
		oReq.setRequestHeader('Content-Type', 'application/json')
		oReq.send(JSON.stringify(grafo))
	}else{
		//crearYMostrarMensaje({msg : "No se guardo el grafo",clases : ["MSG" ,"MSGBien"],icono : "icon-correcto"});
		return
	}

}
function crearGrafo(elementos){

	for(var elemento of elementos){

		if (elemento.type == "line"){

			var htmlLineAristaDelGrafo = document.createElementNS(namespaceURI, "line")
			var data = elemento.data

			/*Enviao de Atributos al elemento "line"*/
			setAtributes(htmlLineAristaDelGrafo,{x1 : data.x1,y1 : data.y1,x2 : data.x2,y2 : data.y2,name : data.name,origen : data.origen,destino : data.destino})


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



var html_inputCargarGrafo = document.getElementById("cargarGrafo_js")
html_inputCargarGrafo.addEventListener("change", cargarGrafo)

function cargarGrafo(evento) {

	var fileGrafo = evento.target.files[0]
	,reader = new FileReader();

	reader.onload = function() {
		var fileGrafoJSON = JSON.parse(this.result);

		limpiarLienzo()
		crearGrafo(fileGrafoJSON)

		crearYMostrarMensaje({msg : "Cagado Correctamente",clases : ["MSG", "MSGBien"],icono : "icon-correcto"})

		html_inputCargarGrafo.value = ""

	}
	reader.readAsText(fileGrafo)
}

/*Se agregar el evento "click" al boton de limpiar lienzo, para que al suceder el todos los elementos(Vertices, Aristas y Nombre) se borren del lienzo. No se borra la grilla*/
btnLimpiarLienzo.addEventListener("click", limpiarLienzo)

btnGuardarGrafo.addEventListener("click", guardarGrafo)

/*Se desactiva el menu contextual del elemento html "svg"*/
lienzo.addEventListener("contextmenu", function(evento){
	evento.preventDefault()
})

/*Se ejecuta la funcion para dibujar la grilla.*/
dibujarGrilla()
