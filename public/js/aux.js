		var htmlInputgrafoCompleto = document.getElementById("htmlInputgrafoCompleto_js")
		var htmlFormVerificarDatosGrafo = document.getElementById("htmlFormVerificarDatosGrafo_js")
		var htmlFormformGrafos = document.getElementById("htmlFormformGrafos_js")
		var htmlInputCantidadVertices = document.getElementById("htmlInputCantidadVertices_js")
		var htmlInputCantidadAristas = document.getElementById("htmlInputCantidadAristas_js")
		var htmlSectionGradoDeLosVertices = document.getElementById("htmlSectionGradoDeLosVertices_js")
		/*la cantidad maxima de vertices se asigna dependiendo de la cantidad de nombre de vertices que hallan(Esto ultimo se obtiene del arreglo "nombresVertices")*/
		htmlInputCantidadVertices.setAttribute("max", nombreVertices.length)
		htmlInputCantidadVertices.addEventListener("change", validarAristasYGrados)
		function HabilitarGrafocompleto() {
			habilitarInhabilitarInput(htmlInputCantidadAristas)
		}
		function validarAristasYGrados(evento) {
			numeroDeVertices = htmlInputCantidadVertices.value
			var numeroMaximoAristas = ((numeroDeVertices*(numeroDeVertices-1))/2)
			if (htmlInputgrafoCompleto.checked) {
				numeroDeAristas = numeroMaximoAristas
			}else{
				numeroDeAristas = htmlInputCantidadAristas.value
			}
			console.log(numeroDeAristas);
			/*Este maximo de aristas no comtempla cilcos(arista de n a n) ni direccion del grafo*/
			htmlInputCantidadAristas.setAttribute("max", numeroMaximoAristas)
		}
		function crearCamposParaGradoDeVertice() {
			limpiarContenedorHTML(htmlSectionGradoDeLosVertices)
			var htmlLabelGradoVertices = document.createElement("label")
			htmlLabelGradoVertices.setAttribute("for", "gradoVertice_js")
			htmlLabelGradoVertices.innerHTML = "Grado de los Vertices"
			htmlSectionGradoDeLosVertices.appendChild(htmlLabelGradoVertices)
			var htmlUlContenedorListaGradoDeVertice = document.createElement("ul")
			htmlUlContenedorListaGradoDeVertice.classList.add("listadoGradoVertices")
			for (var i = 0; i < numeroDeVertices; i++) {
				var htmlUlContenedorGradoDeVertice = document.createElement("li")
				var htmlSpanTextoGradoVertices = document.createElement("span")
				htmlSpanTextoGradoVertices.classList.add("nombreVertice")
				var htmlInputNombreDeUnVertice = document.createElement("input")
				htmlInputNombreDeUnVertice.required = true
				htmlInputNombreDeUnVertice.type = "text"
				htmlInputNombreDeUnVertice.id = "nombreVertice_js"
				htmlInputNombreDeUnVertice.classList.add("inputBorderBottomFocus","inputCorto")
				htmlSpanTextoGradoVertices.appendChild(htmlInputNombreDeUnVertice)
				var htmlInputGradoDeUnVertice = document.createElement("input")
				htmlInputGradoDeUnVertice.type = "number"
				htmlInputGradoDeUnVertice.required = true
				htmlInputGradoDeUnVertice.id = "gradoVertice_js"
				htmlInputGradoDeUnVertice.classList.add("inputBorderBottomFocus","inputCorto")
				htmlUlContenedorGradoDeVertice.appendChild(htmlSpanTextoGradoVertices)
				htmlUlContenedorGradoDeVertice.appendChild(htmlInputGradoDeUnVertice)
				htmlUlContenedorListaGradoDeVertice.appendChild(htmlUlContenedorGradoDeVertice)
				htmlSectionGradoDeLosVertices.appendChild(htmlUlContenedorListaGradoDeVertice)
			}
		}
		htmlFormformGrafos.addEventListener("submit", VerificarFormYHabilitarLienzo)
		function VerificarFormYHabilitarLienzo(evento) {
			evento.preventDefault()
			validarAristasYGrados()
		//Se agrega el evento "doble click" en el lienzo, para que al suceder se cree y agrege un vertice(elemento "circle") en el lienzo
		lienzo.addEventListener("dblclick", dibujarCirculo)
		lienzo.removeAttribute("disabled")
		if (htmlInputgrafoCompleto.checked) {
			habilitarInhabilitarInput(htmlInputCantidadAristas)
		}
		habilitarInhabilitarFormulario(this)
		htmlFormformGrafos.removeEventListener("submit", VerificarFormYHabilitarLienzo)
		var htmlButtonValidar = document.createElement("button")
		htmlButtonValidar.innerHTML = innerHTMLBtnVerificar
		htmlButtonValidar.classList.add("btn","btnConfirmar","centrarConMargin")
		htmlButtonValidar.id = "btnValidargrafo"
		htmlButtonValidar.setAttribute("type", "submit")
		var HTMLSpanIconoBtn = document.createElement("span")
		HTMLSpanIconoBtn.classList.add(iconoBtnVerificar,"marginIconos")
		crearCamposParaGradoDeVertice()
		htmlButtonValidar.insertBefore(HTMLSpanIconoBtn, htmlButtonValidar.firstChild)
		htmlFormVerificarDatosGrafo.appendChild(htmlButtonValidar)
		htmlFormVerificarDatosGrafo.addEventListener("submit", validarGrafoRespuesta)
	}
	function verificarGradosDeVertices() {
		var verticesEnLienzo = htmlSvgLienzoGrafoVertices.children
		var aristasEnLienzo = htmlSvgLienzoGrafoAristas.children


		for(var vertice in verticesEnLienzo){
			verticesEnLienzo[vertice]
			console.log(verticesEnLienzo[vertice].getAttribute("name"));
		}

		console.log(verticesEnLienzo,aristasEnLienzo);
	}
	function validarGrafoRespuesta(evento) {
		evento.preventDefault()
		var numeroDeVerticesEnLienzo = htmlSvgLienzoGrafoVertices.childElementCount
		var numeroDeAristasEnLienzo = htmlSvgLienzoGrafoAristas.childElementCount
		if (parseInt(numeroDeVertices) == numeroDeVerticesEnLienzo){
			if (parseInt(numeroDeAristas) == numeroDeAristasEnLienzo) {
				verificarGradosDeVertices()
			}else{
				var estadoActual = {
					msg : "Hay un problema con Las Aristas",
					clases : ["MSG", "MSGError"],
					icono : "icon-equivocado"
				}
			}
		}else{
			var estadoActual = {
				msg : "Hay un problema con los vertices",
				clases : ["MSG", "MSGError"],
				icono : "icon-equivocado"
			}
		}
		crearYMostrarMensaje(estadoActual)
	}
	htmlInputgrafoCompleto.addEventListener("change", HabilitarGrafocompleto)
