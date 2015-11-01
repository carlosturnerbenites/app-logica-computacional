var express = require("express"),
router = express.Router()

var temas = {
	cursoUno:{
		curso:"Calculo Proposicional",
		urlCurso:"/cursos/calculoProposicional"
	},
	cursoDos:{
		curso: "Tablas de Verdad",
		urlCurso:"/cursos/tablasDeVerdad"
	},
	cursoTres:{
		curso: "Conjuntos",
		urlCurso:"/cursos/conjuntos"
	},
	cursoCuatro:{
		curso: "Grafos",
		urlCurso:"/cursos/grafos"
	}
}

function listadoCursos(request, response) {
	response.render('todosLosCursos',{"temas":temas})
}
function cursoConjuntos(request, response) {
	response.render('cursos/conjuntos')
	console.log('dddd');
}
function cursoGrafos(request, response) {
	response.render('cursos/grafos')
}
function cursoCalculoProposicional(request, response) {
	response.render('cursos/calculoProposicional')
}
function cursoTablasDeVerdad(request, response) {
	response.render('cursos/tablasDeVerdad')
}

router.get('',listadoCursos)
router.get('/conjuntos',cursoConjuntos)
router.get('/grafos',cursoGrafos)
router.get('/calculoProposicional',cursoCalculoProposicional)
router.get('/tablasDeVerdad',cursoTablasDeVerdad)

module.exports = router
