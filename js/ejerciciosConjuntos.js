var formConjuntos = document.getElementById("formConjuntos")

var contenedorConjuntoEscogido = document.getElementById("contenedorConjuntoEscogido")

var conjuntoIngresado = document.getElementById("conjuntoIngresado")
var seccionRespuesta = document.getElementById("seccionRespuesta")

function capturarConjunto(evento) {

	evento.preventDefault()

	var nombreConjunto = document.getElementById("nombreConjunto").value

	var contenedorNombreCojunto = document.createElement("span")
	contenedorNombreCojunto.innerHTML = nombreConjunto


	var elementosCojuntos = (document.getElementById("elementosCojuntos").value).split(",")

	var contenedorElementosCojunto = document.createElement("span")
	contenedorElementosCojunto.classList.add("corchetesConjuntos")
	contenedorElementosCojunto.innerHTML = elementosCojuntos


	var respuesta = document.createElement("textarea")
	var buttonValidar = document.createElement("button")

	buttonValidar.innerHTML = "Validar"
	respuesta.id = "respuesta"
	respuesta.classList.add("respuesta")
	respuesta.setAttribute("placeholder", "Escriba en este cuadro los posibles subconjuntos del conjunto anterior descrito.")

	seccionRespuesta.appendChild(respuesta)
	seccionRespuesta.appendChild(buttonValidar)

	conjuntoIngresado.appendChild(contenedorNombreCojunto)
	conjuntoIngresado.appendChild(contenedorElementosCojunto)
}

formConjuntos.addEventListener("submit", capturarConjunto)
