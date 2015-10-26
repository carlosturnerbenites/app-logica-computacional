/*
	Description:
	Esta funcion convierte un elemento tipo HTMLCollection en un Array

	Syntax:
	convertirHTMLCollectionEnArray(elemento HTMLCollection)
	*/
	function convertirHTMLCollectionEnArray(HTMLCollections){

		var nombreArray = [].slice.call(HTMLCollections);
		return nombreArray

	}

/*
	Description:
	Esta funcion devuelve un numero aleatorio, en el rango de los numeros recibidos(max y min)

	Syntax:
	numeroAleatorio(numero Maximo(Integer), numero Minimo(Integer))
	*/
	function numeroAleatorio(max,min) {

		var aleatorio = Math.floor((Math.random() * max) + min)
		return aleatorio

	}
/*
	Description:
	Esta function recibe un string y comprueba que no sea vacio.
	Si es vacio devuelve False, y por el contrario, si es no es vacio devuelve True

	Syntax:
	ValidarCampoVacio(palabra A validar(String)
		*/
		function ValidarCampoVacio(campo) {

			if(campo.trim() == 0){
				return false

			}else{
				return true
			}

		}
/*
	Description:
	Esta funcion convierte un decimal en binario

	Syntax:
	decimalToBinary(numeroDicimal(Integer))
	*/
	function decimalToBinary(decimal){
		return (decimal >>> 0).toString(2);
	}

/*
	Description:
	Esta funcion convierte un String en Array separandolos caracter a caracter

	Syntax:
	convertirStringaArray(texto a convertir(String))
	*/
	function convertirStringaArray(textoSinEspacios) {
		return textoSinEspacios.split('');
	}
/*
	Description:
	Esta funcion Rellena un cadena de texto(elementos de un array) con ceros a la izquierda hasta lalongitud que se envia

	Syntax:
	completarBinarios(binarios(Array),longitud maxima(Integer))
	*/

	function completarBinarios(binarios,longitud){
		for (var binario in binarios){
			if (binarios[binario].length < longitud) {
				while(binarios[binario].length < longitud){
					binarios[binario] = "0" + binarios[binario]
				}
			}
			binarios[binario] = binarios[binario].split("")
		}
	}

/*
Description:
Esta funcion Rellena un cadena de texto(elementos de un array) con ceros a la izquierda hasta lalongitud que se envia

Syntax:
completarBinarios(binarios(Array),longitud maxima(Integer))
*/
function SeparaCerosDeValoresUtiles(conjuntos){
	var conjuntoSolucion = []

	for (var i = 0; i < conjuntos.length; i++) {
		var conjunto = []
		for (var j = 0; j < conjuntos[i].length; j++) {
			if (conjuntos[i][j] != "0") {
				conjunto.push(conjuntos[i][j])
			}
		}
		if (conjunto.length == 0) {
			conjunto.push(simboloConjuntoVacio)
		}
		conjuntoSolucion.push(conjunto.join(""))
	}

	return conjuntoSolucion

}
/*
Description:
Esta funcion ordena alfabeticamente los elementos de un array(String)

Syntax:
ordenarAlfabeticamente(array a ordenar alfabeticamente(Array))
*/
function ordenarAlfabeticamente(array){
	for (var i = 0; i < array.length; i++) {
		array[i] = array[i].split("").sort().join("")
	};
	array.sort()

	return array
}

/*
Description:
Esta funcion recibe un objeto y con sus valores añade un mensaje en el DOM(en el section con id ="seccionPrincipal") y posteriormente lo borra.

Syntax:
crearYMostrarMensaje(Objeto)
*/
function crearYMostrarMensaje(estado){
	var contenedor = document.createElement("section")
	contenedor.classList.add("contenedorMensaje")

	var contenedorMSG = document.createElement("article")

	var msg = document.createElement("p")
	msg.innerHTML= estado.msg

	var icono = document.createElement("span")
	icono.classList.add(estado.icono)


	for (var i = 0; i < estado.clases.length; i++) {

		contenedorMSG.classList.add(estado.clases[i])
	};


	contenedorMSG.appendChild(icono)
	contenedorMSG.appendChild(msg)
	contenedor.appendChild(contenedorMSG)
	contenedorPrincipal.appendChild(contenedor)

	setTimeout(function(){
		contenedorPrincipal.removeChild(contenedorPrincipal.lastChild)
	}, 2000)
}



/*
Description:
Esta funcion recibe un elemnto HTML(input) y evalua si este es vacio (es decir, igual a "")
Syntax:
vaciarCampo(elemnto HTML(input))
*/
function vaciarCampo(campo) {
	if (campo.value.trim() != 0) {

	}else{
		campo.value = ""

	}
}


/*
Description:
Esta funcion recibe un elemento HTML(form) y lo habilita o desabilita dependiendo de su estado actual
Syntax:
habilitarInhabilitarFormulario(elemnto HTML(form))
*/
function habilitarInhabilitarFormulario(formulario) {

	var propiedad = "disabled"


	var elementosForm = convertirHTMLCollectionEnArray(formulario.elements)


	for (var index = 0; index < elementosForm.length; index++) {

		if(elementosForm[index].disabled){

			elementosForm[index].removeAttribute(propiedad)

		}else{

			elementosForm[index].setAttribute(propiedad,propiedad)

		}
	}

}

/*
Description:
Esta funcion recibe un elemento HTML(Input) y lo habilita o desabilita dependiendo de su estado actual
Syntax:
habilitarInhabilitarInput(elemnto HTML(Input))
*/
function habilitarInhabilitarInput(input) {
	var propiedad = "disabled"

	if(input.disabled){

		input.removeAttribute(propiedad)

	}else{

		input.setAttribute(propiedad,propiedad)

	}

}


//en proceso
var crearElemento = {
	tipoDeElemento : "",
	texto : "",
	clases : [],
	id : "",
	atributos : [[]],
	elementoContenedor : "",
	constructorElemento : function () {

		var elemento = document.createElement(this.tipoDeElemento)

		elemento.innerHTML = this.texto

		for (var i = 0; i < this.clases.length; i++) {
			elemento.classList.add(this.clases[i])
		};

		for (var j = 0; j < this.atributos.length; j++) {
			elemento.setAttribute(this.atributos[j][0],this.atributos[j][1])

		};

		elemento.id = this.id

		elementoContenedor = document.getElementById(this.elementoContenedor)

		elementoContenedor.appendChild(elemento)

	}

}
