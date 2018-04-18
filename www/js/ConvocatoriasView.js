var ConvocatoriasView = function(idioma) {

    this.initialize = function() {
        this.el = $('<div/>');
    };

    this.render = function() {
    	
    	var datos = Array();
    	
    	$.ajax({
            async:false,   
            type: 'POST',  
            url: url_servicios,
            data: "id_servicio=21&idioma="+idioma,
            success:  function(respuesta){ 
            	datos = $.parseJSON(respuesta);
            }
        });
    	
    	var convocatorias = datos['convocatorias'];
    	
    	datos['convocatorias'] = convocatorias;
    	datos['traduccion_convocatorias'] = primeraLetraMayuscula(array_traducciones[34]);
    	
        this.el.html(ConvocatoriasView.template(datos));
        return this;
    	
    };

    this.initialize();

}

ConvocatoriasView.template = Handlebars.compile($("#convocatorias-tpl").html());