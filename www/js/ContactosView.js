var ContactosView = function(idioma) {

    this.initialize = function() {
        this.el = $('<div/>');
    };

    this.render = function() {
        
    	var datos = Array();
    	
    	$.ajax({
            async:false,   
            type: 'POST',  
            url: url_servicios,
            data: "id_servicio=8&idioma="+idioma,
            success:  function(respuesta){ 
            	datos = $.parseJSON(respuesta);
            }
        });
    	
    	var contactos = datos['contactos'];
    	
    	$.each(contactos, function( index, value ) {
			contactos[index]['imagen'] = url_imagen_contactos+contactos[index]['imagen'];
		});
    	
    	datos['contactos'] = contactos;
    	datos['traduccion_contactos_de_interes'] = primeraLetraMayuscula(array_traducciones[4]);
    	datos['traduccion_enlaces'] = primeraLetraMayuscula(array_traducciones[49]);
    	
        this.el.html(ContactosView.template(datos));
        return this;
    	
    };

    this.initialize();

}

ContactosView.template = Handlebars.compile($("#contactos-tpl").html());