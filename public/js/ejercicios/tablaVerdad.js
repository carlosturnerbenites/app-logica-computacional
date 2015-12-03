 //Filas de la tabla de verdad
 var respuestas = []

//valores posibles de una Tablas de Verdad
,posiblesValores = ["V", "F"]

//posibles nombre de las proposiciones
,proposiciones = ["p","q","r","s","t","u","v","w","x","y"]
,conectores = ["and","or","conditional","biconditional"]
var sectionTablasVerdad = document.getElementById("sectionTablasVerdad_js")
,htmlFormRespuestaUsuario = document.getElementById("htmlFormRespuestaUsuario_js")
,htmlFormEjercicioPropuestoTablasVerdad = document.getElementById("htmlFormEjercicioPropuestoTablasVerdad_js")
,htmSectionContenedoraEjercicioPropuestoTablasVerdad = document.getElementById("sectionTablasVerdad_js")
,htmlInputNumeroProposicionesEscogidasPorUsuario = document.getElementById("htmlInputNumeroProposicionesEscogidasPorUsuario_js")
,numeroCombinacionesPosibles = 0
,maximaCantidadDeProposiciones = 5

htmlInputNumeroProposicionesEscogidasPorUsuario.setAttribute("max", maximaCantidadDeProposiciones)


var arrayProposiciones = new Array()
,proposicionesCompuesta = new Array()
,expresionFinal = new Array()


function crearEjercicio(evento) {
	ejecicioEnEjecucion = true

	var proposicionesTemp = proposiciones

	evento.preventDefault()

	htmlFormEjercicioPropuestoTablasVerdad.removeEventListener("submit", crearEjercicio)

	var numeroProposicionesEscogidasPorusuario = Number(htmlInputNumeroProposicionesEscogidasPorUsuario.value)
	var star = 0

	numeroCombinacionesPosibles = Math.pow(2,numeroProposicionesEscogidasPorusuario)

	var table = document.createElement("table")
	table.id = "tablarVerdad_js"

	var tr = document.createElement("tr")
	tr.id = "headerTable_js"

	for (var filas = 0; filas <= numeroProposicionesEscogidasPorusuario; filas++) {

		var letraProposicion = proposicionesTemp.getElementRandom()
		proposicionesTemp.splice(letraProposicion.index, 1)
		var th = document.createElement("th")


		if (filas != numeroProposicionesEscogidasPorusuario){

			var prop = new proposicion()
			prop.letra = letraProposicion.element
			prop.negacion = getValuBoolean()
			prop.getletraFinal()

			arrayProposiciones.push(prop)
			proposicionesCompuesta.push(prop)


			th.innerHTML = letraProposicion.element
			var id = letraProposicion + filas
			th.id = id
			tr.appendChild(th)
		}else{

			while (arrayProposiciones.length > 1) {

				for (var p = 0,prop; prop = arrayProposiciones[p]; p++) {
					var star = 0
					var star = 0
					if ((p + 1) % 2 == 0){
						var conector = conectores.getElementRandom()
						var expresionCompuesta = new expresion(arrayProposiciones[0],arrayProposiciones[1],conector.element)
						arrayProposiciones.push(expresionCompuesta)
						arrayProposiciones.splice(star, 2)
						star+=1
					}
				}
				expresionFinal = arrayProposiciones[0]
			}

			for (var l = 0, propComp; propComp = arrayProposiciones[l]; l++) {
				if ( arrayProposiciones.length > 1) {
					if (propComp.constructor.name == expresion.name){
						var th = document.createElement("th")
						th.innerHTML = propComp.getExpresionCompleta()
						th.setAttribute("expresionASolucionar","true")
						tr.appendChild(th)
					}
				}
			}
			var thResponseFinal = document.createElement("th")
			thResponseFinal.id = "expresionASolucionar_js"
			thResponseFinal.setAttribute("expresionASolucionar","true")
			tr.appendChild(thResponseFinal)
		}
	}

	table.appendChild(tr)

	var childrensHeader = tr.childElementCount

	//for (var filas = 0; filas < numeroCombinacionesPosibles; filas++) {
		for (var filas = 0; filas < 5; filas++) {

			var tr =document.createElement("tr")


			for (var columnas = 0; columnas < childrensHeader; columnas++) {

				var th =document.createElement("th")

				if (columnas >= numeroProposicionesEscogidasPorusuario) {
					th.classList.add("cancelPadding")
					numeroColumna = "col" + (columnas - numeroProposicionesEscogidasPorusuario)
					var inputHTML = document.createElement("input")
					inputHTML.classList.add("respuestaEjercicio")
					inputHTML.setAttribute("campoRespuesta", "true")
					inputHTML.setAttribute(numeroColumna, "")
					inputHTML.setAttribute("required", "required")
					inputHTML.setAttribute("maxlength", "1")
					inputHTML.addEventListener("change", verificarRespuestaIngresada)

					th.appendChild(inputHTML)

				}else{
					var valorDeVerdad = posiblesValores[numeroAleatorio(2,0)]
					th.innerHTML = valorDeVerdad
					propActual = table.firstChild.childNodes[columnas]
					th.id = propActual.innerHTML + filas
					if (valorDeVerdad == posiblesValores[0]) {
						th.setAttribute("data-ValorBoleano", true)
					}else{
						th.setAttribute("data-ValorBoleano", false)
					}
				}
				th.addEventListener("dblclick", marcarColumna)
				tr.appendChild(th)
			}
			table.appendChild(tr)
		}


	//agregar columnas
	btnAgregarColumna = document.createElement("button")
	btnAgregarColumna.id = "agregarFila_js"
	btnAgregarColumna.classList.add("icon-mas","agregarFila")
	btnAgregarColumna.addEventListener("click", crearAgregarFila)

	sectionTablasVerdad.insertBefore(btnAgregarColumna,sectionTablasVerdad.firstChild)
	sectionTablasVerdad.insertBefore(htmlHrSeparadorContenido,sectionTablasVerdad.firstChild)

	htmlFormRespuestaUsuario.appendChild(table)
	htmlFormRespuestaUsuario.appendChild(btnValidar)


	htmlFormRespuestaUsuario.addEventListener("submit", capturarRespuesta)

	habilitarInhabilitarFormulario(this)

	var expresionASolucionar = document.getElementById("expresionASolucionar_js")
	console.warn(arrayProposiciones);

	for (var p = 0,prop; prop = arrayProposiciones[p]; p++) {
		if (prop.constructor.name == proposicion.name){
			expresionASolucionar.innerHTML += prop.getletraFinal()
		}else {
			expresionASolucionar.innerHTML += prop.getExpresionCompleta()
		}
	}
	console.log(arrayProposiciones);
}

