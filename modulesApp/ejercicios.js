var express = require("express"), 						//Definir un modulo de express
router = express.Router() 								//Definir un modulo de router

var mongodb = require('mongodb'),
MongoClient = mongodb.MongoClient,
url = 'mongodb://localhost:27017/AppComLogica'

var temas = null

MongoClient.connect(url, function (err, db) {
	if (err) {
		console.log('No se puedo establecer conexion con MongoDB. Error:', err);
	} else {
		console.log('Conexion Establecida con MongoDB. url: '.green, url);

		var collection = db.collection('ejercicios');
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

/*Definicion de rutas*/
router.get('',todosLosEjercicios)
router.get('/conjuntos',ejercicioConjuntos)
router.get('/grafos',ejercicioGrafos)
router.get('/calculoProposicional',ejercicioCalculoProposicional)
router.get('/tablasDeVerdad',ejercicioTablasDeVerdad)

module.exports = router 							//Exportar router
