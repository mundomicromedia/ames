//var url_server = "http://localhost/ames_app_admin";
var url_server = "http://desarrollo.micromedia.es/ames_app_admin";
var url_servicios = url_server+"/servicios.php";
var url_register_android = url_server+"/register.php";
var url_register_ios = url_server+"/registerIOS.php";

var url_imagen_alcalde = url_server+"/img_alcalde/";
var url_img_concejal = url_server+"/img_concejal/";
var url_imagen_contactos = url_server+"/img_contactos_interes/";
var url_imagen_visitar = url_server+"/img_lugares/";
var url_imagen_actividades = url_server+"/img_actividades/";
var url_imagen_concelleros = url_server+"/img_concelleros/";
var url_imagen_top = url_server+"/img_top/";
var url_img_temp = url_server+"/img_temp/";


var array_traducciones = [];

var pictureSource;   
var destinationType; 

var es_push=0;

var app = {
    
    initialize: function() {
        var self = this;
        this.registerEvents();
        self.route();
    },
    
    showAlert: function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    },

    registerEvents: function() {
        $(window).on('hashchange', $.proxy(this.route, this));
        this.bindEvents();
    },
    
    cargarTraducciones: function(idioma) {
    	var datos = Array();
    	
    	$.ajax({
            async:false,   
            type: 'POST',  
            url: url_servicios,
            data: "id_servicio=15&idioma="+idioma,
            success:  function(respuesta){ 
            	datos = $.parseJSON(respuesta);
            }
        });
    	
    	
    	var traducciones = datos['traducciones'];
    	
    	$.each(traducciones, function( index, value ) {
    		var este_id_traduccion = traducciones[index]['id_traduccion'];
    		var este_texto_traduccion = traducciones[index]['texto'];
    		array_traducciones[este_id_traduccion] = este_texto_traduccion;
		});
		
    	
    },
    
    route: function() {
    	
		var self = this;
        var hash = window.location.hash;
        
        var arr = hash.split('/');
        
        var vista = arr[0];

        var idioma_seleccionado = $("#idioma_seleccionado").val();
        
        $( "#imagen_presentacion" ).remove();
        
        if(es_push==1){
        	this.notificacionPage = new NotificacionView(-1).render();
            this.slidePage(this.notificacionPage);
            vista = "hhh";
            es_push = 0;
        }
        
        if (!vista || vista=='#' || vista=='#home') {
        	
        	if(idioma_seleccionado==''){
        		this.cargarTraducciones("gal");
            	$("#idioma_seleccionado").val("gal");
        	}
        	
        	if(arr[1]=='gal'){
        		this.cargarTraducciones("gal");
            	$("#idioma_seleccionado").val("gal");
        	}
        	if(arr[1]=='esp'){
        		this.cargarTraducciones("esp");
            	$("#idioma_seleccionado").val("esp");
        	}
        	
        	this.homePage = new HomeView().render();
        	this.slidePage(this.homePage);
        	ScaleTopIndex();
        }
        if (vista=='#presentacion') {
        	this.presentacionPage = new PresentacionView(idioma_seleccionado).render();
        	this.slidePage(this.presentacionPage);
            ScalePresentacion();
        }
        if (vista=='#obras_y_servicios') {
        	this.obrasPage = new ObrasYServiciosView(idioma_seleccionado).render();
        	this.slidePage(this.obrasPage);
            ScalePresentacion();
        }
        if (vista=='#concellerias') {
        	this.concelleriasPage = new ConcelleriasView(idioma_seleccionado).render();
            this.slidePage(this.concelleriasPage);
        }
        if (vista=='#concelleria') {
        	var id_concelleria = arr[1];
        	this.concelleriaPage = new ConcelleriaView(id_concelleria, idioma_seleccionado).render();
            this.slidePage(this.concelleriaPage);
        }
        if (vista=='#novas') {
        	this.novasPage = new NovasView(idioma_seleccionado).render();
            this.slidePage(this.novasPage);
        }
        if (vista=='#nova') {
        	var id_nova = arr[1];
        	var mostrar_siguiente = arr[2];
        	this.novaPage = new NovaView(id_nova, mostrar_siguiente, idioma_seleccionado).render();
            this.slidePage(this.novaPage);
            ScalePresentacion();
        }
        if (vista=='#contactos') {
        	this.contactosPage = new ContactosView(idioma_seleccionado).render();
            this.slidePage(this.contactosPage);
        }
        if (vista=='#eventos') {
        	this.eventosPage = new EventosView(idioma_seleccionado).render();
            this.slidePage(this.eventosPage);
        }
        if (vista=='#convocatorias') {
        	this.convocatoriasPage = new ConvocatoriasView(idioma_seleccionado).render();
            this.slidePage(this.convocatoriasPage);
        }
        if (vista=='#convocatoria') {
        	var id_convocatoria = arr[1];
        	var mostrar_siguiente = arr[2];
        	this.convocatoriaPage = new ConvocatoriaView(id_convocatoria, mostrar_siguiente, idioma_seleccionado).render();
            this.slidePage(this.convocatoriaPage);
        }
        if (vista=='#evento') {
        	var id_evento = arr[1];
        	var mostrar_siguiente = arr[2];
        	this.eventoPage = new EventoView(id_evento, mostrar_siguiente, idioma_seleccionado).render();
            this.slidePage(this.eventoPage);
            ScalePresentacion();
        }
        if (vista=='#visitar') {
        	var id_lugar = arr[1];
        	var mostrar_siguiente = arr[2];
        	if(!id_lugar || id_lugar<1){
        		id_lugar=-1;
        	}
        	this.visitarPage = new VisitarView(id_lugar, mostrar_siguiente, idioma_seleccionado).render();
            this.slidePage(this.visitarPage);
            ScalePresentacion();
        }
        if (vista=='#mapa') {
        	var id_lugar = arr[1];
        	this.mapaPage = new MapaView(id_lugar, idioma_seleccionado).render();
            this.slidePage(this.mapaPage);
        }
        if (vista=='#colaborainicio') {
        	var este_id_usuario_registrado = $('#id_usuario_registrado').val();
        	if(este_id_usuario_registrado>0){
        		this.colaboraPage = new ColaboraView(idioma_seleccionado).render();
                this.slidePage(this.colaboraPage);
                ScaleDialogCategorias();
        	}
        	else{
        		this.colaborainicioPage = new ColaborainicioView().render();
                this.slidePage(this.colaborainicioPage);
        	}
        }
        if (vista=='#colaboralogin') {
        	this.colaboraloginPage = new ColaboraloginView().render();
            this.slidePage(this.colaboraloginPage);
        }
        if (vista=='#colaboraregistrarse') {
        	this.colaboraregistrarsePage = new ColaboraregistrarseView().render();
            this.slidePage(this.colaboraregistrarsePage);
        }
        if (vista=='#colabora') {
        	this.colaboraPage = new ColaboraView(idioma_seleccionado).render();
            this.slidePage(this.colaboraPage);
            ScaleDialogCategorias();
        }
        if (vista=='#actividades') {
        	this.actividadesPage = new ActividadesView(idioma_seleccionado).render();
            this.slidePage(this.actividadesPage);
        }
        if (vista=='#bases') {
        	var id_actividad = arr[1];
        	this.basesPage = new BasesView(id_actividad, idioma_seleccionado).render();
            this.slidePage(this.basesPage);
        }
        if (vista=='#bases_convocatoria') {
        	var id_convocatoria = arr[1];
        	this.basesConvocatoriaPage = new BasesConvocatoriaView(id_convocatoria, idioma_seleccionado).render();
            this.slidePage(this.basesConvocatoriaPage);
        }
        if (vista=='#documentacion_convocatoria') {
        	var id_convocatoria = arr[1];
        	this.documentacionConvocatoriaPage = new DocumentacionConvocatoriaView(id_convocatoria, idioma_seleccionado).render();
            this.slidePage(this.documentacionConvocatoriaPage);
        }
        if (vista=='#contactos_enlaces') {
        	this.contactosEnlacesPage = new ContactosEnlacesView(idioma_seleccionado).render();
            this.slidePage(this.contactosEnlacesPage);
        }
        if (vista=='#participa') {
        	var id_actividad = arr[1];
        	$("#id_actividad_participar").val(id_actividad);
        	this.participaPage = new ParticipaView(id_actividad, idioma_seleccionado).render();
            this.slidePage(this.participaPage);
        }
        if (vista=='#notificaciones') {
        	this.notificacionesPage = new NotificacionesView().render();
            this.slidePage(this.notificacionesPage);
        }
        if (vista=='#notificacion') {
        	var id_notificacion = arr[1];
        	this.notificacionPage = new NotificacionView(id_notificacion).render();
            this.slidePage(this.notificacionPage);
        }
        if (vista=='#recordar_contrasena') {
        	this.recordarContrasenaPage = new RecordarContrasenaView(idioma_seleccionado).render();
            this.slidePage(this.recordarContrasenaPage);
        }
    },

    slidePage: function(page) {
    	
        var currentPageDest,
            self = this;
        
        // If there is no current page (app just started) -> No transition: Position new page in the view port
        if (!this.currentPage) {
        	$(page.el).attr('class', 'page stage-center');
            $('body').append(page.el);
            this.currentPage = page;
            return;
        }
        
        // Cleaning up: remove old pages that were moved out of the viewport
        $('.stage-right, .stage-left').remove();

        $(page.el).attr('class', 'page stage-right');
        currentPageDest = "stage-left";

        $('body').append(page.el);

        // Wait until the new page has been added to the DOM...
        setTimeout(function() {
            // Slide out the current page: If new page slides from the right -> slide current page to the left, and vice versa
        	$(self.currentPage.el).attr('class', 'page transition ' + currentPageDest);
            // Slide in the new page
            $(page.el).attr('class', 'page stage-center transition');
            self.currentPage = page;
            $("#div_loader").hide();
        });
    },
    
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
        
        StatusBar.overlaysWebView(false);
        navigator.network.isReachable("google.com", reachableCallback, {});
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        FCMPlugin.getToken(function(token){
            $('#token_user').val(token);
            $.ajax({
                async:false,   
                type: 'POST',  
                url: url_register_android,
                data: "regId="+token,
            });
        });

        FCMPlugin.onTokenRefresh(function(token){
            $('#token_user').val(token);
            $.ajax({
                async:false,   
                type: 'POST',  
                url: url_register_android,
                data: "regId="+token,
            });
        });

        FCMPlugin.onNotification(function(data){
            if(data.wasTapped){
              //alert( JSON.stringify(data) );
              ir_a_opcion('#notificacion/-1');
            }else{
              //Notification was received in foreground. Maybe the user needs to be notified.
              //alert( JSON.stringify(data) );
              ir_a_opcion('#notificacion/-1');
            }
        });

    }
};

