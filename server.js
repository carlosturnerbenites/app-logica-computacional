var express = require('express'),						//Definir un modulo de express
http = require('http'),									//Definir el modulo http de nodeJS
fs = require('fs'),										//Definir el modulo de Archivos del sistema de NodeJS
stylus = require('stylus'),								//Definir el modulo de Stylus
nib = require('nib'),									//Definir el modulo de nib
colors = require("colors"),								//modulo para pintar colores en terminal
bodyParser = require('body-parser'),					//Definir el modulo parseador - usado en los request
app = express(),										//Crear aplicacion express
server = http.createServer(app)							//Crear un servidor http basado en la app de Express

if (process.env.NODE_ENV == 'dev' || process.env.NODE_ENV == undefined){
	var config = require("./config/configDev.json")
}else if(process.env.NODE_ENV == 'prod'){
	var config = require("./config/configProd.json")
}else{
	console.log(colors.red("Enviroment undefined.") + " Enviroment valid: " + colors.black.bgWhite("dev") + " or " + colors.black.bgWhite("prod"))
	process.exit()
}

var refCursos = require('./modulesApp/cursos')			//Definir el modulo(custom) con las configuraciones de los cursos
refEjercicios = require('./modulesApp/ejercicios'),		//Definir el modulo(custom) con las configuraciones de los ejercicios
refGeneral = require('./modulesApp/general'),			//Definir el modulo(custom) con las configuraciones generales

app.set('views', __dirname + '/views')					//Definir el directorio para las vistas

app.locals.pretty = false;								//Conf Jade - No comprimir html con jade
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









/*

//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodserver.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/prueba';

MongoClient.connect(url, function (err, db) {
	if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	} else {
		//HURRAY!! We are connected. :)
console.log('Connection established to', url);

// Get the documents collection
var collection = db.collection('users');

//Create some users
var user1 = {name: 'modulus admin', age: 42, roles: ['admin', 'moderator', 'user']};
var user2 = {name: 'modulus user', age: 22, roles: ['user']};
var user3 = {name: 'modulus super admin', age: 92, roles: ['super-admin', 'admin', 'moderator', 'user']};

// Insert some users
collection.insert([user1, user2, user3], function (err, result) {
	if (err) {
		console.log(err);
	} else {
		console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
	}
	//Close connection
	collection.find({name: 'modulus user'}).toArray(function (err, result) {
		if (err) {
			console.log(err);
		} else if (result.length) {
			console.log('Found:', colors.green(result));
			for (var i = 0; i < result.length; i++) {
				console.log(colors.bgWhite(result[i].age))
			};
		} else {
			console.log('No document(s) found with defined "find" criteria!'.white);
		}
		//Close connection
		db.close();
	});
});
}
});



*/










app.use(express.static(config.directoryStaticFiles))						//Definir ruta de archivos estaticos

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
			res.send({mensaje : "Guardado correctamente",tipoMensaje :0})
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
server.listen(process.env.PORT || 8000,function (){
	console.log("Run server".black.bold.bgWhite)
	console.log("Enviorment: ".green.bold + colors.black.bgWhite(config.env))
})					//Configurra el puerto. "process.env.PORT" es una variable que hace referencia al puerto a escuchar - Utilizada para heroku

module.exports = config
