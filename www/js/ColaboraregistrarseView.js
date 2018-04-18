var ColaboraregistrarseView = function() {

    this.initialize = function() {
        this.el = $('<div/>');
        this.el.on('mousedown', '.registrar_usuario', this.registrar_usuario);
    };

    this.render = function() {
    	var datos = Array();
    	
    	datos['traduccion_colabora_con_tu_concejo'] = primeraLetraMayuscula(array_traducciones[17]);
    	
    	datos['traduccion_nombre'] = primeraLetraMayuscula(array_traducciones[13]);
    	datos['traduccion_telefono'] = primeraLetraMayuscula(array_traducciones[14]);
    	datos['traduccion_email'] = primeraLetraMayuscula(array_traducciones[15]);
    	datos['traduccion_contrasena'] = primeraLetraMayuscula(array_traducciones[28]);
    	datos['traduccion_repetir_contrasena'] = primeraLetraMayuscula(array_traducciones[39]);
    	
        this.el.html(ColaboraregistrarseView.template(datos));
        return this;
    };
    
    this.registrar_usuario = function(event) {

    	$("#div_loader").show();
    	
    	var nombre = $('#nombre').val();
    	var telefono = $('#telefono').val();
    	var email = $('#email').val();
    	var contrasena = $('#contrasena').val();
    	var contrasena_2 = $('#contrasena_2').val();
    	
    	var error = 0;
    	var mensaje = primeraLetraMayuscula(array_traducciones[21])+": ";
    	
    	if(nombre==''){
    		mensaje+="<br> - "+primeraLetraMayuscula(array_traducciones[13])
    		error = 1;
    	}
    	if(email==''){
    		mensaje+="<br> - "+primeraLetraMayuscula(array_traducciones[15])
    		error = 1;
    	}
    	if(contrasena==''){
    		mensaje+="<br> - "+primeraLetraMayuscula(array_traducciones[28])
    		error = 1;
    	}
    	if(contrasena!=contrasena_2){
    		mensaje+="<br> - "+primeraLetraMayuscula(array_traducciones[40])
    		error = 1;
    	}
    	
    	if(error==1){
    		toastr.warning(mensaje);
    	}
    	else{
    		$.ajax({
                async:false,   
                type: 'POST',  
                url: url_servicios,
                data: "id_servicio=18&nombre="+nombre+"&telefono="+telefono+"&email="+email+"&contrasena="+contrasena,
                success:  function(respuesta){ 
                	$("#div_loader").hide();
                	if(respuesta==1){//ya existe un usuario registrado con este email
                		var texto_usuario_ya_existente = primeraLetraMayuscula(array_traducciones[31]);
                		toastr.warning(primeraLetraMayuscula(texto_usuario_ya_existente));
                	}
                	else{
                		var texto_confirma_email = primeraLetraMayuscula(array_traducciones[30]);
                		toastr.success(primeraLetraMayuscula(texto_confirma_email));
                		ir_a_opcion('#colaborainicial');
                	}
                }
            });
    	}
    	
    	$("#div_loader").hide();
    };
    

    this.initialize();
}

ColaboraregistrarseView.template = Handlebars.compile($("#colaboraregistrarse-tpl").html());