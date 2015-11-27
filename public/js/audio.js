var audio = new Audio("/audio/audiop.mp3")	//Elemento Audio
,minVolumen = 0								//Volumen minimo
,maxVolumen = 1								//Volumen maximo
,mediumVolumen = maxVolumen/2				//Volumen medio
,currenTime = 0								//Tiempo de reproducion Actual

/*capture elements of DOM*/
var progressBarAudio = document.getElementById("barraDePorgresoAudio_js")
,currentStateAudio = document.getElementById("estadoActualAudio_js")
,currentIconVolume = document.getElementById("htmlSpanIconoVolumenActual_js")
,inputMutedAudio = document.getElementById("silenciarAudio_js")
,inputVolume = document.getElementById("volumenAudio_js")
,buttonPlayPauseAudio = document.getElementById("reproductorMusica_js")
,buttonLoop = document.getElementById("repetirAudio_js")

/*Cambio el currentTime (tiempo de reproduccion) del audio al valor que registre input(Range) de la barra de progreso*/
function changeCurrentTime() {
	newCurrentTime = this.value
	audio.currentTime = newCurrentTime
}

/*Actualiza el cursor del input(Range) de la bara de progreso al cambiar el currentTime del audio*/
function updateProgressBar() {
	currenTime = audio.currentTime
	progressBarAudio.value = currenTime
}

/*Reinicia los iconos del pause/play al terminar la reproduccion del audio*/
function restartAudio() {
	currentStateAudio.classList.remove("icon-pause")
	currentStateAudio.classList.add("icon-play")
}

/*Cambio el volumen del audio por el valor registrasdo en el input(Range) y ejecuta changeIconVolume*/
function changeVolume() {
	console.log("change audio")
	var newVolume = inputVolume.value
	audio.volume = newVolume
	changeIconVolume()

	inputMutedAudio.checked = audio.volume > 0 ? false : true
}

/*Silencia el audio*/
function mutedAudio() {
	if(this.checked){
		console.log("checked")
		audio.muted = true
		inputVolume.value = minVolumen

	}else{
		console.log("no checked")
		audio.muted = false
		inputVolume.value = maxVolumen
	}
	changeVolume()
}

/*Repetir el audio*/
function loopAudio() {
	audio.loop = this.checked ? true : false
}

/*Pausar o Reprocucir Audio*/
function playPauseAuido(evento) {

	var durationAudio = audio.duration
	progressBarAudio.setAttribute("max", durationAudio)

	if (audio.paused){

		audio.play()
		currentStateAudio.classList.remove("icon-play")
		currentStateAudio.classList.add("icon-pause")

	}else{

		audio.pause()
		currentStateAudio.classList.remove("icon-pause")
		currentStateAudio.classList.add("icon-play")

	}

	changeIconVolume()
}

/*Cambiar el icono del volumen dependiendo del nivel de este*/
function changeIconVolume() {

	var currentVolume = Number(inputVolume.value)
	audio.muted = false

	currentIconVolume.className = ""

	if (currentVolume == 0) {
		currentIconVolume.classList.add("icon-silenciado")
	}else if(currentVolume < mediumVolumen){
		currentIconVolume.classList.add("icon-volumenBajo")
	}else if(currentVolume > mediumVolumen){
		currentIconVolume.classList.add("icon-volumenAlto")
	}else if(currentVolume == mediumVolumen){
		currentIconVolume.classList.add("icon-volumenMedio")
	}
}

/*add events*/
buttonPlayPauseAudio.addEventListener("click", playPauseAuido)
buttonLoop.addEventListener("change", loopAudio)

inputMutedAudio.addEventListener("change", mutedAudio)
inputVolume.addEventListener("change", changeVolume)

progressBarAudio.addEventListener("change", changeCurrentTime)

audio.addEventListener("timeupdate", updateProgressBar)
audio.addEventListener("ended", restartAudio)
