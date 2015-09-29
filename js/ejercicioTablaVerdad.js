//inicializacion de variables
var valoresCampo = []
var valoresCampos = []

//Filas de la tabla de verdad
var respuestas = []

//Simbolo de las operaciones de los conjuntos
var simbolosOperacion =  ["Λ","v","→","⇔"]

//valores posibles de una Tablas de Verdad
var posiblesValores = ["V", "F"]

//posibles nombre de las proposiciones
var proposiciones = ["p","q","r","s","t","u","v","w","x","y"]

//solucion a las cinco operaciones basicas de las tablas de verdad
var conjuncion =[["p","q","p Λ q"],
["V","V","V"],
["V","F","F"],
["F","V","F"],
["F","F","F"]]
var disjuncion = [["p","q","p v q"],
["V","V","F"],
["V","F","F"],
["F","V","F"],
["F","F","V"]]
var condicional = [["p","q","p → q"],
["V","V","F"],
["V","F","V"],
["F","V","F"],
["F","F","F"]]
var bicondicional = [["p","q","p ⇔ q"],
["V","V","V"],
["V","F","F"],
["F","V","F"],
["F","F","V"]]
var negacion = [["p","¬p"],
["V","F"],
["F","V"]]

var sectionTablasVerdad = document.getElementById("sectionTablasVerdad_js")
var htmlFormRespuestaUsuario = document.getElementById("htmlFormRespuestaUsuario_js")
var htmlFormEjercicioPropuestoTablasVerdad = document.getElementById("htmlFormEjercicioPropuestoTablasVerdad_js")
var htmSectionContenedoraEjercicioPropuestoTablasVerdad = document.getElementById("sectionTablasVerdad_js")

var htmlInputNumeroProposicionesEscogidasPorUsuario = document.getElementById("htmlInputNumeroProposicionesEscogidasPorUsuario_js")
var numeroCombinacionesPosibles
var limite = 0

var maximaCantidadDeProposiciones = 5
htmlInputNumeroProposicionesEscogidasPorUsuario.setAttribute("max", maximaCantidadDeProposiciones)
htmlInputNumeroProposicionesEscogidasPorUsuario.setAttribute("min", 0)


