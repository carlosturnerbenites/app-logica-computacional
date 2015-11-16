var htmlInputgrafoCompleto = document.getElementById("htmlInputgrafoCompleto_js")
var htmlFormVerificarDatosGrafo = document.getElementById("htmlFormVerificarDatosGrafo_js")
var htmlFormGrafos = document.getElementById("htmlFormGrafos_js")
var htmlInputCantidadVertices = document.getElementById("htmlInputCantidadVertices_js")
var htmlInputCantidadAristas = document.getElementById("htmlInputCantidadAristas_js")

var DLGrapAsFile = document.getElementById("DLGrapAsFile_js")
,DLGrapAsPNG = document.getElementById("DLGrapAsPNG_js")
,nameFileGraph = document.getElementById("nameFileGraph_js")


var lienzo = document.getElementById("htmlSvgLienzo_js")
,htmlSvgLienzoGrafo = document.getElementById("htmlSvgLienzoGrafo_js")
,htmlSvgLienzoGrilla = document.getElementById("htmlSvgLienzoGrilla_js")
,htmlSvgLienzoGrafoVertices = document.getElementById("htmlSvgLienzoGrafoVertices_js")
,htmlSvgLienzoGrafoNombres = document.getElementById("htmlSvgLienzoGrafoNombres_js")
,htmlSvgLienzoGrafoAristas = document.getElementById("htmlSvgLienzoGrafoAristas_js")
,btnLimpiarLienzo = document.getElementById("btnLimpiarLienzo_js")


function lienzohabilitado(){
	if (lienzo.hasAttribute("disabled")){
		crearYMostrarMensaje(1,"El lienzo no esta habilitado")
		return false
	}else{
		return true
	}
}

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

/*la cantidad maxima de vertices se asigna dependiendo de la cantidad de nombre de vertices que hallan(Esto ultimo se obtiene del arreglo "nombresVertices")*/
htmlInputCantidadVertices.setAttribute("max", nombreVertices.length)
htmlInputCantidadVertices.addEventListener("change", validarAristasYGrados)

function lienzoPresionado(evento) {
	if (lienzohabilitado()){

		if(evento.which == 1){
			var x = evento.offsetX
			,y = evento.offsetY
			var nombreVertice = nombreVertices[posicionAux]

			dibujarCirculo(x,y,nombreVertice)
		}
	}
}

function dibujarCirculo(posX,posY,name){

	if (posX != undefined && posY != undefined) {

		accionCrear.classList.add("accionActiva")
		var html_vertice = document.createElementNS(namespaceURI, "circle")
		var html_nameVertice = document.createElementNS(namespaceURI,"text")

		html_vertice.addEventListener("mousedown", circuloPresionado,true)
		html_vertice.addEventListener("touchstart", circuloPresionado,true)
		html_vertice.addEventListener("dblclick", eliminarElemento,true)
		html_vertice.addEventListener("mouseup", circuloDesprecionado,true)
		html_vertice.addEventListener("touchend", circuloDesprecionado,true)


		cxActuales = posX
		cyActuales = posY

		setAttributes(html_vertice,{cx:cxActuales,cy:cyActuales,r:radio,name:name})
		/*html_vertice.classList.add("agrandarEncoger")*/

		setAttributes(html_nameVertice,{x:cxActuales,y:cyActuales})
		html_nameVertice.classList.add("nombreCircle")
		html_nameVertice.innerHTML = name
		html_nameVertice.id = name


		htmlSvgLienzoGrafoVertices.appendChild(html_vertice)
		htmlSvgLienzoGrafoNombres.appendChild(html_nameVertice)
		posicionAux += 1
		setTimeout(function(){
			accionCrear.classList.remove("accionActiva")
		}, 500)

	}
}

