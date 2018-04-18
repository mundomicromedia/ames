var VisitarView = function(id_lugar, mostrar_siguiente, idioma) {

    this.initialize = function() {
        this.el = $('<div/>');
    };

    this.render = function() {
    	
    	var datos = Array();
    	
    	$.ajax({
            async:false,   
            type: 'POST',  
            url: url_servicios,
            data: "id_servicio=7&id_lugar="+id_lugar+"&mostrar_siguiente="+mostrar_siguiente+"&idioma="+idioma,
            success:  function(respuesta){ 
            	datos = $.parseJSON(respuesta);
            }
        });
    	
    	var lugar = datos;
    	lugar['imagen'] = url_imagen_visitar+lugar['imagen'];
    	
    	datos['lugar'] = lugar;
    	datos['traduccion_que_visitar'] = primeraLetraMayuscula(array_traducciones[6]);
    	
        this.el.html(VisitarView.template(datos));
        return this;
    };

    this.initialize();

}

VisitarView.template = Handlebars.compile($("#visitar-tpl").html());