function crearEjercicio(evento) {

	evento.preventDefault()

	var numeroProposicionesEscogidasPorusuario = Number(htmlInputNumeroProposicionesEscogidasPorUsuario.value)
	numeroCombinacionesPosibles = Math.pow(2,numeroProposicionesEscogidasPorusuario)
	var ejercicioPropuesto = new Array()

	htmlFormEjercicioPropuestoTablasVerdad.removeEventListener("submit", crearEjercicio)




	var htmlTableEjercicioPropuesto = document.createElement("table")
	htmlTableEjercicioPropuesto.id = "tablarVerdad_js"

	var htmlTrTableEjercicioPropuesto = document.createElement("tr")

	for (var filas = 0; filas <= numeroProposicionesEscogidasPorusuario; filas++) {

		var htmlThColumnasEjercicioPropuesto = document.createElement("th")

		if(filas != numeroProposicionesEscogidasPorusuario){

			htmlThColumnasEjercicioPropuesto.innerHTML = proposiciones[filas]
			ejercicioPropuesto.push(proposiciones[numeroAleatorio(proposiciones.length,0)])

		}else{

			for (var posicion = 0; posicion < ejercicioPropuesto.length-1; posicion++) {

				ejercicioPropuesto[posicion] += " " + simbolosOperacion[numeroAleatorio(simbolosOperacion.length,0)] + " "

			}

			console.log(ejercicioPropuesto.join(""))
			htmlThColumnasEjercicioPropuesto.innerHTML = ejercicioPropuesto.join("")

		}

		htmlTrTableEjercicioPropuesto.appendChild(htmlThColumnasEjercicioPropuesto)

	}

	htmlTableEjercicioPropuesto.appendChild(htmlTrTableEjercicioPropuesto)

	for (var filas = 0; filas < numeroCombinacionesPosibles; filas++) {

		var htmlTrTableEjercicioPropuesto =document.createElement("tr")
		htmlTrTableEjercicioPropuesto.id=filas

		for (var columnas = 0; columnas <= numeroProposicionesEscogidasPorusuario; columnas++) {

			var htmlThColumnasEjercicioPropuesto =document.createElement("th")

			if (columnas == numeroProposicionesEscogidasPorusuario) {

				var inputHTML = document.createElement("input")
				inputHTML.classList.add("respuestaEjercicio")
				inputHTML.setAttribute("required", "required")
				inputHTML.setAttribute("maxlength", "1")
				inputHTML.addEventListener("change", verificarRespuestaIngresada)

				htmlThColumnasEjercicioPropuesto.appendChild(inputHTML)

			}else{
				var valorDeVerdad = posiblesValores[numeroAleatorio(2,0)]
				htmlThColumnasEjercicioPropuesto.innerHTML = valorDeVerdad
				if (valorDeVerdad == posiblesValores[0]) {
					htmlThColumnasEjercicioPropuesto.setAttribute("data-ValorBoleano", true)
				}else{
					htmlThColumnasEjercicioPropuesto.setAttribute("data-ValorBoleano", false)
				}

			}

			htmlTrTableEjercicioPropuesto.appendChild(htmlThColumnasEjercicioPropuesto)

		};

		htmlTableEjercicioPropuesto.appendChild(htmlTrTableEjercicioPropuesto)

	}


	//agregar columnas
	btnAgregarColumna = document.createElement("button")
	btnAgregarColumna.id = "agregarFila_js"
	btnAgregarColumna.classList.add("icon-mas","agregarFila")
	btnAgregarColumna.addEventListener("click", crearAgregarFila)

	htmlButton = document.createElement("button")
	htmlButton.setAttribute("type", "submit")
	htmlButton.innerHTML = innerHTMLBtnVerificar
	htmlButton.classList.add("btn", "btnConfirmar","centrarConMargin")
	htmlButton.id = "verificarEjericio"

	var HTMLSpanIconoBtn = document.createElement("span")
	HTMLSpanIconoBtn.classList.add(iconoBtnVerificar,"marginIconos")

	htmlButton.insertBefore(HTMLSpanIconoBtn, htmlButton.firstChild)


	sectionTablasVerdad.appendChild(htmlHrSeparadorContenido)
	sectionTablasVerdad.appendChild(btnAgregarColumna)
	sectionTablasVerdad.appendChild(htmlTableEjercicioPropuesto)
	sectionTablasVerdad.appendChild(htmlButton)

	habilitarInhabilitarFormulario(this)

}

function capturarRespuesta(evento) {

	evento.preventDefault()


	respuestas = []
	valoresCampos = []
	inputsDeRespuesta = []


	var valueOperacionEscogida = document.getElementById("tipoOperacion").value

	for (var campos = 0; campos < numeroCombinacionesPosibles; campos++) {
		var respuesta = document.getElementById(campos)
		respuestas.push(respuesta)
	};

	var valoresboleanos = new Array()
	for (var campo = 0; campo < respuestas.length; campo++) {
		var valoreboleano = new Array()

		var nombreFila = convertirHTMLCollectionEnArray(respuestas[campo].childNodes)
		for (var i = 0; i < nombreFila.length; i++) {

			if (i == nombreFila.length-1) {
				var valorCampo = nombreFila[i].lastChild.value.toUpperCase()
				var boleano = nombreFila[i].lastChild.getAttribute("data-valorboleano")
				inputsDeRespuesta.push(nombreFila[i].lastChild)
				//repito esta linea dos veces por que por el momento no veo otra forma(refactor luego)
				valoresCampo.push(valorCampo)
				valoreboleano.push(boleano)
			}else{
				if (!(nombreFila[i].id == "ColumnadeApoyo")) {
					var boleano = nombreFila[i].getAttribute("data-valorboleano")
					var valorCampo = nombreFila[i].innerHTML
					//repito esta linea dos veces por que por el momento no veo otra forma(refactor luego)
					valoresCampo.push(valorCampo)
				}

				valoreboleano.push(boleano)
			}
			console.log(nombreFila[i],boleano);
		}
		valoresboleanos.push(valoreboleano)

		valoresCampos.push(valoresCampo)
		//reinicializar variable
		valoresCampo = []
	}
	console.log(valoresboleanos);
	validarRespuesta(valoresCampos,valueOperacionEscogida,inputsDeRespuesta)
}

