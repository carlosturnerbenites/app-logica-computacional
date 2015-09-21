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
		console.log('bien bein vien');
		var estadoActual = {
			campoValido: true,
			msg : "Todo listo",
			clase : "MSGBien",
			icono : "icon-correcto"
		}
	}else{
		var estadoActual = {
			campoValido: false,
			msg : "hay un elemento repetido",
			clase : "MSGError",
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
	//console.log(estado.campovalido);
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
		var contenedorMSG = document.createElement("article")

		var msg = document.createElement("p")
		msg.innerHTML= estado.msg

		var icono = document.createElement("span")
		icono.classList.add(estado.icono)

		contenedorMSG.appendChild(icono)
		contenedorMSG.appendChild(msg)
		contenedorMSG.classList.add(estado.clase)

		contenedorPrincipal.appendChild(contenedorMSG)

		setTimeout(function(){
			contenedorPrincipal.removeChild(contenedorMSG)
		}, 2000)
		console.log(estado.msg);
	}

}
/*
function crearBase(elementosCojuntos){
	var base = []
	for (var i = 0; i < elementosCojuntos.length; i++) {
		base.push(0)
	}
	return base
}
*/
function validarRespuesta(evento) {
	evento.preventDefault()


	var subconjuntos = []
	var binary = []
	var elementosSubconjunto = 0

		//refactorizar luego
		var elementosCojuntos = (document.getElementById("elementosCojuntos_js").value).split(",")
		console.log(elementosCojuntos);
		numeroCombinaciones = Math.pow(2,elementosCojuntos.length)

		var respuestaEnviada = document.getElementById("respuesta")

		elementosRespuestaEnviada = respuestaEnviada.value.split(",")


		if (elementosRespuestaEnviada.length == numeroCombinaciones) {
			/*
			base = crearBase(elementosCojuntos)
			baseTemp = crearBase(elementosCojuntos)
			for (var elementoBase = 0; elementoBase < elementosCojuntos.length; elementoBase++) {
				for (var k = 0; k < elementosCojuntos.length; k++) {
					base[elementoBase] = 1
					base[k] = 1
					console.log(base);
					base = baseTemp
					console.log("despues " + base);
				}
			};
			*/

			for (var i = 0; i < numeroCombinaciones; i++) {
				binario = decimalToBinary(i)
				binary.push(binario)
				console.log("numero " + i + " - Binario " + binario);
			};
		}else{
		}
		completarBinarios(binary,elementosCojuntos.length)
		console.log(binary);
	}

//vaciar espacios del campo nombre conjunto
nombreConjunto.addEventListener("change", limpiarCampo)
function limpiarCampo(){
	vaciarCampo(this)
}

formConjuntos.addEventListener("submit", capturarConjunto)