function cargado(){
	var param_es_push = getQueryParameter ("es_push");
	if(param_es_push==1){
		es_push=1;
		app.route();
	}
}

function getQueryParameter ( parameterName ) {
	var queryString = window.top.location.search.substring(1);
	var parameterName = parameterName + "=";
	if ( queryString.length > 0 ) {
		begin = queryString.indexOf ( parameterName );
		if ( begin != -1 ) {
			begin += parameterName.length;
			end = queryString.indexOf ( "&" , begin );
			if ( end == -1 ) {
				end = queryString.length
			}
			return unescape ( queryString.substring ( begin, end ) );
		}
	}
	return "null";
} 

function primeraLetraMayuscula(palabra){
	var strLen = palabra.length;
	var tmpChar = palabra.substring(0,1).toUpperCase();
	var postString = palabra.substring(1,strLen);
	palabra = tmpChar + postString;
	
	return palabra;
}


function successPermisoCameraDeGaleria() {
    navigator.camera.getPicture(uploadPhoto, fail,
    {
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        popoverOptions: new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY)
    });
    
}

function setOptions(srcType) {
    var options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
}


function successPermisoCameraDeCamara() {
    var srcType = Camera.PictureSourceType.CAMERA;
    var options = setOptions(srcType);

    navigator.camera.getPicture(function cameraSuccess(imageUri) {
        uploadPhoto(imageUri);
    }, function cameraError(error) {
        console.log("Unable to obtain picture: " + error, "app");
    }, options);
}

