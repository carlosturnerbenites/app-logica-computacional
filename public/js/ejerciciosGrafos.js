var lienzo = document.getElementById("htmlSvgLienzo_js")
,htmlSvgLienzoGrafo = document.getElementById("htmlSvgLienzoGrafo_js")
,htmlSvgLienzoGrilla = document.getElementById("htmlSvgLienzoGrilla_js")
,htmlSvgLienzoGrafoVertices = document.getElementById("htmlSvgLienzoGrafoVertices_js")
,htmlSvgLienzoGrafoNombres = document.getElementById("htmlSvgLienzoGrafoNombres_js")
,htmlSvgLienzoGrafoAristas = document.getElementById("htmlSvgLienzoGrafoAristas_js")
,btnLimpiarLienzo = document.getElementById("btnLimpiarLienzo_js")
,btnGuardarGrafo = document.getElementById("btnGuardarGrafo_js")

var html_inputCargarGrafo = document.getElementById("cargarGrafo_js")

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
var lineasDelVertice = new Array()

/*Acciones del lienzo*/
var accionConectar = document.getElementById("accionConectar_js")
,accionCrear = document.getElementById("accionCrear_js")
,accionBorrar = document.getElementById("accionBorrar_js")
,accionMover = document.getElementById("accionMover_js")


function dibujarCirculo(evento){

	if(evento.which == 1){
		accionCrear.classList.add("accionActiva")
		var nombreVertice = nombreVertices[posicionAux]
		var html_vertice = document.createElementNS(namespaceURI, "circle")
		var html_nameVertice = document.createElementNS(namespaceURI,"text")

		html_vertice.addEventListener("mousedown", circuloPresionado,true)
		html_vertice.addEventListener("dblclick", eliminarElemento,true)
		html_vertice.addEventListener("mouseup", circuloDesprecionado,true)


		cxActuales = evento.offsetX;
		cyActuales = evento.offsetY;

		setAttributes(html_vertice,{cx:cxActuales,cy:cyActuales,r:radio,name:nombreVertice})
		/*html_vertice.classList.add("agrandarEncoger")*/

		setAttributes(html_nameVertice,{x:cxActuales,y:cyActuales})
		html_nameVertice.classList.add("nombreCircle")
		html_nameVertice.innerHTML = nombreVertice
		html_nameVertice.id = nombreVertice


		htmlSvgLienzoGrafoVertices.appendChild(html_vertice)
		htmlSvgLienzoGrafoNombres.appendChild(html_nameVertice)
		posicionAux += 1
		setTimeout(function(){
			accionCrear.classList.remove("accionActiva")
		}, 500)
	}
}

/*Funcion encargada de ecoger que accion ejecutar sobre un elemento segun el boton del mouse oprimido*/
function eliminarElemento(evento) {
	/*Si se presiona la rueda del raton, se inicia el proceso para eliminar un vertice(elemento "circle") y sus aristas asociadas(elemento "line")*/
	if(evento.which == 2){
		accionBorrar.classList.add("accionActiva")

		/*Se pide confirmacion para borrar*/
		if (confirm(mensajeDeConfirmacionDeBorradoDeElemento_s)) {

			if(this.tagName == "circle"){

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
			}else{
				htmlSvgLienzoGrafoAristas.removeChild(this)
			}








		}

		accionBorrar.classList.remove("accionActiva")
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
		if (x1 == x2 && y1 == y2){
			console.log('ciclo');
		};
		setAttributes(htmlLineAristaDelGrafo,{x1:x1,y1:y1,x2:x2,y2:y2,name:name,origen:origen,destino:destino})


		/*Mediante el atributo "name" se verifica que la linea no pertenezca a la grilla, pues si pertecene no se le deben añadir eventos*/
		htmlLineAristaDelGrafo.addEventListener("dblclick", eliminarElemento)

		/*Agregar linea al Contenedor*/
		htmlSvgLienzoGrafoAristas.appendChild(htmlLineAristaDelGrafo)

	}
}

