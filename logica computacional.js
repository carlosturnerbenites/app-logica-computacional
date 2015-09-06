var tablaY = 	[["p","q","p y q"],
["V","V","F"],
["V","F","V"],
["V","F","F"],
["F","F","F"]]
var tablaO = 	[["p","q","p o q"],
["V","V","F"],
["V","F","F"],
["V","F","F"],
["F","F","V"]]
var tablaC = 	[["p","q","p -> q"],
["V","V","F"],
["V","F","F"],
["V","F","V"],
["F","F","F"]]
var tablaBC = 	[["p","q","p <-> q"],
["V","V","V"],
["V","F","F"],
["V","F","F"],
["F","F","V"]]

function crearTabla(tabla) {
	var tableHTML = document.createElement("table")

	for (var filas = 0; filas < tabla.length; filas++) {

		var trHTML =document.createElement("tr")

		for (var columnas = 0; columnas < tabla[filas].length; columnas++) {

			var thHTML =document.createElement("th")
			thHTML.innerHTML = tabla[filas][columnas]
			trHTML.appendChild(thHTML)

		};

		tableHTML.appendChild(trHTML)

	};
	document.body.appendChild(tableHTML)
}

crearTabla(tablaC)


