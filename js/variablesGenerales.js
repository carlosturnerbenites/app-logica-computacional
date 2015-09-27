var contenedorPrincipal = document.getElementById("contenedorPrincipal_js")

var sectionTablasVerdad = document.getElementById("sectionTablasVerdad_js")


var heightContenedorPrincipal = contenedorPrincipal.clientHeight


var simboloConjuntoVacio = "Ø"


//inicializacion de variables
var valoresCampo = []
var valoresCampos = []


var respuestas = []


var simbolosOperacion =  ["Λ","V","→","⇔"]

//valores Tablas de Verdad
var posiblesValores = ["V", "F"]

var proposiciones = ["p","q","r","s","t","u","v","w","x","y"]

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
