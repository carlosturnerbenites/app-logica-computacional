function convertirHTMLCollectionEnArray(HTMLCollections){
	var nombreArray = [].slice.call(HTMLCollections);
	return nombreArray

}

function numeroAleatorio(max,min) {
	var aleatorio = Math.floor((Math.random() * max) + min)
	return aleatorio
}

function leerJSON(path, callback) {

	var httpRequest = new XMLHttpRequest();

	httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState === 4 && httpRequest.status === 200) {
			var data = JSON.parse(httpRequest.responseText);
			if (callback) callback(data);
		}
	};

	httpRequest.open('GET', path);
	httpRequest.send();
}
