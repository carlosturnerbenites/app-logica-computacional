function crearEjercicio(evento) {

	evento.preventDefault()

	var numeroProposiciones = Number(document.getElementById("numeroProposiciones").value)
	var tipoOperacion = document.getElementById("tipoOperacion")

	numeroCombinaciones = Math.pow(2,numeroProposiciones)

	var tableHTML = document.createElement("table")


	var trHTML =document.createElement("tr")
	for (var filas = 0; filas <= numeroProposiciones; filas++) {
		var thHTML =document.createElement("th")
		if(filas != numeroProposiciones){
			thHTML.innerHTML = proposiciones[filas]
			solucion += proposiciones[filas]
		}else{
			thHTML.innerHTML = solucion
		}
		trHTML.appendChild(thHTML)

	}
	tableHTML.appendChild(trHTML)

	for (var filas = 0; filas < numeroCombinaciones; filas++) {

		var trHTML =document.createElement("tr")
		trHTML.id=filas
		for (var columnas = 0; columnas <= numeroProposiciones; columnas++) {
			var thHTML =document.createElement("th")
			if (columnas == numeroProposiciones) {
				var inputHTML = document.createElement("input")
				inputHTML.classList.add("respuestaEjercicio")
				inputHTML.setAttribute("required", "required")
				thHTML.appendChild(inputHTML)
			}else{
				thHTML.innerHTML = "no"
			}

			trHTML.appendChild(thHTML)

		};

		tableHTML.appendChild(trHTML)
	};
	inputHTML = document.createElement("input")
	inputHTML.setAttribute("type", "submit")
	inputHTML.setAttribute("value", "Verificar")
	sectionTablasVerdad.appendChild(tableHTML)
	sectionTablasVerdad.appendChild(inputHTML)
}



var ejercicioTablaVerdad = document.getElementById("ejercicioTablaVerdad")

function validarRespuesta(evento) {

	evento.preventDefault()

	for (var campos = 0; campos < numeroCombinaciones; campos++) {
		var respuesta = document.getElementById(campos)
		respuestas.push(respuesta)

	};
	for (var campo = 0; campo < respuestas.length; campo++) {

		var nombreFila = convertirHTMLCollectionEnArray(respuestas[campo].childNodes)
		console.log(nombreFila);


		for (var i = 0; i <= nombreFila.length; i++) {
			if(i != nombreFila.length){
				console.log(nombreFila[i])
			}else{
				console.log(nombreFila[i].lastChild)
			}
		};
	};
}

ejercicioTablaVerdad.addEventListener("submit", crearEjercicio)
fromValidarRespuesta.addEventListener("submit", validarRespuesta)
