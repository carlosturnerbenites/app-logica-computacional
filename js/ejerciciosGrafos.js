var lienzoGrafo = document.getElementById("lienzoGrafo_js")
var btnLimpiarLienzo = document.getElementById("btnLimpiarLienzo_js")

lienzoGrafo.addEventListener("click", dibujarCirculo)

btnLimpiarLienzo.addEventListener("click", limpiarLienzo)

var maximaElementos = 10

function dibujarCirculo(evento){

	console.log(modoDibujoLibre);
	console.log(maximaElementos);

	var radio = 10
	var cxActuales = evento.clientX
	var cyActuales = evento.clientY

	var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")

	circle.setAttribute("cx",cxActuales)
	circle.setAttribute("cy",cyActuales)
	circle.setAttribute("r", radio)

	if (lienzoGrafo.childElementCount == 0) {
		lienzoGrafo.appendChild(circle)
	}else{
		if (lienzoGrafo.childElementCount <= maximaElementos){


			console.log(lienzoGrafo.lastChild)

			var cxAnteriores = lienzoGrafo.lastChild.getAttribute("cx")

			var cyAnteriores = lienzoGrafo.lastChild.getAttribute("cy")
			lienzoGrafo.appendChild(circle)



			console.log("cx y cy anteriores " + cxAnteriores,cyAnteriores)


			dibujarLinea(cxAnteriores,cyAnteriores,cxActuales,cyActuales,radio)
		}
	}
}

function dibujarLinea(x1,y1,x2,y2) {
	var line = document.createElementNS("http://www.w3.org/2000/svg", "line")

	line.setAttribute("x1",x1)
	line.setAttribute("y1",y1)
	line.setAttribute("x2",x2)
	line.setAttribute("y2",y2)


	console.log(line);

	lienzoGrafo.insertBefore(line,lienzoGrafo.lastChild)
}

var modoDeDibujo = document.getElementById("modoDeDibujo_js")
modoDeDibujo.addEventListener("change", escogerModoDeDibujo)
var modoDibujoLibre = false

function escogerModoDeDibujo() {
	if (modoDeDibujo.checked) {
		maximaElementos = Infinity
	}else{
		maximaElementos = 10
	}
	limpiarLienzo()
}