function dibujarLinea(x1,y1,x2,y2,name,origen,destino) {
	/*refactor nombre variable "name".*/
	if (x1 != undefined && y1 != undefined && x2 != undefined && y2 != undefined) {
		if(x1 != x2 && y1 != y2){


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

				continuar = false

				/*Se crea e inserta un mensaje en el DOM*/
				crearYMostrarMensaje( 1,"Esta linea ya existe")

			}
		}

		}else {
			continuar = false
		}

		if (continuar) {

			/*Creacion del elemento "line"*/
			var htmlLineAristaDelGrafo = document.createElementNS(namespaceURI, "line")

			/*Enviao de Atributos al elemento "line"*/
			if (x1 == x2 && y1 == y2){
			};
			setAttributes(htmlLineAristaDelGrafo,{x1:x1,y1:y1,x2:x2,y2:y2,name:name,origen:origen,destino:destino})


			/*Mediante el atributo "name" se verifica que la linea no pertenezca a la grilla, pues si pertecene no se le deben añadir eventos*/
			htmlLineAristaDelGrafo.addEventListener("dblclick", eliminarElemento)

			/*Agregar linea al Contenedor*/
			htmlSvgLienzoGrafoAristas.appendChild(htmlLineAristaDelGrafo)

		}
	}else {
		crearYMostrarMensaje( 1,"Disculpa, ocurrio un error interno")
		console.log("error");
	}

}

