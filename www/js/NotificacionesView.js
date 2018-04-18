var NotificacionesView = function() {

    this.initialize = function() {
        this.el = $('<div/>');
    };

    this.render = function() {
    	
    	var datos = Array();
    	
    	$.ajax({
            async:false,   
            type: 'POST',  
            url: url_servicios,
            data: "id_servicio=12",
            success:  function(respuesta){ 
            	datos = $.parseJSON(respuesta);
            }
        });
    	
    	var notificaciones = datos['notificaciones'];
    	
    	datos['notificaciones'] = notificaciones;
    	datos['traduccion_ultimas_notificaciones'] = primeraLetraMayuscula(array_traducciones[22]);
    	
        this.el.html(NotificacionesView.template(datos));
        return this;
    	
    };

    this.initialize();

}

NotificacionesView.template = Handlebars.compile($("#notificaciones-tpl").html());