var MapaView = function(id_lugar, idioma) {

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
            data: "id_servicio=7&id_lugar="+id_lugar+"&mostrar_siguiente=0&idioma="+idioma,
            success:  function(respuesta){ 
            	datos = $.parseJSON(respuesta);
            }
        });
    	
    	var lugar = datos;
    	
    	datos['lugar'] = lugar;
    	datos['traduccion_que_visitar'] = primeraLetraMayuscula(array_traducciones[6]);
    	
        this.el.html(MapaView.template(datos));
        return this;
    	
    };

    this.initialize();

}

MapaView.template = Handlebars.compile($("#mapa-tpl").html());