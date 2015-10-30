//Definir un modulo de express
var express = require('express'),
//Definir el modulo http de nodeJS
http = require('http'),
//Definir Stylus
stylus = require('stylus'),
//Definir nib
nib = require('nib'),
//
bodyParser = require('body-parser'),
//Crear aplicacion express
app = express(),
//Crear un servidor http basado en la app de Express
server = http.createServer(app),
//File System
fs = require('fs')
//
var cursos = require('./cursos')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))



//definir carpeta para vistas
app.set('views', __dirname + '/vistas')

//no comprimir html con jade
app.locals.pretty = true;

//Definir motor de vistas
app.set('view engine', 'jade')

app.use('/cursos',cursos)
//funcion para compilar stylus
function compile(str, path) {
	return stylus(str)
	.set('filename', path)
	.use(nib())
}

//middleware para eliminar la barra invertida del final de una url
app.use(function(req, res, next) {
	if(req.url.substr(-1) == '/' && req.url.length > 1)
		res.redirect(301, req.url.slice(0, -1));
	else
		next();
})

//definir el middleware de stylus y sus parametros
app.use(stylus.middleware({
	src: __dirname + '/public/stylus',
	dest: __dirname + '/public/css'
	, compile: compile
}))

//ruta estaticos
app.use(express.static('public'))

var temas = {
	cursoUno:{
		curso:"Calculo Proposicional",
		urlCurso:"/cursos/calculoProposicional",
		urlEjercicio:"/ejercicios/calculoProposicional"
	},
	cursoDos:{
		curso: "Tablas de Verdad",
		urlCurso:"/cursos/tablasDeVerdad",
		urlEjercicio:"/ejercicios/tablasDeVerdad"
	},
	cursoTres:{
		curso: "Conjuntos",
		urlCurso:"/cursos/conjuntos",
		urlEjercicio:"/ejercicios/conjuntos"
	},
	cursoCuatro:{
		curso: "Grafos",
		urlCurso:"/cursos/grafos",
		urlEjercicio:"/ejercicios/grafos"
	}
}

var shortcuts = {
	ayuda:{
		tecla:"?",
		descripcion:"Desplegar Ayuda"
	},
	limpiar:{
		tecla:"¡",
		descripcion:"Desplegar Ayuda"
	}
}



//deinificon de vistas
function inicio(request, response,next) {
	response.render('index')
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
function ayuda(request, response,next) {
	response.render('ayuda',{"shortcuts":shortcuts})
}
function nosotros(request, response,next) {
	response.render('acercaDe')

}

function formu(req,res){
	console.log(req.body)

}
function guardarGrafo(req,res){


	var grafo = JSON.stringify(req.body, null, 4)

	fs.open('public/grafos/grafo.grf','wx',function(error, fd){
		console.log('heeeeee');
	})

	fs.writeFile('public/grafos/grafo.grf', grafo, function (err) {
		if (err) throw err;

		var estadoActual = {
			msg : "Guardado correctamente",
			clases : ["MSG" ,"MSGBien"],
			icono : "icon-correcto"

		}

		res.send(estadoActual);
	});
}

app.post("/enviar_mensaje",formu)
app.post("/guardarGrafo",guardarGrafo)

//Definicion de url
app.get('/',inicio)
app.get('/ayuda',ayuda)
app.get('/nosotros',nosotros)

app.get('/ejercicios',todosLosEjercicios)
app.get('/ejercicios/conjuntos',ejercicioConjuntos)
app.get('/ejercicios/grafos',ejercicioGrafos)
app.get('/ejercicios/calculoProposicional',ejercicioCalculoProposicional)
app.get('/ejercicios/tablasDeVerdad',ejercicioTablasDeVerdad)




/*error perzonalizado de archivo no encontrado*/
app.use(function(req, res) {
	res.status(404);
	/* respond with html page*/
	if (req.accepts('html')) {
		res.render('404', { inicio: req.hostname });
		return;
	}

	/* respond with json*/
	if (req.accepts('json')) {
		res.send({ error: 'Not found' });
		return;
	}

	/*default to plain-text. send()*/
	res.type('txt').send('Not found');
})

/*error perzonalizado del servidor*/
app.use(function(err, req, res, next){
	res.status(err.status || 500);
	res.render('500', { error: err });
})

//Configurra el puerto de escucha
//"process.env.PORT" es una variable que hace referencia al puerto a escuchar - Utilizada para heroku
server.listen(process.env.PORT || 8000)

