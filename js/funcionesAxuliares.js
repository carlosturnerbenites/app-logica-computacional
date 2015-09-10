function convertirHTMLCollectionEnArray(HTMLCollections){
	var nombreArray = [].slice.call(HTMLCollections);
	return nombreArray

}

function numeroAleatorio(max,min) {
	var aleatorio = Math.floor((Math.random() * max) + min)
	return aleatorio
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
