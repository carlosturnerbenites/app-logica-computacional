var lienzo = document.getElementById("htmlSvgLienzo_js")
var htmlSvgLienzoGrafoVertices = document.getElementById("htmlSvgLienzoGrafoVertices_js")
var htmlSvgLienzoGrafoNombres = document.getElementById("htmlSvgLienzoGrafoNombres_js")
var htmlSvgLienzoGrafoAristas = document.getElementById("htmlSvgLienzoGrafoAristas_js")
var htmlSvgLienzoGrilla = document.getElementById("htmlSvgLienzoGrilla_js")
var htmlSvgLienzoGrafo = document.getElementById("htmlSvgLienzoGrafo_js")
var btnLimpiarLienzo = document.getElementById("btnLimpiarLienzo_js")

var nombreVertices = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
var conectorDireccionalDeVertices = " → "
var namespaceURI = "http://www.w3.org/2000/svg"

var radio = 20
var cxIniciales, cyIniciales
var cxFinales, cyFinales
var posicionLineaInicio, posicionLineaFin
var numero = 0
var nombreLineUno, nombreLineDos
var continuar = new Boolean()
function dibujarCirculo(evento){
	if(evento.which == 1){

		var nombreCircle = nombreVertices[numero]
		var circle = document.createElementNS(namespaceURI, "circle")
		var texto = document.createElementNS(namespaceURI,"text")

		circle.addEventListener("mousedown", circuloPresionado,true)
		circle.addEventListener("mouseup", circuloDesprecionado,true)


		var cxActuales = evento.clientX
		var cyActuales = evento.clientY

		circle.setAttribute("cx",cxActuales)
		circle.setAttribute("cy",cyActuales)
		texto.setAttribute("x",cxActuales)
		texto.setAttribute("y",cyActuales)
		texto.classList.add("nombreCircle")
		texto.innerHTML = nombreCircle
		texto.id = nombreCircle
		circle.setAttribute("r", radio)
		circle.setAttribute("name",nombreCircle)
		circle.setAttribute("draggable", "true")
	//circle.classList.add("agrandarEncoger")
	numero += 1

	htmlSvgLienzoGrafoVertices.appendChild(circle)
	htmlSvgLienzoGrafoNombres.appendChild(texto)
}


}
function removerElementoLinea(evento) {
	evento.preventDefault()
	if (evento.which == 2) {
		var estadoActual = {
			campoValido: true,
			msg : "La line se borro",
			clases : ["MSG", "MSGBien"],
			icono : "icon-correcto"
		}
		crearYMostrarMensaje(estadoActual)
		htmlSvgLienzoGrafoAristas.removeChild(this)
	};
}
function dibujarLinea(x1,y1,x2,y2,contenedor,clase,name) {

	continuar = true

	var lineasExistentes = htmlSvgLienzoGrafoAristas.childNodes

	for (var i = 0; i < lineasExistentes.length; i++) {
		var nameLineaExistente = lineasExistentes[i].getAttribute("name")
		if (name == nameLineaExistente) {
			var estadoActual = {
				campoValido: true,
				msg : "Esta linea ya existe",
				clases : ["MSG", "MSGError"],
				icono : "icon-correcto"
			}
			continuar = false
			crearYMostrarMensaje(estadoActual)
		}
	}

	if (continuar) {

		var line = document.createElementNS(namespaceURI, "line")

		line.setAttribute("x1",x1)
		line.setAttribute("y1",y1)
		line.setAttribute("x2",x2)
		line.setAttribute("y2",y2)
		line.setAttribute("name",name)
		line.classList.add(clase)
		line.addEventListener("mousedown", removerElementoLinea)

		contenedor.appendChild(line)
		console.log('se creo una linea');
	}

}

function limpiarLienzo() {
	while (htmlSvgLienzoGrafoVertices.firstChild) {
		htmlSvgLienzoGrafoVertices.removeChild(htmlSvgLienzoGrafoVertices.firstChild);
	}
	while (htmlSvgLienzoGrafoAristas.firstChild) {
		htmlSvgLienzoGrafoAristas.removeChild(htmlSvgLienzoGrafoAristas.firstChild);
	}
}

function circuloPresionado(evento) {
	var nombreLinea
	var nombreCirculo
	evento.preventDefault()
	cxIniciales = this.getAttribute("cx")
	cyIniciales = this.getAttribute("cy")
	if (evento.which == 1) {
		nombreLineUno = this.getAttribute("name")

	}else if(evento.which == 3){
		console.log('drag drag');
	}else if(evento.which == 2){


		var lineasExistentes = convertirHTMLCollectionEnArray(htmlSvgLienzoGrafoAristas.childNodes)

		console.log(lineasExistentes);
		htmlSvgLienzoGrafoVertices.removeChild(this)
		htmlSvgLienzoGrafoNombres.removeChild(document.getElementById(this.getAttribute("name")))
		for (var i = 0; i <= lineasExistentes.length; i++) {

			nombreLinea = lineasExistentes[i].getAttribute("name")
			nombreCirculo = this.getAttribute("name")

			if (nombreLinea.indexOf(nombreCirculo) != -1) {
				htmlSvgLienzoGrafoAristas.removeChild(lineasExistentes[i])
			}
		}
	}
}
function circuloDesprecionado(evento) {
	evento.preventDefault()
	nombreLineDos = this.getAttribute("name")
	if (evento.which == 1) {

		cxFinales = this.getAttribute("cx")
		cyFinales = this.getAttribute("cy")
		var nombreLinea = nombreLineUno+conectorDireccionalDeVertices+ nombreLineDos
		dibujarLinea(cxIniciales,cyIniciales,cxFinales,cyFinales,htmlSvgLienzoGrafoAristas,"lineGrafo",nombreLinea)

	}



	//circle.addEventListener("onmouseup", circuloDesprecionado)
}

function dibujarGrilla() {

	var lienzoHeight = lienzo.clientHeight
	var lienzoWidth = lienzo.clientWidth

	for (var j = 0; j <= lienzoHeight; j+=20) {
		dibujarLinea(0,j,lienzoWidth,j,htmlSvgLienzoGrilla,"lineGilla","grilla")
	}
	for (var i = 0; i <= lienzoWidth; i+=20) {

		dibujarLinea(i,0,i,lienzoHeight,htmlSvgLienzoGrilla,"lineGilla","grilla")
	};
}

function inhabilitarRezise() {
	//limpiarContenedorHTML(htmlSvgLienzoGrilla)
	//dibujarGrilla()
}

lienzo.addEventListener("dblclick", dibujarCirculo)

btnLimpiarLienzo.addEventListener("click", limpiarLienzo)

window.addEventListener("resize", inhabilitarRezise)

lienzo.addEventListener("contextmenu", function(evento){
	evento.preventDefault()
})

dibujarGrilla()
