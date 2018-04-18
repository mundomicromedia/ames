var PresentacionView = function(idioma) {
	
    this.initialize = function() {
        this.el = $('<div/>');
    };
    
    this.render = function() {
    	
    	var datos = Array();
    	
    	$.ajax({
            async:false,   
            type: 'POST',  
            url: url_servicios,
            data: "id_servicio=1&idioma="+idioma,
            success:  function(respuesta){ 
            	datos = $.parseJSON(respuesta);
            }
        });
    	
    	datos['imagen_alcalde'] = url_imagen_alcalde+datos['imagen_alcalde'];
    	datos['traduccion_presentacion'] = primeraLetraMayuscula(array_traducciones[1]);
    	
        this.el.html(PresentacionView.template(datos));
        return this;
    };

    
    this.initialize();

}

PresentacionView.template = Handlebars.compile($("#presentacion-tpl").html());