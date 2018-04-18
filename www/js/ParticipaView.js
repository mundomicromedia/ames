var ParticipaView = function(id_actividad, idioma) {

    this.initialize = function() {
        this.el = $('<div/>');
        this.el.on('mousedown', '.btn_enviar_participa', this.enviarFormParticipa);
        this.el.on('mousedown', '.ir_a_actividades', this.ir_a_actividades);
    };
    
    this.ir_a_actividades = function(event) {
    	ir_a_opcion('#actividades');
    };

    this.render = function() {
    	
    	var datos = Array();
    	
    	$.ajax({
            async:false,   
            type: 'POST',  
            url: url_servicios,
            data: "id_servicio=11&id_actividad="+id_actividad+"&idioma="+idioma,
            success:  function(respuesta){ 
            	datos = $.parseJSON(respuesta);
            }
        });
    	
    	var actividad = datos;
    	
    	datos['actividad'] = actividad;
    	datos['traduccion_participa'] = primeraLetraMayuscula(array_traducciones[12]);
    	datos['traduccion_nombre'] = primeraLetraMayuscula(array_traducciones[13]);
    	datos['traduccion_telefono'] = primeraLetraMayuscula(array_traducciones[14]);
    	datos['traduccion_email'] = primeraLetraMayuscula(array_traducciones[15]);
    	datos['traduccion_enviar'] = primeraLetraMayuscula(array_traducciones[16]);
    	
        this.el.html(ParticipaView.template(datos));
        return this;
    };
    
    this.enviarFormParticipa = function(event) {
    	
    	var formData = new FormData(document.getElementById("form_participa"));
    	formData.append("id_servicio", "14");
    	formData.append("id_actividad", $('#id_actividad_participar').val());
    	
    	var este_nombre = $('#input_nombre').val();
    	var este_telefono = $('#input_telefono').val();
    	var este_email = $('#input_email').val();
    	
    	var mensaje = primeraLetraMayuscula(array_traducciones[21])+':<br>';
    	var mostrar_mensaje = 0;
    	if(este_nombre.length==0){
    		mensaje+=" - "+primeraLetraMayuscula(array_traducciones[13])+"<br>";
    		mostrar_mensaje=1;
    	}
    	if(este_telefono.length==0){
    		mensaje+=" - "+primeraLetraMayuscula(array_traducciones[14])+"<br>";
    		mostrar_mensaje=1;
    	}
    	if(este_email.length==0){
    		mensaje+=" - "+primeraLetraMayuscula(array_traducciones[15])+"<br>";
    		mostrar_mensaje=1;
    	}
    	if(mostrar_mensaje==1){
    		toastr.warning(mensaje);
    		return;
    	}
    	else{
    		formData.append("nombre", $('#input_nombre').val());
        	formData.append("telefono", $('#input_telefono').val());
        	formData.append("email", $('#input_email').val());
        	
            $.ajax({
                url: url_servicios,
                type: "post",
                dataType: "html",
                data: formData,
                cache: false,
                contentType: false,
                processData: false
            })
                .done(function(res){
                	$('#input_nombre').val("");
                	$('#input_telefono').val("");
                	$('#input_email').val("");
                });
            
            toastr.success(primeraLetraMayuscula(array_traducciones[20]));
    	}
    	
    	
    };

    this.initialize();

}

ParticipaView.template = Handlebars.compile($("#participa-tpl").html());