var express = require('express'),						//Definir un modulo de express
http = require('http'),									//Definir el modulo http de nodeJS
fs = require('fs'),										//Definir el modulo de Archivos del sistema de NodeJS
stylus = require('stylus'),								//Definir el modulo de Stylus
nib = require('nib'),									//Definir el modulo de nib
bodyParser = require('body-parser'),					//Definir el modulo parseador - usado en los request
app = express(),										//Crear aplicacion express
server = http.createServer(app)							//Crear un servidor http basado en la app de Express

var refCursos = require('./modulesApp/cursos')			//Definir el modulo(custom) con las configuraciones de los cursos
refEjercicios = require('./modulesApp/ejercicios'),		//Definir el modulo(custom) con las configuraciones de los ejercicios
refGeneral = require('./modulesApp/general'),			//Definir el modulo(custom) con las configuraciones generales

app.set('views', __dirname + '/views')					//Definir el directorio para las vistas

app.locals.pretty = true;								//Conf Jade - No comprimir html con jade
app.set('view engine', 'jade')							//Definir motor de vistas

app.use('/cursos',refCursos)							//Usar las configuraciones(custom) de los cursos
app.use('/ejercicios',refEjercicios)					//Usar las configuraciones(custom) de los ejercicios
app.use('',refGeneral)									//Usar las configuraciones(custom) generales

app.use(bodyParser.json())								//Usar el parseador de JSON

/*Definir el middleware de stylus y sus parametros*/
app.use(stylus.middleware({
	src: __dirname + '/public/stylus',
	dest: __dirname + '/public/css',
	compile: compile
}))

/*middleware para eliminar la barra invertida del final de una url*/
app.use(function(req, res, next) {
	if(req.url.substr(-1) == '/' && req.url.length > 1)
		res.redirect(301, req.url.slice(0, -1));
	else
		next();
})

app.use(express.static('public'))						//Definir ruta de archivos estaticos

app.post("/guardarGrafo",guardarGrafo)					//Direccion para funcionalidad de guardar grafos

/*Ruta para peticiones a archivos*/
app.get('/:file(*)', function(req, res, next){
	var file = req.params.file
	, path = __dirname + '/public/grafos/' + file;
	res.download(path);
});

/*Error perzonalizado 404*/
app.use(function(req, res) {
	res.status(404);
	if (req.accepts('html')) {
		res.render('404', { inicio: req.hostname });
		return;
	}
})

/*Error perzonalizado 500*/
app.use(function(err, req, res, next){
	res.status(err.status || 500);
	res.render('500', { error: err });
})

/*Callback de post para guardar grafos*/
function guardarGrafo(req,res){

	var nameFile = req.headers["name-file"]
	var extensionFile = '.grf'
	var nameFileEnd  = (nameFile.trim.length == 0) ? nameFile : "grafo"

	var pathFile = 'public/grafos/' + nameFileEnd + extensionFile

	fs.stat(pathFile, function(err, stat) {
		console.log(err)
		if(err == null) {
			res.send({mensaje : "El archivo ya existe",tipoMensaje :2});

		} else if(err.code == 'ENOENT') {

			var dataGrafo = JSON.stringify(req.body, null, 4)

			fs.open(pathFile,'wx',function(error, fd){})

			fs.writeFile(pathFile, dataGrafo, function (err) {
				if (err) throw err;})
			res.send({mensaje : "Guardado correctamente",tipoMensaje :0,pathFile:"/"+nameFileEnd + extensionFile})
		} else {
		}
	});
}

/*Funcion para compilar stylus*/
function compile(str, path) {
	return stylus(str)
	.set('compress' , true)
	.set('filename', path)
	.use(nib())
}

server.listen(process.env.PORT || 8000)					//Configurra el puerto. "process.env.PORT" es una variable que hace referencia al puerto a escuchar - Utilizada para heroku
