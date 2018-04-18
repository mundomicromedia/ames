var EventosView = function(idioma) {

    this.initialize = function() {
        this.el = $('<div/>');
    };

    this.render = function() {
    	
    	var datos = Array();
    	
    	$.ajax({
            async:false,   
            type: 'POST',  
            url: url_servicios,
            data: "id_servicio=3&idioma="+idioma,
            success:  function(respuesta){ 
            	datos = $.parseJSON(respuesta);
            }
        });
    	
    	var eventos = datos['eventos'];
    	
    	datos['eventos'] = eventos;
    	datos['traduccion_eventos'] = primeraLetraMayuscula(array_traducciones[5]);
    	
        this.el.html(EventosView.template(datos));
        return this;
    };

    this.initialize();

}

EventosView.template = Handlebars.compile($("#eventos-tpl").html());