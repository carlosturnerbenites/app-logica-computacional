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
,arrayaux = new Array()
,proposicionesCompuesta = new Array()
,ejercicioPropuesto = new Array()


function crearEjercicio(evento) {

	evento.preventDefault()

	htmlFormEjercicioPropuestoTablasVerdad.removeEventListener("submit", crearEjercicio)

	var numeroProposicionesEscogidasPorusuario = Number(htmlInputNumeroProposicionesEscogidasPorUsuario.value)
	var star = 0

	numeroCombinacionesPosibles = Math.pow(2,numeroProposicionesEscogidasPorusuario)

	var table = document.createElement("table")
	table.id = "tablarVerdad_js"

	var tr = document.createElement("tr")

	for (var filas = 0; filas <= numeroProposicionesEscogidasPorusuario; filas++) {

		var letraProposicion = proposiciones[numeroAleatorio(proposiciones.length,0)]
		var th = document.createElement("th")


		if (filas != numeroProposicionesEscogidasPorusuario){

			var prop = new proposicion()
			prop.letra = letraProposicion
			prop.negacion = getValuBoolean()
			prop.getProposicion()

			arrayProposiciones.push(prop)
			proposicionesCompuesta.push(prop)

			if ((filas+1)%2 == 0){

				var exp = new expresion(proposicionesCompuesta[0],proposicionesCompuesta[1],"and")
				arrayProposiciones.push(exp)

				arrayProposiciones.splice(star, 2)

				proposicionesCompuesta = []


				star+=1
			}

			th.innerHTML = letraProposicion
		}else{
			th.innerHTML = arrayProposiciones.join("")
		}


		tr.appendChild(th)

	}
	console.log(arrayProposiciones)

	table.appendChild(tr)

	for (var filas = 0; filas < numeroCombinacionesPosibles; filas++) {

		var tr =document.createElement("tr")
		tr.id=filas

		for (var columnas = 0; columnas <= numeroProposicionesEscogidasPorusuario; columnas++) {

			var th =document.createElement("th")

			if (columnas == numeroProposicionesEscogidasPorusuario) {

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
}

function capturarRespuesta(evento) {

	evento.preventDefault()

	respuestas = []

	for (var campos = 0; campos < numeroCombinacionesPosibles; campos++) {
		var respuesta = document.getElementById(campos)
		respuestas.push(respuesta)
	};
	console.log(respuestas)
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
/*###################################
#####################################
###################################*/
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
	this.getProposicion = function() {
		this.negar()
		this.getletraFinal()
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


htmlFormEjercicioPropuestoTablasVerdad.addEventListener("submit", crearEjercicio)

