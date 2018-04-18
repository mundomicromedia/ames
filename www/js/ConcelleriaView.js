var ConcelleriaView = function(id_concelleria, idioma) {

    this.initialize = function() {
        this.el = $('<div/>');
        this.el.on('mousedown', '.ir_a_concellerias', this.ir_a_concellerias);
    };
    
    this.ir_a_concellerias = function(event) {
    	ir_a_opcion('#concellerias');
    };
    

    this.render = function() {
    	
    	var datos = Array();
    	
    	$.ajax({
            async:false,   
            type: 'POST',  
            url: url_servicios,
            data: "id_servicio=23&id_concelleria="+id_concelleria+"&idioma="+idioma,
            success:  function(respuesta){ 
            	datos = $.parseJSON(respuesta);
            }
        });
    	
    	var concelleria = datos;
    	
    	concelleria['imagen'] = url_imagen_concelleros+concelleria['imagen'];
    	
    	datos['concelleria'] = concelleria;
    	datos['traduccion_concelleria'] = primeraLetraMayuscula(array_traducciones[36]);
    	
        this.el.html(ConcelleriaView.template(datos));
        return this;
    	
    };

    this.initialize();

}

ConcelleriaView.template = Handlebars.compile($("#concelleria-tpl").html());