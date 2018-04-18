var EventoView = function(id_evento, mostrar_siguiente, idioma) {

    this.initialize = function() {
        this.el = $('<div/>');
        this.el.on('mousedown', '.ir_a_eventos', this.ir_a_eventos);
    };
    
    this.ir_a_eventos= function(event) {
    	ir_a_opcion('#eventos');
    };

    this.render = function() {
    	
    	var datos = Array();
    	
    	$.ajax({
            async:false,   
            type: 'POST',  
            url: url_servicios,
            data: "id_servicio=6&id_evento="+id_evento+"&mostrar_siguiente="+mostrar_siguiente+"&idioma="+idioma,
            success:  function(respuesta){ 
            	datos = $.parseJSON(respuesta);
            }
        });
    	
    	var evento = datos;
    	
    	datos['evento'] = evento;
    	datos['traduccion_evento'] = primeraLetraMayuscula(array_traducciones[10]);
    	
        this.el.html(EventoView.template(datos));
        return this;
    	
    };

    this.initialize();

}

EventoView.template = Handlebars.compile($("#evento-tpl").html());