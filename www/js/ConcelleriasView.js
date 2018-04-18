var ConcelleriasView = function(idioma) {

    this.initialize = function() {
        this.el = $('<div/>');
    };

    this.render = function() {
        
    	var datos = Array();
    	
    	$.ajax({
            async:false,   
            type: 'POST',  
            url: url_servicios,
            data: "id_servicio=9&idioma="+idioma,
            success:  function(respuesta){ 
            	datos = $.parseJSON(respuesta);
            }
        });
    	
    	var concellerias = datos['concellerias'];
    	
    	$.each(concellerias, function( index, value ) {
    		concellerias[index]['imagen'] = url_imagen_concelleros+concellerias[index]['imagen'];
		});
    	
    	datos['concellerias'] = concellerias;
    	datos['traduccion_concejalias'] = primeraLetraMayuscula(array_traducciones[2]);
    	
        this.el.html(ConcelleriasView.template(datos));
        return this;
    	
    };

    this.initialize();

}

ConcelleriasView.template = Handlebars.compile($("#concellerias-tpl").html());