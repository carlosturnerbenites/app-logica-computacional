"""
import os
import json

litsDeArchivos = os.listdir("nombre carpeta")
#retorna un arreglo con los nombre

json.dumps(litsDeArchivos)
#convierte la lista en json
"""
import os
import json
listaNombreArchivos = []
litsDeArchivos = os.listdir("ejerciciosDisponibles")

#path of file
print os.path.realpath("ejercicios")


for x in range(0,len(litsDeArchivos)):
	nombreArchivo = litsDeArchivos[x]
	print litsDeArchivos[x]
	nombreArchivo = nombreArchivo.replace("_"," ").capitalize().strip(".html")

	listaNombreArchivos.append(nombreArchivo)


listaArchivoNombre = zip(litsDeArchivos,listaNombreArchivos)

listaArchivoNombreJSON = json.dumps(listaArchivoNombre)

archivoJSON = open('json/listaArchivoNombreJSON.json','w')
archivoJSON.write(listaArchivoNombreJSON)
archivoJSON.close()

