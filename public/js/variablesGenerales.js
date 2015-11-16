//seccion prinicipal que tiene todas la paginas, esta se encarga de contenedor el ancho y todo el contenido, se captura para poder añadir elementos en el
var contenedorPrincipal = document.getElementById("contenedorPrincipal_js")

//variable que verifica si un ejercicio ya comenzo
var ejecicioEnEjecucion = false
//Alto de px de la seccion contenedor principal de todas las paginas
var heightContenedorPrincipal = contenedorPrincipal.clientHeight

//separador  creado para dividir secciones visualmente
var htmlHrSeparadorContenido = document.createElement("hr")

//Texto que se muestra en los botones de los ejercicios, se utilizan para añadir un mismo texto a todo slo sbotones
var innerHTMLBtnVerificar = "Verificar"
,innerHTMLBtnVolver = "Volver"
,innerHTMLBtnRealizarEjercicio = "Realizar Ejercicio"

var iconoBtnVerificar = "icon-verificar"
,iconoBtnVolver = "icon-volver"
,iconoBtnRealizarEjercicio = "icon-realizarEjercicio"

var msgEjercicioCompletado = "Listo, el ejercicio es correcto."
,msgErrorEnEjercicio = "Algo anda mal con la solucion del ejercicio"
,msgErrorInterno = "Disculpa, ocurrio un error interno"
,msgCargaCompleta = "Cagado Correctamente"
,msgGrafoVacio = "Este grafo esta vacio, no vale la pena guardarlo."

//msg usado en conjuntos
,msgErrorSintaxis = "Hay un caracter no permitido o error de sintaxis."

//msg usado en calculo proposicional
,msgNoHaySeleccion = "No has escogido ningun Conector."

//msg usado en grafo
,msgLienzoNoHabilitado = "El lienzo no esta habilitado"
,msgProblemaConAristas = "Hay un problema con Las Aristas"
,msgProblmeaConVertices = "Hay un problema con los Vertices"
,msgElementoExistente = "Esta linea ya existe"


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
