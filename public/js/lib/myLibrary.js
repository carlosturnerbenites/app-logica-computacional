
function compareArrays(arrayOne,arrayTwo){
	if(String(arrayOne) == String(arrayTwo)){
		return true
	}else{
		return false
	}
}
function getElemtDOM(selector){
	element = document.querySelector(selectortraducir
		)
	return element
}

function createElementDOM(element){
	var element = document.createElement(element)
	return element
}

function setAttrs(element,attributes){
	for (var attribute in attributes){
		element.setAttribute(attribute,attributes[attribute])
	}
}



function ramdonInt(max,min) {
	var aleatorio = Math.floor((Math.random() * max) + min)
	return aleatorio
}

Array.prototype.findElement = function(searchedItem) {
	console.log("buscando :" + searchedItem);
}


Array.prototype.getElementRandom = function(){
	var elementRandom = this[ramdonInt(this.length,0)]
	return elementRandom
}


String.prototype.toArray = function() {
	return this.split('');
}


HTMLFormElement.prototype.enableDisabled = function(){

	var elements = this.elements

	for (var i = 0,element; element = elements[i]; i++) {
		this.enableDisabled()
	}
}

HTMLInputElement.prototype.enableDisabled = function(){
	if(this.disabled){
		this.removeAttribute("disabled")
	}else{
		this.setAttribute("disabled","disabled")
	}
}

Node.prototype.addClass = function(){
	for(clase in arguments){
		this.classList.add(arguments[clase])
	}
	return this
}
Node.prototype.removeClass = function(){
	for(clase in arguments){
		this.classList.remove(arguments[clase])
	}
	return this
}
Node.prototype.toggleClass = function(CSSClass,condition){
	condition = typeof condition !== 'undefined' ? condition : true
	this.classList.toggle(CSSClass,condition)
	return this
}
Node.prototype.containClass = function(CSSClass){
	var valueBoolean = this.classList.contains(CSSClass)
	return valueBoolean
}

Node.prototype.setAttr = function(nameAttribute,valueAttribute){
	this.setAttribute(nameAttribute,valueAttribute)
	return this
}

Node.prototype.setAttrs = function(attributes){
	for (var attribute in attributes){
		this.setAttribute(attribute,attributes[attribute])
	}
	return this
}

Node.prototype.getAttr = function(nameAttribute){
	var attribute = this.getAttribute(nameAttribute)
	return attribute
}

Node.prototype.text = function(string){
	this.innerText = string
	return this
}
Node.prototype.append = function(){
	for(element in arguments){
		this.appendChild(arguments[element])
	}
	return this
}

Node.prototype.on = function(nameEvent,callback,useCapture){
	this.addEventListener(nameEvent,callback,useCapture)
	return this
}

Node.prototype.childrenOn = function(nameEvent,callback,useCapture){
	var childrens = this.children
	for (var i = 0 , children; children = childrens[i]; i++) {
		children.addEventListener(nameEvent,eval(callback),useCapture)	}
		return this
	}
