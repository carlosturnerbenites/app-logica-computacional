function lienzohabilitado(){return lienzo.hasAttribute("disabled")?(crearYMostrarMensaje(1,msgLienzoNoHabilitado),!1):!0}function lienzoPresionado(e){if(lienzohabilitado()&&1==e.which){var t=e.offsetX,i=e.offsetY,r=nombreVertices[posicionAux];dibujarCirculo(t,i,r)}}function dibujarCirculo(e,t,i){if(void 0!=e&&void 0!=t){accionCrear.classList.add("accionActiva");var r=document.createElementNS(namespaceURI,"circle"),a=document.createElementNS(namespaceURI,"text");r.addEventListener("mousedown",circuloPresionado,!0),r.addEventListener("touchstart",circuloPresionado,!0),r.addEventListener("dblclick",eliminarElemento,!0),r.addEventListener("mouseup",circuloDesprecionado,!0),r.addEventListener("touchend",circuloDesprecionado,!0),cxActuales=e,cyActuales=t,setAttributes(r,{cx:cxActuales,cy:cyActuales,r:radio,name:i}),setAttributes(a,{x:cxActuales,y:cyActuales}),a.classList.add("nombreCircle"),a.innerHTML=i,a.id=i,htmlSvgLienzoGrafoVertices.appendChild(r),htmlSvgLienzoGrafoNombres.appendChild(a),posicionAux+=1,setTimeout(function(){accionCrear.classList.remove("accionActiva")},500)}}function dibujarLinea(e,t,i,r,a,n,o){if(void 0!=e&&void 0!=t&&void 0!=i&&void 0!=r){if(e!=i&&t!=r){var s;continuar=!0;for(var c=htmlSvgLienzoGrafoAristas.childNodes,l=0;l<c.length;l++)s=c[l].getAttribute("name"),a==s&&(continuar=!1,crearYMostrarMensaje(1,msgElementoExistente))}else continuar=!1;if(continuar){var m=document.createElementNS(namespaceURI,"line");setAttributes(m,{x1:e,y1:t,x2:i,y2:r,name:a,origen:n,destino:o}),m.addEventListener("dblclick",eliminarElemento),htmlSvgLienzoGrafoAristas.appendChild(m)}}else crearYMostrarMensaje(1,msgErrorInterno)}function circuloPresionado(e){e.preventDefault();cxIniciales=this.getAttribute("cx"),cyIniciales=this.getAttribute("cy"),3==e.which||"touchstart"==e.type?(nombreVerticeInicial=this.getAttribute("name"),accionConectar.classList.add("accionActiva")):2==e.which&&(cxElementEnMovimiento=this.getAttribute("cx"),cyElementEnMovimiento=this.getAttribute("cy"),posicionCirculo=cxElementEnMovimiento+","+cyElementEnMovimiento,this.addEventListener("mousemove",drag),this.addEventListener("mouseup",terminarDrag))}function circuloDesprecionado(e){if(e.preventDefault(),nombreVerticeFinal=this.getAttribute("name"),3==e.which||"touchend"==e.type){cxFinales=this.getAttribute("cx"),cyFinales=this.getAttribute("cy");var t=nombreVerticeInicial+conectorDireccionalDeVertices+nombreVerticeFinal,i=nombreVerticeInicial,r=nombreVerticeFinal;dibujarLinea(cxIniciales,cyIniciales,cxFinales,cyFinales,t,i,r),accionConectar.classList.remove("accionActiva")}}function eliminarElemento(e){if(2==e.which){if(accionBorrar.classList.add("accionActiva"),confirm(mensajeDeConfirmacionDeBorradoDeElemento_s))if("circle"==this.tagName){var t=convertirHTMLCollectionEnArray(htmlSvgLienzoGrafoAristas.childNodes);htmlSvgLienzoGrafoVertices.removeChild(this),htmlSvgLienzoGrafoNombres.removeChild(document.getElementById(this.getAttribute("name")));for(var i=0;i<=t.length;i++)void 0!=t[i]&&(nombreLinea=t[i].getAttribute("name"),nombreCirculo=this.getAttribute("name"),-1!=nombreLinea.indexOf(nombreCirculo)&&htmlSvgLienzoGrafoAristas.removeChild(t[i]))}else htmlSvgLienzoGrafoAristas.removeChild(this);accionBorrar.classList.remove("accionActiva")}}function limpiarLienzo(){if(lienzohabilitado()){if(confirm(mensajeDeConfirmacionDeBorradoDeLienzo)){for(;htmlSvgLienzoGrafoVertices.firstChild;)htmlSvgLienzoGrafoVertices.removeChild(htmlSvgLienzoGrafoVertices.firstChild);for(;htmlSvgLienzoGrafoAristas.firstChild;)htmlSvgLienzoGrafoAristas.removeChild(htmlSvgLienzoGrafoAristas.firstChild);for(;htmlSvgLienzoGrafoNombres.firstChild;)htmlSvgLienzoGrafoNombres.removeChild(htmlSvgLienzoGrafoNombres.firstChild);return!0}return!1}}function dibujarGrilla(){for(var e=lienzo.clientHeight,t=lienzo.clientWidth,i=0;e>=i;i+=20)dibujarLineaGrilla(0,i,t,i,htmlSvgLienzoGrilla,"lineGilla");for(var r=0;t>=r;r+=20)dibujarLineaGrilla(r,0,r,e,htmlSvgLienzoGrilla,"lineGilla")}function dibujarLineaGrilla(e,t,i,r,a,n){var o=document.createElementNS(namespaceURI,"line");setAttributes(o,{x1:e,y1:t,x2:i,y2:r}),o.classList.add(n),a.appendChild(o)}function guardarGrafo(e){e.preventDefault();var t=capturarGrafo();if("undefined"!=typeof t){var i=new XMLHttpRequest;i.onreadystatechange=function(){if(4==i.readyState){var e=JSON.parse(i.responseText);crearYMostrarMensaje(e.tipoMensaje,e.mensaje)}},i.open("POST","/guardarGrafo"),i.setRequestHeader("name-File",nameFileGraph.value),i.setRequestHeader("Content-Type","application/json"),i.send(JSON.stringify(t))}}function cargarGrafo(e){if(lienzohabilitado())if(limpiarLienzo()){var t=e.target.files[0],i=new FileReader;i.onload=function(){var e=JSON.parse(this.result);crearGrafo(e),crearYMostrarMensaje(0,msgCargaCompleta),html_inputCargarGrafo.value=""},i.onerror=function(e){},i.readAsText(t)}else html_inputCargarGrafo.value="";else html_inputCargarGrafo.value=""}function crearGrafo(e){for(var t,i=0;t=e[i];i++){var r=t.data;"line"==t.type?dibujarLinea(r.x1,r.y1,r.x2,r.y2,r.name,r.origen,r.destino):dibujarCirculo(r.cx,r.cy,r.name)}}function capturarGrafo(){if(lienzohabilitado()){var e=htmlSvgLienzoGrafoVertices.children,t=htmlSvgLienzoGrafoAristas.children,i=new Array;if(0!=e.length||0!=t.length){for(var r,a=0;r=e[a];a++){var n={type:"circle",data:{cx:r.getAttribute("cx"),cy:r.getAttribute("cy"),r:r.getAttribute("r"),name:r.getAttribute("name")}};i.push(n)}for(var o,a=0;o=t[a];a++){var n={type:"line",data:{x1:o.getAttribute("x1"),y1:o.getAttribute("y1"),x2:o.getAttribute("x2"),y2:o.getAttribute("y2"),name:o.getAttribute("name"),origen:o.getAttribute("origen"),destino:o.getAttribute("destino")}};i.push(n)}return i}return void crearYMostrarMensaje(1,msgGrafoVacio)}}function drag(e){accionMover.classList.add("accionActiva");var t=new Array,i=htmlSvgLienzoGrafoAristas.childNodes;nuevaPosicionX=e.offsetX,nuevaPosicionY=e.offsetY;for(var r=this.getAttribute("name"),a=document.getElementById(r),n=0;n<i.length;n++)(r==i[n].getAttribute("origen")||r==i[n].getAttribute("destino"))&&t.push(i[n]);for(var o=0;o<=t.length;o++)void 0!=t[o]&&(r==t[o].getAttribute("origen")?setAttributes(t[o],{x1:nuevaPosicionX,y1:nuevaPosicionY}):setAttributes(t[o],{x2:nuevaPosicionX,y2:nuevaPosicionY}));setAttributes(a,{x:nuevaPosicionX,y:nuevaPosicionY}),setAttributes(this,{cx:nuevaPosicionX,cy:nuevaPosicionY})}function terminarDrag(e){accionMover.classList.remove("accionActiva"),this.removeEventListener("mousemove",drag)}function VerificarFormYHabilitarLienzo(e){ejecicioEnEjecucion=!0,e.preventDefault(),validarAristasYGrados(),lienzo.removeAttribute("disabled"),htmlInputgrafoCompleto.checked&&habilitarInhabilitarInput(htmlInputCantidadAristas),habilitarInhabilitarFormulario(this),htmlFormGrafos.removeEventListener("submit",VerificarFormYHabilitarLienzo),htmlFormVerificarDatosGrafo.appendChild(btnValidar),htmlFormVerificarDatosGrafo.addEventListener("submit",validarGrafo)}function validarAristasYGrados(e){numeroDeVertices=htmlInputCantidadVertices.value;var t=numeroDeVertices*(numeroDeVertices-1)/2;htmlInputgrafoCompleto.checked?numeroDeAristas=t:numeroDeAristas=htmlInputCantidadAristas.value,htmlInputCantidadAristas.setAttribute("max",t)}function validarGrafo(e){e.preventDefault();var t=htmlSvgLienzoGrafoVertices.childElementCount,i=htmlSvgLienzoGrafoAristas.childElementCount;if(parseInt(numeroDeVertices)==t)if(parseInt(numeroDeAristas)==i){htmlFormVerificarDatosGrafo.addEventListener("submit",validarGrados),crearCamposParaGradoDeVertice(),htmlFormVerificarDatosGrafo.removeEventListener("submit",validarGrafo);var r={tipoMensaje:0,mensaje:msgEjercicioCompletado}}else var r={tipoMensaje:1,mensaje:msgProblemaConAristas};else var r={tipoMensaje:1,mensaje:msgProblmeaConVertices};crearYMostrarMensaje(r.tipoMensaje,r.mensaje)}function validarGrados(e){e.preventDefault();for(var t,i=!0,r=verificarGradosDeVertices(),a=htmlFormVerificarDatosGrafo.elements,n=0;t=a[n];n++)"submit"!=t.type.toLowerCase()&&r[n].grado!=t.value&&(i=!1);if(i){var o={tipoMensaje:0,mensaje:msgEjercicioCompletado};habilitarInhabilitarFormulario(htmlFormVerificarDatosGrafo),htmlFormVerificarDatosGrafo.replaceChild(btnVolver,btnValidar),htmlFormVerificarDatosGrafo.removeEventListener("submit",validarGrados),htmlFormVerificarDatosGrafo.addEventListener("submit",reiniciarEjercicio)}else var o={tipoMensaje:1,mensaje:msgErrorEnEjercicio};crearYMostrarMensaje(o.tipoMensaje,o.mensaje)}function HabilitarGrafocompleto(){habilitarInhabilitarInput(htmlInputCantidadAristas)}function crearCamposParaGradoDeVertice(){var e=document.createElement("p");e.innerHTML="Grado de los Vertices";var t=document.createElement("ul");t.classList.add("listadoGradoVertices");var i=htmlSvgLienzoGrafoNombres.children;t.appendChild(e);for(var r=0;r<numeroDeVertices;r++){var a=document.createElement("li"),n=document.createElement("span");n.classList.add("nombreVertice");var o=document.createElement("span");o.innerHTML=i[r].id,n.appendChild(o);var s=document.createElement("input");setAttributes(s,{required:!0,type:"number",id:"gradoVertice_js"}),s.classList.add("inputBorderBottomFocus","inputCorto"),a.appendChild(n),a.appendChild(s),t.appendChild(a),htmlFormVerificarDatosGrafo.insertBefore(t,htmlFormVerificarDatosGrafo.firstChild)}}function verificarGradosDeVertices(){for(var e,t=new Array,i=htmlSvgLienzoGrafoVertices.children,r=htmlSvgLienzoGrafoAristas.children,a=0;e=i[a];a++){for(var n,o=0,s=e.getAttribute("name"),c=0;n=r[c];c++){var l=n.getAttribute("name");-1!=l.indexOf(s)&&(o+=1)}t.push({vertice:s,grado:o})}return t}function DownloadGhrapAsPNG(){if(lienzohabilitado()){var e=0==nameFileGraph.value.trim().length?"grafo":nameFileGraph.value;saveSvgAsPng(lienzo,e+".png")}}function reiniciarEjercicio(e){ejecicioEnEjecucion=!1,e.preventDefault(),limpiarLienzo()&&(htmlFormVerificarDatosGrafo.removeChild(btnVolver),limpiarContenedorHTML(htmlFormVerificarDatosGrafo),habilitarInhabilitarFormulario(htmlFormGrafos),habilitarInhabilitarInput(btnValidar),htmlFormGrafos.reset(),lienzo.setAttribute("disabled","true"),htmlFormVerificarDatosGrafo.removeEventListener("submit",reiniciarEjercicio),htmlFormGrafos.addEventListener("submit",VerificarFormYHabilitarLienzo))}var htmlInputgrafoCompleto=document.getElementById("htmlInputgrafoCompleto_js"),htmlFormVerificarDatosGrafo=document.getElementById("htmlFormVerificarDatosGrafo_js"),htmlFormGrafos=document.getElementById("htmlFormGrafos_js"),htmlInputCantidadVertices=document.getElementById("htmlInputCantidadVertices_js"),htmlInputCantidadAristas=document.getElementById("htmlInputCantidadAristas_js"),DLGrapAsFile=document.getElementById("DLGrapAsFile_js"),DLGrapAsPNG=document.getElementById("DLGrapAsPNG_js"),nameFileGraph=document.getElementById("nameFileGraph_js"),lienzo=document.getElementById("htmlSvgLienzo_js"),htmlSvgLienzoGrafo=document.getElementById("htmlSvgLienzoGrafo_js"),htmlSvgLienzoGrilla=document.getElementById("htmlSvgLienzoGrilla_js"),htmlSvgLienzoGrafoVertices=document.getElementById("htmlSvgLienzoGrafoVertices_js"),htmlSvgLienzoGrafoNombres=document.getElementById("htmlSvgLienzoGrafoNombres_js"),htmlSvgLienzoGrafoAristas=document.getElementById("htmlSvgLienzoGrafoAristas_js"),btnLimpiarLienzo=document.getElementById("btnLimpiarLienzo_js"),seccionAccionesPlusGrafos=document.getElementById("seccionAccionesPlusGrafos_js"),html_inputCargarGrafo=document.getElementById("cargarGrafo_js"),mensajeDeConfirmacionDeBorradoDeLienzo="¿Desea Borrar Todos los Elementos?",mensajeDeConfirmacionDeBorradoDeElemento_s="¿Desea Borrar el(los) elemento(s)?",nombreVertices=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],conectorDireccionalDeVertices=" → ",namespaceURI="http://www.w3.org/2000/svg",grafo=new Array,radio=20,cxIniciales,cyIniciales,cxFinales,cyFinales,nombreVerticeInicial,nombreVerticeFinal,cxElementEnMovimiento,cyElementEnMovimiento,posicionCirculo,posicionAux=0,continuarAux=new Boolean,lineasDelVertice=new Array,accionConectar=document.getElementById("accionConectar_js"),accionCrear=document.getElementById("accionCrear_js"),accionBorrar=document.getElementById("accionBorrar_js"),accionMover=document.getElementById("accionMover_js");htmlInputCantidadVertices.setAttribute("max",nombreVertices.length),htmlInputCantidadVertices.addEventListener("change",validarAristasYGrados),htmlFormGrafos.addEventListener("submit",VerificarFormYHabilitarLienzo),htmlInputgrafoCompleto.addEventListener("change",HabilitarGrafocompleto),lienzo.addEventListener("click",lienzoPresionado),btnLimpiarLienzo.addEventListener("click",limpiarLienzo),DLGrapAsPNG.addEventListener("click",DownloadGhrapAsPNG),html_inputCargarGrafo.addEventListener("change",cargarGrafo),DLGrapAsFile.addEventListener("click",guardarGrafo),lienzo.addEventListener("contextmenu",function(e){e.preventDefault()}),dibujarGrilla();