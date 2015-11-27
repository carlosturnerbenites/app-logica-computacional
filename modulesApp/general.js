var express = require("express"), 					//Definir un modulo de express
router = express.Router() 							//Definir un modulo de router

var shortcuts = {
	ayuda:{
		tecla:"?",
		descripcion:"Desplegar Ayuda"
	},
	limpiar:{
		tecla:"¡",
		descripcion:"Borrar Lienzo"
	}
}

/*Callbacks para rutas*/
function inicio(request, response,next) {
	response.render('index')
}

function ayuda(request, response,next) {
	response.render('ayuda',{"shortcuts":shortcuts})
}

function nosotros(request, response,next) {
	response.render('acercaDe')
}

function referencia(request, response,next) {
	response.render('referencias')
}

/*Definicion de rutas*/
router.get('',inicio)
router.get('/ayuda',ayuda)
router.get('/nosotros',nosotros)
router.get('/referencias',referencia)

module.exports = router 						//Exportar router