function capturarRespuesta(evento) {

	evento.preventDefault()

	respuestas = []

	var respuestaEnviada = document.querySelectorAll("[expresionasolucionar]")

	for (var i = 0; i < respuestaEnviada.length; i++) {
		var id = "[col"+i+"]"
		var temprespuestas = document.querySelectorAll(id)
		respuestas.push(temprespuestas)
	}
	validarEjercicio(respuestaEnviada,respuestas)

}
function validarEjercicio(respuestaEnviada,respuestas) {
	var correcto = true
	for (var j = 0; j < respuestaEnviada.length; j++) {
		console.group()
		var expresion = arrayProposiciones[j]
		for (var k = 0; k < respuestas[j].length; k++) {
			console.group()
			if (expresion.constructor.name == expresion.name) {

				var idp1 = expresion.p1.letra + k
				expresion.p1.valorBoleano = eval(document.getElementById(idp1).getAttribute("data-valorBoleano"))

				var idp2= expresion.p2.letra + k
				expresion.p2.valorBoleano = eval(document.getElementById(idp2).getAttribute("data-valorBoleano"))

				expresion.p1.negar()
				expresion.p2.negar()
				respuestaCorrecta = expresion.conector.operar()

				console.log(expresion)
				console.groupEnd()
				valorBooleanoIngresado = eval(respuestas[j][k].getAttribute("data-valorboleano"))
				console.log("valor ingresado " + valorBooleanoIngresado)
				console.log("correcta " + respuestaCorrecta)
				if (valorBooleanoIngresado != respuestaCorrecta) {
					correcto = false
				}

			}
		}
		console.groupEnd()
	}
	if (correcto) {
		crearYMostrarMensaje(0,msgEjercicioCompletado)
		habilitarInhabilitarFormulario(htmlFormRespuestaUsuario)
		htmlFormRespuestaUsuario.replaceChild(btnVolver,btnValidar)
		htmlFormRespuestaUsuario.removeEventListener("submit", capturarRespuesta)
		htmlFormRespuestaUsuario.addEventListener("submit", reiniciarEjercicio)

	}else {
		crearYMostrarMensaje(1,msgErrorEnEjercicio)
	}
}