/*Funcion encargada de limpiar el lienzo de dibujo*/
function limpiarLienzo() {
	if (lienzo.hasAttribute("disabled")){
		crearYMostrarMensaje({msg : "El lienzo no esta hailitado",clases : ["MSG", "MSGError"],icono : "icon-equivocado"})
		html_inputCargarGrafo.value = ""

	}else{
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
}

function circuloPresionado(evento) {

	evento.preventDefault()

	var nombreLinea
	var nombreCirculo

	cxIniciales = this.getAttribute("cx")
	cyIniciales = this.getAttribute("cy")

	/*si se presiono el boton Izquierdo. se inicia el proceso para crear una arista(elemento "line") que conecta dos vertices(elemento "circles")*/
	if (evento.which == 3) {

		/*Se define el nombre del vertice inicial(del elemento de donde comienza la linea)*/
		nombreVerticeInicial = this.getAttribute("name")
		accionConectar.classList.add("accionActiva")

	}
	/*Si se presiona el boton Derecho se inicia el proceso de arrastre y soltar*/
	else if(evento.which == 2){

		cxElementEnMovimiento = this.getAttribute("cx")
		cyElementEnMovimiento = this.getAttribute("cy")
		posicionCirculo = cxElementEnMovimiento+","+cyElementEnMovimiento

		this.addEventListener("mousemove", drag)
		this.addEventListener("mouseup", terminarDrag)


	}
}

function circuloDesprecionado(evento) {

	evento.preventDefault()

	nombreVerticeFinal = this.getAttribute("name")

	if (evento.which == 3) {

		cxFinales = this.getAttribute("cx")
		cyFinales = this.getAttribute("cy")

		var nombreNuevaArista = nombreVerticeInicial + conectorDireccionalDeVertices + nombreVerticeFinal
		,origen = nombreVerticeInicial
		,destino = nombreVerticeFinal

		dibujarLinea(cxIniciales,cyIniciales,cxFinales,cyFinales,nombreNuevaArista,origen,destino)
		accionConectar.classList.remove("accionActiva")


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

	setAttributes(htmlLineAristaDelGrafo,{x1:x1,y1:y1,x2:x2,y2:y2})

	htmlLineAristaDelGrafo.classList.add(clase)

	contenedor.appendChild(htmlLineAristaDelGrafo)
}

function capturarGrafo(){
	var vertices = htmlSvgLienzoGrafoVertices.children
	var aristas = htmlSvgLienzoGrafoAristas.children
	var grafo = new Array()

	if (vertices.length != 0 || aristas.length != 0){
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
		crearYMostrarMensaje({msg : "Este grafo esta vacio, no vale la pena guardarlo.",clases : ["MSG", "MSGError"],icono : "icon-equivocado"})
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
			var data = elemento.data
			dibujarLinea(data.x1,data.y1,data.x2,data.y2,data.name,data.origen,data.destino)
		}else{
			var htmlCircleVerticeDelGrafo = document.createElementNS(namespaceURI, "circle")
			var htmlTextNombreVerticeDelGrafo = document.createElementNS(namespaceURI,"text")

			htmlCircleVerticeDelGrafo.addEventListener("mousedown", circuloPresionado,true)
			htmlCircleVerticeDelGrafo.addEventListener("dblclick", eliminarElemento,true)
			htmlCircleVerticeDelGrafo.addEventListener("mouseup", circuloDesprecionado,true)

			setAttributes(htmlCircleVerticeDelGrafo,{cx:elemento.data.cx, cy:elemento.data.cy,r:elemento.data.r,name:elemento.data.name})
			/*htmlCircleVerticeDelGrafo.classList.add("agrandarEncoger")*/

			setAttributes(htmlTextNombreVerticeDelGrafo,{x:elemento.data.cx,y:elemento.data.cy})
			htmlTextNombreVerticeDelGrafo.innerHTML = elemento.data.name
			htmlTextNombreVerticeDelGrafo.id = elemento.data.name

			htmlTextNombreVerticeDelGrafo.classList.add("nombreCircle")

			htmlSvgLienzoGrafoVertices.appendChild(htmlCircleVerticeDelGrafo)
			htmlSvgLienzoGrafoNombres.appendChild(htmlTextNombreVerticeDelGrafo)
		}
	}
}

function cargarGrafo(evento) {
	if (lienzo.hasAttribute("disabled")){
		crearYMostrarMensaje({msg : "El lienzo no esta hailitado",clases : ["MSG", "MSGError"],icono : "icon-equivocado"})
		html_inputCargarGrafo.value = ""

	}else{

		var fileGrafo = evento.target.files[0]
		,reader = new FileReader();

		reader.onload = function() {
			var fileGrafoJSON = JSON.parse(this.result);

			limpiarLienzo()
			crearGrafo(fileGrafoJSON)

			crearYMostrarMensaje({msg : "Cagado Correctamente",clases : ["MSG", "MSGBien"],icono : "icon-correcto"})

			html_inputCargarGrafo.value = ""

		}
		reader.onerror = function(error){
			console.log(error)
		}
		reader.readAsText(fileGrafo)
	}
}

/*##############################################################
######################Drag And Drop#############################
##############################################################*/


/*se inicia el drag*/
function drag(evento) {
	accionMover.classList.add("accionActiva")

	var lineaDelVertice = new Array()

	var aristasExistentes = htmlSvgLienzoGrafoAristas.childNodes

	nuevaPosicionX = evento.offsetX;
	nuevaPosicionY = evento.offsetY;


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
				setAttributes(lineaDelVertice[i],{x1: nuevaPosicionX,y1: nuevaPosicionY})
			}else{
				setAttributes(lineaDelVertice[i],{x2: nuevaPosicionX,y2: nuevaPosicionY})

			}
		}
	}

	/*mover letra del nodo*/
	setAttributes(letra,{x: nuevaPosicionX,y: nuevaPosicionY})

	/*mover nodo*/
	setAttributes(this,{cx: nuevaPosicionX,cy: nuevaPosicionY})
}

/*Terminar el evento drag*/
function terminarDrag(evento) {
	accionMover.classList.remove("accionActiva")

	this.removeEventListener("mousemove", drag)
}

/*##############################################################
######################Drag And Drop#############################
##############################################################*/

/*Se agregar el evento "click" al boton de limpiar lienzo, para que al suceder el todos los elementos(Vertices, Aristas y Nombre) se borren del lienzo. No se borra la grilla*/
btnLimpiarLienzo.addEventListener("click", limpiarLienzo)

html_inputCargarGrafo.addEventListener("change", cargarGrafo)

btnGuardarGrafo.addEventListener("click", guardarGrafo)

/*Se desactiva el menu contextual del elemento html "svg"*/
lienzo.addEventListener("contextmenu", function(evento){
	evento.preventDefault()
})

/*Se ejecuta la funcion para dibujar la grilla.*/
dibujarGrilla()
