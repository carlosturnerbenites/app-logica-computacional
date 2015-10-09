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
nib = require('nib')

//definir carpeta para vistas
app.set('views', __dirname + '/vistas')

//Definir motor de vistas
app.set('view engine', 'jade')

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
		curso: "Grafos",
		urlCurso:"/cursos/grafos",
		urlEjercicio:"/ejercicios/grafos"
	},
	cursoCuatro:{
		curso: "Conjuntos",
		urlCurso:"/cursos/conjuntos",
		urlEjercicio:"/ejercicios/conjuntos"
	}
}


//deinificon de vistas
function inicio(request, response,next) {
	response.render('index')
}
function listadoCursos(request, response,next) {
	response.render('todosLosCursos',{"temas":temas})
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
function cursoConjuntos(request, response,next) {
	response.render('cursos/conjuntos')
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
function ayuda(request, response,next) {
	response.render('ayuda')
}
function nosotros(request, response,next) {
	response.render('acercaDe')
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

