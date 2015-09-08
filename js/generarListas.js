function generarListas(IDcontenedorEjercicios,tipoLista,baseDirLista,cursosDisponibles) {

	console.log(cursosDisponibles);

	var contenedorEjercicios = document.getElementById(IDcontenedorEjercicios)

	var baseDir = baseDirLista +"/"
	var tipoLista = cursosDisponibles
	var descripcion = ["Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum fugit, laudantium consequuntur,"]

	for (var i = 0; i < tipoLista.length; i++) {

		var liHTML = document.createElement("li")
		var linkHTML = document.createElement("a")
		var pHTML = document.createElement("p")

		pHTML.innerHTML = descripcion[i]
		pHTML.classList.add("descripcion")
		linkHTML.setAttribute("href", baseDir + tipoLista[i])
		linkHTML.innerHTML = tipoLista[i]
		liHTML.appendChild(linkHTML)
		liHTML.appendChild(pHTML)

		contenedorEjercicios.appendChild(liHTML)

	};
}


