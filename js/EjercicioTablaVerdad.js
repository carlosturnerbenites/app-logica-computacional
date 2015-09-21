var fromValidarRespuesta = document.getElementById("fromValidarRespuesta")
var ejercicioTablaVerdad = document.getElementById("ejercicioTablaVerdad")


function crearEjercicio(evento) {
	evento.preventDefault()
	ejercicioTablaVerdad.removeEventListener("submit", crearEjercicio)



	var numeroProposiciones = Number(document.getElementById("numeroProposiciones").value)

	numeroCombinaciones = Math.pow(2,numeroProposiciones)

	var tableHTML = document.createElement("table")
	tableHTML.id="tablarVerdad_js"


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


	//agregar columnas
	btnAgregarColumna = document.createElement("button")
	btnAgregarColumna.id = "agregarFila_js"
	btnAgregarColumna.classList.add("icon-mas","agregarFila")
	btnAgregarColumna.addEventListener("click", crearAgregarFila)


	inputHTML = document.createElement("input")
	inputHTML.setAttribute("type", "submit")
	inputHTML.setAttribute("value", "Verificar")
	inputHTML.classList.add("btn", "btnConfirmar")
	inputHTML.id = "verificarEjericio"
	sectionTablasVerdad.appendChild(btnAgregarColumna)
	sectionTablasVerdad.appendChild(tableHTML)
	sectionTablasVerdad.appendChild(inputHTML)
}

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

		for (var i = 0; i < nombreFila.length; i++) {
			if (i == nombreFila.length-1) {
				var valorCampo = nombreFila[i].lastChild.value.toUpperCase()
				inputsDeRespuesta.push(nombreFila[i].lastChild)
				//repito esta linea dos veces por que por el momento no veo otra forma(refactor luego)
				valoresCampo.push(valorCampo)
			}else{
				if (!(nombreFila[i].id == "ColumnadeApoyo")) {

					console.log(nombreFila[i].id == "ColumnadeApoyo");
					var valorCampo = nombreFila[i].innerHTML
					//repito esta linea dos veces por que por el momento no veo otra forma(refactor luego)
					valoresCampo.push(valorCampo)
				}

			}
		}

		valoresCampos.push(valoresCampo)
		console.log(valoresCampos);
		//reinicializar variable
		valoresCampo = []
	};
	validarRespuesta(valoresCampos,valueOperacionEscogida,inputsDeRespuesta)
}

function verificarRespuestaIngresada(){

	var valor = this.value
	console.log(valor)

	if (valor.toUpperCase() == "V" || valor.toUpperCase() == "F") {
		this.classList.remove("valorErroneo")
	}else{
		this.value = ""
		this.classList.add("valorErroneo")
	}
}
function reiniciarEjercicio() {
	console.log('Reiniciando');
}
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
		fromValidarRespuesta.removeEventListener("submit", capturarRespuesta)
		var btnVolver = document.getElementById("verificarEjericio")
		btnVolver.value = "Volver"
		btnVolver.addEventListener("click", reiniciarEjercicio)
		for (var l = 0; l < inputsDeRespuestaCapturados.length; l++) {
			inputsDeRespuestaCapturados[l].setAttribute("disabled", "disabled")
		};
		var mensaje = document.createElement("p")
		mensaje.innerHTML = "Listo, Todo bien."
		sectionTablasVerdad.appendChild(mensaje)
	}
	else{
		var mensaje = document.createElement("p")
		mensaje.innerHTML = "Huuu, Algo va mal."
		sectionTablasVerdad.appendChild(mensaje)
		setTimeout(function() {
			sectionTablasVerdad.removeChild(mensaje)
		}, 2000)
	}
};

function marcarColumna(){
	var nodoPadre = this.parentNode
	console.log(nodoPadre);
}

function crearAgregarFila(evento){
	evento.preventDefault()
	var tablaVerdad = document.getElementById("tablarVerdad_js")
	var tablaVerdadHijos = tablaVerdad.childNodes
	for (var i = 0; i < tablaVerdadHijos.length; i++) {
		console.log(tablaVerdadHijos[i])
		var thHTML = document.createElement("th")
		thHTML.id = "ColumnadeApoyo"
		var inputHTML = document.createElement("input")
		inputHTML.classList.add("respuestaEjercicio")
		inputHTML.setAttribute("maxlength", "1")
		inputHTML.addEventListener("change", verificarRespuestaIngresada)

		thHTML.appendChild(inputHTML)
		tablaVerdadHijos[i].insertBefore(thHTML,tablaVerdadHijos[i].lastChild)

		thHTML.addEventListener("dblclick", marcarColumna)
	};
}



ejercicioTablaVerdad.addEventListener("submit", crearEjercicio)
fromValidarRespuesta.addEventListener("submit", capturarRespuesta)
