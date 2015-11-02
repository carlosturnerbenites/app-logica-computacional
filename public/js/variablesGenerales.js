//seccion prinicipal que tiene todas la paginas, esta se encarga de contenedor el ancho y todo el contenido, se captura para poder añadir elementos en el
var contenedorPrincipal = document.getElementById("contenedorPrincipal_js")

//Alto de px de la seccion contenedor principal de todas las paginas
var heightContenedorPrincipal = contenedorPrincipal.clientHeight

//separador  creado para dividir secciones visualmente
var htmlHrSeparadorContenido = document.createElement("hr")

//Texto que se muestra en los botones de los ejercicios, se utilizan para añadir un mismo texto a todo slo sbotones
var innerHTMLBtnVerificar = "Verificar"
var innerHTMLBtnVolver = "Volver"
var innerHTMLBtnRealizarEjercicio = "Realizar Ejercicio"

var iconoBtnVerificar = "icon-verificar"
var iconoBtnVolver = "icon-volver"
var iconoBtnRealizarEjercicio = "icon-realizarEjercicio"

var btnVolver = document.createElement("button")
btnVolver.innerHTML = innerHTMLBtnVolver
btnVolver.id = "btnReiniciarEjercicio_js"
btnVolver.classList.add("centrarConMargin","btn" ,"btnConfirmar")
btnVolver.setAttribute("type", "submit")
var HTMLSpanIconoBtn = document.createElement("span")
HTMLSpanIconoBtn.classList.add(iconoBtnVolver,"marginIconos")
btnVolver.insertBefore(HTMLSpanIconoBtn, btnVolver.firstChild)

var btnValidar = document.createElement("button")
btnValidar.innerHTML = innerHTMLBtnVerificar
btnValidar.id = "btnValidargrafo"
btnValidar.classList.add("btn","btnConfirmar","centrarConMargin")
btnValidar.setAttribute("type", "submit")
var HTMLSpanIconoBtn = document.createElement("span")
HTMLSpanIconoBtn.classList.add(iconoBtnVerificar,"marginIconos")
btnValidar.insertBefore(HTMLSpanIconoBtn, btnValidar.firstChild)
