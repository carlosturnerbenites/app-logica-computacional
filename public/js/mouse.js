var mouseCotrols = document.getElementById("mouseCotrols_js")

mouseCotrols.addEventListener("mouseover",showControl)
mouseCotrols.addEventListener("mouseout",hiddenControl)
mouseCotrols.addEventListener("contextmenu",contextmenuPD)

function contextmenuPD(evento){
	evento.preventDefault()
	console.log("tres");
	document.getElementById("MousebotonTres_js").classList.add("mouseActive")
	window.setTimeout(function(){
		document.getElementById("MousebotonTres_js").classList.remove("mouseActive")
},100)
}

function showControl(evento){
	this.addEventListener("click",clickctrl)
	this.addEventListener("dblclick",dblclickctrl)
}

function hiddenControl(evento){
	this.removeEventListener("click",clickctrl)
	this.removeEventListener("dblclick",dblclickctrl)
}

function clickctrl(evento) {
	console.log(evento.which)
	if (evento.which == 1) {
		document.getElementById("MousebotonUno_js").classList.add("mouseActive")
		window.setTimeout(function(){
			document.getElementById("MousebotonUno_js").classList.remove("mouseActive")

		},100)
	}else if(evento.which == 2){
		document.getElementById("MousebotonDos_js").classList.add("mouseActive")
		window.setTimeout(function(){
			document.getElementById("MousebotonDos_js").classList.remove("mouseActive")

		},100)
	}
}
function dblclickctrl(evento) {
	if (evento.which == 2) {
		document.getElementById("MousebotonDos_js").classList.add("mouseActive")
	}

}
