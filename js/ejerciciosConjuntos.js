var formConjuntos = document.getElementById("formConjuntos")
var contenedorConjuntoEscogido = document.getElementById("contenedorConjuntoEscogido")
var conjuntoIngresado = document.getElementById("conjuntoIngresado")
var seccionRespuesta = document.getElementById("seccionRespuesta_js")
var nombreConjunto = document.getElementById("nombreConjunto_js")

function capturarConjunto(evento) {


	evento.preventDefault()

	var valorNombreConjunto = nombreConjunto.value

	var contenedorNombreCojunto = document.createElement("span")
	contenedorNombreCojunto.innerHTML = valorNombreConjunto

	var elementosCojuntos = document.getElementById("elementosCojuntos_js").value


	if (ValidarCampoVacio(elementosCojuntos) && ValidarCampoVacio(valorNombreConjunto)) {

		elementosCojuntos = elementosCojuntos.split(",")

		var contenedorElementosCojunto = document.createElement("span")
		contenedorElementosCojunto.classList.add("corchetesConjuntos")
		contenedorElementosCojunto.innerHTML = elementosCojuntos


		var respuesta = document.createElement("textarea")
		var inputSubmitValidar = document.createElement("input")

		inputSubmitValidar.value = "Validar"
		inputSubmitValidar.classList.add("btn","btnConfirmar")
		inputSubmitValidar.id = "btnValidarconjuntos"
		inputSubmitValidar.setAttribute("type", "submit")
		respuesta.id = "respuesta"
		respuesta.classList.add("respuesta")
		respuesta.setAttribute("required","required")
		respuesta.setAttribute("placeholder", "Escriba en este cuadro los posibles subconjuntos del conjunto anterior descrito.")

		seccionRespuesta.appendChild(respuesta)
		seccionRespuesta.appendChild(inputSubmitValidar)

		conjuntoIngresado.appendChild(contenedorNombreCojunto)
		conjuntoIngresado.appendChild(contenedorElementosCojunto)

		seccionRespuesta.addEventListener("submit",validarRespuesta)

		Habilitar_InhabilitarInputSubmit(document.getElementById("guardarConjunto_js"))
	}else{
		vaciarCampo(nombreConjunto)
	}
}

function validarRespuesta(evento) {
	evento.preventDefault()


	var elementosSubconjunto = 0

		//refactorizar luego
		var elementosCojuntos = (document.getElementById("elementosCojuntos_js").value).split(",")

		numeroCombinaciones = Math.pow(2,elementosCojuntos.length)

		var respuestaEnviada = document.getElementById("respuesta")

		elementosRespuestaEnviada = respuestaEnviada.value.split(",")


		if (elementosRespuestaEnviada.length != numeroCombinaciones) {
			console.log("Huu, Algo va mal")
		}else{
			console.log("vamos bien")
			console.log(elementosCojuntos);

			while(elementosSubconjunto < elementosCojuntos.length){

				var elementoBase = elementosCojuntos[elementosSubconjunto];

				//console.log('subconjuntos de ' + elementosSubconjunto + " elementos");

				elementosSubconjunto++
			}


		}

	}

//vaciar espacios del campo nombre conjunto
nombreConjunto.addEventListener("change", limpiarCampo)
function limpiarCampo(){
	vaciarCampo(this)
}

formConjuntos.addEventListener("submit", capturarConjunto)