/*###################################
#####################################
###################################*/
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
		this.setAttribute("data-ValorBoleano", undefined)
		this.classList.add("valorErroneo")
	}
}

function reiniciarEjercicio() {
	ejecicioEnEjecucion = false
	limpiarContenedorHTML(htmSectionContenedoraEjercicioPropuestoTablasVerdad)
	htmlFormEjercicioPropuestoTablasVerdad.addEventListener("submit", crearEjercicio)
	htmlFormRespuestaUsuario.addEventListener("submit", capturarRespuesta)
	habilitarInhabilitarFormulario(htmlFormEjercicioPropuestoTablasVerdad)
}

function crearAgregarFila(){

	var tablaVerdad = document.getElementById("tablarVerdad_js")
	var tablaVerdadHijos = tablaVerdad.childNodes

	for (var i = 0; i < tablaVerdadHijos.length; i++) {

		var htmlThColumnasEjercicioPropuesto = document.createElement("th")
		htmlThColumnasEjercicioPropuesto.id = "ColumnadeApoyo"
		htmlThColumnasEjercicioPropuesto.classList.add("cancelPadding")
		htmlThColumnasEjercicioPropuesto.addEventListener("dblclick", marcarColumna)

		var inputHTML = document.createElement("input")
		inputHTML.classList.add("respuestaEjercicio")
		if (i == 0) {
			inputHTML.classList.add("textTransformDefault")
		}else {
			inputHTML.addEventListener("change", verificarRespuestaIngresada)
		}


		htmlThColumnasEjercicioPropuesto.appendChild(inputHTML)
		tablaVerdadHijos[i].insertBefore(htmlThColumnasEjercicioPropuesto,tablaVerdadHijos[i].lastChild)
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
/*###################################
#####################################
###################################*/
function and(p1,p2) {
	this.simbolo = " Λ "
	this.operar = function(){
		var resultado = p1.valorBoleano && p2.valorBoleano
		return resultado
	}
}

function or(p1,p2) {
	this.simbolo = " V "
	this.operar = function(){
		var resultado = p1.valorBoleano || p2.valorBoleano
		return resultado

	}
}

function conditional(p1,p2) {
	this.simbolo = " -> "
	this.operar = function(){
		var resultado = !p1.valorBoleano || p2.valorBoleano
		return resultado

	}
}

function biconditional(p1,p2) {
	this.simbolo = " <-> "
	this.operar = function(){
		var resultado = (p1.valorBoleano && p2.valorBoleano) || (!p1.valorBoleano && !p2.valorBoleano)
		return resultado
	}
}

function getValuBoolean(){
	var aux = numeroAleatorio(2,0)
	return !!aux
}

function proposicion(){
	this.letra = new String(),
	this.letraFinal = new String(),
	this.negacion = new Boolean(),
	this.valorBoleano = new Boolean(),

	this.getletraFinal = function(){
		if (this.negacion){
			this.letraFinal = "!" + this.letra
		}else{
			this.letraFinal = this.letra
		}
		return this.letraFinal
	}

	this.negar = function(){
		console.warn("negando")
		if (this.negacion){
			this.valorBoleano = !this.valorBoleano
		}

		return this.valorBoleano
	}

}

function expresion(p1,p2,conector) {

	this.p1 = p1
	this.p2 = p2

	this.conector = eval("new "+ conector + "(p1,p2)")

	this.getExpresionCompleta = function() {

		if (this.p1.constructor.name == expresion.name) {
			console.log("expresion");
			this.p1.getExpresionCompleta()
			console.log("volvi");
		}if (this.p2.constructor.name == expresion.name) {
			console.log("expresion");
			this.p2.getExpresionCompleta()
			console.log("volvi");
		}
		console.info("termine")
	}
}

htmlFormEjercicioPropuestoTablasVerdad.addEventListener("submit", crearEjercicio)
