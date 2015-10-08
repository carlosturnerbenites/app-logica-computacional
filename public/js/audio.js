var musicaEscogido = document.getElementById("musicaEscogido_js")
var musica = new Audio("../../media/audio/tlos.mp3")
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
BtnrepetirAudio.addEventListener("change", repetirAudio)
musica.addEventListener("timeupdate", progressBar)
musica.addEventListener("ended", reiniciarAudio)

function progressBar() {
	tiempoActual = musica.currentTime

	barraDePorgresoAudio.setAttribute("value", tiempoActual)
}

function reiniciarAudio() {
	estadoActualAudio.innerHTML = "Escuchar"
}




function cambiarVolumen() {
	var nuevoVolumen = this.value
	musica.volume = nuevoVolumen
	console.log('se cambio el volumen');
	cambiarIconoVolumen()
}

function mutedAudio() {
	console.log(this);
	console.log('silenciando');
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
		console.log('repetir activado');
		musica.loop = true
	}else{
		console.log('repetir inactivado');
		musica.loop = false
	}
}

function reproducirparaAudio(evento) {



	var duracionAudio = musica.duration
	barraDePorgresoAudio.setAttribute("max", duracionAudio)

	if (musica.paused){
		musica.play()

		estadoActualAudio.innerHTML = "Pausar"

	}else{
		musica.pause()
		estadoActualAudio.innerHTML = "Escuchar"
	}
	cambiarIconoVolumen()
}



function cambiarIconoVolumen() {
	console.log('cambiando volumen');
	var valorVolumenAudio = Number(volumenAudio.value)
	console.log(valorVolumenAudio);
	musica.muted = false
	silenciarAudio.checked = false
	if (valorVolumenAudio < mediumVolumen) {
		htmlSpanIconoVolumenActual.className = ""
		htmlSpanIconoVolumenActual.classList.add("icon-volumenBajo")
	}
	if(valorVolumenAudio > mediumVolumen){
		htmlSpanIconoVolumenActual.className = ""
		htmlSpanIconoVolumenActual.classList.add("icon-volumenAlto")

	}
	if(valorVolumenAudio == mediumVolumen){
		htmlSpanIconoVolumenActual.className = ""
		htmlSpanIconoVolumenActual.classList.add("icon-volumenMedio")

	}

}

