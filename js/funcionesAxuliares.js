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
