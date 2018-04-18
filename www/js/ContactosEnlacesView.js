var ContactosEnlacesView = function(idioma) {

    this.initialize = function() {
        this.el = $('<div/>');
    };
    

    this.render = function() {
    	
    	var datos = Array();
    	
    	$.ajax({
            async:false,   
            type: 'POST',  
            url: url_servicios,
            data: "id_servicio=31&&idioma="+idioma,
            success:  function(respuesta){ 
            	datos = $.parseJSON(respuesta);
            }
        });
    	
    	var enlaces = datos['enlaces'];
    	
    	datos['enlaces'] = enlaces;
    	datos['traduccion_enlaces'] = primeraLetraMayuscula(array_traducciones[49]);
    	
        this.el.html(ContactosEnlacesView.template(datos));
        return this;
    };

    this.initialize();

}

ContactosEnlacesView.template = Handlebars.compile($("#contactos_enlaces-tpl").html());