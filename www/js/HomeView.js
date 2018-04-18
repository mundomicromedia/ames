var HomeView = function() {

    this.initialize = function() {
        this.el = $('<div/>');
        this.el.on('mousedown', '.ir_a_presentacion', this.ir_a_presentacion);
        this.el.on('mousedown', '.ir_a_obras_y_servicios', this.ir_a_obras_y_servicios);
        this.el.on('mousedown', '.ir_a_concellerias', this.ir_a_concellerias);
        this.el.on('mousedown', '.ir_a_novas', this.ir_a_novas);
        this.el.on('mousedown', '.ir_a_contactos', this.ir_a_contactos);
        this.el.on('mousedown', '.ir_a_eventos', this.ir_a_eventos);
        this.el.on('mousedown', '.ir_a_convocatorias', this.ir_a_convocatorias);
        this.el.on('mousedown', '.ir_a_visitar', this.ir_a_visitar);
        this.el.on('mousedown', '.ir_a_actividades', this.ir_a_actividades);
        this.el.on('mousedown', '.ir_a_colabora_inicio', this.ir_a_colabora_inicio);
        this.el.on('mousedown', '.ir_a_notificaciones', this.ir_a_notificaciones);
        this.el.on('mousedown', '.ir_a_gallego', this.ir_a_gallego);
        this.el.on('mousedown', '.ir_a_castellano', this.ir_a_castellano);
        this.el.on('mousedown', '.ir_a_facebook', this.ir_a_facebook);
        this.el.on('mousedown', '.ir_a_twitter', this.ir_a_twitter);
    };
    
    this.ir_a_presentacion = function(event) {
    	ir_a_opcion('#presentacion');
    };
    this.ir_a_obras_y_servicios = function(event) {
    	ir_a_opcion('#obras_y_servicios');
    };
    this.ir_a_concellerias = function(event) {
    	ir_a_opcion('#concellerias');
    };
    this.ir_a_novas = function(event) {
    	ir_a_opcion('#novas');
    };
    this.ir_a_contactos = function(event) {
    	ir_a_opcion('#contactos');
    };
    this.ir_a_eventos= function(event) {
    	ir_a_opcion('#eventos');
    };
    this.ir_a_convocatorias= function(event) {
    	ir_a_opcion('#convocatorias');
    };
    this.ir_a_visitar = function(event) {
    	ir_a_opcion('#visitar');
    };
    this.ir_a_actividades = function(event) {
    	ir_a_opcion('#actividades');
    };
    this.ir_a_colabora_inicio = function(event) {
    	ir_a_opcion('#colaborainicio');
    };
    this.ir_a_notificaciones = function(event) {
    	ir_a_opcion('#notificaciones');
    };
    this.ir_a_gallego = function(event) {
    	ir_a_opcion('#home/gal');
    };
    this.ir_a_castellano = function(event) {
    	ir_a_opcion('#home/esp');
    };
    this.ir_a_facebook = function(event) {
    	var link_facebook = $('#link_facebook').val();
    	window.open(link_facebook, '_system');
    };
    this.ir_a_twitter = function(event) {
    	var link_twitter = $('#link_twitter').val();
    	window.open(link_twitter, '_system');
    };

    this.render = function() {
    	
    	var link_facebook = '';
    	var link_twitter = '';
    	var imagen_top = '';
    	
    	$.ajax({
            async:false,   
            type: 'POST',  
            url: url_servicios,
            data: "id_servicio=20",
            success:  function(respuesta){ 
            	datos = $.parseJSON(respuesta);
            	var facebook = datos['facebook'];
            	link_facebook = facebook;
            	
            	var twitter = datos['twitter'];
            	link_twitter = twitter;
            	
            	imagen_top = datos['imagen_top'];
            	imagen_top = url_imagen_top+imagen_top;
            	
            	$('#link_facebook').val(link_facebook);
            	$('#link_twitter').val(link_twitter);
            }
        });
    	
    	
    	var datos = Array();
    	
    	datos['traduccion_presentacion'] = primeraLetraMayuscula(array_traducciones[1]);
    	datos['traduccion_dpto_obras_y_servicios'] = primeraLetraMayuscula(array_traducciones[50]);
    	datos['traduccion_concejalias'] = primeraLetraMayuscula(array_traducciones[2]);
    	datos['traduccion_noticias'] = primeraLetraMayuscula(array_traducciones[3]);
    	datos['traduccion_contactos_de_interes'] = primeraLetraMayuscula(array_traducciones[4]);
    	datos['traduccion_eventos'] = primeraLetraMayuscula(array_traducciones[5]);
    	datos['traduccion_que_visitar'] = primeraLetraMayuscula(array_traducciones[6]);
    	datos['traduccion_participa_en_las_actividades'] = primeraLetraMayuscula(array_traducciones[7]);
    	datos['traduccion_en_gallego'] = array_traducciones[24];
    	datos['traduccion_en_castellano'] = array_traducciones[25];
    	datos['traduccion_colabora_con_tu_concejo'] = primeraLetraMayuscula(array_traducciones[17]);
    	datos['traduccion_convocatorias'] = primeraLetraMayuscula(array_traducciones[34]);
    	
    	datos['imagen_top'] = imagen_top;
    	
        this.el.html(HomeView.template(datos));
        return this;
    };

    this.initialize();

}

HomeView.template = Handlebars.compile($("#home-tpl").html());