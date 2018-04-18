var ObrasYServiciosView = function(idioma) {
	
    this.initialize = function() {
        this.el = $('<div/>');
    };
    
    this.render = function() {
    	
    	var datos = Array();
    	
    	$.ajax({
            async:false,   
            type: 'POST',  
            url: url_servicios,
            data: "id_servicio=32&idioma="+idioma,
            success:  function(respuesta){ 
            	datos = $.parseJSON(respuesta);
            }
        });
    	
    	datos['imagen_concejal'] = url_img_concejal+datos['imagen_concejal'];
    	datos['traduccion_dpto_obras_y_servicios'] = primeraLetraMayuscula(array_traducciones[50]);
    	
        this.el.html(ObrasYServiciosView.template(datos));
        return this;
    };

    
    this.initialize();

}

ObrasYServiciosView.template = Handlebars.compile($("#obras_y_servcios-tpl").html());