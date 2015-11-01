var express = require("express"),
router = express.Router()

var temas = {
	cursoUno:{
		curso:"Calculo Proposicional",
		urlEjercicio:"/ejercicios/calculoProposicional"
	},
	cursoDos:{
		curso: "Tablas de Verdad",
		urlEjercicio:"/ejercicios/tablasDeVerdad"
	},
	cursoTres:{
		curso: "Conjuntos",
		urlEjercicio:"/ejercicios/conjuntos"
	},
	cursoCuatro:{
		curso: "Grafos",
		urlEjercicio:"/ejercicios/grafos"
	}
}

function todosLosEjercicios(request, response,next) {
	response.render('todosLosEjercicios',{"temas":temas})
}
function ejercicioConjuntos(request, response,next) {
	response.render('ejercicios/conjuntos')
}
function ejercicioGrafos(request, response,next) {
	response.render('ejercicios/grafos')
}
function ejercicioCalculoProposicional(request, response,next) {
	response.render('ejercicios/calculoProposicional')
}
function ejercicioTablasDeVerdad(request, response,next) {
	response.render('ejercicios/tablasDeVerdad')
}

router.get('',todosLosEjercicios)
router.get('/conjuntos',ejercicioConjuntos)
router.get('/grafos',ejercicioGrafos)
router.get('/calculoProposicional',ejercicioCalculoProposicional)
router.get('/tablasDeVerdad',ejercicioTablasDeVerdad)

module.exports = router
