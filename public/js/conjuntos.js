//Simbolo que representa al conjunto vacio en los elementos de un conjunto, se utilizapara validar la respuesta a los conjuntos
var simboloConjuntoVacio = "Ø"

var formConjuntos = document.getElementById("formConjuntos_js")
,conjuntoIngresado = document.getElementById("conjuntoIngresado_js")
,seccionRespuesta = document.getElementById("seccionRespuesta_js")
,input_nombreConjunto = document.getElementById("nombreConjunto_js")
,htmlRadioConjuntosPropio = document.getElementById("htmlRadioConjuntosPropio_js")
,htmlRadioConjuntosImpropio = document.getElementById("htmlRadioConjuntosImpropio_js")
,elementosCojuntos = document.getElementById("elementosCojuntos_js").value

function capturarConjunto(evento) {

	evento.preventDefault()

	formConjuntos.removeEventListener("submit", capturarConjunto)

	var nombreConjunto = input_nombreConjunto.value

	var contenedorNombreCojunto = document.createElement("span")
	contenedorNombreCojunto.innerText = nombreConjunto.toUpperCase()

	elementosCojuntos = document.getElementById("elementosCojuntos_js").value


	var estado = validarConjunto(elementosCojuntos)

	if (estado){

		habilitarInhabilitarFormulario(this)

		if (ValidarCampoVacio(elementosCojuntos) && ValidarCampoVacio(nombreConjunto)) {

			elementosCojuntos = elementosCojuntos.split(",")

			var contenedorElementosCojunto = document.createElement("span")
			contenedorElementosCojunto.classList.add("corchetesConjuntos")
			contenedorElementosCojunto.innerText = elementosCojuntos

			var contenedorConjuntoActual = document.createElement("section")
			contenedorConjuntoActual.classList.add("textoCentrado","textoEspecial")
			contenedorConjuntoActual.appendChild(contenedorNombreCojunto)
			contenedorConjuntoActual.appendChild(contenedorElementosCojunto)

			var respuesta = document.createElement("textarea")
			var htmlButtonValidar = document.createElement("button")

			htmlButtonValidar.innerText = innerHTMLBtnVerificar
			htmlButtonValidar.classList.add("btn","btnConfirmar","centrarConMargin")
			htmlButtonValidar.id = "btnValidarconjuntos"
			htmlButtonValidar.setAttribute("type", "submit")

			var HTMLSpanIconoBtn = document.createElement("span")
			HTMLSpanIconoBtn.classList.add(iconoBtnVerificar,"marginIconos")

			htmlButtonValidar.insertBefore(HTMLSpanIconoBtn, htmlButtonValidar.firstChild)

			respuesta.id = "respuesta"
			respuesta.classList.add("respuesta")
			respuesta.setAttribute("required","required")
			respuesta.setAttribute("spellcheck","false")
			respuesta.setAttribute("placeholder", "Escriba en este cuadro su respuesta.")
			respuesta.addEventListener("keypress", function(evento) {
				//si se presiona Enter
				if(evento.keyCode == 13){
					evento.preventDefault()
				}
				//si se presiona 0
				if(evento.keyCode == 48){
					evento.preventDefault()
					respuesta.value += simboloConjuntoVacio
				}
			})

			seccionRespuesta.appendChild(htmlHrSeparadorContenido)
			seccionRespuesta.appendChild(contenedorConjuntoActual)
			seccionRespuesta.appendChild(respuesta)
			seccionRespuesta.appendChild(htmlButtonValidar)


			seccionRespuesta.addEventListener("submit",validarRespuesta)

		}else{
			vaciarCampo(nombreConjunto)
		}
	}else{

		formConjuntos.addEventListener("submit", capturarConjunto)

	}
}

