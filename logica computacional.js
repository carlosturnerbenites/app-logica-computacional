var tablaY = [["p","q","p y q"],["V","V","F"],["V","F","V"],["V","F","F"],["F","F","F"]]

var tableHTML = document.createElement("table")

for (var filas = 0; filas < tablaY.length; filas++) {

	var trHTML =document.createElement("tr")

	for (var columnas = 0; columnas < tablaY[filas].length; columnas++) {

		var thHTML =document.createElement("th")
		thHTML.innerHTML = tablaY[filas][columnas]
		trHTML.appendChild(thHTML)

	};

	tableHTML.appendChild(trHTML)

};
document.body.appendChild(tableHTML)
