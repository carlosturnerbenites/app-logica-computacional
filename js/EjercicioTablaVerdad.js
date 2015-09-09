function crearEjercicio(evento) {

	function verificarRespuestaIngresada(){

		var valor = this.value

		if (valor.toUpperCase() == "V" || valor.toUpperCase() == "F") {
			this.classList.remove("valorErroneo")
		}else{
			this.value = ""
			this.classList.add("valorErroneo")
		}
	}

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
	//reinicia el valor del campo de soluciones
	solucion = ""
	tableHTML.appendChild(trHTML)

	for (var filas = 0; filas < numeroCombinaciones; filas++) {

		var trHTML =document.createElement("tr")
		trHTML.id=filas
		for (var columnas = 0; columnas <= numeroProposiciones; columnas++) {
			var thHTML =document.createElement("th")
			if (columnas == numeroProposiciones) {
				var inputHTML = document.createElement("input")
				//inputHTML.setAttribute("autofocus", "autofocus")
				inputHTML.classList.add("respuestaEjercicio")
				inputHTML.setAttribute("required", "required")
				inputHTML.setAttribute("maxlength", "1")

				inputHTML.addEventListener("change", verificarRespuestaIngresada)

				thHTML.appendChild(inputHTML)
			}else{
				thHTML.innerHTML = posiblesValores[numeroAleatorio(2,0)]
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

function validarRespuesta(respuestaCapturada,operacionEscogida) {
	for (var a = 1; a <= respuestaCapturada.length; a++) {
		for (var b = 0; b < tablaY.length; b++) {
			if(String(tablaY[a]) == String(respuestaCapturada[b])){
				console.log(String(tablaY[a]), String(respuestaCapturada[b]));
				console.log("bien");
			}
		}
	};
};


var ejercicioTablaVerdad = document.getElementById("ejercicioTablaVerdad")

function capturarRespuesta(evento) {


	evento.preventDefault()
	var valueOperacionEscogida = document.getElementById("tipoOperacion").value

	for (var campos = 0; campos < numeroCombinaciones; campos++) {
		var respuesta = document.getElementById(campos)
		respuestas.push(respuesta)

	};
	for (var campo = 0; campo < respuestas.length; campo++) {

		var nombreFila = convertirHTMLCollectionEnArray(respuestas[campo].childNodes)


		for (var i = 0; i < nombreFila.length; i++) {
			if (i == nombreFila.length-1) {
				var valorCampo = nombreFila[i].lastChild.value.toUpperCase()
			}else{

				var valorCampo = nombreFila[i].innerHTML
			}
			valoresCampo.push(valorCampo)
		}

		valoresCampos.push(valoresCampo)
		//reinicializar variable
		valoresCampo = []
	};

	validarRespuesta(valoresCampos,valueOperacionEscogida)
};

ejercicioTablaVerdad.addEventListener("submit", crearEjercicio)
fromValidarRespuesta.addEventListener("submit", capturarRespuesta)
