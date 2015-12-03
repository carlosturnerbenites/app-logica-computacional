var express = require("express"),				//Definir un modulo de express
router = express.Router()						//Definir un modulo de router

var mongodb = require('mongodb'),
MongoClient = mongodb.MongoClient,
url = 'mongodb://localhost:27017/AppComLogica'

var temas = null

MongoClient.connect(url, function (err, db) {
	if (err) {
		console.log('No se puedo establecer conexion con MongoDB. Error:', err);
	} else {
		console.log('Conexion Establecida con MongoDB. url: '.green, url);

		var collection = db.collection('cursos');
		collection.find().toArray(function (err, result) {
			if (err) {
				console.log(err);
			} else if (result.length) {
				temas = result
			} else {
				console.log('No se encontraron Documentos'.red);
			}
			db.close();
		});
	}
});


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
