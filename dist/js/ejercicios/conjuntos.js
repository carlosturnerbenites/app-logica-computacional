function captureSetSelected(e){e.preventDefault(),ejecicioEnEjecucion=!0,formConjuntos.removeEventListener("submit",captureSetSelected);var t=inputNameSet.value,s=createElementDOM("span").text(t.toUpperCase());elementsSet=document.getElementById("elementosCojuntos_js").value;var n=validateSet(elementsSet);if(n)if(this.enableDisabled(),ValidarCampoVacio(elementsSet)&&ValidarCampoVacio(t)){elementsSet=elementsSet.split(",");var o=createElementDOM("span").addClass("corchetesConjuntos").text(elementsSet),a=createElementDOM("section").addClass("textoCentrado","textoEspecial").append(s,o),r=createElementDOM("textarea").addClass("respuesta").setAttrs({required:"required",spellcheck:"false",placeholder:"Escriba en este cuadro su respuesta.",id:"respuesta"}).on("keypress",disabledKeys);seccionRespuesta.append(htmlHrSeparadorContenido,a,r,btnValidar).on("submit",validateResponse)}else vaciarCampo(t);else formConjuntos.addEventListener("submit",captureSetSelected)}function validateResponse(e){e.preventDefault();var t,s=getElemtDOM("#respuesta"),n=[];if(numberPossibleCombinations=htmlRadioConjuntosImpropio.checked?Math.pow(2,elementsSet.length)-1:Math.pow(2,elementsSet.length),elementsSetUserResponse=s.value.split(","),elementsSetUserResponse.length==numberPossibleCombinations){for(var o=0;o<numberPossibleCombinations;o++)n.push(decimalToBinary(o));completarBinarios(n,elementsSet.length),t=createRealResponse(elementsSet,n);var a=elementsSetUserResponse.sort();if(t.sort(),a.sort(),compareArrays(t,a)){s.enableDisabled();var r={tipoMensaje:0,mensaje:msgEjercicioCompletado};seccionRespuesta.removeEventListener("submit",validateResponse),seccionRespuesta.addEventListener("submit",restareExercise),seccionRespuesta.replaceChild(btnVolver,btnValidar)}else var r={tipoMensaje:1,mensaje:msgErrorEnEjercicio}}else var r={tipoMensaje:1,mensaje:msgErrorEnEjercicio};crearYMostrarMensaje(r.tipoMensaje,r.mensaje)}function validateSet(e){var t=!1,s=/(^([\w|\d])\b)+(([(,)+(\w|\d)+(,)])\b)+(([\w|\d])\b)$/g;return e=e.split(","),s.test(e)&&(e.FindElementsEquals()||(t=!0)),t||crearYMostrarMensaje(1,msgErrorSintaxis),t}function restareExercise(e){e.preventDefault(),ejecicioEnEjecucion=!1,formConjuntos.addEventListener("submit",captureSetSelected),formConjuntos.enableDisabled(),seccionRespuesta.removeAllChildrens(),seccionRespuesta.removeEventListener("submit",restareExercise),formConjuntos.reset()}function createRealResponse(e,t){for(var s=[],n=0;n<t.length;n++){for(var o=0;o<t[n].length;o++)"1"==t[n][o]&&(t[n][o]=e[o]);s.push(t[n])}var a=SeparaCerosDeValoresUtiles(s);return a.sort(),a}function SeparaCerosDeValoresUtiles(e){for(var t=[],s=0;s<e.length;s++){for(var n=[],o=0;o<e[s].length;o++)"0"!=e[s][o]&&n.push(e[s][o]);0==n.length&&n.push(simboloConjuntoVacio),t.push(n.join(""))}return t}function disabledKeys(e){13==e.keyCode&&e.preventDefault(),48==e.keyCode&&(e.preventDefault(),respuesta.value+=simboloConjuntoVacio)}var simboloConjuntoVacio="Ø",formConjuntos=document.getElementById("formConjuntos_js"),conjuntoIngresado=document.getElementById("conjuntoIngresado_js"),seccionRespuesta=document.getElementById("seccionRespuesta_js"),inputNameSet=document.getElementById("nombreConjunto_js"),htmlRadioConjuntosPropio=document.getElementById("htmlRadioConjuntosPropio_js"),htmlRadioConjuntosImpropio=document.getElementById("htmlRadioConjuntosImpropio_js"),elementsSet=null;formConjuntos.addEventListener("submit",captureSetSelected),inputNameSet.addEventListener("change",limpiarCampo);