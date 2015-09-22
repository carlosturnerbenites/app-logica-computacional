/*
try {
	if (!window.openDatabase) {
		alert('not supported');
	} else {
		var shortName = 'db';
		var version = '1.0';
		var displayName = 'My Important Database';
		var maxSize = 65536; // in bytes
		var db = openDatabase(shortName, version, displayName, maxSize);

		// You should have a database instance in db.

		db.transaction(function (tx) {
			tx.executeSql('CREATE TABLE resultados', ('nombre TEXT', 'nota NUMERIC'));
			tx.executeSql('INSERT INTO resultados (nombre, nota) VALUES ("pepe", 4)');
			tx.executeSql('SELECT * FROM resultados', ['nombre', 'nota']);
		});
	}
}
catch(e) {
	// Error handling code goes here.
	if (e == 2) {
		// Version number mismatch.
		alert("Invalid database version.");
	} else {
		alert("Unknown error "+e+".");
	}
}
alert("Database is: "+db);
*/

var formConjuntos = document.getElementById("formConjuntos")
var contenedorConjuntoEscogido = document.getElementById("contenedorConjuntoEscogido")
var conjuntoIngresado = document.getElementById("conjuntoIngresado")
var seccionRespuesta = document.getElementById("seccionRespuesta_js")
var nombreConjunto = document.getElementById("nombreConjunto_js")


function validarConjunto(elementosCojuntos){
	var campoValido = true
	//console.log(elementosCojuntos);
	if((elementosCojuntos.indexOf(".") == -1)){
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
			//console.log('bien bein vien');
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

	var valorNombreConjunto = nombreConjunto.value

	var contenedorNombreCojunto = document.createElement("span")
	contenedorNombreCojunto.innerHTML = valorNombreConjunto

	var elementosCojuntos = document.getElementById("elementosCojuntos_js").value


	var estado = validarConjunto(elementosCojuntos)

	if (estado.campoValido){

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
	}else{
		//esta funcion recibe un objeto cestado y crea un mensaje y lo inserta en el contenedor principal
		crearYMostrarMensaje(estado)
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
	var conjuntoSolucion = borrarCerros(conjuntoSolucionBinary)

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
	//console.log(binary);

	var conjuntoSolucion = crearRespuesta(elementosCojuntos,binary)
	console.log(elementosRespuestaEnviada)
	var elementosRespuestaEnviadaOrdenada = ordenarAlfabeticamente(elementosRespuestaEnviada)

	console.log(conjuntoSolucion)
	console.log(elementosRespuestaEnviadaOrdenada)

	if (String(ordenarAlfabeticamente(conjuntoSolucion)) == String(ordenarAlfabeticamente(elementosRespuestaEnviadaOrdenada))) {
		var estadoActual = {
			campoValido: true,
			msg : "Listo, todo bien",
			clases : ["MSG" ,"MSGBien"],
			icono : "icon-correcto"
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
	//ordenar un string albabeticamente
	//array.split("").sort().join("")
}

//vaciar espacios del campo nombre conjunto
nombreConjunto.addEventListener("change", limpiarCampo)
function limpiarCampo(){
	vaciarCampo(this)
}

formConjuntos.addEventListener("submit", capturarConjunto)