function verificarRespuestaIngresada(){

	var valor = this.value.toUpperCase()

	if (valor == posiblesValores[0] || valor == posiblesValores[1]) {

		this.classList.remove("valorErroneo")

		if (valor == posiblesValores[0]) {
			this.setAttribute("data-ValorBoleano", true)
		}else{
			this.setAttribute("data-ValorBoleano", false)
		}

	}else{

		this.value = ""
		this.classList.add("valorErroneo")

	}

}


function validarRespuesta(respuestaCapturada,operacionEscogida,inputsDeRespuestaCapturados) {

	var respuestasBien = 0

	tablaEscogida = eval(operacionEscogida)

	for (var a = 1; a <= tablaEscogida.length; a++) {

		for (var b = 0; b < respuestaCapturada.length; b++) {

			if( String(tablaEscogida[a]) == String(respuestaCapturada[b])){

				respuestasBien += 1

			}

		}
	}

	if(respuestasBien == respuestaCapturada.length){

		htmlFormRespuestaUsuario.removeEventListener("submit", capturarRespuesta)

		var btnVolver = document.getElementById("verificarEjericio")
		btnVolver.innerHTML = innerHTMLBtnVolver
		btnVolver.addEventListener("click", reiniciarEjercicio)

		var HTMLSpanIconoBtn = document.createElement("span")
		HTMLSpanIconoBtn.classList.add(iconoBtnVolver,"marginIconos")
		btnVolver.insertBefore(HTMLSpanIconoBtn, btnVolver.firstChild)
		console.log("-----------------");
		console.log(inputsDeRespuestaCapturados);
		console.log("-----------------");
		for (var l = 0; l < inputsDeRespuestaCapturados.length; l++) {

			inputsDeRespuestaCapturados[l].disabled = true

		}
		btnAgregarColumna.removeEventListener("click", crearAgregarFila)

		var estadoActual = {
			campoValido: true,
			msg : "Listo, todo bien",
			clases : ["MSG" ,"MSGBien"],
			icono : "icon-correcto"
		}

	}

	else{

		var estadoActual = {
			campoValido: false,
			msg : "Huu, algo va mal",
			clases : ["MSG" ,"MSGError"],
			icono : "icon-equivocado"
		}

	}

	crearYMostrarMensaje(estadoActual)

}




function reiniciarEjercicio() {

	limpiarContenedorHTML(htmSectionContenedoraEjercicioPropuestoTablasVerdad)
	htmlFormEjercicioPropuestoTablasVerdad.addEventListener("submit", crearEjercicio)
	htmlFormRespuestaUsuario.addEventListener("submit", capturarRespuesta)
	habilitarInhabilitarFormulario(htmlFormEjercicioPropuestoTablasVerdad)


}

function crearAgregarFila(evento){

	evento.preventDefault()

	var tablaVerdad = document.getElementById("tablarVerdad_js")
	var tablaVerdadHijos = tablaVerdad.childNodes

	for (var i = 0; i < tablaVerdadHijos.length; i++) {

		var htmlThColumnasEjercicioPropuesto = document.createElement("th")
		htmlThColumnasEjercicioPropuesto.id = "ColumnadeApoyo"

		var inputHTML = document.createElement("input")
		inputHTML.classList.add("respuestaEjercicio")
		inputHTML.setAttribute("maxlength", "1")
		inputHTML.addEventListener("change", verificarRespuestaIngresada)

		htmlThColumnasEjercicioPropuesto.appendChild(inputHTML)
		tablaVerdadHijos[i].insertBefore(htmlThColumnasEjercicioPropuesto,tablaVerdadHijos[i].lastChild)

		htmlThColumnasEjercicioPropuesto.addEventListener("dblclick", marcarColumna)

	}

}

function marcarColumna(){

	var indexColumnaAMarcar = this.cellIndex
	var trPadreDeThClikeado = this.parentNode
	var TrsTable = convertirHTMLCollectionEnArray(trPadreDeThClikeado.parentNode.rows)

	for (var i = 0; i < TrsTable.length; i++) {

		hijosTr = convertirHTMLCollectionEnArray(TrsTable[i].childNodes)

		for(var j = 0, length2 = hijosTr.length; j < length2; j++){

			if (hijosTr[j].cellIndex == indexColumnaAMarcar) {

				hijosTr[j].classList.toggle("columnaMarcada")

			}

		}

	}

}

htmlFormEjercicioPropuestoTablasVerdad.addEventListener("submit", crearEjercicio)
htmlFormRespuestaUsuario.addEventListener("submit", capturarRespuesta)