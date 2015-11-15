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


function crearEjercicio(evento) {

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
			prop.getExpresionCompleta()

			arrayProposiciones.push(prop)
			proposicionesCompuesta.push(prop)

			if ((filas + 1) % 2 == 0){
				var conector = conectores.getElementRandom()
				var exp = new expresion(proposicionesCompuesta[0],proposicionesCompuesta[1],conector.element)
				arrayProposiciones.push(exp)
				arrayProposiciones.splice(star, 2)
				proposicionesCompuesta = []
				star+=1
			}
			th.innerHTML = letraProposicion.element
			tr.appendChild(th)
		}else{
			console.log(arrayProposiciones.length);
			if (arrayProposiciones.length > 1){
				for (var l = 0, propComp; propComp = arrayProposiciones[l]; l++) {
					if (propComp.constructor.name == expresion.name){
						var th = document.createElement("th")

						th.innerHTML = propComp.getExpresionCompleta()
						tr.appendChild(th)
					}
				}
			}
			var thResponseFinal = document.createElement("th")
			thResponseFinal.id = "expresionASolucionar_js"
			tr.appendChild(thResponseFinal)
		}
	}
z
	table.appendChild(tr)

	var childrensHeader = tr.childElementCount

	//for (var filas = 0; filas < numeroCombinacionesPosibles; filas++) {
		for (var filas = 0; filas < 5; filas++) {

			var tr =document.createElement("tr")
			tr.id=filas

			for (var columnas = 0; columnas < childrensHeader; columnas++) {

				var th =document.createElement("th")

				if (columnas >= numeroProposicionesEscogidasPorusuario) {

					var inputHTML = document.createElement("input")
					inputHTML.classList.add("respuestaEjercicio")
					inputHTML.setAttribute("required", "required")
					inputHTML.setAttribute("maxlength", "1")
					inputHTML.addEventListener("change", verificarRespuestaIngresada)

					th.appendChild(inputHTML)

				}else{
					var valorDeVerdad = posiblesValores[numeroAleatorio(2,0)]
					th.innerHTML = valorDeVerdad
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

	sectionTablasVerdad.appendChild(htmlHrSeparadorContenido)
	sectionTablasVerdad.appendChild(btnAgregarColumna)
	sectionTablasVerdad.appendChild(table)
	sectionTablasVerdad.appendChild(btnValidar)

	htmlFormRespuestaUsuario.addEventListener("submit", capturarRespuesta)

	habilitarInhabilitarFormulario(this)

	var expresionASolucionar = document.getElementById("expresionASolucionar_js")

	for (var p = 0,prop; prop = arrayProposiciones[p]; p++) {
		expresionASolucionar.innerHTML += prop.getExpresionCompleta()
	}
}

function capturarRespuesta(evento) {

	evento.preventDefault()

	respuestas = []

	for (var campos = 0; campos < 5; campos++) {
		var respuesta = document.getElementById(campos)
		respuestas.push(respuesta)
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
	}

	this.negar = function(){
		if (this.negacion){
			this.valorBoleano = !this.valorBoleano
			return this.valorBoleano
		}
	},
	this.getExpresionCompleta = function() {
		this.negar()
		this.getletraFinal()
		return this.letraFinal
	}
}

function expresion(p1,p2,conector) {
	this.p1 = p1
	this.p2 = p2

	this.conector = eval("new "+ conector + "(p1,p2)")

	this.getExpresionCompleta = function() {
		expresionCompleta = "(" + this.p1.letra + this.conector.simbolo + this.p2.letra + ")"
		return expresionCompleta
	}
}

htmlFormEjercicioPropuestoTablasVerdad.addEventListener("submit", crearEjercicio)
