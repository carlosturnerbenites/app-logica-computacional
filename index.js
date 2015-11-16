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
var refCursos = require('./modulesApp/cursos')
var refEjercicios = require('./modulesApp/ejercicios')

app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: false }))

//definir carpeta para vistas
app.set('views', __dirname + '/views')

//no comprimir html con jade
app.locals.pretty = true;

//Definir motor de vistas
app.set('view engine', 'jade')

app.use('/cursos',refCursos)
app.use('/ejercicios',refEjercicios)

//definir el middleware de stylus y sus parametros
app.use(stylus.middleware({
	src: __dirname + '/public/stylus',
	dest: __dirname + '/public/css'
	, compile: compile
}))

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

//ruta estaticos
app.use(express.static('public'))


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

//deinificon de vistas
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

function guardarGrafo(req,res){
	console.log(req.headers);
	console.log( req.headers["name-file"]);
	var name = req.headers["name-file"]
	var file = 'public/grafos/' + name + '.grf'
	console.log(file)
	var grafo = JSON.stringify(req.body, null, 4)

	fs.open(file,'wx',function(error, fd){
		console.log('heeeeee');
	})

	fs.writeFile(file, grafo, function (err) {
		if (err) throw err;


		res.send({mensaje : "Guardado correctamente",tipoMensaje :0});
	});
}

app.post("/guardarGrafo",guardarGrafo)

app.get('/',inicio)
app.get('/ayuda',ayuda)
app.get('/nosotros',nosotros)
app.get('/referencias',referencia)

/*error perzonalizado de archivo no encontrado*/
app.use(function(req, res) {
	res.status(404);
	if (req.accepts('html')) {
		res.render('404', { inicio: req.hostname });
		return;
	}
})

/*error perzonalizado del servidor*/
app.use(function(err, req, res, next){
	res.status(err.status || 500);
	res.render('500', { error: err });
})

//Configurra el puerto de escucha
//"process.env.PORT" es una variable que hace referencia al puerto a escuchar - Utilizada para heroku
server.listen(process.env.PORT || 8000)
