var lienzoGrafo = document.getElementById("lienzoGrafo_js")
var auxContaCirculos = 0

lienzoGrafo.addEventListener("click", dibujarCirculo)

function dibujarCirculo(evento){

	var radio = 10
	var cxActuales = evento.x
	var cyActuales = evento.y

	console.log("cx y cy actuales " + cxActuales,cyActuales);

	var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")

	circle.setAttribute("cx",cxActuales)
	circle.setAttribute("cy",cyActuales)
	circle.setAttribute("r", radio)

	if (lienzoGrafo.childElementCount == 0) {
		lienzoGrafo.appendChild(circle)
	}else{

		console.log(lienzoGrafo.lastChild)

		var cxAnteriores = lienzoGrafo.lastChild.getAttribute("cx")

		var cyAnteriores = lienzoGrafo.lastChild.getAttribute("cy")
		lienzoGrafo.appendChild(circle)



		console.log("cx y cy anteriores " + cxAnteriores,cyAnteriores)


		dibujarLinea(cxAnteriores,cyAnteriores,cxActuales,cyActuales)
	}
}

function dibujarLinea(x1,y1,x2,y2) {
	var line = document.createElementNS("http://www.w3.org/2000/svg", "line")

	line.setAttribute("x1",x1)
	line.setAttribute("y1",y1)
	line.setAttribute("x2",x2)
	line.setAttribute("y2",y2)

	line.setAttribute("stroke", "green")
	line.setAttribute("stroke-width", "10px")

	console.log(line);

	lienzoGrafo.insertBefore(line,lienzoGrafo.lastChild)
}