function validarConjunto(elementosCojuntos){

	var campoValido = true

	var formatoCorrectoDeConjuntos = /(^([\w|\d])\b)+(([(,)+(\w|\d)+(,)])\b)+(([\w|\d])\b)$/g

	if((formatoCorrectoDeConjuntos.test(elementosCojuntos))){
		elementosCojuntos = elementosCojuntos.split(",")

		for (var contUno = 0; contUno < elementosCojuntos.length; contUno++) {
			for (var contDos = 0; contDos < elementosCojuntos.length; contDos++) {
				if (contUno != contDos) {
					if (elementosCojuntos[contUno] == elementosCojuntos[contDos]) {
						campoValido = false
					}
				}
			}
		}
		if (campoValido){
			var mensaje = {tipoMensaje :0 , mensaje : "Todo listo"}
		}else{
			campoValido =  false
			var mensaje = {tipoMensaje :1 , mensaje : "hay un elemento repetido"}
		}
	}else{
		campoValido =  false
		var mensaje = {tipoMensaje :1 , mensaje : "hay un caracter no permitido o error de sintaxis"}
	}
	/*esta funcion recibe un objeto estado y crea un mensaje y lo inserta en el contenedor principal*/
	crearYMostrarMensaje(mensaje)

	return campoValido
}

function crearRespuesta(elementosCojuntos,binary){

	var conjuntoSolucionBinary = []

	for (var i = 0; i < binary.length; i++) {
		for (var j = 0; j < binary[i].length; j++) {
			if (binary[i][j] == "1"){
				binary[i][j] = elementosCojuntos[j]
			}
		}
		conjuntoSolucionBinary.push(binary[i])
	}

	var conjuntoSolucionTemp = SeparaCerosDeValoresUtiles(conjuntoSolucionBinary)

	conjuntoSolucionTemp = ordenarAlfabeticamente(conjuntoSolucionTemp)

	return conjuntoSolucionTemp
}

function validarRespuesta(evento) {

	evento.preventDefault()

	var respuestaEnviada = document.getElementById("respuesta")
	var elementosCojuntos = (document.getElementById("elementosCojuntos_js").value).split(",")
	var binary = []
	var conjuntoSolucion


	//refactorizar luego

	if(htmlRadioConjuntosImpropio.checked){
		numeroCombinaciones = Math.pow(2,elementosCojuntos.length) - 1
	}else if(htmlRadioConjuntosPropio.checked){
		numeroCombinaciones = Math.pow(2,elementosCojuntos.length)
	}

	elementosRespuestaEnviada = respuestaEnviada.value.split(",")


	if (elementosRespuestaEnviada.length == numeroCombinaciones) {


		for (var i = 0; i < numeroCombinaciones; i++) {
			binario = decimalToBinary(i)
			binary.push(binario)
		}
		completarBinarios(binary,elementosCojuntos.length)

		conjuntoSolucion = crearRespuesta(elementosCojuntos,binary)

		var elementosRespuestaEnviadaOrdenada = ordenarAlfabeticamente(elementosRespuestaEnviada)


		if (String(ordenarAlfabeticamente(conjuntoSolucion)) == String(ordenarAlfabeticamente(elementosRespuestaEnviadaOrdenada))) {

			habilitarInhabilitarInput(respuestaEnviada)


			var mensaje = {tipoMensaje : 0, mensaje : "Listo, todo bien"}

			var btnVolver = document.getElementById("btnValidarconjuntos")
			btnVolver.innerHTML = innerHTMLBtnVolver
			btnVolver.addEventListener("click", reiniciarEjercicio)

			var HTMLSpanIconoBtn = document.createElement("span")
			HTMLSpanIconoBtn.classList.add(iconoBtnVolver,"marginIconos")
			btnVolver.insertBefore(HTMLSpanIconoBtn, btnVolver.firstChild)


		}else{
			var mensaje = {tipoMensaje : 1, mensaje : "Huu, algo va mal"}

		}
	}else{
		var mensaje = {tipoMensaje : 1, mensaje : "Huu, algo va mal"}
	}
	crearYMostrarMensaje(mensaje)
}

function reiniciarEjercicio () {
	formConjuntos.addEventListener("submit", capturarConjunto)
	habilitarInhabilitarFormulario(formConjuntos)
	limpiarContenedorHTML(seccionRespuesta)
	formConjuntos.reset()
}

function limpiarCampo(){
	vaciarCampo(this)
}

formConjuntos.addEventListener("submit", capturarConjunto)

//Borrar espacios en blanco en el campo de nombre de conjunto
input_nombreConjunto.addEventListener("change", limpiarCampo)