function errorCamera(error) {
    console.log("error: "+error.code);
    console.log(error);
}


function capturePhotoGaleria() {
    var permissions = cordova.plugins.permissions;
    permissions.requestPermission(permissions.CAMERA, successPermisoCameraDeGaleria, errorCamera);
}

function capturePhotoCamara() {
    var permissions = cordova.plugins.permissions;
    permissions.requestPermission(permissions.CAMERA, successPermisoCameraDeCamara, errorCamera);
}

//PHOTOLIBRARY
//SAVEDPHOTOALBUM

var mi_imageURI='';
var url_fancy='';
var nombre_imagen='';


function uploadPhoto(imageURI) {

	var d = new Date();
    var mi_time = d.getTime(); 

	if(imageURI!=''){
		var options = new FileUploadOptions();
        options.fileKey="file";
        options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
        options.mimeType="image/jpeg";
        
        var token_user = $('#token_user').val();
        var token_user_solo_num_10 = token_user.substr(0, 10);
        mi_time = token_user_solo_num_10+"_"+mi_time;
        
        nombre_imagen = mi_time+".jpg";

        var params = new Object();
        params.id_servicio = "26";
        params.time = mi_time;
        options.params = params;
        options.chunkedMode = false;
        
        url_fancy = url_img_temp+nombre_imagen;
        mi_imageURI = imageURI;
        
        var ft = new FileTransfer();
        ft.upload(imageURI, url_servicios, mostrarImagen, fail, options);
	}
	
}

