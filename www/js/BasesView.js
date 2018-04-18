var BasesView = function(id_actividad, idioma) {

    this.initialize = function() {
        this.el = $('<div/>');
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
    	datos['traduccion_bases'] = primeraLetraMayuscula(array_traducciones[11]);
    	
        this.el.html(BasesView.template(datos));
        return this;
    };

    this.initialize();

}

BasesView.template = Handlebars.compile($("#bases-tpl").html());