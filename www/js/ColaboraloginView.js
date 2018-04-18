var ColaboraloginView = function() {

    this.initialize = function() {
        this.el = $('<div/>');
        this.el.on('mousedown', '.comprobar_usuario', this.comprobar_usuario);
    };

    this.render = function() {
    	var datos = Array();
    	
    	datos['traduccion_colabora_con_tu_concejo'] = primeraLetraMayuscula(array_traducciones[17]);
    	datos['traduccion_email'] = primeraLetraMayuscula(array_traducciones[15]);
    	datos['traduccion_contrasena'] = primeraLetraMayuscula(array_traducciones[28]);
    	datos['traduccion_recordar_contrasena'] = primeraLetraMayuscula(array_traducciones[41]);
    	
    	
        this.el.html(ColaboraloginView.template(datos));
        return this;
    };
    
    this.comprobar_usuario = function(event) {

    	var email = $('#email').val();
    	var contrasena = $('#contrasena').val();
    	
    	$("#div_loader").show();
    	$.ajax({
            async:false,   
            type: 'POST',  
            url: url_servicios,
            data: "id_servicio=17&email="+email+"&contrasena="+contrasena,
            success:  function(respuesta){ 
            	$("#div_loader").hide();
            	if(respuesta>0){
            		ir_a_opcion('#colabora');
            		$('#id_usuario_registrado').val(respuesta);
            	}
            	else{
            		if(respuesta==-1){// no existe usuario registrado con ese email
            			var texto = primeraLetraMayuscula(array_traducciones[43]);
            		}
            		if(respuesta==-2){// el usuario no está ativado
            			var texto = primeraLetraMayuscula(array_traducciones[46]);
            		}
            		if(respuesta==-3){// la contrasena es incorrecta
            			var texto = primeraLetraMayuscula(array_traducciones[45]);
            		}
            		
            		toastr.warning(primeraLetraMayuscula(texto));
            	}
            }
        });
    	
    };
    

    this.initialize();
}

ColaboraloginView.template = Handlebars.compile($("#colaboralogin-tpl").html());