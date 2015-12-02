var express = require("express"),				//Definir un modulo de express
router = express.Router()						//Definir un modulo de router

var temas = {
	cursoUno:{
		curso:"Calculo Proposicional",
		urlCurso:"/cursos/calculoProposicional",
		descripcion:"Conceptos fundamentales de Calculo Proposicional, que serviran de pivot para la resolucion de los ejercicios planteados en AppComLogica."
	},
	cursoDos:{
		curso: "Tablas de Verdad",
		urlCurso:"/cursos/tablasDeVerdad",
		descripcion:"Conceptos fundamentales de Tablas de Verdad, que serviran de pivot para la resolucion de los ejercicios planteados en AppComLogica."
	},
	cursoTres:{
		curso: "Conjuntos",
		urlCurso:"/cursos/conjuntos",
		descripcion:"Conceptos fundamentales de Conjuntos, que serviran de pivot para la resolucion de los ejercicios planteados en AppComLogica."
	},
	cursoCuatro:{
		curso: "Grafos",
		urlCurso:"/cursos/grafos",
		descripcion:"Conceptos fundamentales de Grafos, que serviran de pivot para la resolucion de los ejercicios planteados en AppComLogica."
	}
}

/*Callbacks para rutas*/
function listadoCursos(request, response) {
	response.render('todosLosCursos',{"temas":temas})
}

function cursoConjuntos(request, response) {
	response.render('cursos/conjuntos')
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

/*Definicion de rutas*/
router.get('',listadoCursos)
router.get('/conjuntos',cursoConjuntos)
router.get('/grafos',cursoGrafos)
router.get('/calculoProposicional',cursoCalculoProposicional)
router.get('/tablasDeVerdad',cursoTablasDeVerdad)

module.exports = router							//Exportar router
