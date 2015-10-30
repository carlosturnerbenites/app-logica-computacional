var express = require("express"),
router = express.Router()


function listadoCursos(request, response,next) {
	response.render('vistas/todosLosCursos',{"temas":temas})
	//response.send("funciono")
}
function cursoConjuntos(request, response,next) {
	response.render('cursos/conjuntos')
	console.log('dddd');
}
function cursoGrafos(request, response,next) {
	response.render('cursos/grafos')
}
function cursoCalculoProposicional(request, response,next) {
	response.render('cursos/calculoProposicional')
}
function cursoTablasDeVerdad(request, response,next) {
	response.render('cursos/tablasDeVerdad')
}

router.get('',listadoCursos)
router.get('/conjuntos',cursoConjuntos)
router.get('/grafos',cursoGrafos)
router.get('/calculoProposicional',cursoCalculoProposicional)
router.get('/tablasDeVerdad',cursoTablasDeVerdad)


module.exports = router
