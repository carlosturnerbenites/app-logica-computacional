function convertirHTMLCollectionEnArray(HTMLCollections){
	var nombreArray = [].slice.call(HTMLCollections);
	return nombreArray
}

function numeroAleatorio(max,min) {
	var aleatorio = Math.floor((Math.random() * max) + min)
	return aleatorio
}
//recibe el value de un input y comprueba si esta vacio
function ValidarCampoVacio(campo) {
	if(campo.trim() == 0){
		return false
	}else{
		return true
	}
}
function decimalToBinary(decimal){
	return (decimal >>> 0).toString(2);
}

function convertirStringaArray(textoSinEspacios) {
	return textoSinEspacios.split('');
}

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
function borrarCerros(conjuntos){
	var conjuntoSolucion = []

	for (var i = 0; i < conjuntos.length; i++) {
		var conjunto = []
		for (var j = 0; j < conjuntos[i].length; j++) {
			if (conjuntos[i][j] != "0") {
				conjunto.push(conjuntos[i][j])
			}
		}
		/*
		if(conjunto.toString() == ""){
			conjunto = simboloConjuntoVacio
		}*/
		conjuntoSolucion.push(conjunto.join(""))
	}

	return conjuntoSolucion

}

function ordenarAlfabeticamente(array){
	var arrayOrdenado = []
	arrayOrdenado = array.sort()
	console.log(arrayOrdenado);
	return arrayOrdenado
}

/*
//backup fuction
function borrarCerros(conjuntos){

	for (var i = 0; i < conjuntos.length; i++) {
		console.log(conjuntos[i])

		var longitud = conjuntos[i].length

		for (var j = 0; j < longitud; j++) {
			console.log('-------------');
			if (conjuntos[i][j] == "0") {
				console.log('hay un cero');
			};
			console.log('-------------');
		};

	}

	console.log('--------');
	console.log(conjuntos);
}
*/
function crearYMostrarMensaje(estado){
	var contenedor = document.createElement("section")

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
	contenedorPrincipal.insertBefore(contenedor, contenedorPrincipal.firstChild)

	setTimeout(function(){
		//contenedorPrincipal.removeChild(contenedorMSG)
	}, 2000)
}




//recibe el value de un input e iguala su value a vacio
function vaciarCampo(campo) {
	if (campo.value.trim() != 0) {
		console.log('bien');
	}else{
		campo.value = ""

	}
}


//tiene un problema esta funcion
function Habilitar_InhabilitarInputSubmit(input) {
	console.log(input);
	//var atributo = "disabled"
	console.log(input.hasAttributes("disabled"));
	if(input.hasAttributes("disabled")){
		input.setAttribute("disabled","disabled")
		console.log('añadir');
	}else{
		console.log('remover');
		input.removeAttribute("disabled")
	}
}



var estado = {

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



