var NovasView = function(idioma) {

    this.initialize = function() {
        this.el = $('<div/>');
    };

    this.render = function() {
    	
    	var datos = Array();
    	
    	$.ajax({
            async:false,   
            type: 'POST',  
            url: url_servicios,
            data: "id_servicio=2&idioma="+idioma,
            success:  function(respuesta){ 
            	datos = $.parseJSON(respuesta);
            }
        });
    	
    	var novas = datos['novas'];
    	
    	datos['novas'] = novas;
    	datos['traduccion_noticias'] = primeraLetraMayuscula(array_traducciones[3]);
    	
        this.el.html(NovasView.template(datos));
        return this;
    	
    };

    this.initialize();

}

NovasView.template = Handlebars.compile($("#novas-tpl").html());