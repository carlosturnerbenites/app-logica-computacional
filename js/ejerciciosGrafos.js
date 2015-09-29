var lienzo = document.getElementById("htmlSvgLienzo_js")
var htmlSvgLienzoGrafoVertices = document.getElementById("htmlSvgLienzoGrafoVertices_js")
var htmlSvgLienzoGrafoAristas = document.getElementById("htmlSvgLienzoGrafoAristas_js")
var htmlSvgLienzoGrilla = document.getElementById("htmlSvgLienzoGrilla_js")
var btnLimpiarLienzo = document.getElementById("btnLimpiarLienzo_js")

var namespaceURI = "http://www.w3.org/2000/svg"
var cxAnteriores
var cyAnteriores
var radio = 20
var cxIniciales
var cyIniciales
var cxFinales
var cyFinales
var numero = 0
var nombreLineUno
var nombreLineDos
function dibujarCirculo(evento){

	var circle = document.createElementNS(namespaceURI, "circle")
	circle.addEventListener("mousedown", circuloPresionado,true)
	circle.addEventListener("mouseup", circuloDesprecionado,true)


	var cxActuales = evento.clientX
	var cyActuales = evento.clientY

	circle.setAttribute("cx",cxActuales)
	circle.setAttribute("cy",cyActuales)
	circle.setAttribute("r", radio)
	circle.setAttribute("name",numero)
	numero+=1

	htmlSvgLienzoGrafoVertices.appendChild(circle)

}

function dibujarLinea(x1,y1,x2,y2,contenedor,clase,name) {

	var line = document.createElementNS(namespaceURI, "line")

	line.setAttribute("x1",x1)
	line.setAttribute("y1",y1)
	line.setAttribute("x2",x2)
	line.setAttribute("y2",y2)
	line.setAttribute("name",name)
	line.classList.add(clase)
	line.addEventListener("mousedown", function() {
		console.log("line presionada")
	})

	contenedor.appendChild(line)
}

function limpiarLienzo() {
	while (htmlSvgLienzoGrafo.firstChild) {
		htmlSvgLienzoGrafo.removeChild(htmlSvgLienzoGrafo.firstChild);
	}
}

function circuloPresionado(evento) {
	console.log('.........................');
	console.log('circle inicio');
	console.log(this);
	nombreLineUno = this.getAttribute("name")
	console.log('.........................');

	evento.preventDefault()
	console.log('mouse presionado');
	cxIniciales = this.getAttribute("cx")
	cyIniciales = this.getAttribute("cy")
	console.log(cxIniciales);
	console.log(cyIniciales);
}
function circuloDesprecionado(evento) {
	evento.preventDefault()
	console.log('.........................');
	console.log('circle fin');
	console.log(this);
	console.log('.........................');
	nombreLineDos = this.getAttribute("name")
	console.log('mouse despresionado');

	cxFinales = this.getAttribute("cx")
	cyFinales = this.getAttribute("cy")
	console.log(cxFinales);
	console.log(cyFinales);
	var nombreLinea = nombreLineUno+nombreLineDos
	dibujarLinea(cxIniciales,cyIniciales,cxFinales,cyFinales,htmlSvgLienzoGrafoAristas,"lineGrafo",nombreLinea)



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

function limpiarGrilla() {
	limpiarContenedorHTML(htmlSvgLienzoGrilla)
	dibujarGrilla()
}

lienzo.addEventListener("dblclick", dibujarCirculo)
btnLimpiarLienzo.addEventListener("click", limpiarLienzo)
window.addEventListener("resize", limpiarGrilla)

dibujarGrilla()