function mostrarImagen(){
	for (var i = 1; i <= 10; i++) {
		var este_foto_data = document.getElementById("foto_data_"+i).value;
		if(este_foto_data==''){
			$('#div_foto_'+i).show();
			document.getElementById("foto_data_"+i).value = nombre_imagen;
		
			$('#img_'+i).attr("src", url_fancy);
			$("#ampliar_"+i).attr("href", url_fancy);
			
		    i=11;
		}
	}
}

function eliminarFoto(num) {
	$('#div_foto_'+num).hide();
	var nombre_imagen_borrar = $('#foto_data_'+num).val();
	$('#foto_data_'+num).val("");
	
	$.ajax({
        async:false,   
        type: 'POST',  
        url: url_servicios,
        data: "id_servicio=27&nombre_imagen="+nombre_imagen_borrar,
        success:  function(respuesta){ 
        }
    });
}

function win(r) {
	//console.log("Code = " + r.responseCode);
	//console.log("Response = " + r.response);
	//console.log("Sent = " + r.bytesSent);
}

function fail(error) {
	//alert("error: "+error.code);
	//alert(error);
}

function ir_a_opcion(opcion){
	if(online){
		$("#div_loader").toggle();
		window.location.href = opcion;
	}
	else{
		toastr.warning("Debes tener conexi&oacute;n a Internet");
	}
}

function reachableCallback(reachability) {
	  // There is no consistency on the format of reachability
	  var networkState = reachability.code || reachability;
	  var states = {};
	  states[NetworkStatus.NOT_REACHABLE]                      = 'No network connection';
	  states[NetworkStatus.REACHABLE_VIA_CARRIER_DATA_NETWORK] = 'Carrier data connection';
	  states[NetworkStatus.REACHABLE_VIA_WIFI_NETWORK]         = 'WiFi connection';
	  if (networkState != 0) online = true;
}

