var express = require("express"),
router = express.Router()


function listadoCursos(request, response) {
	response.render('vistas/todosLosCursos',{"temas":temas})
	//response.send("funciono")
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
