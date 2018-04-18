var NovaView = function(id_nova, mostrar_siguiente, idioma) {

    this.initialize = function() {
        this.el = $('<div/>');
        this.el.on('mousedown', '.ir_a_novas', this.ir_a_novas);
        this.el.on('mousedown', '.publicar_nova_facebook', this.publicar_nova_facebook);
        this.el.on('mousedown', '.publicar_nova_twitter', this.publicar_nova_twitter);
    };
    
    this.ir_a_novas = function(event) {
    	ir_a_opcion('#novas');
    };
    
    this.publicar_nova_facebook = function(event) {
    	ir_a_opcion('#novas');
    	var url = "http://www.facebook.com/share.php?u="+url_server+"/nova.php?id_nova="+id_nova
    	window.open(url, '_system');
    };
    
    this.publicar_nova_twitter = function(event) {
    	ir_a_opcion('#novas');
    	var url = "http://www.facebook.com/share.php?u="+url_server
    	window.open(url, '_system');
    };
    

    this.render = function() {
    	
    	var datos = Array();
    	
    	$.ajax({
            async:false,   
            type: 'POST',  
            url: url_servicios,
            data: "id_servicio=5&id_nova="+id_nova+"&mostrar_siguiente="+mostrar_siguiente+"&idioma="+idioma,
            success:  function(respuesta){ 
            	datos = $.parseJSON(respuesta);
            }
        });
    	
    	var nova = datos;
    	
    	nova['imagen'] = nova['imagen'];
    	
    	datos['nova'] = nova;
    	datos['traduccion_noticia'] = primeraLetraMayuscula(array_traducciones[9]);
    	
        this.el.html(NovaView.template(datos));
        return this;
    	
    };

    this.initialize();

}

NovaView.template = Handlebars.compile($("#nova-tpl").html());