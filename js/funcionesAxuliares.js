function convertirHTMLCollectionEnArray(HTMLCollections){
	var nombreArray = [].slice.call(HTMLCollections);
	return nombreArray

}

function numeroAleatorio(max,min) {
	var aleatorio = Math.floor((Math.random() * max) + min)
	return aleatorio
}


var crearElemento = {
	tipoDeElemento : "a",
	texto : "link con funcion",
	clases : ["c","a","b","w","d"],
	id : "link",
	atributos : [["href","link"]],
	elementoContenedor : "sectionTablasVerdad",
	constructorElemento : function () {

		var elemento = document.createElement(this.tipoDeElemento)

		elemento.innerHTML = this.texto

		for (var i = 0; i < this.clases.length; i++) {
			elemento.classList.add(this.clases[i])
		};

		for (var j = 0; j < this.atributos.length; j++) {
			console.log(this.atributos[j][0]);
			console.log(this.atributos[j][1]);
			elemento.setAttribute(this.atributos[j][0],this.atributos[j][1])

		};

		elemento.id = this.id

		elementoContenedor = document.getElementById(this.elementoContenedor)

		elementoContenedor.appendChild(elemento)

	}

}
