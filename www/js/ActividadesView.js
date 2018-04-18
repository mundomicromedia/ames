var ActividadesView = function(idioma) {

    this.initialize = function() {
        this.el = $('<div/>');
    };

    this.render = function() {
        
    	var datos = Array();
    	
    	$.ajax({
            async:false,   
            type: 'POST',  
            url: url_servicios,
            data: "id_servicio=10&idioma="+idioma,
            success:  function(respuesta){ 
            	datos = $.parseJSON(respuesta);
            }
        });
    	
    	var actividades = datos['actividades'];
    	
    	$.each(actividades, function( index, value ) {
    		actividades[index]['imagen'] = url_imagen_actividades+actividades[index]['imagen'];
    		actividades[index]['traduccion_bases'] = primeraLetraMayuscula(array_traducciones[11]);
    		actividades[index]['traduccion_participa'] = primeraLetraMayuscula(array_traducciones[12]);
		});

    	datos['actividades'] = actividades;
    	datos['traduccion_participa_en_las_actividades'] = primeraLetraMayuscula(array_traducciones[7]);
    	
        this.el.html(ActividadesView.template(datos));
        return this;
    	
    };

    this.initialize();

}

ActividadesView.template = Handlebars.compile($("#actividades-tpl").html());