var online = navigator.onLine || false;

function ScaleTopIndex() {
	
	var este_width = $('#cabecera_home_index').width();
	var este_height = $('#cabecera_home_index').height();
	
	$("#imagen_presentacion").width( este_width+"px" );
	$("#imagen_presentacion").height( este_height+"px" );
	$('.imgset2 img').imgCentering({'forceWidth':true});
}

function ScalePresentacion() {
	var este_width = $('#cuerpo_presentacion_foto').width();
	var este_height = $('#cuerpo_presentacion_foto').height();
	
	$("#imagen_presentacion").width( este_width+"px" );
	$("#imagen_presentacion").height( este_height+"px" );
	$('.imgset2 img').imgCentering({'forceWidth':true});
}

function ScaleDialogCategorias() {
	var este_width = $('#cabecera_presentacion').width()*0.8;
	
	var este_texto_selecciona_una_categoria = $('#traduccion_selecciona_una_categoria').val();
	$('#texto_seleccione_una_categoria_dialog').html(este_texto_selecciona_una_categoria);
	
	var este_texto_selecciona_una_subcategoria = $('#traduccion_selecciona_una_subcategoria').val();
	$('#texto_seleccione_una_subcategoria_dialog').html(este_texto_selecciona_una_subcategoria);
	
	$("#dialog-form-categorias").width( este_width+"px" );
	$("#dialog-form-subcategorias").width( este_width+"px" );
}

function seleccionar_categoria(id_categoria, nombre_categoria){
	
	var este_idioma = $('#idioma_seleccionado').val();
	
	var datos = Array();
	
	//cogemos las subcategorias
	$.ajax({
        async:false,   
        type: 'POST',  
        url: url_servicios,
        data: "id_servicio=30&idioma="+este_idioma+"&id_categoria="+id_categoria,
        success:  function(respuesta){ 
        	datos = $.parseJSON(respuesta);
        	var subcategorias = datos['subcategorias'];
        	var nuevo_html_subcategorias = '';
        	$.each(subcategorias, function( index, value ) {
        		var valor = subcategorias[index]['id'];
        		var texto = subcategorias[index]['texto'];
        		
        		nuevo_html_subcategorias+="<div class='categoria_dialog'>";
        		nuevo_html_subcategorias+="<div class='categoria_dialog_nombre'>";
        		nuevo_html_subcategorias+="<div class='categoria_dialog_nombre_texto'>";
        		nuevo_html_subcategorias+=texto;
        		nuevo_html_subcategorias+="</div>";
        		nuevo_html_subcategorias+="</div>";
        		nuevo_html_subcategorias+="<div class='categoria_dialog_radio'>";
        		nuevo_html_subcategorias+="<div class='categoria_dialog_radio_texto'>";
        		nuevo_html_subcategorias+="<input id='subcategoria_"+valor+"' onclick='javascript:seleccionar_subcategoria("+valor+", \""+texto+"\");' value='"+valor+"' name='radio_subcategoria' type='radio' />";
        		nuevo_html_subcategorias+="</div>";
        		nuevo_html_subcategorias+="</div>";
        		nuevo_html_subcategorias+="</div>";
        		
    		});
        	$('#div_subcategorias_dialog').html(nuevo_html_subcategorias);
        }
    });
	
	$('#id_categoria_seleccionada').val(id_categoria);
	$('#texto_categoria_seleccionada').html(nombre_categoria);
	$('#texto_subcategoria_seleccionada').html(primeraLetraMayuscula(array_traducciones[48]));
	
	$.fancybox.close();
}

function seleccionar_subcategoria(id_subcategoria, nombre_subcategoria){
	$('#id_subcategoria_seleccionada').val(id_subcategoria);
	$('#texto_subcategoria_seleccionada').html(nombre_subcategoria);
	$.fancybox.close();
}


function OpenLink(link){
    window.open(link, "_system");
}


app.initialize();