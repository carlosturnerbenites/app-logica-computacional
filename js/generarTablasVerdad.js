function crearTabla() {
	tabla = eval(this.value)
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
	sectionTablasVerdad.appendChild(tableHTML)
}



var btnCreartablaVerdad = convertirHTMLCollectionEnArray(document.querySelectorAll(".tablaVerdad"))

btnCreartablaVerdad.forEach(function(btnCrear, index){
	btnCrear.addEventListener("click", crearTabla)
})

