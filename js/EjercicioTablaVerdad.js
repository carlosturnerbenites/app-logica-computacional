var fromValidarRespuesta = document.getElementById("fromValidarRespuesta")

function crearEjercicio(evento) {
	evento.preventDefault()
	ejercicioTablaVerdad.removeEventListener("submit", crearEjercicio)
	function verificarRespuestaIngresada(){

		var valor = this.value

		if (valor.toUpperCase() == "V" || valor.toUpperCase() == "F") {
			this.classList.remove("valorErroneo")
		}else{
			this.value = ""
			this.classList.add("valorErroneo")
		}
	}


	var numeroProposiciones = Number(document.getElementById("numeroProposiciones").value)

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
	inputHTML.id = "verificarEjericio"
	sectionTablasVerdad.appendChild(tableHTML)
	sectionTablasVerdad.appendChild(inputHTML)
}

var ejercicioTablaVerdad = document.getElementById("ejercicioTablaVerdad")

function capturarRespuesta(evento) {

	respuestas = []
	valoresCampos = []
	inputsDeRespuesta = []


	evento.preventDefault()
	var valueOperacionEscogida = document.getElementById("tipoOperacion").value

	for (var campos = 0; campos < numeroCombinaciones; campos++) {
		var respuesta = document.getElementById(campos)
		respuestas.push(respuesta)

	};

	for (var campo = 0; campo < respuestas.length; campo++) {

		var nombreFila = convertirHTMLCollectionEnArray(respuestas[campo].childNodes)
		console.log(nombreFila);

		for (var i = 0; i < nombreFila.length; i++) {
			if (i == nombreFila.length-1) {
				var valorCampo = nombreFila[i].lastChild.value.toUpperCase()
				inputsDeRespuesta.push(nombreFila[i].lastChild)
			}else{

				var valorCampo = nombreFila[i].innerHTML
			}
			valoresCampo.push(valorCampo)
		}

		valoresCampos.push(valoresCampo)
		//reinicializar variable
		valoresCampo = []
	};
	validarRespuesta(valoresCampos,valueOperacionEscogida,inputsDeRespuesta)
};

function validarRespuesta(respuestaCapturada,operacionEscogida,inputsDeRespuestaCapturados) {
	respuestasBien = 0
	respuestasMal = 0

	tablaEscogida = eval(operacionEscogida)

	for (var a = 1; a <= tablaEscogida.length; a++) {
		for (var b = 0; b < respuestaCapturada.length; b++) {
			if( String(tablaEscogida[a]) == String(respuestaCapturada[b])){
				respuestasBien += 1
			}else{
				respuestasMal += 1
			}

		}
	}
	if(respuestasBien == respuestaCapturada.length){
		console.log('Bien, esta correcto');
		fromValidarRespuesta.removeEventListener("submit", capturarRespuesta)
		document.getElementById("verificarEjericio").value = "Volver"
		for (var l = 0; l < inputsDeRespuestaCapturados.length; l++) {
			console.log(inputsDeRespuestaCapturados);
			inputsDeRespuestaCapturados[l].setAttribute("disabled", "disabled")
		};
		var mensaje = document.createElement("p")
		mensaje.innerHTML = "Listo, Todo bien."
		sectionTablasVerdad.appendChild(mensaje)
	}
	else{
		console.log("huuu, Algo va mal");
		var mensaje = document.createElement("p")
		mensaje.innerHTML = "Huuu, Algo va mal."
		sectionTablasVerdad.appendChild(mensaje)
		setTimeout(function() {
			sectionTablasVerdad.removeChild(mensaje)
		}, 2000)
	}
};


ejercicioTablaVerdad.addEventListener("submit", crearEjercicio)
fromValidarRespuesta.addEventListener("submit", capturarRespuesta)
