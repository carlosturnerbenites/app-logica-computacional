
var simboloConjuntoVacio = "Ø"															//Simbolo que representa al conjunto vacio en los elementos de un conjunto, se utilizapara validar la respuesta a los conjuntos

var formConjuntos = document.getElementById("formConjuntos_js")
,conjuntoIngresado = document.getElementById("conjuntoIngresado_js")
,seccionRespuesta = document.getElementById("seccionRespuesta_js")
,inputNameSet = document.getElementById("nombreConjunto_js")
,htmlRadioConjuntosPropio = document.getElementById("htmlRadioConjuntosPropio_js")
,htmlRadioConjuntosImpropio = document.getElementById("htmlRadioConjuntosImpropio_js")
,elementsSet = null

/*
Primary functions
*/
function captureSetSelected(evento) {

	evento.preventDefault()

	ejecicioEnEjecucion = true

	formConjuntos.removeEventListener("submit", captureSetSelected)

	var nameSet = inputNameSet.value

	var contenedorNombreCojunto = document.createElement("span")
	contenedorNombreCojunto.innerText = nameSet.toUpperCase()

	elementsSet = document.getElementById("elementosCojuntos_js").value


	var estado = validateSet(elementsSet)

	if (estado){

		habilitarInhabilitarFormulario(this)

		if (ValidarCampoVacio(elementsSet) && ValidarCampoVacio(nameSet)) {

			elementsSet = elementsSet.split(",")

			var htmlContainerElementsSet = createElementDOM("span")
			.addClass("corchetesConjuntos")
			.text(elementsSet)

			var containerSet = createElementDOM("section")
			.addClass("textoCentrado","textoEspecial")
			.append(contenedorNombreCojunto,htmlContainerElementsSet)

			var respuesta = createElementDOM("textarea")
			.addClass("respuesta")
			.setAttrs({"required":"required","spellcheck":"false","placeholder": "Escriba en este cuadro su respuesta.","id" : "respuesta"})
			.on("keypress", disabledKeys)

			seccionRespuesta.append(htmlHrSeparadorContenido,containerSet,respuesta,btnValidar)
			.on("submit",validateAnswer)

		}else{
			vaciarCampo(nameSet)
		}
	}else{

		formConjuntos.addEventListener("submit", captureSetSelected)

	}
}

function validateAnswer(evento) {

	evento.preventDefault()

	var userResponse = document.getElementById("respuesta")
	var binarios = []
	var setSoltion

	numberPossibleCombinations = htmlRadioConjuntosImpropio.checked ? Math.pow(2,elementsSet.length) - 1 : Math.pow(2,elementsSet.length)

	elementsSetUserResponse = userResponse.value.split(",")

	if (elementsSetUserResponse.length == numberPossibleCombinations) {

		for (var i = 0; i < numberPossibleCombinations; i++) {
			binarios.push(decimalToBinary(i))
		}

		completarBinarios(binarios,elementsSet.length)

		setSoltion = createRealResponse(elementsSet,binarios)

		var elementsSetUserResponseOrdered = elementsSetUserResponse.sort()

		setSoltion.sort()
		elementsSetUserResponseOrdered.sort()

		if (compareArrays(setSoltion ,elementsSetUserResponseOrdered)) {

			habilitarInhabilitarInput(userResponse)

			var mensaje = {tipoMensaje : 0, mensaje : msgEjercicioCompletado}

			seccionRespuesta.removeEventListener("submit", validateAnswer)
			seccionRespuesta.addEventListener("submit", restareExercise)
			seccionRespuesta.replaceChild(btnVolver, btnValidar)



		}else{
			var mensaje = {tipoMensaje : 1, mensaje : msgErrorEnEjercicio}

		}
	}else{
		var mensaje = {tipoMensaje : 1, mensaje : msgErrorEnEjercicio}
	}
	crearYMostrarMensaje(mensaje.tipoMensaje,mensaje.mensaje)
}

function validateSet(elementsSet){

	var campoValido = true

	var formatoCorrectoDeConjuntos = /(^([\w|\d])\b)+(([(,)+(\w|\d)+(,)])\b)+(([\w|\d])\b)$/g

	if((formatoCorrectoDeConjuntos.test(elementsSet))){
		elementsSet = elementsSet.split(",")

		for (var contUno = 0; contUno < elementsSet.length; contUno++) {
			for (var contDos = 0; contDos < elementsSet.length; contDos++) {
				if (contUno != contDos) {
					if (elementsSet[contUno] == elementsSet[contDos]) {
						campoValido = false
					}
				}
			}
		}
	}else {
		campoValido =  false
	}

	if (campoValido){
		//pass
	}else{
		campoValido =  false
		crearYMostrarMensaje(1,msgErrorSintaxis)
	}


	return campoValido
}

function restareExercise (evento) {

	evento.preventDefault()

	ejecicioEnEjecucion = false

	formConjuntos.addEventListener("submit", captureSetSelected)
	habilitarInhabilitarFormulario(formConjuntos)
	limpiarContenedorHTML(seccionRespuesta)
	seccionRespuesta.removeEventListener("submit", restareExercise)
	formConjuntos.reset()
}

function createRealResponse(elementsSet,binarios){

	var setSolutionBinary = []

	for (var i = 0; i < binarios.length; i++) {
		for (var j = 0; j < binarios[i].length; j++) {
			if (binarios[i][j] == "1"){
				binarios[i][j] = elementsSet[j]
			}
		}
		setSolutionBinary.push(binarios[i])
	}

	var setSolutionTemp = SeparaCerosDeValoresUtiles(setSolutionBinary)

	setSolutionTemp.sort()

	return setSolutionTemp
}

/*
secondary functions
*/

function SeparaCerosDeValoresUtiles(conjuntos){
	var conjuntoSolucion = []

	for (var i = 0; i < conjuntos.length; i++) {
		var conjunto = []
		for (var j = 0; j < conjuntos[i].length; j++) {
			if (conjuntos[i][j] != "0") {
				conjunto.push(conjuntos[i][j])
			}
		}
		if (conjunto.length == 0) {
			conjunto.push(simboloConjuntoVacio)
		}
		conjuntoSolucion.push(conjunto.join(""))
	}

	return conjuntoSolucion
}

function disabledKeys(evento) {
	/*si se presiona Enter*/
	if(evento.keyCode == 13){
		evento.preventDefault()
	}
	/*si se presiona 0*/
	if(evento.keyCode == 48){
		evento.preventDefault()
		respuesta.value += simboloConjuntoVacio
	}
}

formConjuntos.addEventListener("submit", captureSetSelected)

//Borrar espacios en blanco en el campo de nombre de conjunto
inputNameSet.addEventListener("change", limpiarCampo)
