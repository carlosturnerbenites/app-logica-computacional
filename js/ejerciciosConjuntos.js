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
        	tx.executeSql('SELECT * FROM resultados', ['nombre', 'nota'
        		]);
        	console.log(tx.executeSql('SELECT * FROM resultados', ['nombre', 'nota'
        		])
        	);
        	//tx.executeSql('INSERT INTO resultados (nombre, nota) VALUES ("pepe", 4)');

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


	var subconjuntos = []
	var elementosSubconjunto = 0

		//refactorizar luego
		var elementosCojuntos = (document.getElementById("elementosCojuntos_js").value).split(",")
		console.log(elementosCojuntos);
		numeroCombinaciones = Math.pow(2,elementosCojuntos.length)

		var respuestaEnviada = document.getElementById("respuesta")

		elementosRespuestaEnviada = respuestaEnviada.value.split(",")


		if (elementosRespuestaEnviada.length == numeroCombinaciones) {

			for (var k = 0; k <= elementosCojuntos.length; k++) {
				if (k == elementosCojuntos.length){
					subconjuntos.push("{}")
				}else{
					console.log('subconjunto ' + subconjuntos);
					subconjuntos.push(elementosCojuntos[k])
				}
			};

			while(elementosCojuntos.length > elementosSubconjunto ){

				var elementoBase = elementosCojuntos[elementosSubconjunto];

				console.log('elemento base ' + elementoBase);

				for (var j = elementosSubconjunto; j < elementosCojuntos.length; j++) {
					if (!(elementosSubconjunto == j)) {
						elementoBase += elementosCojuntos[j]
						console.log('subconjunto ' + elementoBase);
						subconjuntos.push(elementoBase)

					};
				};
				elementosSubconjunto++

			}
			console.log(subconjuntos);
		}else{
			console.log('algo va mal');

		}

	}

//vaciar espacios del campo nombre conjunto
nombreConjunto.addEventListener("change", limpiarCampo)
function limpiarCampo(){
	vaciarCampo(this)
}

formConjuntos.addEventListener("submit", capturarConjunto)
