//Definir un modulo de express
var express = require('express'),
//Crear aplicacion express
app = express(),
//Definir el modulo http de nodeJS
http = require('http'),
//Crear un servidor http basado en la app de Express
server = http.createServer(app),
//Definir Stylus
stylus = require('stylus'),
//Definir nib
nib = require('nib'),
//No estoy seguro, pero creo que sirve para enviar parametos el renderizar un vista(Se utiliza aqui para poder manejar de forma simultanea handlebars y jade)
cons = require('consolidate')

//definir carpeta para vistas
app.set('views', __dirname + '/vistas')

//Deinir motor de vistas
app.set('view engine', 'hbs');
//app.set('view engine', 'jade')

//Registrar motor de plantilla
app.engine('hbs', cons.handlebars);


//funcion para compilar stylus
function compile(str, path) {
	return stylus(str)
	.set('filename', path)
	.use(nib())
}

//definir el middleware de stylus y sus parametros
app.use(stylus.middleware({
	src: __dirname + '/public/stylus',
	dest: __dirname + '/public/css'
	, compile: compile
}))

//ruta estaticos
app.use(express.static('public'))


//deinificon de vistas
function inicio(request, response,next) {
	response.render('index.jade',{title:"heeeeeeeee"})
}
function listadoCursos(request, response,next) {
	response.render('todosLosCursos.jade')
}
function todosLosEjercicios(request, response,next) {
	response.render('todosLosEjercicios.jade')
}
function ejercicioConjuntos(request, response,next) {
	response.render('ejercicios/conjuntos.jade')
}
function ejercicioGrafos(request, response,next) {
	response.render('ejercicios/grafos.jade')
}
function ejercicioCalculoProposicional(request, response,next) {
	response.render('ejercicios/calculoProposicional.jade')
}
function ejercicioTablasDeVerdad(request, response,next) {
	response.render('ejercicios/tablasDeVerdad.jade')
}
function cursoConjuntos(request, response,next) {
	response.render('cursos/conjuntos.jade')
}
function cursoGrafos(request, response,next) {
	response.render('cursos/grafos.jade')
}
function cursoCalculoProposicional(request, response,next) {
	response.render('cursos/calculoProposicional.jade')
}
function cursoTablasDeVerdad(request, response,next) {
	response.render('cursos/tablasDeVerdad.jade')
}
function ayuda(request, response,next) {
	response.render('ayuda.jade')
}
function nosotros(request, response,next) {
	response.render('acercaDe.jade')
}

//Definicion de url
app.get('/',inicio)
app.get('/ayuda',ayuda)
app.get('/nosotros',nosotros)

app.get('/cursos',listadoCursos)
app.get('/cursos/conjuntos',cursoConjuntos)
app.get('/cursos/grafos',cursoGrafos)
app.get('/cursos/calculoProposicional',cursoCalculoProposicional)
app.get('/cursos/tablasDeVerdad',cursoTablasDeVerdad)

app.get('/ejercicios',todosLosEjercicios)
app.get('/ejercicios/conjuntos',ejercicioConjuntos)
app.get('/ejercicios/grafos',ejercicioGrafos)
app.get('/ejercicios/calculoProposicional',ejercicioCalculoProposicional)
app.get('/ejercicios/tablasDeVerdad',ejercicioTablasDeVerdad)


//definir url no definidas
app.get('*', function(req, res,next){
	console.log("recurso no encontrado en la app")
	next()
})

//Configurra el puerto de escucha
//"process.env.PORT" es una variable que hace referencia al puerto a escuchar - Utilizada para heroku
server.listen(process.env.PORT || 8000)