function circuloPresionado(evento) {
	evento.preventDefault()

	var nombreLinea
	var nombreCirculo

	cxIniciales = this.getAttribute("cx")
	cyIniciales = this.getAttribute("cy")

	/*si se presiono el boton Izquierdo. se inicia el proceso para crear una arista(elemento "line") que conecta dos vertices(elemento "circles")*/
	if (evento.which == 3 || evento.type =="touchstart")  {
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

	if (evento.which == 3 || evento.type =="touchend") {
		cxFinales = this.getAttribute("cx")
		cyFinales = this.getAttribute("cy")

		var nombreNuevaArista = nombreVerticeInicial + conectorDireccionalDeVertices + nombreVerticeFinal
		,origen = nombreVerticeInicial
		,destino = nombreVerticeFinal

		dibujarLinea(cxIniciales,cyIniciales,cxFinales,cyFinales,nombreNuevaArista,origen,destino)
		accionConectar.classList.remove("accionActiva")


	}
}

function eliminarElemento(evento) {
	/*Funcion encargada de ecoger que accion ejecutar sobre un elemento segun el boton del mouse oprimido*/
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

function limpiarLienzo() {
	/*Funcion encargada de limpiar el lienzo de dibujo*/
	if (lienzohabilitado()){
		//html_inputCargarGrafo.value = ""

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
			return true
		}else{
			return false
		}
	}
}

function dibujarGrilla() {
	/*Funcion encargada de dibujar la grilla de refencia en el lienzo.*/

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

function guardarGrafo(evento){

	evento.preventDefault()

	var grafo = capturarGrafo()


	if (typeof grafo != "undefined"){

		var oReq = new XMLHttpRequest();
		oReq.onreadystatechange = function() {
			if (oReq.readyState == 4) {
				var mensaje = JSON.parse(oReq.responseText)
				crearYMostrarMensaje(mensaje.tipoMensaje,mensaje.mensaje);
			}
		}

		oReq.open("POST", "/guardarGrafo");
		oReq.setRequestHeader('name-File', nameFileGraph.value)
		oReq.setRequestHeader('Content-Type', 'application/json')
		oReq.send(JSON.stringify(grafo))
	}else{
		//crearYMostrarMensaje({msg : "No se guardo el grafo",clases : ["MSG" ,"MSGBien"],icono : "icon-correcto"});
		return
	}
}

function cargarGrafo(evento) {

	if (lienzohabilitado()){

		if(limpiarLienzo()){

			var fileGrafo = evento.target.files[0]
			,reader = new FileReader();

			reader.onload = function() {
				var fileGrafoJSON = JSON.parse(this.result);

				crearGrafo(fileGrafoJSON)

				crearYMostrarMensaje(0,"Cagado Correctamente")

				html_inputCargarGrafo.value = ""

			}
			reader.onerror = function(error){
			}
			reader.readAsText(fileGrafo)
		}else{
			html_inputCargarGrafo.value = ""
		}
	}else{
		html_inputCargarGrafo.value = ""
	}
}

function crearGrafo(elementos){

	for(var elemento of elementos){

		var data = elemento.data

		if (elemento.type == "line"){
			dibujarLinea(data.x1,data.y1,data.x2,data.y2,data.name,data.origen,data.destino)
		}else{
			dibujarCirculo(data.cx,data.cy, data.name)
		}
	}
}

function capturarGrafo(){
	if (lienzohabilitado()){

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
			crearYMostrarMensaje(1,  "Este grafo esta vacio, no vale la pena guardarlo.")
			return
		}

	}
}

/*##############################################################
######################Drag And Drop#############################
##############################################################*/


function drag(evento) {
	/*se inicia el drag*/
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

function terminarDrag(evento) {
	/*Terminar el evento drag*/
	accionMover.classList.remove("accionActiva")

	this.removeEventListener("mousemove", drag)
}

/*##############################################################
######################Drag And Drop#############################
##############################################################*/


function VerificarFormYHabilitarLienzo(evento) {
	ejecicioEnEjecucion = true

	evento.preventDefault()
	validarAristasYGrados()

	lienzo.removeAttribute("disabled")

	if (htmlInputgrafoCompleto.checked) {
		habilitarInhabilitarInput(htmlInputCantidadAristas)
	}

	habilitarInhabilitarFormulario(this)
	htmlFormGrafos.removeEventListener("submit", VerificarFormYHabilitarLienzo)

	htmlFormVerificarDatosGrafo.appendChild(btnValidar)
	htmlFormVerificarDatosGrafo.addEventListener("submit", validarGrafo)
}

function validarAristasYGrados(evento) {

	numeroDeVertices = htmlInputCantidadVertices.value
	var numeroMaximoAristas = ((numeroDeVertices*(numeroDeVertices-1))/2)

	if (htmlInputgrafoCompleto.checked) {
		numeroDeAristas = numeroMaximoAristas
	}else{
		numeroDeAristas = htmlInputCantidadAristas.value
	}

	/*Este maximo de aristas no comtempla cilcos(arista de n a n) ni direccion del grafo*/
	htmlInputCantidadAristas.setAttribute("max", numeroMaximoAristas)
}

function validarGrafo(evento) {

	evento.preventDefault()

	var numeroDeVerticesEnLienzo = htmlSvgLienzoGrafoVertices.childElementCount
	var numeroDeAristasEnLienzo = htmlSvgLienzoGrafoAristas.childElementCount

	if (parseInt(numeroDeVertices) == numeroDeVerticesEnLienzo){
		if (parseInt(numeroDeAristas) == numeroDeAristasEnLienzo) {

			htmlFormVerificarDatosGrafo.addEventListener("submit", validarGrados)

			crearCamposParaGradoDeVertice()

			htmlFormVerificarDatosGrafo.removeEventListener("submit", validarGrafo)


			var mensaje = {tipoMensaje : 0, mensaje : "Listo, todo bien."}
		}else{
			var mensaje = {tipoMensaje : 1, mensaje : "Hay un problema con Las Aristas"}
		}
	}else{
		var mensaje = {tipoMensaje : 1, mensaje : "Hay un problema con los vertices"}
	}
	crearYMostrarMensaje(mensaje.tipoMensaje,mensaje.mensaje)
}
function validarGrados(evento){

	evento.preventDefault()

	var correcto = true
	var grados = verificarGradosDeVertices()
	var inputGrados = htmlFormVerificarDatosGrafo.elements

	for (var i = 0, input; input = inputGrados[i]; i++) {
		if (input.type.toLowerCase() != "submit"){
			if (grados[i]["grado"] != input.value){
				correcto = false
			}
		}
	}

	if (correcto){
		var mensaje = {tipoMensaje : 0, mensaje : "Listo, todo bien."}
		habilitarInhabilitarFormulario(htmlFormVerificarDatosGrafo)

		htmlFormVerificarDatosGrafo.replaceChild(btnVolver, btnValidar)
		htmlFormVerificarDatosGrafo.removeEventListener("submit", validarGrados)
		htmlFormVerificarDatosGrafo.addEventListener("submit", reiniciarEjercicio)

	}else{
		var mensaje = {tipoMensaje : 1, mensaje : "Huuu, algo va mal."}
	}
	crearYMostrarMensaje(mensaje.tipoMensaje,mensaje.mensaje)
}

function HabilitarGrafocompleto() {
	habilitarInhabilitarInput(htmlInputCantidadAristas)
}

function crearCamposParaGradoDeVertice() {

	var htmlLabelGradoVertices = document.createElement("p")
	htmlLabelGradoVertices.innerHTML = "Grado de los Vertices"
	var htmlUlContenedorListaGradoDeVertice = document.createElement("ul")
	htmlUlContenedorListaGradoDeVertice.classList.add("listadoGradoVertices")
	var nombresVertices = htmlSvgLienzoGrafoNombres.children
	htmlUlContenedorListaGradoDeVertice.appendChild(htmlLabelGradoVertices)

	for (var i = 0; i < numeroDeVertices; i++) {
		var htmlUlContenedorGradoDeVertice = document.createElement("li")
		var htmlSpanTextoGradoVertices = document.createElement("span")
		htmlSpanTextoGradoVertices.classList.add("nombreVertice")

		var htmlInputNombreDeUnVertice = document.createElement("span")
		//setAttributes(htmlInputNombreDeUnVertice,{required:true,type:"text",id:"nombreVertice_js"})
		htmlInputNombreDeUnVertice.innerHTML = nombresVertices[i].id

		htmlSpanTextoGradoVertices.appendChild(htmlInputNombreDeUnVertice)

		var htmlInputGradoDeUnVertice = document.createElement("input")
		setAttributes(htmlInputGradoDeUnVertice,{required:true,type:"number",id:"gradoVertice_js"})
		htmlInputGradoDeUnVertice.classList.add("inputBorderBottomFocus","inputCorto")

		htmlUlContenedorGradoDeVertice.appendChild(htmlSpanTextoGradoVertices)
		htmlUlContenedorGradoDeVertice.appendChild(htmlInputGradoDeUnVertice)
		htmlUlContenedorListaGradoDeVertice.appendChild(htmlUlContenedorGradoDeVertice)
		htmlFormVerificarDatosGrafo.insertBefore(htmlUlContenedorListaGradoDeVertice, htmlFormVerificarDatosGrafo.firstChild)
	}
}

function verificarGradosDeVertices() {
	var grados = new Array()
	var verticesEnLienzo = htmlSvgLienzoGrafoVertices.children
	var aristasEnLienzo = htmlSvgLienzoGrafoAristas.children

	for(var i = 0, vertice; vertice = verticesEnLienzo[i]; i++){

		var contadorConcurrencia = 0
		var nombreVertice = vertice.getAttribute("name")

		for(var a = 0, arista; arista = aristasEnLienzo[a]; a++){

			var nombreArista = arista.getAttribute("name")

			if (nombreArista.indexOf(nombreVertice) != -1) {
				contadorConcurrencia += 1
			}
		}
		grados.push({vertice:nombreVertice,grado:contadorConcurrencia})
	}
	return grados
}

function DownloadGhrapAsFile() {
	var nombre = nameFileGraph.value

}
function DownloadGhrapAsPNG() {
	if (lienzohabilitado()) {
		var nombre = nameFileGraph.value
		saveSvgAsPng(lienzo, nombre + ".png")

	}
}

function reiniciarEjercicio(evento) {
	ejecicioEnEjecucion = false
	evento.preventDefault()

	if(limpiarLienzo()){

		htmlFormVerificarDatosGrafo.removeChild(btnVolver)

		limpiarContenedorHTML(htmlFormVerificarDatosGrafo)
		habilitarInhabilitarFormulario(htmlFormGrafos)
		habilitarInhabilitarInput(btnValidar)
		htmlFormGrafos.reset()
		lienzo.setAttribute("disabled","true")
		htmlFormVerificarDatosGrafo.removeEventListener("submit", reiniciarEjercicio)

		htmlFormGrafos.addEventListener("submit", VerificarFormYHabilitarLienzo)
	}else{
		return
	}
}

htmlFormGrafos.addEventListener("submit", VerificarFormYHabilitarLienzo)
htmlInputgrafoCompleto.addEventListener("change", HabilitarGrafocompleto)

lienzo.addEventListener("click", lienzoPresionado)

/*Se agregar el evento "click" al boton de limpiar lienzo, para que al suceder el todos los elementos(Vertices, Aristas y Nombre) se borren del lienzo. No se borra la grilla*/
btnLimpiarLienzo.addEventListener("click", limpiarLienzo)

DLGrapAsFile.addEventListener("click", DownloadGhrapAsFile)
DLGrapAsPNG.addEventListener("click", DownloadGhrapAsPNG)

html_inputCargarGrafo.addEventListener("change", cargarGrafo)

DLGrapAsFile.addEventListener("click", guardarGrafo)

/*Se desactiva el menu contextual del elemento html "svg"*/
lienzo.addEventListener("contextmenu", function(evento){
	evento.preventDefault()
})

/*Se ejecuta la funcion para dibujar la grilla.*/
dibujarGrilla()
