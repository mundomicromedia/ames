var DocumentacionConvocatoriaView = function(id_convocatoria, idioma) {

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
            data: "id_servicio=25&id_convocatoria="+id_convocatoria+"&idioma="+idioma,
            success:  function(respuesta){ 
            	datos = $.parseJSON(respuesta);
            }
        });
    	
    	datos['archivos'] = datos['archivos'];
    	datos['id_convocatoria'] = id_convocatoria;
    	datos['traduccion_convocatoria'] = primeraLetraMayuscula(array_traducciones[35]);
    	datos['traduccion_documentacion'] = primeraLetraMayuscula(array_traducciones[38]);
    	
        this.el.html(DocumentacionConvocatoriaView.template(datos));
        return this;
    };

    this.initialize();

}

DocumentacionConvocatoriaView.template = Handlebars.compile($("#documentacion_convocatoria-tpl").html());