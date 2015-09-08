var proposiciones = ["p","q","r","s","t","u","v","w","x","y"]
var solucion = ""
var tablaY = 	[["p","q","p Λ q"],
["V","V","F"],
["V","F","V"],
["V","F","F"],
["F","F","F"]]
var tablaO = 	[["p","q","p V q"],
["V","V","F"],
["V","F","F"],
["V","F","F"],
["F","F","V"]]
var tablaC = 	[["p","q","p → q"],
["V","V","F"],
["V","F","F"],
["V","F","V"],
["F","F","F"]]
var tablaBC = 	[["p","q","p ⇔ q"],
["V","V","V"],
["V","F","F"],
["V","F","F"],
["F","F","V"]]

var fromValidarRespuesta = document.getElementById("fromValidarRespuesta")

var respuestas = []

var sectionTablasVerdad = document.getElementById("sectionTablasVerdad")

var conjuncion =  "Λ"
var disjuncion =  "V"
var condicional =  "→"
var bicondicional =  "⇔"
