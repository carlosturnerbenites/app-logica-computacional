var musica = new Audio("../../media/audio/tlos.mp3")

var estadoActualAudio = document.getElementById("estadoActualAudio_js")

var btnAudio = document.getElementById("reproductorMusica_js")

var btnAjustesAudio = document.getElementById("btnAjustesAudio_js")

btnAjustesAudio.addEventListener("click", mostrarOcultarSeccion)
btnAudio.addEventListener("click", reproducirparaAudio)
