var formConjuntos = document.getElementById("formConjuntos_js")
//var contenedorConjuntoEscogido = document.getElementById("contenedorConjuntoEscogido")
var conjuntoIngresado = document.getElementById("conjuntoIngresado_js")
var seccionRespuesta = document.getElementById("seccionRespuesta_js")
var nombreConjunto = document.getElementById("nombreConjunto_js")


function validarConjunto(elementosCojuntos){
	var campoValido = true

	var formatoCorrectoDeConjuntos = /^([\w|\d])+([(,)\w|\d(,)])+([\w|\d])$/g

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
			var estadoActual = {
				campoValido: true,
				msg : "Todo listo",
				clases : ["MSG", "MSGBien"],
				icono : "icon-correcto"
			}
		}else{
			//refactor luego
			var estadoActual = {
				campoValido: false,
				msg : "hay un elemento repetido",
				clases : ["MSG" ,"MSGError"],
				icono : "icon-equivocado"

			}
		}
	}else{
		//refactor luego
		var estadoActual = {
			campoValido: false,
			msg : "hay un caracter no permitido",
			clases : ["MSG" ,"MSGError"],
			icono : "icon-equivocado"

		}
	}


	return estadoActual
}

function capturarConjunto(evento) {


	evento.preventDefault()

	formConjuntos.removeEventListener("submit", capturarConjunto)

	var valorNombreConjunto = nombreConjunto.value

	var contenedorNombreCojunto = document.createElement("span")
	contenedorNombreCojunto.innerHTML = valorNombreConjunto

	var elementosCojuntos = document.getElementById("elementosCojuntos_js").value


	var estado = validarConjunto(elementosCojuntos)

	if (estado.campoValido){
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
			var inputSubmitValidar = document.createElement("input")

			inputSubmitValidar.value = "Validar"
			inputSubmitValidar.classList.add("btn","btnConfirmar")
			inputSubmitValidar.id = "btnValidarconjuntos"
			inputSubmitValidar.setAttribute("type", "submit")

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

			seccionRespuesta.appendChild(contenedorConjuntoActual)
			seccionRespuesta.appendChild(respuesta)
			seccionRespuesta.appendChild(inputSubmitValidar)


			seccionRespuesta.addEventListener("submit",validarRespuesta)

		}else{
			vaciarCampo(nombreConjunto)
		}
	}else{
		//esta funcion recibe un objeto cestado y crea un mensaje y lo inserta en el contenedor principal
		crearYMostrarMensaje(estado)
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
		};
		conjuntoSolucionBinary.push(binary[i])
	}
	var conjuntoSolucion = SeparaCerosDeValoresUtiles(conjuntoSolucionBinary)
	var conjuntoSolucion = ordenarAlfabeticamente(conjuntoSolucion)

	return conjuntoSolucion

}

function validarRespuesta(evento) {


	evento.preventDefault()

	var binary = []

	//refactorizar luego
	var elementosCojuntos = (document.getElementById("elementosCojuntos_js").value).split(",")

	numeroCombinaciones = Math.pow(2,elementosCojuntos.length)

	var respuestaEnviada = document.getElementById("respuesta")

	elementosRespuestaEnviada = respuestaEnviada.value.split(",")


	if (elementosRespuestaEnviada.length == numeroCombinaciones) {


		for (var i = 0; i < numeroCombinaciones; i++) {
			binario = decimalToBinary(i)
			binary.push(binario)
		};
	}
	completarBinarios(binary,elementosCojuntos.length)

	var conjuntoSolucion = crearRespuesta(elementosCojuntos,binary)
	var elementosRespuestaEnviadaOrdenada = ordenarAlfabeticamente(elementosRespuestaEnviada)


	if (String(ordenarAlfabeticamente(conjuntoSolucion)) == String(ordenarAlfabeticamente(elementosRespuestaEnviadaOrdenada))) {
		var estadoActual = {
			campoValido: true,
			msg : "Listo, todo bien",
			clases : ["MSG" ,"MSGBien"],
			icono : "icon-correcto"
		}

		var btnVolver = document.getElementById("btnValidarconjuntos")
		btnVolver.value = "Volver"
		btnVolver.addEventListener("click", reiniciarEjercicio)


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
