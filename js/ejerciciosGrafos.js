var lienzoGrafo = document.getElementById("lienzoGrafo_js")
var auxContaCirculos = 0

lienzoGrafo.addEventListener("click", dibujarCirculo)

function dibujarCirculo(evento){
	var cxAnteriores = 0
	var cyAnteriores = 0


	auxContaCirculos += 1

	var radio = 10
	var cxActuales = evento.clientX
	var cyActuales = evento.clientY

	var cxAnteriores = cxActuales
	var cyAnteriores = cyActuales

	console.log(cxActuales,cyActuales);

	var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")

	circle.setAttribute("cx",cxActuales)
	circle.setAttribute("cy",cyActuales)
	circle.setAttribute("r", radio)

	lienzoGrafo.appendChild(circle)

	if (auxContaCirculos > 1) {
		dibujarLinea(cxAnteriores,cyAnteriores,cxActuales,cyActuales)
	};

}

function dibujarLinea(x1,y1,x2,y2) {

	console.log("x1 " + x1)
	console.log("y1 " + y1)
	console.log("x2 " + x2)
	console.log("y2 " + y2)

	var line = document.createElementNS("http://www.w3.org/2000/svg", "line")

	line.setAttribute("x1",x1)
	line.setAttribute("y1",x1)
	line.setAttribute("x2",y1)
	line.setAttribute("y2",y2)
	line.setAttribute("stroke", "green")
	line.setAttribute("stroke-width", "10px")

	lienzoGrafo.appendChild(line)
}
