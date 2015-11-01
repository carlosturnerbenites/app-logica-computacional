var musicaEscogido = document.getElementById("musicaEscogido_js")
var musica = new Audio("/audio/audiop.mp3")
var tiempoActual = 0

var minVolumen = 0
var maxVolumen = 1
var mediumVolumen = maxVolumen/2
var iconoActual = new String()


var listadoAjustesAudio = document.getElementById("listadoAjustesAudio_js")
var barraDePorgresoAudio = document.getElementById("barraDePorgresoAudio_js")
var estadoActualAudio = document.getElementById("estadoActualAudio_js")

var btnAudio = document.getElementById("reproductorMusica_js")

var htmlSpanIconoVolumenActual = document.getElementById("htmlSpanIconoVolumenActual_js")

var btnAjustesAudio = document.getElementById("btnAjustesAudio_js")

var silenciarAudio = document.getElementById("silenciarAudio_js")

var volumenAudio = document.getElementById("volumenAudio_js")
var BtnrepetirAudio = document.getElementById("repetirAudio_js")

btnAjustesAudio.addEventListener("click", mostrarOcultarSeccion)
btnAudio.addEventListener("click", reproducirparaAudio)
silenciarAudio.addEventListener("click", mutedAudio)
volumenAudio.addEventListener("change", cambiarVolumen)
barraDePorgresoAudio.addEventListener("change", cambiarCurrentTime)
BtnrepetirAudio.addEventListener("change", repetirAudio)
musica.addEventListener("timeupdate", progressBar)
musica.addEventListener("ended", reiniciarAudio)

function cambiarCurrentTime() {
	newCurrentTime = this.value
	musica.currentTime = newCurrentTime
}

function progressBar() {
	tiempoActual = musica.currentTime

	barraDePorgresoAudio.value = tiempoActual
}

function reiniciarAudio() {
	estadoActualAudio.classList.remove("icon-pause")
	estadoActualAudio.classList.add("icon-play")
}

function cambiarVolumen() {
	var nuevoVolumen = this.value
	musica.volume = nuevoVolumen
	cambiarIconoVolumen()
}

function mutedAudio() {
	if(this.checked){
		musica.muted = true
		htmlSpanIconoVolumenActual.classList.add("icon-silenciado")

	}else{
		musica.muted = false
		cambiarIconoVolumen()
	}
}

function repetirAudio() {
	if(this.checked){
		musica.loop = true
	}else{
		musica.loop = false
	}
}

function reproducirparaAudio(evento) {

	var duracionAudio = musica.duration
	barraDePorgresoAudio.setAttribute("max", duracionAudio)

	if (musica.paused){
		musica.play()

		estadoActualAudio.classList.remove("icon-play")
		estadoActualAudio.classList.add("icon-pause")

	}else{
		musica.pause()
		estadoActualAudio.classList.remove("icon-pause")
		estadoActualAudio.classList.add("icon-play")
	}
	cambiarIconoVolumen()
}

function cambiarIconoVolumen() {
	var valorVolumenAudio = Number(volumenAudio.value)
	musica.muted = false
	silenciarAudio.checked = false
	if (valorVolumenAudio < mediumVolumen) {
		htmlSpanIconoVolumenActual.className = ""
		htmlSpanIconoVolumenActual.classList.add("icon-volumenBajo")
	}
	if(valorVolumenAudio > mediumVolumen){
		htmlSpanIconoVolumenActual.className = ""
		htmlSpanIconoVolumenActual.classList.add("icon-volumenAlto")
		htmlSpanIconoVolumenActual.classList.add("marginLateral")

	}
	if(valorVolumenAudio == mediumVolumen){
		htmlSpanIconoVolumenActual.className = ""
		htmlSpanIconoVolumenActual.classList.add("icon-volumenMedio")

	}
}

