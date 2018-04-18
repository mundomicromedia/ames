var ConvocatoriaView = function(id_convocatoria, mostrar_siguiente, idioma) {

    this.initialize = function() {
        this.el = $('<div/>');
        this.el.on('mousedown', '.ir_a_convocatorias', this.ir_a_convocatorias);
    };
    
    this.ir_a_convocatorias = function(event) {
    	ir_a_opcion('#convocatorias');
    };
    
    this.render = function() {
    	
    	var datos = Array();
    	
    	$.ajax({
            async:false,   
            type: 'POST',  
            url: url_servicios,
            data: "id_servicio=22&id_convocatoria="+id_convocatoria+"&mostrar_siguiente="+mostrar_siguiente+"&idioma="+idioma,
            success:  function(respuesta){ 
            	datos = $.parseJSON(respuesta);
            }
        });
    	
    	var convocatoria = datos;
    	
    	datos['convocatoria'] = convocatoria;
    	datos['traduccion_convocatoria'] = primeraLetraMayuscula(array_traducciones[35]);
    	datos['traduccion_bases'] = primeraLetraMayuscula(array_traducciones[11]);
    	datos['traduccion_documentacion'] = primeraLetraMayuscula(array_traducciones[38]);
    	
        this.el.html(ConvocatoriaView.template(datos));
        return this;
    	
    };

    this.initialize();

}

ConvocatoriaView.template = Handlebars.compile($("#convocatoria-tpl").html());