//inicializacion de variables
var valoresCampo = []
,valoresCampos = []

//Filas de la tabla de verdad
,respuestas = []

//Simbolo de las operaciones de los conjuntos
var simbolosOperacion =  ["Λ","v","→","⇔"]

//valores posibles de una Tablas de Verdad
,posiblesValores = ["V", "F"]

//posibles nombre de las proposiciones
,proposiciones = ["p","q","r","s","t","u","v","w","x","y"]

//solucion a las cinco operaciones basicas de las tablas de verdad
,conjuncion =[["p","q","p Λ q"],
["V","V","V"],
["V","F","F"],
["F","V","F"],
["F","F","F"]]
,disjuncion = [["p","q","p v q"],
["V","V","F"],
["V","F","F"],
["F","V","F"],
["F","F","V"]]
,condicional = [["p","q","p → q"],
["V","V","F"],
["V","F","V"],
["F","V","F"],
["F","F","F"]]
,bicondicional = [["p","q","p ⇔ q"],
["V","V","V"],
["V","F","F"],
["F","V","F"],
["F","F","V"]]
,negacion = [["p","¬p"],
["V","F"],
["F","V"]]

var sectionTablasVerdad = document.getElementById("sectionTablasVerdad_js")
,htmlFormRespuestaUsuario = document.getElementById("htmlFormRespuestaUsuario_js")
,htmlFormEjercicioPropuestoTablasVerdad = document.getElementById("htmlFormEjercicioPropuestoTablasVerdad_js")
,htmSectionContenedoraEjercicioPropuestoTablasVerdad = document.getElementById("sectionTablasVerdad_js")
,htmlInputNumeroProposicionesEscogidasPorUsuario = document.getElementById("htmlInputNumeroProposicionesEscogidasPorUsuario_js")
,numeroCombinacionesPosibles = 0

var limite = 0
,maximaCantidadDeProposiciones = 5

htmlInputNumeroProposicionesEscogidasPorUsuario.setAttribute("max", maximaCantidadDeProposiciones)
htmlInputNumeroProposicionesEscogidasPorUsuario.setAttribute("min", 0)

var arrayProposiciones = new Array()
var arrayaux = new Array()
var proposicionesCompuesta = new Array()
var ejercicioPropuesto = new Array()


function crearEjercicio(evento) {

	evento.preventDefault()

	var numeroProposicionesEscogidasPorusuario = Number(htmlInputNumeroProposicionesEscogidasPorUsuario.value)

	/**/
	var star = 0
	for (var i = 0; i < numeroProposicionesEscogidasPorusuario; i++) {
		var letraProposicion = proposiciones[numeroAleatorio(proposiciones.length,0)]
		var prop = new proposicion()
		prop["letra"] = letraProposicion
		prop["negacion"] = getValuBoolean()
		prop["valorBoleano"] = getValuBoolean()
		prop.getProposicion()


		arrayProposiciones.push(prop)
		proposicionesCompuesta.push(prop)
		/*
		*/
		if ((i+1)%2 == 0){

			//arrayProposiciones = []
			arrayProposiciones.push(proposicionesCompuesta)

			arrayProposiciones.splice(star, 2)

			proposicionesCompuesta = []


			star+=1
		};
	}
	crearProposicionCompuesta(arrayProposiciones)
	/**/

	numeroCombinacionesPosibles = Math.pow(2,numeroProposicionesEscogidasPorusuario)

	htmlFormEjercicioPropuestoTablasVerdad.removeEventListener("submit", crearEjercicio)




	var htmlTableEjercicioPropuesto = document.createElement("table")
	htmlTableEjercicioPropuesto.id = "tablarVerdad_js"

	var htmlTrTableEjercicioPropuesto = document.createElement("tr")

	for (var filas = 0; filas <= numeroProposicionesEscogidasPorusuario; filas++) {

		var htmlThColumnasEjercicioPropuesto = document.createElement("th")

		if(filas != numeroProposicionesEscogidasPorusuario){

			htmlThColumnasEjercicioPropuesto.innerHTML = proposiciones[filas]
		}else{
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
		}
		valoresboleanos.push(valoreboleano)

		valoresCampos.push(valoresCampo)
		//reinicializar variable
		valoresCampo = []
	}
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
		for (var l = 0; l < inputsDeRespuestaCapturados.length; l++) {

			inputsDeRespuestaCapturados[l].disabled = true

		}
		btnAgregarColumna.removeEventListener("click", crearAgregarFila)

		var mensaje = {tipoMensaje : 0, mensaje : "Listo, todo bien"}

	}

	else{

		var mensaje = {tipoMensaje : 1, mensaje : "Huu, algo va mal"}

	}

	crearYMostrarMensaje(mensaje)
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

function and(proposiciones) {
	this.simbolo = " Λ "
	var resultado = proposiciones[0].valorBoleano && proposiciones[1].valorBoleano
	console.log(resultado)
}
function or(proposiciones) {
	this.operar = function(){
		var resultado = proposiciones.pUno.valorBoleano || proposiciones.pDos.valorBoleano
		return resultado

	}
}
function conditional(proposiciones) {
	this.operar = function(){
		var resultado = !proposiciones.pUno.valorBoleano || proposiciones.pDos.valorBoleano
		return resultado

	}
}
function biconditional(proposiciones) {
	this.operar = function(){
		var resultado = (proposiciones.pUno.valorBoleano && proposiciones.pDos.valorBoleano) || (!proposiciones.pUno.valorBoleano && !proposiciones.pDos.valorBoleano)
		return resultado
	}
}

function getValuBoolean(){
	var aux = numeroAleatorio(2,0)
	return !!aux
}

function proposicion(){
	this.letra = new String(),
	this.negacion = new Boolean(),
	this.valorBoleano = new Boolean(),
	this.negar = function(){
		if (this.negacion){
			this.valorBoleano = !this.valorBoleano
			this.letra = "!" + this.letra
		}
	},
	this.getProposicion = function() {
		this.negar()
		var data = {
			letra:this.letra,
			valorBoleano:this.valorBoleano
		}
		return data
	}
}

function expresion(p1,p2,conector) {
	this.p1 = p1
	this.p2 = p2
	this.conector = conector
	this.getExpresionCompleta = function() {
		expresionCompleta = "(" + this.p1.letra + this.conector.simbolo + this.p2.letra + ")"
		return expresionCompleta
	}
}

function conectarProposiciones(array) {
	conector = new and(array)
	exp = new expresion(array[0],array[1],conector);
	var expComp = exp.getExpresionCompleta()
	ejercicioPropuesto.push(expComp)

}

function crearProposicionCompuesta(props) {
	for (var i = 0; i < props.length; i++) {
		if (props[i].length == 2){

			conectarProposiciones(props[i])
		}else{
			ejercicioPropuesto.push(props[i].letra)
		}
	}
}

htmlFormEjercicioPropuestoTablasVerdad.addEventListener("submit", crearEjercicio)
htmlFormRespuestaUsuario.addEventListener("submit", capturarRespuesta)
