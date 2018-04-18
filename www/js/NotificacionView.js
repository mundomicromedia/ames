var NotificacionView = function(id_notificacion) {
	
	fix_notificacion_ios = 0;

    this.initialize = function() {
        this.el = $('<div/>');
        this.el.on('mousedown', '.ir_a_notificaciones', this.ir_a_notificaciones);
    };
    
    this.ir_a_notificaciones = function(event) {
    	ir_a_opcion('#notificaciones');
    };

    this.render = function() {
    	
    	var datos = Array();
    	
    	$.ajax({
            async:false,   
            type: 'POST',  
            url: url_servicios,
            data: "id_servicio=13&id_notificacion="+id_notificacion,
            success:  function(respuesta){ 
            	datos = $.parseJSON(respuesta);
            }
        });
    	
    	var notificacion = datos;
    	
    	datos['notificacion'] = notificacion;
    	datos['traduccion_notificacion'] = primeraLetraMayuscula(array_traducciones[23]);
    	
        this.el.html(NotificacionView.template(datos));
        return this;
    	
    };

    this.initialize();

}

NotificacionView.template = Handlebars.compile($("#notificacion-tpl").html());

