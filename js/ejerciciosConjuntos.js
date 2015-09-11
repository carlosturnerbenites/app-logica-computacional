
var formConjuntos = document.getElementById("formConjuntos")


var contenedorConjuntoEscogido = document.getElementById("contenedorConjuntoEscogido")

var seccionRespuesta = document.getElementById("seccionRespuesta")
formConjuntos.addEventListener("submit", capturarConjunto)

function capturarConjunto(evento) {

	evento.preventDefault()

	var nombreConjunto = document.getElementById("nombreConjunto").value

	contenedorNombreConjunto.innerHTML = nombreConjunto

	var elementosCojuntos = (document.getElementById("elementosCojuntos").value).split(",")
	contenedorConjuntoEscogido.innerHTML = elementosCojuntos
	console.log(elementosCojuntos);

	var respuesta = document.createElement("textarea")
	var buttonValidar = document.createElement("button")

	buttonValidar.innerHTML = "Validar"
	respuesta.id = "respuesta"
	respuesta.classList.add("respuesta")
	respuesta.setAttribute("placeholder", "Escriba en este cuadro los posibles subconjuntos del conjunto anterior descrito.")
	console.log(respuesta);
	seccionRespuesta.appendChild(respuesta)
	seccionRespuesta.appendChild(buttonValidar)

}
