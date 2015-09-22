var posiblesValores = ["V", "F"]

var respuestasBien = 0

var simboloConjuntoVacio = "v"

var respuestasMal = 0

//inicializacion de variables
var valoresCampo = []
var valoresCampos = []

var proposiciones = ["p","q","r","s","t","u","v","w","x","y"]
var solucion = ""

var conjuncion =[["p","q","p Λ q"],
["V","V","V"],
["V","F","F"],
["F","V","F"],
["F","F","F"]]
var disjuncion = [["p","q","p V q"],
["V","V","F"],
["V","F","F"],
["F","V","F"],
["F","F","V"]]
var condicional = [["p","q","p → q"],
["V","V","F"],
["V","F","V"],
["F","V","F"],
["F","F","F"]]
var bicondicional = [["p","q","p ⇔ q"],
["V","V","V"],
["V","F","F"],
["F","V","F"],
["F","F","V"]]

var respuestas = []

var sectionTablasVerdad = document.getElementById("sectionTablasVerdad")

var contenedorPrincipal = document.getElementById("contenedorPrincipal_js")

var heightContenedorPrincipal = contenedorPrincipal.clientHeight

var simboloConjuncion =  "Λ"
var simboloDisjuncion =  "V"
var simboloCondicional =  "→"
var simboloBicondicional =  "⇔"
