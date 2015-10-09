//Simbolo que representa al conjunto vacio el los elementos de un conjunto, se utilizapara validar la respuesta a los conjuntos
var simboloConjuntoVacio = "Ø"
var formConjuntos = document.getElementById("formConjuntos_js")
//var contenedorConjuntoEscogido = document.getElementById("contenedorConjuntoEscogido")
var conjuntoIngresado = document.getElementById("conjuntoIngresado_js")
var seccionRespuesta = document.getElementById("seccionRespuesta_js")
var nombreConjunto = document.getElementById("nombreConjunto_js")
var htmlRadioConjuntosPropio = document.getElementById("htmlRadioConjuntosPropio_js")
var htmlRadioConjuntosImpropio = document.getElementById("htmlRadioConjuntosImpropio_js")
var elementosCojuntos = document.getElementById("elementosCojuntos_js").value

function validarConjunto(elementosCojuntos){
	var campoValido = true

	var formatoCorrectoDeConjuntos = /(^([\w|\d])\b)+(([(,)+(\w|\d)+(,)])\b)+(([\w|\d])\b)$/g

	if((formatoCorrectoDeConjuntos.test(elementosCojuntos))){
		elementosCojuntos = elementosCojuntos.split(",")

		for (var i = 0; i < elementosCojuntos.length; i++) {
			for (var j = 0; j < elementosCojuntos.length; j++) {
				if (i != j) {
					if (elementosCojuntos[i] == elementosCojuntos[j]) {
						campoValido = false
					}
				}
			}
		}
		if (campoValido){
			//refactor luego
			campoValido =  true
			var estadoActual = {
				msg : "Todo listo",
				clases : ["MSG", "MSGBien"],
				icono : "icon-correcto"
			}
		}else{
			//refactor luego
			campoValido =  false
			var estadoActual = {
				msg : "hay un elemento repetido",
				clases : ["MSG" ,"MSGError"],
				icono : "icon-equivocado"

			}
		}
	}else{
		//refactor luego
		campoValido =  false
		var estadoActual = {
			msg : "hay un caracter no permitido o error de sintaxis",
			clases : ["MSG" ,"MSGError"],
			icono : "icon-equivocado"

		}
	}
	/*esta funcion recibe un objeto estado y crea un mensaje y lo inserta en el contenedor principal*/
	crearYMostrarMensaje(estadoActual)

	return campoValido
}

function capturarConjunto(evento) {


	//evento.preventDefault()

	formConjuntos.removeEventListener("submit", capturarConjunto)

	var valorNombreConjunto = nombreConjunto.value

	var contenedorNombreCojunto = document.createElement("span")
	contenedorNombreCojunto.innerHTML = valorNombreConjunto

	elementosCojuntos = document.getElementById("elementosCojuntos_js").value


	var estado = validarConjunto(elementosCojuntos)

	if (estado){
		habilitarInhabilitarFormulario(this)

		if (ValidarCampoVacio(elementosCojuntos) && ValidarCampoVacio(valorNombreConjunto)) {
			elementosCojuntos = elementosCojuntos.split(",")


			var contenedorElementosCojunto = document.createElement("span")
			contenedorElementosCojunto.classList.add("corchetesConjuntos")
			contenedorElementosCojunto.innerHTML = elementosCojuntos

			var contenedorConjuntoActual = document.createElement("section")
			contenedorConjuntoActual.classList.add("textoCentrado","textoEspecial")
			contenedorConjuntoActual.appendChild(contenedorNombreCojunto)
			contenedorConjuntoActual.appendChild(contenedorElementosCojunto)


			var respuesta = document.createElement("textarea")
			var htmlButtonValidar = document.createElement("button")

			htmlButtonValidar.innerHTML = innerHTMLBtnVerificar
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
			respuesta.setAttribute("placeholder", "Escriba en este cuadro los posibles subconjuntos del conjunto anterior descrito.")
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
		console.log(binary);
		completarBinarios(binary,elementosCojuntos.length)

		conjuntoSolucion = crearRespuesta(elementosCojuntos,binary)
		console.log(conjuntoSolucion);



		var elementosRespuestaEnviadaOrdenada = ordenarAlfabeticamente(elementosRespuestaEnviada)


		if (String(ordenarAlfabeticamente(conjuntoSolucion)) == String(ordenarAlfabeticamente(elementosRespuestaEnviadaOrdenada))) {

			habilitarInhabilitarInput(respuestaEnviada)


			var estadoActual = {
				campoValido: true,
				msg : "Listo, todo bien",
				clases : ["MSG" ,"MSGBien"],
				icono : "icon-correcto"
			}

			var btnVolver = document.getElementById("btnValidarconjuntos")
			btnVolver.innerHTML = innerHTMLBtnVolver
			btnVolver.addEventListener("click", reiniciarEjercicio)

			var HTMLSpanIconoBtn = document.createElement("span")
			HTMLSpanIconoBtn.classList.add(iconoBtnVolver,"marginIconos")
			btnVolver.insertBefore(HTMLSpanIconoBtn, btnVolver.firstChild)


		}else{
			var estadoActual = {
				campoValido: false,
				msg : "Huu, algo va mal",
				clases : ["MSG" ,"MSGError"],
				icono : "icon-equivocado"
			}

		}
	}else{
		var estadoActual = {
			campoValido: false,
			msg : "Huu, algo va mal",
			clases : ["MSG" ,"MSGError"],
			icono : "icon-equivocado"
		}
	}
	crearYMostrarMensaje(estadoActual)
}

//vaciar espacios del campo nombre conjunto
nombreConjunto.addEventListener("change", limpiarCampo)
function limpiarCampo(){
	vaciarCampo(this)
}

function reiniciarEjercicio () {
	formConjuntos.addEventListener("submit", capturarConjunto)
	habilitarInhabilitarFormulario(formConjuntos)
	limpiarContenedorHTML(seccionRespuesta)
	formConjuntos.reset()
}

formConjuntos.addEventListener("submit", capturarConjunto)
