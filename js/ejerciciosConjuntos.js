
var formConjuntos = document.getElementById("formConjuntos")


var seccionRespuesta = document.getElementById("seccionRespuesta")
formConjuntos.addEventListener("submit", capturarConjunto)

function capturarConjunto(evento) {

	evento.preventDefault()

	var nombreConjunto = document.getElementById("nombreConjunto").value
	var elementosCojuntos = (document.getElementById("elementosCojuntos").value).split(" ")
	console.log(elementosCojuntos);

	var respuesta = document.createElement("textarea")
	respuesta.id = "respuesta"
	respuesta.classList.add("respuesta")
	respuesta.setAttribute("placeholder", "Escriba en este cuadro los posibles subconjuntos del conjunto anterior descrito.")
	console.log(respuesta);
	seccionRespuesta.appendChild(respuesta)

}
