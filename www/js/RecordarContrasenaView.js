var RecordarContrasenaView = function(idioma_seleccionado) {

    this.initialize = function() {
        this.el = $('<div/>');
        this.el.on('mousedown', '.recordar_pass', this.recordar_pass);
    };

    this.render = function() {
    	var datos = Array();
    	
    	datos['traduccion_colabora_con_tu_concejo'] = primeraLetraMayuscula(array_traducciones[17]);
    	datos['traduccion_email'] = primeraLetraMayuscula(array_traducciones[15]);
    	datos['traduccion_enviar'] = primeraLetraMayuscula(array_traducciones[16]);
    	datos['traduccion_explicacion_recordar'] = primeraLetraMayuscula(array_traducciones[42]);
    	
    	
        this.el.html(RecordarContrasenaView.template(datos));
        return this;
    };
    
    this.recordar_pass = function(event) {

    	$("#div_loader").show();
    	
    	var email = $('#email_recordar').val();
    	
    	$.ajax({
            async:false,   
            type: 'POST',  
            url: url_servicios,
            data: "id_servicio=28&email="+email+"&idioma="+idioma_seleccionado,
            success:  function(respuesta){ 
            	$("#div_loader").hide();
            	if(respuesta==1){
            		var texto_usuario_no_existe = primeraLetraMayuscula(array_traducciones[43]);
            		toastr.warning(primeraLetraMayuscula(texto_usuario_no_existe));
            	}
            	else{
            		var texto_email_enviado = primeraLetraMayuscula(array_traducciones[44]);
            		toastr.success(primeraLetraMayuscula(texto_email_enviado));
            	}
            }
        });
    	
    	$('#email_recordar').val("");
    	
    };
    

    this.initialize();
}

RecordarContrasenaView.template = Handlebars.compile($("#recordarcontrasena-tpl").html());